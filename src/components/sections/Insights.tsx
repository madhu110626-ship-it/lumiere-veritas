"use client";

import Image from "next/image";
import Link from "next/link";
import { insights } from "@/data/insights";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

export function Insights({ limit = 3 }: { limit?: number }) {
  const list = insights.slice(0, limit);

  return (
    <section id="insights" className="bg-ink text-cream py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <Reveal>
              <p className="text-xs md:text-sm tracking-[0.28em] uppercase text-lime mb-4">
                Editorial
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight">
                THINK. CREATE. SHARE.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <Link
              href="/insights"
              className="text-sm text-cream/60 hover:text-lime transition-colors link-underline"
            >
              All insights →
            </Link>
          </Reveal>
        </div>

        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6" stagger={0.1}>
          {list.map((item) => (
            <StaggerItem key={item.id}>
              <article className="group h-full flex flex-col">
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-5">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-lime mb-3">
                  <span>{item.topic}</span>
                  <span className="text-cream/30">·</span>
                  <span className="text-cream/40">{item.readTime}</span>
                </div>
                <h3 className="font-display text-xl md:text-2xl font-medium leading-snug group-hover:text-lime transition-colors">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-cream/50 leading-relaxed flex-1">
                  {item.excerpt}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
