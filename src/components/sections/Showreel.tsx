"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { showreelFilm } from "@/data/projects";

export function Showreel() {
  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!open) return;
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    void video.play().catch(() => {
      video.muted = true;
      void video.play().catch(() => undefined);
    });
  }, [open]);

  return (
    <section id="showreel" className="relative bg-bg py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
        <div className="relative overflow-hidden rounded-sm min-h-[420px] md:min-h-[560px] flex items-center justify-center">
          <Image
            src="/media/showreel.jpg"
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
            <Reveal delay={0.22}>
              <p className="mt-6 text-[10px] tracking-[0.22em] uppercase text-muted">
                {showreelFilm.title} · AI Creative concept artwork
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-bg/95 backdrop-blur-sm p-4 md:p-8"
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
              className="relative w-full max-w-[420px]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute -top-10 right-0 text-muted hover:text-gold text-sm tracking-wide"
              >
                Close
              </button>
              <div className="relative aspect-[9/16] max-h-[78vh] w-full bg-black border border-gold/30">
                <video
                  ref={videoRef}
                  className="h-full w-full object-contain bg-black"
                  src={showreelFilm.src}
                  poster={showreelFilm.poster}
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  aria-label={`${showreelFilm.title}. AI Creative concept artwork.`}
                />
              </div>
              <p className="mt-4 text-center text-[10px] tracking-[0.28em] uppercase text-gold">
                AI Creative
              </p>
              <p className="mt-1 text-center font-display text-xl text-text">
                {showreelFilm.title}
              </p>
              <p className="mt-1 text-center text-xs text-muted">
                Concept artwork · AI-assisted commercial. Not client work.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
