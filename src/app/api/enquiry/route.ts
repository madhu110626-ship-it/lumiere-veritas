import { NextRequest, NextResponse } from "next/server";
import { sendOwnerEmail, istNow } from "@/lib/notify";

export const runtime = "nodejs";
const s = (v: unknown, n = 2000) => String(v ?? "").trim().slice(0, n);

export async function POST(req: NextRequest) {
  let b: Record<string, unknown> = {};
  try { b = await req.json(); } catch { return NextResponse.json({ ok: false, error: "bad json" }, { status: 400 }); }
  if (s(b.website)) return NextResponse.json({ ok: true }); // honeypot
  const name = s(b.name, 120), email = s(b.email, 200);
  if (!name || !/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ ok: false, error: "Name and a valid email are required." }, { status: 400 });
  const r = await sendOwnerEmail(`New enquiry — ${name}`, {
    Name: name, Company: s(b.company, 200), Email: email, Phone: s(b.phone, 40),
    "Service Required": s(b.service, 120), "Project Details": s(b.details),
    "Submitted from": s(b.source, 60) || "website", Page: s(b.page, 300), Time: istNow(),
  }, email);
  if (!r.ok) console.error("enquiry relay failed", r);
  return NextResponse.json({ ok: r.ok, relay: r.message }, { status: r.ok ? 200 : 502 });
}
