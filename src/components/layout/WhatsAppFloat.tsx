"use client";
import { usePathname } from "next/navigation";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { contactInfo } from "@/data/navigation";
import { ruleAnswer } from "@/data/assistantKB";
import { sendOwnerEmail, istNow } from "@/lib/notifyClient";
import { visitorTz, isIndiaTz } from "@/lib/tz";

type Msg = { from: "bot" | "user"; text: string; link?: { href: string; label: string } };
type Step = "service" | "location" | "budget" | "timeline" | "done";

const SERVICES = [
  "News media publicity",
  "Social media & influencers",
  "Advertising campaigns",
  "Video & brand shoots",
  "AI videos & motion",
  "Branding, website & logo",
  "SEO, ads & lead generation",
  "Events, outdoor & print",
  "Something else",
];
const BUDGET_IN = ["Under ₹50,000 / month", "₹50,000 – ₹2 lakh / month", "₹2 – 5 lakh / month", "₹5 lakh+ / month", "One-time project", "Not sure yet"];
const BUDGET_INTL = ["Under $1,000 / month", "$1,000 – $3,000 / month", "$3,000 – $7,500 / month", "$7,500+ / month", "One-time project", "Not sure yet"];
const TIMELINE = ["Right away", "Within a month", "In 1–3 months", "Just exploring"];

