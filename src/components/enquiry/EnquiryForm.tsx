"use client";
import { FormEvent, useState } from "react";
import { sendOwnerEmail, istNow } from "@/lib/notifyClient";
import { serviceOptions, contactInfo } from "@/data/navigation";

const input = "w-full bg-bg border border-text/15 px-4 py-3 text-text text-sm focus:border-gold outline-none transition-colors";
const lbl = "block text-xs tracking-[0.2em] uppercase text-muted mb-2";

export function EnquiryForm({ source, compact = false, idPrefix = "f" }: { source: string; compact?: boolean; idPrefix?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState("sending");
    try {
      const d = data as Record<string, string>;
      if (d.website) { setState("done"); return; }
      const ok = await sendOwnerEmail(`New enquiry — ${d.name}`, {
        Name: d.name, Company: d.company || "", Email: d.email, Phone: d.phone || "",
        "Service Required": d.service || "", "Project Details": d.details || "",
        "Submitted from": source, Page: location.pathname, Time: istNow(),
      }, d.email);
      if (!ok) throw new Error();
      setState("done"); form.reset();
    } catch { setState("error"); }
  }
  if (state === "done")
    return (
      <div role="status" className="py-8 text-center">
        <p className="font-display text-3xl text-gold">Thank you.</p>
        <p className="mt-3 text-sm text-text/70">Your enquiry has reached us. We&apos;ll get back to you shortly.</p>
      </div>
    );
  const id = (n: string) => `${idPrefix}-${n}`;
  return (
    <form onSubmit={onSubmit} className={compact ? "space-y-4" : "space-y-5"}>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><label htmlFor={id("name")} className={lbl}>Name<span className="text-gold ml-1">*</span></label><input id={id("name")} name="name" required className={input} autoComplete="name" /></div>
        <div><label htmlFor={id("company")} className={lbl}>Company</label><input id={id("company")} name="company" className={input} autoComplete="organization" /></div>
        <div><label htmlFor={id("email")} className={lbl}>Email<span className="text-gold ml-1">*</span></label><input id={id("email")} name="email" type="email" required className={input} autoComplete="email" /></div>
        <div><label htmlFor={id("phone")} className={lbl}>Phone</label><input id={id("phone")} name="phone" type="tel" className={input} autoComplete="tel" /></div>
      </div>
      <div>
        <label htmlFor={id("service")} className={lbl}>Service Required</label>
        <select id={id("service")} name="service" defaultValue="" className={`${input} appearance-none`}>
          <option value="" disabled>Select a capability</option>
          {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor={id("details")} className={lbl}>Project Details</label>
        <textarea id={id("details")} name="details" rows={compact ? 3 : 5} className={`${input} resize-y`} placeholder="Tell us what you're building…" />
      </div>
      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button type="submit" disabled={state === "sending"} className="rounded-full bg-coral px-8 py-3.5 text-sm font-medium tracking-wide text-white hover:bg-coral-dark transition-colors disabled:opacity-60">
          {state === "sending" ? "Sending…" : "Send Enquiry →"}
        </button>
        {state === "error" && (
          <p role="alert" className="text-xs text-text/70">Couldn&apos;t send. Please <a className="text-gold underline" href={contactInfo.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp us</a>.</p>
        )}
      </div>
    </form>
  );
}
