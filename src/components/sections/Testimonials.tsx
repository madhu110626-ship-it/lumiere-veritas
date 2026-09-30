"use client";

import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

const quotes = [
  {
    quote:
      "PLACEHOLDER — Working with Lumiere Veritas transformed how our brand shows up. Insert real testimonial when available.",
    name: "Client Name",
    role: "Title, Company",
  },
  {
    quote:
      "PLACEHOLDER — Their creative and media thinking under one roof made every campaign feel coherent and bold.",
    name: "Client Name",
    role: "Title, Company",
  },
  {
    quote:
      "PLACEHOLDER — From concept to execution, the partnership felt editorial, precise, and commercially sharp.",
    name: "Client Name",
    role: "Title, Company",
  },
];

export function Testimonials() {
  return (
    <section className="bg-cream text-ink py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
        <Reveal>
          <p className="text-xs md:text-sm tracking-[0.28em] uppercase text-ink/50 mb-4">
            Voices
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight mb-14 md:mb-20">
            WHAT THEY SAY
          </h2>
        </Reveal>

        <Stagger className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10" stagger={0.12}>
          {quotes.map((q) => (
            <StaggerItem key={q.quote.slice(0, 30)}>
              <blockquote className="h-full flex flex-col justify-between border-t border-ink/15 pt-8">
                <p className="font-display text-xl md:text-2xl font-medium leading-snug tracking-tight">
                  &ldquo;{q.quote}&rdquo;
                </p>
                <footer className="mt-10">
                  <p className="text-sm font-medium">{q.name}</p>
                  <p className="text-xs text-ink/45 mt-1">{q.role}</p>
                </footer>
              </blockquote>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
