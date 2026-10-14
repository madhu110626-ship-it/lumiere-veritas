"use client";

import { contactInfo } from "@/data/navigation";
import { EnquiryForm } from "@/components/enquiry/EnquiryForm";
import { Reveal } from "@/components/ui/Reveal";

export function Contact() {
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
              <EnquiryForm source="contact section" idPrefix="c" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

