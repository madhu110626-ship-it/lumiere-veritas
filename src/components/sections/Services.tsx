"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { services } from "@/data/services";
import { Reveal } from "@/components/ui/Reveal";
import Link from "next/link";

export function Services({ limit }: { limit?: number }) {
  const [active, setActive] = useState(0);
  const list = limit ? services.slice(0, limit) : services;
  const current = list[active] ?? list[0];

  return (
    <section id="services" className="bg-ink text-cream py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <Reveal>
              <p className="text-xs md:text-sm tracking-[0.28em] uppercase text-lime mb-4">
                Capabilities
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight">
                WHAT WE DO
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <Link
              href="/services"
              className="text-sm text-cream/60 hover:text-lime transition-colors link-underline"
            >
              View all services →
            </Link>
          </Reveal>
        </div>

        {/* Desktop: signature hover interaction */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 min-h-[70vh]">
          <div className="lg:col-span-7 flex flex-col border-t border-cream/15">
            {list.map((service, i) => (
              <button
                key={service.id}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`service-row group flex items-center gap-6 border-b border-cream/15 px-4 py-5 text-left transition-all duration-350 ${
                  active === i ? "bg-lime text-ink" : "text-cream"
                }`}
              >
                <span
                  className={`font-display text-sm tracking-widest shrink-0 ${
                    active === i ? "text-ink/50" : "text-cream/40"
                  }`}
                >
                  {service.number}
                </span>
                <span className="font-display text-xl xl:text-2xl font-medium tracking-tight leading-tight">
                  {service.title}
                </span>
              </button>
            ))}
          </div>

          <div className="lg:col-span-5 relative sticky top-28 h-[min(70vh,640px)] rounded-2xl overflow-hidden bg-ink-muted">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={current.image}
                  alt={current.title}
                  fill
                  sizes="40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-lime text-xs tracking-[0.25em] uppercase mb-2">
                    {current.number}
                  </p>
                  <p className="font-display text-2xl font-medium leading-snug mb-3">
                    {current.title}
                  </p>
                  <p className="text-cream/70 text-sm leading-relaxed max-w-sm">
                    {current.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile / tablet: stacked list */}
        <div className="lg:hidden space-y-0 border-t border-cream/15">
          {list.map((service) => (
            <div
              key={service.id}
              className="border-b border-cream/15 py-6"
            >
              <div className="flex gap-4 mb-4">
                <span className="text-lime text-sm font-display tracking-widest">
                  {service.number}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-medium leading-snug">
                  {service.title}
                </h3>
              </div>
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <p className="text-cream/60 text-sm leading-relaxed pl-10">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
