"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

const stats = [
  { label: "Campaigns", value: "XX+" },
  { label: "Brands", value: "XX+" },
  { label: "Projects", value: "XX+" },
  { label: "Creative Capabilities", value: "16" },
];

function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (inView) setShown(true);
  }, [inView]);

  return (
    <span
      ref={ref}
      className={`font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight text-lime transition-all duration-700 ${
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {value}
    </span>
  );
}

export function Stats() {
  return (
    <section className="bg-ink text-cream py-24 md:py-32 border-y border-cream/10">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
        <Reveal>
          <p className="text-xs tracking-[0.28em] uppercase text-cream/40 mb-12 text-center">
            By the numbers — PLACEHOLDER figures
          </p>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={0.08 * i} className="text-center">
              <Counter value={s.value} />
              <p className="mt-4 text-sm md:text-base tracking-wide text-cream/50 uppercase">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
