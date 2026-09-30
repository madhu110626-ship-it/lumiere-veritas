"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export function Outdoor() {
  return (
    <section className="bg-cream text-ink py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <Reveal>
              <p className="text-xs md:text-sm tracking-[0.28em] uppercase text-ink/50 mb-4">
                Outdoor
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[0.95]">
                TAKE YOUR BRAND OUT INTO THE WORLD.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 text-base md:text-lg text-ink/60 leading-relaxed max-w-lg">
                Hoardings, billboards, and environmental media that command
                attention at city scale — designed for impact from a distance.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <Link
                href="/services"
                className="mt-10 inline-flex rounded-full bg-ink text-cream px-8 py-4 text-sm font-medium hover:bg-lime hover:text-ink transition-colors"
              >
                EXPLORE OUTDOOR →
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Reveal delay={0.1} className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1542744094-3a31f272c490?w=900&q=80"
                alt="Billboard outdoor advertising placeholder"
                fill
                sizes="30vw"
                className="object-cover"
              />
            </Reveal>
            <Reveal delay={0.2} className="relative aspect-[3/4] rounded-2xl overflow-hidden mt-10">
              <Image
                src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=900&q=80"
                alt="Urban media placement placeholder"
                fill
                sizes="30vw"
                className="object-cover"
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
