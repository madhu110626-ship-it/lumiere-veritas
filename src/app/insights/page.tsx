import type { Metadata } from "next";
import Image from "next/image";
import { insights } from "@/data/insights";
import { Contact } from "@/components/sections/Contact";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Think. Create. Share. Editorial perspectives from Lumiere Veritas.",
};

export default function InsightsPage() {
  return (
    <>
      <section className="bg-ink text-cream pt-32 md:pt-40 pb-16 md:pb-20">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
          <Reveal>
            <p className="text-xs tracking-[0.28em] uppercase text-lime mb-4">
              Editorial
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[0.9]">
              THINK.
              <br />
              CREATE.
              <br />
              SHARE.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-cream/55">
              Placeholder topics — replace with published articles when ready.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream text-ink py-16 md:py-24">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {insights.map((item, i) => (
              <Reveal key={item.id} delay={0.06 * i}>
                <article className="group">
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-ink/40 mb-3">
                    <span className="text-ink">{item.topic}</span>
                    <span>·</span>
                    <span>{item.readTime}</span>
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-medium leading-snug group-hover:opacity-70 transition-opacity">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-ink/55 leading-relaxed">
                    {item.excerpt}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
}
