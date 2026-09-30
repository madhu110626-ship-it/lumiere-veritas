"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, projectFilters } from "@/data/projects";
import { Reveal } from "@/components/ui/Reveal";

export function Work({ showAllLink = true }: { showAllLink?: boolean }) {
  const [filter, setFilter] = useState<string>("All");

  const filtered =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <section id="work" className="bg-cream text-ink py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
          <div>
            <Reveal>
              <p className="text-xs md:text-sm tracking-[0.28em] uppercase text-ink/50 mb-4">
                Portfolio
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight">
                SELECTED WORK
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-4 text-sm text-ink/50">
                Placeholder projects — replace with real case studies.
              </p>
            </Reveal>
          </div>
          {showAllLink && (
            <Reveal delay={0.15}>
              <Link
                href="/work"
                className="text-sm text-ink/60 hover:text-ink transition-colors link-underline"
              >
                View all work →
              </Link>
            </Reveal>
          )}
        </div>

        <Reveal delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-10">
            {projectFilters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`rounded-full px-4 py-2 text-xs md:text-sm tracking-wide transition-colors ${
                  filter === f
                    ? "bg-ink text-cream"
                    : "bg-transparent border border-ink/15 text-ink/60 hover:border-ink/40"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`group relative overflow-hidden rounded-2xl bg-ink ${
                  i % 3 === 0 ? "md:row-span-1 aspect-[4/5]" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                  <div className="flex items-center gap-3 mb-3 text-xs tracking-widest uppercase text-lime">
                    <span>{project.category}</span>
                    <span className="text-cream/40">·</span>
                    <span className="text-cream/50">{project.year}</span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-medium text-cream leading-tight">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-cream/55">{project.client}</p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
