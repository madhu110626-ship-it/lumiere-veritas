"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { concepts, conceptFilters } from "@/data/projects";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { VideoTile } from "@/components/ui/VideoTile";

type WorkProps = {
  showAllLink?: boolean;
  limit?: number;
};

export function Work({ showAllLink = true, limit }: WorkProps) {
  const [filter, setFilter] = useState<(typeof conceptFilters)[number]>("All");
  const [playingId, setPlayingId] = useState<string | null>(null);

  const items = useMemo(() => {
    const filtered =
      filter === "All"
        ? concepts
        : concepts.filter((c) => c.category === filter);
    return typeof limit === "number" ? filtered.slice(0, limit) : filtered;
  }, [filter, limit]);

  return (
    <section id="work" className="bg-bg py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
          <div>
            <Reveal>
              <p className="mb-4 text-xs tracking-[0.28em] uppercase text-gold">
                Creative Possibilities
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[0.95] text-text">
                CONCEPTS
                <br />
                <span className="text-gold">IN WAITING.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-5 max-w-md text-muted text-sm md:text-base leading-relaxed">
                Placeholder directions — easy to replace with real work as it
                lands. No invented clients or results.
              </p>
            </Reveal>
          </div>
          {showAllLink && (
            <Reveal delay={0.1}>
              <Link
                href="/work"
                className="text-sm tracking-[0.18em] uppercase text-gold hover:text-highlight transition-colors link-underline"
              >
                View all →
              </Link>
            </Reveal>
          )}
        </div>

        <Reveal>
          <div className="flex flex-wrap gap-2 mb-10 md:mb-12">
            {conceptFilters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`px-4 py-2 text-xs tracking-[0.16em] uppercase rounded-full border transition-colors ${
                  filter === f
                    ? "border-gold bg-gold text-bg"
                    : "border-text/20 text-muted hover:border-gold/50 hover:text-gold"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {items.map((item) => (
            <StaggerItem key={item.id}>
              <article className="group relative overflow-hidden bg-bg-secondary">
                <div className="relative aspect-[4/5] overflow-hidden">
                  {item.video ? (
                    <VideoTile
                      src={item.video}
                      poster={item.image}
                      label="AI Creative"
                      title={item.title}
                      minimal
                      onEngage={() => setPlayingId(item.id)}
                    />
                  ) : (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent transition-opacity duration-400 ${
                      playingId === item.id ? "opacity-0" : "opacity-80"
                    }`}
                  />
                  <div
                    className={`pointer-events-none absolute bottom-0 left-0 right-0 p-6 transition-opacity duration-400 ${
                      playingId === item.id ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    <p className="text-[10px] tracking-[0.28em] uppercase text-gold mb-2">
                      {item.category === "AI" ? "AI Creative" : item.category}
                    </p>
                    <h3 className="font-display text-2xl md:text-3xl font-medium text-text">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                      {item.description}
                    </p>
                  </div>
                  <div className="pointer-events-none absolute top-0 left-0 h-[2px] w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
