"use client";
import { FormEvent, useEffect, useState } from "react";
import { sendOwnerEmail, istNow } from "@/lib/notifyClient";
import { serviceOptions, contactInfo } from "@/data/navigation";
import { countries } from "@/data/countries";
import { visitorTz } from "@/lib/tz";

const input = "w-full bg-bg border border-text/15 px-4 py-3 text-text text-sm focus:border-gold outline-none transition-colors";
const lbl = "block text-xs tracking-[0.2em] uppercase text-muted mb-2";
const req = <span className="text-gold ml-1">*</span>;

export const budgets = [
  "Under $1,000 / month",
  "$1,000 – $3,000 / month",
  "$3,000 – $7,500 / month",
  "$7,500 – $15,000 / month",
  "$15,000+ / month",
  "One-time project",
  "Not sure yet",
];
const callTimes = [
  "Morning (my time)",
  "Afternoon (my time)",
  "Evening (my time)",
  "Any time – flexible",
];

export function IntlForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [zones, setZones] = useState<string[]>([]);
  const [tz, setTz] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    const t = visitorTz();
    let all: string[] = [];
    try { all = (Intl as unknown as { supportedValuesOf: (k: string) => string[] }).supportedValuesOf("timeZone"); } catch {}
    if (t && !all.includes(t)) all = [t, ...all];
    setZones(all);
    setTz(t);
  }, []);

  const toggle = (s: string) => setPicked((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (d.website_hp) { setState("done"); return; }
    if (!picked.length) { setErr("Please pick at least one service."); return; }
    setErr("");
    setState("sending");
    try {
      const ok = await sendOwnerEmail(`NEW INTERNATIONAL CLIENT REGISTRATION – ${d.country}`, {
        "Full name": d.name, "Company / brand": d.company, Country: d.country, City: d.city,
        "Time zone": d.tz, Email: d.email, "WhatsApp / phone": d.phone,
        "Website / Instagram": d.site || "", "Services needed": picked.join(", "),
        "Monthly budget (USD)": d.budget, "Preferred call time": d.calltime,
        Message: d.message || "", Consent: d.consent ? "Yes" : "No",
        "Submitted from": "International registration page", Time: istNow(),
      }, d.email);
      if (!ok) throw new Error();
      setState("done"); form.reset(); setPicked([]);
    } catch { setState("error"); }
  }

  if (state === "done")
    return (
      <div role="status" className="py-12 text-center">
        <p className="text-4xl" aria-hidden>🌍</p>
        <p className="mt-4 font-display text-4xl text-gold">Thank you — you&apos;re registered.</p>
        <p className="mt-4 text-sm text-text/70 max-w-md mx-auto leading-relaxed">
          Your details have reached our international desk. We&apos;ll email you within one working day to set up a video call at a time that suits you.
        </p>
      </div>
    );

  return (
    <form onSubmit={onSubmit} className="space-y-5" aria-label="International client registration">
      <input type="text" name="website_hp" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><label htmlFor="i-name" className={lbl}>Full name{req}</label><input id="i-name" name="name" required className={input} autoComplete="name" /></div>
        <div><label htmlFor="i-company" className={lbl}>Company / brand{req}</label><input id="i-company" name="company" required className={input} autoComplete="organization" /></div>
        <div>
          <label htmlFor="i-country" className={lbl}>Country{req}</label>
          <select id="i-country" name="country" required defaultValue="" className={`${input} appearance-none`}>
            <option value="" disabled>Select your country</option>
            {countries.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <p className="mt-1.5 text-[11px] text-muted">In India? Please use our <a href="/contact" className="text-gold underline">regular enquiry form</a>.</p>
        </div>
        <div><label htmlFor="i-city" className={lbl}>City{req}</label><input id="i-city" name="city" required className={input} autoComplete="address-level2" /></div>
        <div>
          <label htmlFor="i-tz" className={lbl}>Time zone{req}</label>
          <select id="i-tz" name="tz" required value={tz} onChange={(e) => setTz(e.target.value)} className={`${input} appearance-none`}>
            <option value="" disabled>Select your time zone</option>
            {zones.map((z) => <option key={z} value={z}>{z.replace(/_/g, " ")}</option>)}
          </select>
        </div>
        <div><label htmlFor="i-email" className={lbl}>Email{req}</label><input id="i-email" name="email" type="email" required className={input} autoComplete="email" /></div>
        <div><label htmlFor="i-phone" className={lbl}>WhatsApp / phone (with country code){req}</label><input id="i-phone" name="phone" type="tel" required pattern="^\+?[0-9\s\-()]{7,20}$" placeholder="+1 555 123 4567" className={input} autoComplete="tel" /></div>
        <div><label htmlFor="i-site" className={lbl}>Website / Instagram</label><input id="i-site" name="site" className={input} placeholder="yourbrand.com or @yourbrand" /></div>
      </div>

      <fieldset>
        <legend className={lbl}>Services needed{req}</legend>
        <div className="flex flex-wrap gap-2">
          {serviceOptions.map((s) => {
            const on = picked.includes(s);
            return (
              <button type="button" key={s} onClick={() => toggle(s)} aria-pressed={on}
                className={`rounded-full border px-3.5 py-2 text-xs transition-colors ${on ? "bg-coral border-coral text-white" : "border-text/15 text-text/75 hover:border-gold hover:text-gold bg-bg"}`}>
                {on ? "✓ " : ""}{s}
              </button>
            );
          })}
        </div>
        {err && <p role="alert" className="mt-2 text-xs text-coral">{err}</p>}
      </fieldset>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="i-budget" className={lbl}>Monthly budget (USD){req}</label>
          <select id="i-budget" name="budget" required defaultValue="" className={`${input} appearance-none`}>
            <option value="" disabled>Select a range</option>
            {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="i-call" className={lbl}>Preferred call time{req}</label>
          <select id="i-call" name="calltime" required defaultValue="" className={`${input} appearance-none`}>
            <option value="" disabled>Select a time</option>
            {callTimes.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="i-msg" className={lbl}>Message</label>
        <textarea id="i-msg" name="message" rows={4} className={`${input} resize-y`} placeholder="Tell us about your brand and what you'd like to achieve…" />
      </div>
      <label className="flex items-start gap-3 text-sm text-text/75">
        <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-[#EE5A4C]" />
        <span>I agree that Lumiere Veritas Media Solutions may contact me by email, WhatsApp or video call about my enquiry.{req}</span>
      </label>
      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button type="submit" disabled={state === "sending"} className="rounded-full bg-coral px-8 py-3.5 text-sm font-medium tracking-wide text-white hover:bg-coral-dark transition-colors disabled:opacity-60">
          {state === "sending" ? "Sending…" : "Register as an international client →"}
        </button>
        {state === "error" && (
          <p role="alert" className="text-xs text-text/70">Couldn&apos;t send. Please email <a className="text-gold underline" href={contactInfo.emailHref}>{contactInfo.email}</a> or <a className="text-gold underline" href={contactInfo.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp us</a>.</p>
        )}
      </div>
    </form>
  );
}
