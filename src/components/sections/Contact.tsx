"use client";

import { FormEvent, useState } from "react";
import { contactInfo, serviceOptions } from "@/data/navigation";
import { Reveal } from "@/components/ui/Reveal";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const company = String(data.get("company") || "");
    const email = String(data.get("email") || "");
    const phone = String(data.get("phone") || "");
    const service = String(data.get("service") || "");
    const details = String(data.get("details") || "");

    const body = [
      `Name: ${name}`,
      `Company: ${company}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Service Required: ${service}`,
      "",
      "Project Details:",
      details,
    ].join("\n");

    const mailto = `${contactInfo.emailHref}?subject=${encodeURIComponent(
      `Project enquiry — ${name || "New lead"}`
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setSubmitted(true);
  }

  return (
    <section id="contact" className="bg-bg-secondary py-24 md:py-32 border-t border-text/5">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="mb-4 text-xs tracking-[0.28em] uppercase text-gold">
                Contact
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[0.95] text-text">
                HAVE AN IDEA?
                <br />
                <span className="text-gold">LET&apos;S MAKE IT VISIBLE.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-10 space-y-4 text-sm">
                <a
                  href={contactInfo.emailHref}
                  className="block text-text/80 hover:text-gold transition-colors break-all"
                >
                  {contactInfo.email}
                </a>
                <a
                  href={contactInfo.phoneHref}
                  className="block text-text/80 hover:text-gold transition-colors"
                >
                  {contactInfo.phone}
                </a>
                <a
                  href={contactInfo.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gold hover:text-highlight transition-colors"
                >
                  WhatsApp →
                </a>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Name" name="name" required />
                  <Field label="Company" name="company" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Email" name="email" type="email" required />
                  <Field label="Phone" name="phone" type="tel" />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.2em] uppercase text-muted mb-2">
                    Service Required
                  </label>
                  <select
                    name="service"
                    className="w-full bg-bg border border-text/15 px-4 py-3.5 text-text text-sm focus:border-gold outline-none transition-colors appearance-none"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select a capability
                    </option>
                    {serviceOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs tracking-[0.2em] uppercase text-muted mb-2">
                    Project Details
                  </label>
                  <textarea
                    name="details"
                    rows={5}
                    className="w-full bg-bg border border-text/15 px-4 py-3.5 text-text text-sm focus:border-gold outline-none transition-colors resize-y min-h-[140px]"
                    placeholder="Tell us what you're building…"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    type="submit"
                    className="rounded-full bg-gold px-8 py-3.5 text-sm font-medium tracking-wide text-bg hover:bg-highlight transition-colors"
                  >
                    Send Enquiry →
                  </button>
                  {submitted && (
                    <p className="text-xs text-muted">
                      Opening your email client…
                    </p>
                  )}
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs tracking-[0.2em] uppercase text-muted mb-2">
        {label}
        {required && <span className="text-gold ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full bg-bg border border-text/15 px-4 py-3.5 text-text text-sm focus:border-gold outline-none transition-colors"
      />
    </div>
  );
}
