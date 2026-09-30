import type { Metadata } from "next";
import { Services } from "@/components/sections/Services";
import { Approach } from "@/components/sections/Approach";
import { Contact } from "@/components/sections/Contact";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "16 creative capabilities — PR, social, campaigns, video, AI, outdoor, events, branding & more.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-ink text-cream pt-32 md:pt-40 pb-16 md:pb-20">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
          <Reveal>
            <p className="text-xs tracking-[0.28em] uppercase text-lime mb-4">
              Capabilities
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[0.9]">
              WHAT
              <br />
              WE DO
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-cream/55">
              Sixteen capabilities under one partner — hover a service to explore
              on desktop.
            </p>
          </Reveal>
        </div>
      </section>
      <Services />
      <Approach />
      <Contact />
    </>
  );
}
