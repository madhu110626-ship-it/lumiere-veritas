import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

export function Events() {
  return (
    <section id="events" className="bg-bg py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal className="relative aspect-[16/11] overflow-hidden order-2 lg:order-1">
            <Image
              src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1400&q=80"
              alt="Live event atmosphere"
              fill
              sizes="50vw"
              className="object-cover"
            />
          </Reveal>
          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="mb-4 text-xs tracking-[0.28em] uppercase text-gold">
                Events
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[0.95] text-text">
                MAKE THE
                <br />
                <span className="text-gold">MOMENT MATTER.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-8 text-muted leading-relaxed max-w-lg">
                From concept and spatial storytelling to on-ground creative
                management — experiences designed to leave a lasting impression.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
