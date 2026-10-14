import { NextRequest, NextResponse } from "next/server";
import { sendOwnerEmail, istNow } from "@/lib/notify";

export const runtime = "nodejs";
const BOT = /bot|crawl|spider|slurp|preview|headless|lighthouse|facebookexternalhit|whatsapp|monitor|curl|wget|python|vercel/i;

function device(ua: string) {
  const d = /ipad|tablet/i.test(ua) ? "Tablet" : /mobi|android|iphone/i.test(ua) ? "Mobile" : "Desktop";
  const os = /iphone|ipad|ios/i.test(ua) ? "iOS" : /android/i.test(ua) ? "Android" : /windows/i.test(ua) ? "Windows" : /mac os/i.test(ua) ? "macOS" : /linux/i.test(ua) ? "Linux" : "Other";
  const br = /edg\//i.test(ua) ? "Edge" : /opr\//i.test(ua) ? "Opera" : /samsungbrowser/i.test(ua) ? "Samsung Internet" : /instagram/i.test(ua) ? "Instagram in-app" : /fban|fbav/i.test(ua) ? "Facebook in-app" : /chrome|crios/i.test(ua) ? "Chrome" : /firefox|fxios/i.test(ua) ? "Firefox" : /safari/i.test(ua) ? "Safari" : "Other";
  return `${d} · ${os} · ${br}`;
}

export async function POST(req: NextRequest) {
  const ua = req.headers.get("user-agent") || "";
  let b: Record<string, unknown> = {};
  try { b = await req.json(); } catch {}
  const test = b.test === true;
  if (!ua || (BOT.test(ua) && !test)) return NextResponse.json({ ok: true, skipped: "bot" });
  const h = req.headers;
  const dec = (v: string | null) => { try { return v ? decodeURIComponent(v) : ""; } catch { return v || ""; } };
  const loc = [dec(h.get("x-vercel-ip-city")), dec(h.get("x-vercel-ip-country-region")), h.get("x-vercel-ip-country")].filter(Boolean).join(", ") || "Unknown";
  const r = await sendOwnerEmail(`${test ? "[TEST] " : ""}New website visitor — ${loc}`, {
    Page: String(b.page || "/").slice(0, 300),
    "Came from": String(b.referrer || "").slice(0, 300) || "Direct / typed URL",
    Location: loc, Device: device(ua), Language: (h.get("accept-language") || "").split(",")[0],
    Time: istNow(), Note: "Anonymous visit — no personal identity is collected. Name/email arrive only if they submit the enquiry form.",
  });
  return NextResponse.json({ ok: r.ok, relay: r.message }, { status: r.ok ? 200 : 502 });
}
