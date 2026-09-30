"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const slides = [
  {
    src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1800&q=80",
    alt: "Cinematic production lighting",
  },
  {
    src: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1800&q=80",
    alt: "Creative design workspace",
  },
  {
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1800&q=80",
    alt: "Live event atmosphere",
  },
];

export function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-ink noise">
      {/* Background montage */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-3">
          {slides.map((slide, i) => (
            <div
              key={slide.src}
              className={`relative overflow-hidden ${i === 0 ? "block" : "hidden md:block"}`}
            >
              <div
                className={`absolute inset-0 ${i % 2 === 0 ? "ken-burns" : "ken-burns-alt"}`}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover opacity-40"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/50 to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-ink/60" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-end px-5 md:px-10 lg:px-14 pb-16 md:pb-24 pt-32">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-6 text-xs md:text-sm tracking-[0.35em] uppercase text-lime font-medium"
        >
          Creative Media · Production · Brand Experiences
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(2.75rem,9vw,7.5rem)] font-medium leading-[0.9] tracking-tight text-cream max-w-5xl"
        >
          WE MAKE BRANDS
          <br />
          <span className="text-lime">IMPOSSIBLE</span> TO IGNORE.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-8 max-w-xl text-base md:text-lg text-cream/70 leading-relaxed"
        >
          Lumiere Veritas is a creative partner for brands that demand presence —
          across media, production, digital, outdoor, and live experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link
            href="#contact"
            className="rounded-full bg-lime px-8 py-4 text-sm md:text-base font-medium text-ink hover:bg-cream transition-colors"
          >
            START A PROJECT
          </Link>
          <Link
            href="#work"
            className="rounded-full border border-cream/40 px-8 py-4 text-sm md:text-base font-medium text-cream hover:border-lime hover:text-lime transition-colors"
          >
            VIEW OUR WORK
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-8 right-5 md:right-10 lg:right-14 hidden sm:flex flex-col items-end gap-2"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-cream/40">
            Scroll
          </span>
          <div className="h-12 w-px bg-gradient-to-b from-lime to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
