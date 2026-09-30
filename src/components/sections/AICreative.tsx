import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

export function AICreative() {
  return (
    <section id="ai" className="bg-bg-secondary py-24 md:py-32 border-y border-text/5">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <Reveal>
              <p className="mb-4 text-xs tracking-[0.28em] uppercase text-gold">
                AI Creative
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[0.95] text-text">
                HUMAN CREATIVITY.
                <br />
                <span className="text-gold">INTELLIGENTLY ACCELERATED.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-8 text-muted leading-relaxed max-w-lg">
                We use AI as a production partner — not a replacement for taste.
                Direction stays human. Craft stays intentional. Speed becomes a
                competitive advantage without the tech-corp noise.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <ul className="mt-8 space-y-3 text-sm text-text/80">
                {[
                  "AI-assisted commercial video",
                  "Motion systems & generative exploration",
                  "Faster iterations, same creative standards",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-px w-6 bg-gold shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="relative aspect-[4/5] md:aspect-[5/4] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1550745165-9bc8b95cd2eb?w=1400&q=80"
              alt="Abstract creative technology atmosphere"
              fill
              sizes="50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/60 to-transparent" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
