"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const montage = [
  {
    src: "/media/hero.jpg",
    alt: "Cinematic production lighting",
  },
  {
    src: "/media/showreel.jpg",
    alt: "Film set atmosphere",
  },
  {
    src: "/media/urban-night.jpg",
    alt: "Urban night media",
  },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden bg-bg noise">
      <div className="absolute inset-0">
        <Image
          src={montage[0].src}
          alt={montage[0].alt}
          fill
          priority
          sizes="100vw"
          className="object-cover ken-burns opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/80 via-transparent to-bg/30" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 md:px-10 lg:px-14 pb-20 md:pb-28 pt-36">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-6 text-[10px] sm:text-xs tracking-[0.32em] uppercase text-gold"
        >
          360° MEDIA · MARKETING · ADVERTISING · CREATIVE
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] font-medium leading-[0.92] tracking-tight text-text max-w-5xl"
        >
          WE CREATE
          <br />
          VISIBILITY.
          <br />
          <span className="text-gold">WE BUILD IMPACT.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.8 }}
          className="mt-8 max-w-xl text-base md:text-lg text-muted leading-relaxed"
        >
          Lumiere Veritas Media Solutions is a creative partner for brands that
          want presence — strategy, creativity, media, and execution under one
          roof.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.7 }}
          className="mt-10 flex flex-wrap items-center gap-4 md:gap-6"
        >
          <Link
            href="#contact"
            className="inline-flex items-center rounded-full bg-gold px-7 py-3.5 text-sm font-medium tracking-wide text-bg hover:bg-highlight transition-colors"
          >
            Start a Project →
          </Link>
          <Link
            href="#services"
            className="inline-flex items-center gap-2 text-sm tracking-wide text-text/80 hover:text-gold transition-colors"
          >
            Explore Our Services
            <span className="text-gold">↓</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
