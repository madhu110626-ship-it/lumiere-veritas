import type { Metadata } from "next";
import { Services } from "@/components/sections/Services";
import { Approach } from "@/components/sections/Approach";
import { Contact } from "@/components/sections/Contact";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Creative and marketing capabilities — news media publicity and PR, influencer, brand shoots, websites and logos, SEO and paid ads, podcasts, and more.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-bg text-text pt-32 md:pt-40 pb-16 md:pb-20">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
          <Reveal>
            <p className="text-xs tracking-[0.28em] uppercase text-gold mb-4">
              Capabilities
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[0.9]">
              WHAT
              <br />
              <span className="text-gold">WE DO.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-muted">
              News media publicity, promotion, and PR — with influencer
              marketing, brand shoots, website and logo design, SEO and paid
              ads, and podcasts — under one partner. 360° media · marketing ·
              advertising · creative.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-bg-secondary border-y border-text/5 py-20 md:py-28">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
          <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
            {services.map((s) => (
              <StaggerItem key={s.number}>
                <div className="border-t border-text/10 py-8 group">
                  <div className="flex items-baseline gap-4">
                    <span className="text-xs tracking-[0.2em] text-gold">
                      {s.number}
                    </span>
                    <h2 className="font-display text-xl md:text-2xl font-medium text-text group-hover:text-gold transition-colors">
                      {s.title}
                    </h2>
                  </div>
                  <p className="mt-3 pl-12 text-sm text-muted leading-relaxed">
                    {s.description}
                  </p>
                  <div className="mt-4 ml-12 h-px w-0 bg-gold transition-all duration-500 group-hover:w-24" />
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <Services />
      <Approach />
      <Contact />
    </>
  );
}
