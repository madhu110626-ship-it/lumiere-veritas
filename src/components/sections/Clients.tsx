"use client";

import { Reveal } from "@/components/ui/Reveal";

const placeholders = Array.from({ length: 8 }, (_, i) => `Client Name ${i + 1}`);

export function Clients() {
  return (
    <section className="bg-ink text-cream py-24 md:py-28">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
        <Reveal>
          <p className="text-xs md:text-sm tracking-[0.28em] uppercase text-lime mb-4">
            Clients
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight mb-4">
            TRUSTED BY BRANDS
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="text-sm text-cream/40 mb-12">
            PLACEHOLDER tiles — replace with real client logos when available.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {placeholders.map((name, i) => (
            <Reveal key={name} delay={0.04 * i}>
              <div className="flex aspect-[16/9] items-center justify-center rounded-xl border border-cream/10 bg-ink-muted/50 hover:border-lime/40 transition-colors">
                <span className="text-xs md:text-sm tracking-widest uppercase text-cream/30 text-center px-4">
                  {name}
                  <br />
                  <span className="text-[10px] text-cream/20">PLACEHOLDER</span>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
