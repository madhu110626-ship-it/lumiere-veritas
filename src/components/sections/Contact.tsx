"use client";

import { FormEvent, useState } from "react";
import { contactInfo } from "@/data/navigation";
import { Reveal } from "@/components/ui/Reveal";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="bg-cream text-ink py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">
          <div>
            <Reveal>
              <p className="text-xs md:text-sm tracking-[0.28em] uppercase text-ink/50 mb-4">
                Contact
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[0.95]">
                HAVE A BRAND
                <br />
                TO BUILD?
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-8 text-base md:text-lg text-ink/60 leading-relaxed max-w-md">
                Tell us about your project. We&apos;ll respond with next steps —
                or message us directly on WhatsApp for a faster start.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-10 space-y-4 text-sm md:text-base">
                <a
                  href={contactInfo.emailHref}
                  className="block hover:text-ink/60 transition-colors break-all"
                >
                  {contactInfo.email}
                </a>
                <a
                  href={contactInfo.phoneHref}
                  className="block hover:text-ink/60 transition-colors"
                >
                  {contactInfo.phone}
                </a>
                <a
                  href={contactInfo.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex mt-4 rounded-full bg-lime text-ink px-7 py-3.5 font-medium hover:bg-ink hover:text-cream transition-colors"
                >
                  Chat on WhatsApp →
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <form
              onSubmit={onSubmit}
              className="rounded-2xl border border-ink/10 bg-cream p-6 md:p-10 space-y-5"
            >
              {submitted ? (
                <div className="py-16 text-center">
                  <p className="font-display text-2xl md:text-3xl font-medium mb-3">
                    Message received.
                  </p>
                  <p className="text-ink/55 text-sm">
                    PLACEHOLDER confirmation — wire this form to your backend or
                    email service when ready. For now, reach us via email or
                    WhatsApp.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-sm underline underline-offset-4"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <label className="block">
                      <span className="text-xs tracking-widest uppercase text-ink/45">
                        Name
                      </span>
                      <input
                        required
                        name="name"
                        type="text"
                        className="mt-2 w-full border-b border-ink/20 bg-transparent py-3 text-base outline-none focus:border-ink transition-colors"
                        placeholder="Your name"
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs tracking-widest uppercase text-ink/45">
                        Email
                      </span>
                      <input
                        required
                        name="email"
                        type="email"
                        className="mt-2 w-full border-b border-ink/20 bg-transparent py-3 text-base outline-none focus:border-ink transition-colors"
                        placeholder="you@brand.com"
                      />
                    </label>
                  </div>
                  <label className="block">
                    <span className="text-xs tracking-widest uppercase text-ink/45">
                      Company
                    </span>
                    <input
                      name="company"
                      type="text"
                      className="mt-2 w-full border-b border-ink/20 bg-transparent py-3 text-base outline-none focus:border-ink transition-colors"
                      placeholder="Brand / company"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs tracking-widest uppercase text-ink/45">
                      Project
                    </span>
                    <textarea
                      required
                      name="message"
                      rows={4}
                      className="mt-2 w-full border-b border-ink/20 bg-transparent py-3 text-base outline-none focus:border-ink transition-colors resize-none"
                      placeholder="What are you looking to build?"
                    />
                  </label>
                  <button
                    type="submit"
                    className="w-full sm:w-auto rounded-full bg-ink text-cream px-10 py-4 text-sm font-medium hover:bg-lime hover:text-ink transition-colors"
                  >
                    SEND MESSAGE
                  </button>
                  <p className="text-[11px] text-ink/40">
                    Form is front-end only (PLACEHOLDER). Prefer email or WhatsApp
                    for direct contact.
                  </p>
                </>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
