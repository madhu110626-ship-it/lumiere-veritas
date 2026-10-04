import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <section id="about" className="bg-bg py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="mb-4 text-xs tracking-[0.28em] uppercase text-gold">
                The Agency
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[0.95] text-text">
                A NEW NAME.
                <br />
                <span className="text-gold">A BIGGER WAY OF THINKING.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-8 text-muted leading-relaxed max-w-xl text-base md:text-lg">
                Lumiere Veritas Media Solutions brings together media house
                ambition, production craft, advertising instinct, and creative
                agency thinking — built for brands that want visibility with
                substance.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="mt-5 text-muted leading-relaxed max-w-xl">
                We don&apos;t claim a decades-long track record. We claim a clear
                way of working: strategy, creativity, media, and execution as
                one continuous practice.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.12} className="lg:col-span-5">
            <div className="relative bg-bg-secondary border border-text/10 aspect-[4/5] flex items-center justify-center p-10">
              <Image
                src="/brand/logo.png"
                alt="Lumiere Veritas Media Solutions"
                width={360}
                height={240}
                className="w-full max-w-xs h-auto object-contain rounded-lg bg-white"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
