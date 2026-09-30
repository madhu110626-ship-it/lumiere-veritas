"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

export function Showreel() {
  const [open, setOpen] = useState(false);

  return (
    <section id="showreel" className="relative bg-bg py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
        <div className="relative overflow-hidden rounded-sm min-h-[420px] md:min-h-[560px] flex items-center justify-center">
          <Image
            src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1800&q=80"
            alt="Cinematic showreel atmosphere"
            fill
            sizes="100vw"
            className="object-cover opacity-40 ken-burns-alt"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-bg/30" />

          <div className="relative z-10 text-center px-6">
            <Reveal>
              <p className="mb-4 text-xs tracking-[0.28em] uppercase text-gold">
                Showreel
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-text">
                SEE THE
                <br />
                <span className="text-gold">POSSIBILITIES.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="mt-10 inline-flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-full border border-gold/70 text-gold hover:bg-gold hover:text-bg transition-all duration-400 group"
                aria-label="Play showreel"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-8 w-8 ml-1"
                  aria-hidden
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </Reveal>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-bg/95 backdrop-blur-sm p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              className="relative w-full max-w-3xl aspect-video bg-bg-secondary border border-gold/30 flex flex-col items-center justify-center p-10 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-muted hover:text-gold text-sm tracking-wide"
              >
                Close
              </button>
              <div className="h-16 w-16 rounded-full border border-gold/50 flex items-center justify-center text-gold mb-6">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 ml-0.5">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="font-display text-2xl md:text-3xl text-text mb-3">
                Showreel Coming Soon
              </p>
              <p className="text-sm text-muted max-w-md leading-relaxed">
                An elegant placeholder for the Lumiere Veritas reel. Replace this
                modal with your film when ready.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
