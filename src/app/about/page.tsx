import type { Metadata } from "next";
import Image from "next/image";
import { Approach } from "@/components/sections/Approach";
import { Why } from "@/components/sections/Why";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Lumiere Veritas Media Solutions — a new name, a bigger way of thinking. Strategy, creativity, media & execution.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-bg text-text pt-32 md:pt-40 pb-20 md:pb-28">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
          <Reveal>
            <p className="text-xs tracking-[0.28em] uppercase text-gold mb-4">
              About
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-medium tracking-tight leading-[0.92] max-w-5xl">
              A CREATIVE PARTNER FOR BRANDS THAT WANT TO{" "}
              <span className="text-gold">BE SEEN.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-10 max-w-2xl text-lg text-muted leading-relaxed">
              Lumiere Veritas Media Solutions combines strategy, creativity,
              media, and production into one partnership — luxury creative
              agency, media house, production, and advertising under a single
              practice.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-bg-secondary border-y border-text/5 py-20 md:py-28">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div className="relative aspect-[4/3] bg-bg border border-text/10 flex items-center justify-center p-12">
                <Image
                  src="/brand/logo.png"
                  alt="Lumiere Veritas Media Solutions"
                  width={420}
                  height={280}
                  className="w-full max-w-sm h-auto object-contain"
                />
              </div>
            </Reveal>
            <div>
              <Reveal>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-tight mb-6 text-text">
                  Strategy to execution.
                  <br />
                  Without the handoff gaps.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-muted leading-relaxed mb-4">
                  Most brands juggle specialists. We bring them under one roof —
                  so the idea that wins in the room still wins on the street,
                  the screen, and the feed.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="text-muted leading-relaxed">
                  Built for brands that want cinematic craft, media fluency, and
                  commercial clarity — not generic digital templates.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <About />
      <Approach />
      <Why />
      <Contact />
    </>
  );
}
