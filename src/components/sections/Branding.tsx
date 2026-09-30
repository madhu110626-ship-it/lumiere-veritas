"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

const tiles = [
  {
    src: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&q=80",
    label: "Identity",
  },
  {
    src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    label: "Typography",
  },
  {
    src: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80",
    label: "Campaign",
  },
  {
    src: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80",
    label: "Packaging",
  },
  {
    src: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80",
    label: "Digital",
  },
  {
    src: "https://images.unsplash.com/photo-1626785774573-4b7993143460?w=800&q=80",
    label: "Systems",
  },
];

export function Branding() {
  const loop = [...tiles, ...tiles];

  return (
    <section className="bg-cream text-ink py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14 mb-12 md:mb-16">
        <Reveal>
          <p className="text-xs md:text-sm tracking-[0.28em] uppercase text-ink/50 mb-4">
            Branding
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight max-w-4xl leading-[0.95]">
            MAKE YOUR BRAND
            <br />
            RECOGNIZABLE.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-xl text-base md:text-lg text-ink/60">
            Identity systems and visual languages built to be remembered —
            across every touchpoint.
          </p>
        </Reveal>
      </div>

      <div className="relative">
        <div className="branding-track pl-5 md:pl-10">
          {loop.map((tile, i) => (
            <div
              key={`${tile.label}-${i}`}
              className="relative w-[280px] md:w-[360px] aspect-[4/5] rounded-2xl overflow-hidden shrink-0 group"
            >
              <Image
                src={tile.src}
                alt={`PLACEHOLDER — ${tile.label}`}
                fill
                sizes="360px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
              <p className="absolute bottom-5 left-5 font-display text-xl text-cream">
                {tile.label}
                <span className="block text-[10px] tracking-widest uppercase text-lime mt-1">
                  PLACEHOLDER
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
