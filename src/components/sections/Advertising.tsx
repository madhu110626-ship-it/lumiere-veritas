import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

export function Advertising() {
  return (
    <section id="advertising" className="bg-bg-secondary py-24 md:py-32 border-y border-text/5">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <Reveal>
              <p className="mb-4 text-xs tracking-[0.28em] uppercase text-gold">
                Advertising
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[0.95] text-text">
                FROM AN IDEA
                <br />
                TO A CAMPAIGN
                <br />
                <span className="text-gold">PEOPLE NOTICE.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-8 text-muted leading-relaxed max-w-lg">
                Big ideas shaped for the channels that matter — digital, outdoor,
                film, and social — with craft that earns a second look.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="relative aspect-[16/11] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1558655146-d09347e92766?w=1400&q=80"
              alt="Creative advertising atmosphere"
              fill
              sizes="50vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
