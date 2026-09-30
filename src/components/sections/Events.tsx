"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

export function Events() {
  return (
    <section className="relative bg-ink text-cream py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1800&q=80"
          alt="Event experience placeholder"
          fill
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/50" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
        <Reveal>
          <p className="text-xs md:text-sm tracking-[0.28em] uppercase text-lime mb-4">
            Events &amp; Experiences
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight max-w-4xl leading-[0.95]">
            DON&apos;T JUST HOST AN EVENT.
            <br />
            <span className="text-lime">CREATE AN EXPERIENCE.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-8 max-w-xl text-base md:text-lg text-cream/65 leading-relaxed">
            Spatial storytelling, creative direction, and on-ground orchestration —
            from intimate launches to large-scale brand spectacles.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-12 flex flex-wrap gap-4 text-sm text-cream/50">
            {["Concept", "Design", "Production", "Management"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-cream/20 px-5 py-2"
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
