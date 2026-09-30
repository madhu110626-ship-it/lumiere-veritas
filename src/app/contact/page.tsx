import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";
import { Reveal } from "@/components/ui/Reveal";
import { contactInfo } from "@/data/navigation";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Have an idea? Let's make it visible. Contact Lumiere Veritas Media Solutions.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-bg text-text pt-32 md:pt-40 pb-12">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
          <Reveal>
            <p className="text-xs tracking-[0.28em] uppercase text-gold mb-4">
              Contact
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[0.9]">
              HAVE AN IDEA?
              <br />
              <span className="text-gold">LET&apos;S MAKE IT</span>
              <br />
              VISIBLE.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-muted">
              <a href={contactInfo.emailHref} className="hover:text-gold break-all">
                {contactInfo.email}
              </a>
              <a href={contactInfo.phoneHref} className="hover:text-gold">
                {contactInfo.phone}
              </a>
              <a
                href={contactInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold"
              >
                WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>
      <Contact />
    </>
  );
}
