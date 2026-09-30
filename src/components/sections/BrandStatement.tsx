"use client";

import { Reveal } from "@/components/ui/Reveal";

const pillars = ["STRATEGY", "CREATIVITY", "MEDIA", "EXECUTION"] as const;

export function BrandStatement() {
  return (
    <section className="bg-bg-secondary border-y border-text/5 py-20 md:py-28">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
        <Reveal>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.05] text-text text-center max-w-4xl mx-auto">
            ONE PARTNER.
            <br />
            <span className="text-gold">MANY WAYS TO MAKE YOUR BRAND MATTER.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-14 md:mt-20 flex flex-wrap items-center justify-center gap-x-4 gap-y-4 md:gap-x-0">
            {pillars.map((p, i) => (
              <div key={p} className="flex items-center">
                <span className="text-xs md:text-sm tracking-[0.28em] uppercase text-text font-medium px-2 md:px-4">
                  {p}
                </span>
                {i < pillars.length - 1 && (
                  <span
                    className="hidden md:block h-px w-10 lg:w-16 bg-gradient-to-r from-gold/20 via-gold to-gold/20"
                    aria-hidden
                  />
                )}
                {i < pillars.length - 1 && (
                  <span className="md:hidden text-gold/50 mx-1" aria-hidden>
                    ·
                  </span>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
