"use client";

import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "We dig into your brand, audience, and ambition — mapping the opportunity before the idea.",
  },
  {
    number: "02",
    title: "Strategize",
    description:
      "Positioning, channels, and narrative architecture that give creative work a clear north star.",
  },
  {
    number: "03",
    title: "Create",
    description:
      "Concepts become campaigns, films, identities, and experiences — crafted with precision.",
  },
  {
    number: "04",
    title: "Amplify",
    description:
      "Media, PR, social, and distribution that take the work from made to impossible to ignore.",
  },
];

export function Approach() {
  return (
    <section className="bg-ink text-cream py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
        <Reveal>
          <p className="text-xs md:text-sm tracking-[0.28em] uppercase text-lime mb-4">
            Process
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight max-w-3xl leading-[0.95]">
            FROM IDEA TO IMPACT.
          </h2>
        </Reveal>

        <Stagger className="mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.1}>
          {steps.map((step) => (
            <StaggerItem key={step.number}>
              <div className="group h-full rounded-2xl border border-cream/15 p-7 md:p-8 hover:border-lime hover:bg-lime transition-all duration-500">
                <p className="font-display text-sm tracking-widest text-lime group-hover:text-ink/50 mb-8 transition-colors">
                  {step.number}
                </p>
                <h3 className="font-display text-3xl font-medium mb-4 group-hover:text-ink transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-cream/60 leading-relaxed group-hover:text-ink/70 transition-colors">
                  {step.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
