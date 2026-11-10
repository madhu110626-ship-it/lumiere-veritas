import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { kbText } from "@/data/assistantKB";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 20;

const MODELS = ["google/gemini-3.5-flash-lite", "google/gemini-2.5-flash-lite"];
const hits = new Map<string, number[]>();
let aiDownUntil = 0;
const LIMIT = 12, WINDOW = 10 * 60 * 1000;

function limited(ip: string) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < WINDOW);
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 5000) hits.clear();
  return arr.length > LIMIT;
}

const INSTRUCTIONS = `You are the website assistant for Lumiere Veritas Media Solutions, a creative and marketing agency in Mumbai.
Rules:
- Answer ONLY questions about this agency, its services, how it works, pricing approach, timelines, and working with international clients. For anything else, politely say you can only help with questions about Lumiere Veritas and suggest WhatsApp.
- Use ONLY the facts below. Never invent prices, numbers, client names, guarantees or turnaround times. If asked about price, say pricing depends on the scope of work and the team will send a clear quote.
- Never share a phone number. Always call the agency "Lumiere Veritas Media Solutions" or "Lumiere Veritas".
- Keep replies to 1–3 short sentences, warm, polite and in plain simple English (reply in Hindi if the visitor writes in Hindi). No markdown.
- If unsure, say the team will answer personally on WhatsApp.
Facts:
${kbText}`;

export async function POST(req: NextRequest) {
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "anon";
  if (limited(ip)) return NextResponse.json({ ok: false, reason: "rate" }, { status: 429 });
  let body: { messages?: { role: string; content: string }[] };
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }
  const messages = (body.messages || [])
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-8)
    .map((m) => ({ role: m.role as "user" | "assistant", content: m.content.slice(0, 500) }));
  if (!messages.length || messages[messages.length - 1].role !== "user")
    return NextResponse.json({ ok: false }, { status: 400 });
  if (Date.now() < aiDownUntil) return NextResponse.json({ ok: false, reason: "ai-unavailable" }, { status: 503 });
  for (const model of MODELS) {
    try {
      const { text } = await generateText({ model, instructions: INSTRUCTIONS, messages, maxOutputTokens: 220, temperature: 0.3, timeout: 12000 });
      const reply = text.trim().replace(/\+?\d[\d\s-]{8,}\d/g, "").slice(0, 700);
      if (reply) return NextResponse.json({ ok: true, reply, ai: true }, { headers: { "Cache-Control": "no-store" } });
    } catch (e) {
      const msg = (e as Error)?.message || "";
      console.error("assistant model failed", model, msg);
      if (/credit card|unauthori|authentication|oidc|api key|403|401/i.test(msg)) { aiDownUntil = Date.now() + 10 * 60 * 1000; break; }
    }
  }
  return NextResponse.json({ ok: false, reason: "ai-unavailable" }, { status: 503 });
}
