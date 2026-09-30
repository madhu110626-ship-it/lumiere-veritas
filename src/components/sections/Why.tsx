"use client";

import { Reveal } from "@/components/ui/Reveal";

const reasons = [
  {
    title: "One roof. Full spectrum.",
    body: "Strategy, creative, media, production, and experiences — without juggling agencies.",
  },
  {
    title: "Craft meets commercial.",
    body: "Beautiful work that still sells. Art direction with a clear business intent.",
  },
  {
    title: "Human + AI by design.",
    body: "We use acceleration tools to move faster — without outsourcing judgment.",
  },
  {
    title: "Built for presence.",
    body: "From OOH to earned media to social — we make brands visible where it matters.",
  },
];

export function Why() {
  return (
    <section className="bg-cream text-ink py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
        <Reveal>
          <p className="text-xs md:text-sm tracking-[0.28em] uppercase text-ink/50 mb-4">
            Differentiator
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight mb-16 md:mb-24">
            WHY WORK WITH US?
          </h2>
        </Reveal>

        <div className="space-y-0 border-t border-ink/15">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={0.05 * i}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 border-b border-ink/15 py-10 md:py-14 group">
                <p className="md:col-span-1 font-display text-sm text-ink/30 pt-2">
                  0{i + 1}
                </p>
                <h3 className="md:col-span-5 font-display text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-tight group-hover:text-ink/70 transition-colors">
                  {r.title}
                </h3>
                <p className="md:col-span-6 text-base md:text-lg text-ink/55 leading-relaxed self-center">
                  {r.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
