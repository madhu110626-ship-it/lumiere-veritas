"use client";

import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

export function AICreative() {
  return (
    <section className="bg-cream text-ink py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
        <Reveal>
          <p className="text-xs md:text-sm tracking-[0.28em] uppercase text-ink/50 mb-4">
            Creative Intelligence
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight max-w-4xl leading-[0.95]">
            HUMAN CREATIVITY.
            <br />
            <span className="text-ink/35">AI ACCELERATION.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-8 max-w-2xl text-base md:text-lg text-ink/60 leading-relaxed">
            We don&apos;t replace imagination — we accelerate it. AI becomes a
            co-pilot for ideation, iteration, and production speed while craft
            stays firmly in human hands.
          </p>
        </Reveal>

        <Stagger className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-6" stagger={0.15}>
          <StaggerItem>
            <div className="rounded-2xl border border-ink/10 p-8 md:p-12 h-full bg-cream">
              <p className="text-xs tracking-[0.25em] uppercase text-ink/40 mb-6">
                Traditional
              </p>
              <ul className="space-y-5">
                {[
                  "Linear production timelines",
                  "Manual iterations",
                  "Fixed creative pathways",
                  "Craft-first, pace-second",
                ].map((item) => (
                  <li
                    key={item}
                    className="font-display text-xl md:text-2xl font-medium tracking-tight border-b border-ink/10 pb-4"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="rounded-2xl bg-ink text-cream p-8 md:p-12 h-full relative overflow-hidden">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-lime/20 blur-3xl" />
              <p className="text-xs tracking-[0.25em] uppercase text-lime mb-6 relative">
                AI-Assisted
              </p>
              <ul className="space-y-5 relative">
                {[
                  "Compressed exploration cycles",
                  "Rapid visual prototyping",
                  "Expanded concept landscapes",
                  "Human judgment + machine velocity",
                ].map((item) => (
                  <li
                    key={item}
                    className="font-display text-xl md:text-2xl font-medium tracking-tight border-b border-cream/15 pb-4"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
