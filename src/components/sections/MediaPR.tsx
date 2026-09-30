"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

const words = ["NEWS", "PR", "MEDIA", "PUBLICITY", "SOCIAL", "INFLUENCE"];

export function MediaPR() {
  return (
    <section className="bg-ink text-cream py-24 md:py-36 overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
        <Reveal>
          <p className="text-xs md:text-sm tracking-[0.28em] uppercase text-lime mb-4">
            Media &amp; PR
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight max-w-4xl leading-[0.95]">
            GET SEEN.
            <br />
            GET TALKED ABOUT.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-8 max-w-xl text-base md:text-lg text-cream/60 leading-relaxed">
            Visibility isn&apos;t accidental. We place brands where audiences
            already look — editorial, social, influencer, and earned media.
          </p>
        </Reveal>

        <div className="mt-16 md:mt-24 flex flex-wrap gap-3 md:gap-5">
          {words.map((word, i) => (
            <Reveal key={word} delay={0.05 * i}>
              <motion.span
                whileHover={{ scale: 1.04, backgroundColor: "#C8FF00", color: "#080808" }}
                className="inline-block font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight border border-cream/20 rounded-full px-6 md:px-10 py-3 md:py-5 cursor-default transition-colors"
              >
                {word}
              </motion.span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
