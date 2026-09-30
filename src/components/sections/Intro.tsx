"use client";

import { motion } from "framer-motion";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

const words = ["STRATEGY", "CREATIVITY", "MEDIA", "EXECUTION"];

export function Intro() {
  return (
    <section className="bg-cream text-ink py-24 md:py-36 overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
        <Reveal>
          <p className="text-xs md:text-sm tracking-[0.28em] uppercase text-ink/50 mb-6">
            The Studio
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[0.95] tracking-tight max-w-4xl">
            ONE PARTNER.
            <br />
            <span className="text-ink/40">360° CAPABILITIES.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-2xl text-base md:text-lg text-ink/60 leading-relaxed">
            From the first spark of strategy to the final frame of execution —
            we build the full spectrum of brand presence under one roof.
          </p>
        </Reveal>

        <Stagger className="mt-16 md:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4" stagger={0.12}>
          {words.map((word, i) => (
            <StaggerItem key={word}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="group relative border border-ink/10 rounded-2xl p-8 md:p-10 min-h-[180px] flex flex-col justify-between overflow-hidden hover:bg-ink hover:border-ink transition-colors duration-500"
              >
                <span className="text-xs tracking-[0.2em] text-ink/40 group-hover:text-lime transition-colors">
                  0{i + 1}
                </span>
                <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight group-hover:text-lime transition-colors duration-500">
                  {word}
                </h3>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
