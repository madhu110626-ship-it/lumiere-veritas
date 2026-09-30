import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

export function Branding() {
  return (
    <section id="branding" className="bg-bg-secondary py-24 md:py-32 border-y border-text/5">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <Reveal>
              <p className="mb-4 text-xs tracking-[0.28em] uppercase text-gold">
                Branding
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[0.95] text-text">
                GIVE YOUR BRAND
                <br />
                A <span className="text-gold">DISTINCTIVE VOICE.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-8 text-muted leading-relaxed max-w-lg">
                Identity systems, visual language, and content that make a brand
                unmistakable — starting with how we present ourselves.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="relative flex items-center justify-center bg-bg aspect-square md:aspect-[5/4] border border-text/10 p-10 md:p-16">
              <Image
                src="/brand/logo.png"
                alt="Lumiere Veritas Media Solutions — agency identity"
                width={480}
                height={320}
                className="w-full max-w-md h-auto object-contain"
              />
              <p className="absolute bottom-6 left-0 right-0 text-center text-[10px] tracking-[0.28em] uppercase text-muted">
                Agency identity
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
