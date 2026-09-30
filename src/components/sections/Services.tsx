"use client";

import Image from "next/image";
import { useState } from "react";
import { capabilities } from "@/data/services";
import { Reveal } from "@/components/ui/Reveal";

export function Services() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="bg-bg py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
          <div>
            <Reveal>
              <p className="mb-4 text-xs tracking-[0.28em] uppercase text-gold">
                Capabilities
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[0.95] text-text">
                16 CREATIVE &amp;
                <br />
                MARKETING
                <br />
                <span className="text-gold">CAPABILITIES</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <p className="max-w-sm text-muted text-sm md:text-base leading-relaxed">
              Ten editorial pillars — spanning media, marketing, advertising,
              and creative production.
            </p>
          </Reveal>
        </div>

        {/* Desktop editorial grid */}
        <div className="hidden lg:grid grid-cols-12 gap-0 border-t border-text/10">
          <div className="col-span-5 border-r border-text/10">
            {capabilities.map((cap, i) => (
              <button
                key={cap.id}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`group relative w-full text-left px-6 py-6 border-b border-text/10 transition-colors duration-400 ${
                  active === i ? "bg-bg-secondary" : "hover:bg-bg-secondary/50"
                }`}
              >
                <span
                  className={`absolute left-0 top-0 bottom-0 w-[2px] bg-gold transition-transform duration-500 origin-top ${
                    active === i ? "scale-y-100" : "scale-y-0"
                  }`}
                />
                <div className="flex items-baseline gap-5">
                  <span className="text-xs tracking-[0.2em] text-gold/70 font-medium">
                    {cap.number}
                  </span>
                  <span
                    className={`font-display text-2xl xl:text-3xl font-medium tracking-tight transition-colors ${
                      active === i ? "text-gold" : "text-text"
                    }`}
                  >
                    {cap.title}
                  </span>
                </div>
                <p
                  className={`mt-2 pl-12 text-sm leading-relaxed transition-opacity duration-300 ${
                    active === i ? "opacity-100 text-muted" : "opacity-0"
                  }`}
                >
                  {cap.description}
                </p>
              </button>
            ))}
          </div>
          <div className="col-span-7 relative min-h-[560px]">
            {capabilities.map((cap, i) => (
              <div
                key={cap.id}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  active === i ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <Image
                  src={cap.image}
                  alt={cap.title}
                  fill
                  sizes="55vw"
                  className={`object-cover transition-transform duration-1000 ${
                    active === i ? "scale-105" : "scale-100"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-10">
                  <p className="text-xs tracking-[0.28em] uppercase text-gold mb-2">
                    {cap.number}
                  </p>
                  <p className="font-display text-3xl text-text">{cap.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile / tablet list */}
        <div className="lg:hidden space-y-0 border-t border-text/10">
          {capabilities.map((cap) => (
            <div
              key={cap.id}
              className="group border-b border-text/10 py-8"
            >
              <div className="flex items-baseline gap-4 mb-4">
                <span className="text-xs tracking-[0.2em] text-gold">
                  {cap.number}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-medium text-text">
                  {cap.title}
                </h3>
              </div>
              <p className="text-sm text-muted leading-relaxed mb-5 pl-10">
                {cap.description}
              </p>
              <div className="relative aspect-[16/10] overflow-hidden rounded-sm ml-0 sm:ml-10">
                <Image
                  src={cap.image}
                  alt={cap.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
