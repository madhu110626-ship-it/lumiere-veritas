import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";
import { Reveal } from "@/components/ui/Reveal";
import { contactInfo } from "@/data/navigation";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Lumiere Veritas Media Solutions. Email, phone, or WhatsApp.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-ink text-cream pt-32 md:pt-40 pb-12">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
          <Reveal>
            <p className="text-xs tracking-[0.28em] uppercase text-lime mb-4">
              Contact
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[0.9]">
              LET&apos;S BUILD
              <br />
              SOMETHING
              <br />
              <span className="text-lime">IMPOSSIBLE</span>
              <br />
              TO IGNORE.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-cream/60">
              <a href={contactInfo.emailHref} className="hover:text-lime break-all">
                {contactInfo.email}
              </a>
              <a href={contactInfo.phoneHref} className="hover:text-lime">
                {contactInfo.phone}
              </a>
              <a
                href={contactInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-lime"
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
