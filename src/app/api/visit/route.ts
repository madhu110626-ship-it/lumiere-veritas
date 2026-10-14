import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
const BOT = /bot|crawl|spider|slurp|preview|headless|lighthouse|facebookexternalhit|whatsapp|monitor|curl|wget|python/i;

function device(ua: string) {
  const d = /ipad|tablet/i.test(ua) ? "Tablet" : /mobi|android|iphone/i.test(ua) ? "Mobile" : "Desktop";
  const os = /iphone|ipad/i.test(ua) ? "iOS" : /android/i.test(ua) ? "Android" : /windows/i.test(ua) ? "Windows" : /mac os/i.test(ua) ? "macOS" : /linux/i.test(ua) ? "Linux" : "Other";
  const br = /instagram/i.test(ua) ? "Instagram in-app" : /fban|fbav/i.test(ua) ? "Facebook in-app" : /edg\//i.test(ua) ? "Edge" : /opr\//i.test(ua) ? "Opera" : /samsungbrowser/i.test(ua) ? "Samsung Internet" : /chrome|crios/i.test(ua) ? "Chrome" : /firefox|fxios/i.test(ua) ? "Firefox" : /safari/i.test(ua) ? "Safari" : "Other";
  return `${d} · ${os} · ${br}`;
}

// Returns anonymous visit context (Vercel geo headers). Email is sent by the browser via FormSubmit
// because FormSubmit's Cloudflare blocks server-to-server calls from Vercel.
export async function POST(req: NextRequest) {
  const h = req.headers, ua = h.get("user-agent") || "";
  if (!ua || BOT.test(ua)) return NextResponse.json({ ok: true, bot: true });
  const dec = (v: string | null) => { try { return v ? decodeURIComponent(v) : ""; } catch { return v || ""; } };
  const location = [dec(h.get("x-vercel-ip-city")), dec(h.get("x-vercel-ip-country-region")), h.get("x-vercel-ip-country")].filter(Boolean).join(", ") || "Unknown";
  return NextResponse.json({ ok: true, bot: false, location, device: device(ua), language: (h.get("accept-language") || "").split(",")[0] });
}
