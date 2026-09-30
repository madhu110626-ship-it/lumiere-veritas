"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <section id="about" className="bg-cream text-ink py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden order-2 lg:order-1">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80"
              alt="Creative team collaboration placeholder"
              fill
              sizes="50vw"
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-ink/80 to-transparent">
              <p className="text-xs tracking-widest uppercase text-lime">
                PLACEHOLDER — Studio imagery
              </p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="text-xs md:text-sm tracking-[0.28em] uppercase text-ink/50 mb-4">
                About
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[0.95]">
                WE&apos;RE A CREATIVE PARTNER BUILT AROUND YOUR BRAND.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-8 text-base md:text-lg text-ink/60 leading-relaxed">
                Lumiere Veritas Media Solutions exists for brands that refuse to
                blend in. We combine strategy, creativity, media, and production
                into one partnership — so every touchpoint feels intentional,
                cinematic, and commercially sharp.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="mt-4 text-base md:text-lg text-ink/60 leading-relaxed">
                Whether you need a campaign, a film, an outdoor takeover, or a
                full brand system — we build presence that earns attention.
              </p>
            </Reveal>
            <Reveal delay={0.32}>
              <Link
                href="/about"
                className="mt-10 inline-flex rounded-full border border-ink/20 px-8 py-4 text-sm font-medium hover:bg-ink hover:text-cream transition-colors"
              >
                MORE ABOUT US →
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
