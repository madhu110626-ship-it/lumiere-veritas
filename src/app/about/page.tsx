import type { Metadata } from "next";
import Image from "next/image";
import { Approach } from "@/components/sections/Approach";
import { Why } from "@/components/sections/Why";
import { Clients } from "@/components/sections/Clients";
import { Stats } from "@/components/sections/Stats";
import { Contact } from "@/components/sections/Contact";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Lumiere Veritas Media Solutions — a creative partner built around your brand.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-ink text-cream pt-32 md:pt-40 pb-20 md:pb-28">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
          <Reveal>
            <p className="text-xs tracking-[0.28em] uppercase text-lime mb-4">
              About
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-medium tracking-tight leading-[0.92] max-w-5xl">
              WE&apos;RE A CREATIVE PARTNER BUILT AROUND YOUR BRAND.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-10 max-w-2xl text-lg text-cream/60 leading-relaxed">
              Lumiere Veritas Media Solutions combines strategy, creativity,
              media, and production into one partnership. We exist for brands
              that refuse to blend in — and demand presence that earns attention.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream text-ink py-20 md:py-28">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80"
                alt="Studio collaboration placeholder"
                fill
                sizes="50vw"
                className="object-cover"
              />
            </Reveal>
            <div>
              <Reveal>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-tight mb-6">
                  Strategy to execution.
                  <br />
                  Without the handoff gaps.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-ink/60 leading-relaxed mb-4">
                  Most brands juggle specialists. We bring them under one roof —
                  so the idea that wins in the room still wins on the street,
                  the screen, and the feed.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="text-ink/60 leading-relaxed">
                  Based in India, working with brands that want cinematic craft,
                  media fluency, and commercial clarity — not generic digital
                  templates.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <Approach />
      <Why />
      <Stats />
      <Clients />
      <Contact />
    </>
  );
}
