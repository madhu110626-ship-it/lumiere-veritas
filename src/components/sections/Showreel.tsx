"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

export function Showreel() {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative bg-ink text-cream py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1485846234645-a62644f84781?w=1800&q=80"
          alt="Showreel placeholder"
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-ink/70" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14 text-center">
        <Reveal>
          <p className="text-xs tracking-[0.3em] uppercase text-lime mb-6">
            Showreel
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight mb-10">
            WATCH HOW WE
            <br />
            MAKE IT MOVE.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group relative mx-auto flex h-28 w-28 md:h-36 md:w-36 items-center justify-center rounded-full border border-cream/30 hover:border-lime hover:bg-lime transition-all duration-500"
            aria-label="Play showreel"
          >
            <span className="ml-1 h-0 w-0 border-y-[12px] border-y-transparent border-l-[20px] border-l-cream group-hover:border-l-ink transition-colors" />
          </button>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="mt-8 text-sm text-cream/40">
            PLACEHOLDER — Showreel video coming soon
          </p>
        </Reveal>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4 md:p-10"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="relative w-full max-w-5xl aspect-video bg-ink-muted rounded-xl overflow-hidden border border-cream/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
                <p className="font-display text-2xl md:text-3xl text-cream">
                  Showreel Placeholder
                </p>
                <p className="text-cream/50 text-sm max-w-md">
                  Video not yet uploaded. Replace this modal with your showreel
                  embed or MP4 source when ready.
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mt-4 rounded-full border border-cream/30 px-6 py-2.5 text-sm hover:border-lime hover:text-lime transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 text-cream/70 hover:text-lime text-sm tracking-widest uppercase"
            >
              Close ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
