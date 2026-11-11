import { NextRequest, NextResponse, after } from "next/server";
import { classifyVisit } from "@/lib/visitFilter";
import { recordVisit } from "@/lib/visitStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function device(ua: string) {
  const d = /ipad|tablet/i.test(ua) ? "Tablet" : /mobi|android|iphone/i.test(ua) ? "Mobile" : "Desktop";
  const os = /iphone|ipad/i.test(ua) ? "iOS" : /android/i.test(ua) ? "Android" : /windows/i.test(ua) ? "Windows" : /mac os/i.test(ua) ? "macOS" : /linux/i.test(ua) ? "Linux" : "Other";
  const br = /instagram/i.test(ua) ? "Instagram in-app" : /fban|fbav/i.test(ua) ? "Facebook in-app" : /edg\//i.test(ua) ? "Edge" : /opr\//i.test(ua) ? "Opera" : /samsungbrowser/i.test(ua) ? "Samsung Internet" : /chrome|crios/i.test(ua) ? "Chrome" : /firefox|fxios/i.test(ua) ? "Firefox" : /safari/i.test(ua) ? "Safari" : "Other";
  return `${d} · ${os} · ${br}`;
}

// Returns anonymous visit context (Vercel geo headers) only for likely-real people.
// The email itself is sent by the browser via FormSubmit (FormSubmit's Cloudflare blocks Vercel server calls),
// and only when this route says bot:false. Enquiry-form emails do not use this route.
export async function POST(req: NextRequest) {
  const h = req.headers, ua = h.get("user-agent") || "";
  let signals: { languages?: unknown; webdriver?: unknown; page?: unknown } | undefined;
  try { signals = await req.json(); } catch { signals = undefined; }
  const v = classifyVisit(h, signals);
  const noStore = { headers: { "Cache-Control": "no-store" } };
  if (!v.human) return NextResponse.json({ ok: true, bot: true, skip: true, reason: v.reason }, noStore);
  const dec = (x: string | null) => { try { return x ? decodeURIComponent(x) : ""; } catch { return x || ""; } };
  const location = [dec(h.get("x-vercel-ip-city")), dec(h.get("x-vercel-ip-country-region")), h.get("x-vercel-ip-country")].filter(Boolean).join(", ") || "Unknown";
  // Anonymous visit log for the private /visitors globe: country, city, approximate lat/lon, time, page. No IP stored.
  const num = (x: string | null) => { const n = x ? Number(x) : NaN; return Number.isFinite(n) ? n : null; };
  const page = typeof signals?.page === "string" && signals.page.startsWith("/") ? signals.page.split(/[?#]/)[0] : "/";
  if (!page.startsWith("/visitors")) {
    after(() => recordVisit({
      cc: h.get("x-vercel-ip-country") || "", city: dec(h.get("x-vercel-ip-city")), region: h.get("x-vercel-ip-country-region") || "",
      lat: num(h.get("x-vercel-ip-latitude")), lon: num(h.get("x-vercel-ip-longitude")), page,
    }).catch((e) => console.error("visit log failed", e)));
  }
  return NextResponse.json({ ok: true, bot: false, skip: false, location, device: device(ua), language: (h.get("accept-language") || "").split(",")[0] }, noStore);
}