const WaIcon = ({ className = "h-7 w-7" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const GREETING: Msg[] = [
  { from: "bot", text: "Hi, I'm the Lumiere Veritas assistant 👋" },
  { from: "bot", text: "I can answer quick questions and connect you with our team. Which service are you looking for?" },
];

export function WhatsAppFloat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>(GREETING);
  const [step, setStep] = useState<Step>("service");
  const [p, setP] = useState({ service: "", location: "", budget: "", timeline: "", name: "", question: "" });
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [nudge, setNudge] = useState(false);
  const [sent, setSent] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const exchanges = useRef(0);
  const [showCta, setShowCta] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const t = setTimeout(() => { try { if (!sessionStorage.getItem("lv_chat_nudge")) setNudge(true); } catch {} }, 6000);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => { scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" }); }, [msgs, typing, step, showCta]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const bump = () => { exchanges.current += 1; if (exchanges.current >= 2) setShowCta(true); };
  const bot = (m: Msg | Msg[], delay = 550) => {
    setTyping(true);
    setTimeout(() => { setTyping(false); setMsgs((x) => [...x, ...(Array.isArray(m) ? m : [m])]); }, delay);
  };

  function pickChip(value: string) {
    setMsgs((x) => [...x, { from: "user", text: value }]);
    bump();
    if (step === "service") {
      setP((o) => ({ ...o, service: value }));
      const guessAbroad = !isIndiaTz(visitorTz());
      bot({ from: "bot", text: `${value === "Something else" ? "No problem — we cover a lot." : "Great choice — that's something we do every day."} Are you based in India or outside India?${guessAbroad ? " (Looks like you may be visiting from abroad 🌍)" : ""}` });
      setStep("location");
    } else if (step === "location") {
      const abroad = value.includes("Outside");
      setP((o) => ({ ...o, location: abroad ? "Outside India" : "India" }));
      bot(abroad
        ? [{ from: "bot", text: "Wonderful — we work with clients worldwide, fully remote, with video calls in your time zone and quotes in USD, AED, GBP or EUR.", link: { href: "/international#register", label: "International client registration →" } },
           { from: "bot", text: "Roughly what monthly budget do you have in mind? (Our pricing depends on scope — this just helps us suggest the right plan.)" }]
        : [{ from: "bot", text: "Lovely. Roughly what monthly budget do you have in mind? (Our pricing depends on scope — this just helps us suggest the right plan.)" }]);
      setStep("budget");
    } else if (step === "budget") {
      setP((o) => ({ ...o, budget: value }));
      bot({ from: "bot", text: "Got it. And when would you like to start?" });
      setStep("timeline");
    } else if (step === "timeline") {
      setP((o) => ({ ...o, timeline: value }));
      bot({ from: "bot", text: "Thank you! I've noted everything. Add your name below (optional) and tap “Continue on WhatsApp” — our team will pick it up from here. You can also ask me anything else." });
      setStep("done");
      setShowCta(true);
    }
  }

  async function ask(e: FormEvent) {
    e.preventDefault();
    const q = input.trim().slice(0, 500);
    if (!q || typing) return;
    setInput("");
    const history = [...msgs, { from: "user" as const, text: q }];
    setMsgs(history);
    setP((o) => ({ ...o, question: o.question ? `${o.question} | ${q}` : q }));
    bump();
    setTyping(true);
    let reply = "";
    try {
      const ctrl = new AbortController();
      const to = setTimeout(() => ctrl.abort(), 14000);
      const r = await fetch("/api/assistant", {
        method: "POST", headers: { "Content-Type": "application/json" }, signal: ctrl.signal,
        body: JSON.stringify({ messages: history.slice(-8).map((m) => ({ role: m.from === "bot" ? "assistant" : "user", content: m.text })) }),
      });
      clearTimeout(to);
      if (r.ok) { const j = await r.json(); if (j.ok && j.reply) reply = j.reply; }
    } catch {}
    if (!reply) reply = ruleAnswer(q);
    setTyping(false);
    setMsgs((x) => [...x, { from: "bot", text: reply }]);
  }

  function summary() {
    const lines = [
      "Hi Lumiere Veritas! I came from your website assistant.",
      p.name && `Name: ${p.name}`,
      p.service && `Service: ${p.service}`,
      p.location && `Location: ${p.location}`,
      p.budget && `Budget: ${p.budget}`,
      p.timeline && `Start: ${p.timeline}`,
      p.question && `My question: ${p.question}`,
    ].filter(Boolean);
    return lines.join("\n");
  }

  function continueWa() {
    if (!sent) {
      setSent(true);
      sendOwnerEmail(`WhatsApp assistant lead – ${p.service || "general"}${p.location === "Outside India" ? " – INTERNATIONAL" : ""}`, {
        Name: p.name || "(not given)", Service: p.service || "", Location: p.location || "",
        Budget: p.budget || "", "Start timeline": p.timeline || "", "Visitor questions": p.question || "",
        "Visitor time zone": visitorTz() || "unknown", Page: location.pathname, Time: istNow(),
      }).catch(() => {});
    }
    window.open(`${contactInfo.whatsapp}?text=${encodeURIComponent(summary())}`, "_blank", "noopener,noreferrer");
  }

  const chips = step === "service" ? SERVICES : step === "location" ? ["🇮🇳 India", "🌍 Outside India"] : step === "budget" ? (p.location === "Outside India" ? BUDGET_INTL : BUDGET_IN) : step === "timeline" ? TIMELINE : [];

  if (pathname?.startsWith("/visitors")) return null;
  return (
    <>
      {open && (
        <div role="dialog" aria-label="Lumiere Veritas assistant" className="fixed z-[60] inset-x-2 bottom-2 top-[12vh] sm:top-auto sm:inset-x-auto sm:right-6 sm:bottom-24 sm:w-[390px] sm:h-[600px] sm:max-h-[calc(100vh-8rem)] flex flex-col overflow-hidden rounded-2xl border border-highlight/60 bg-bg-secondary shadow-[0_20px_60px_rgba(42,42,42,0.25)] lv-rise">
          <div className="flex items-center gap-3 bg-coral px-4 py-3 text-white">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20"><WaIcon className="h-5 w-5" /></div>
            <div className="flex-1 leading-tight">
              <p className="text-sm font-semibold">Lumiere Veritas assistant</p>
              <p className="text-[11px] text-white/85">Instant answers · then chat with our team</p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="h-9 w-9 rounded-full hover:bg-white/15 text-2xl leading-none">×</button>
          </div>

          <div ref={scroller} className="flex-1 overflow-y-auto px-3 py-4 space-y-2.5 bg-bg" aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line ${m.from === "user" ? "bg-coral text-white rounded-br-sm" : "bg-bg-secondary border border-text/10 text-text rounded-bl-sm"}`}>
                  {m.text}
                  {m.link && <Link href={m.link.href} onClick={() => setOpen(false)} className="mt-1.5 block font-semibold text-gold underline">{m.link.label}</Link>}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start"><div className="rounded-2xl rounded-bl-sm bg-bg-secondary border border-text/10 px-4 py-3 text-text/50 text-sm tracking-widest">•••</div></div>
            )}
            {!typing && chips.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {chips.map((c) => (
                  <button key={c} onClick={() => pickChip(c)} className="rounded-full border border-coral/50 bg-bg-secondary px-3 py-1.5 text-xs text-coral hover:bg-coral hover:text-white transition-colors">{c}</button>
                ))}
              </div>
            )}
            {showCta && !typing && (
              <div className="mt-2 rounded-xl border border-highlight/60 bg-bg-secondary p-3">
                {step === "done" && (
                  <>
                    <label htmlFor="lv-chat-name" className="block text-[11px] uppercase tracking-[0.18em] text-muted mb-1">Your name (optional)</label>
                    <input id="lv-chat-name" value={p.name} onChange={(e) => setP((o) => ({ ...o, name: e.target.value.slice(0, 60) }))} className="mb-2.5 w-full rounded-md border border-text/15 bg-bg px-3 py-2 text-sm outline-none focus:border-gold" autoComplete="name" />
                  </>
                )}
                <button onClick={continueWa} className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white hover:brightness-95">
                  <WaIcon className="h-5 w-5" /> Continue on WhatsApp
                </button>
                <p className="mt-1.5 text-center text-[11px] text-muted">We&apos;ll send our team a short summary of this chat.</p>
              </div>
            )}
          </div>

          <button type="button" onClick={() => setOpen(false)} className="w-full border-t border-text/10 bg-bg-secondary py-2.5 text-xs font-semibold text-coral underline-offset-2 hover:underline">
            Skip, just browse the website →
          </button>
          <form onSubmit={ask} className="flex items-center gap-2 border-t border-text/10 bg-bg-secondary p-2.5">
            <label htmlFor="lv-chat-input" className="sr-only">Type your question</label>
            <input id="lv-chat-input" value={input} onChange={(e) => setInput(e.target.value)} maxLength={500} placeholder="Ask a question…" className="flex-1 rounded-full border border-text/15 bg-bg px-4 py-2.5 text-[16px] sm:text-sm outline-none focus:border-gold" autoComplete="off" />
            <button type="submit" disabled={!input.trim() || typing} aria-label="Send" className="flex h-10 w-10 items-center justify-center rounded-full bg-coral text-white disabled:opacity-50">➤</button>
          </form>
        </div>
      )}

      {nudge && !open && (
        <button onClick={() => { setOpen(true); setNudge(false); try { sessionStorage.setItem("lv_chat_nudge", "1"); } catch {} }} className="fixed bottom-[5.25rem] right-5 md:bottom-[5.75rem] md:right-6 z-40 max-w-[230px] rounded-2xl rounded-br-sm border border-highlight/60 bg-bg-secondary px-3.5 py-2.5 text-left text-xs text-text shadow-lg lv-rise">
          👋 Hi! Have a question? I can help right away.
        </button>
      )}

      <button
        type="button"
        onClick={() => { setOpen((v) => !v); setNudge(false); try { sessionStorage.setItem("lv_chat_nudge", "1"); } catch {} }}
        aria-label={open ? "Close chat" : "Chat with us"}
        aria-expanded={open}
        className={`fixed bottom-5 right-5 z-[61] h-14 w-14 items-center justify-center rounded-full bg-coral text-white shadow-lg shadow-coral/25 hover:scale-110 hover:bg-coral-dark transition-all duration-300 md:bottom-6 md:right-6 ${open ? "hidden sm:flex" : "flex"}`}
      >
        {open ? <span className="text-3xl leading-none">×</span> : <WaIcon />}
        {!open && <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-[#25D366] ring-2 ring-bg" aria-hidden />}
      </button>
    </>
  );
}
