import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

export function MediaPR() {
  return (
    <section id="media-pr" className="bg-bg py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal className="relative aspect-[16/11] overflow-hidden order-2 lg:order-1">
            <Image
              src="/media/media-pr.jpg"
              alt="Editorial media atmosphere"
              fill
              sizes="50vw"
              className="object-cover"
            />
          </Reveal>
          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="mb-4 text-xs tracking-[0.22em] uppercase text-gold">
                News Media Publicity, Promotion &amp; PR
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[0.95] text-text">
                GET SEEN.
                <br />
                GET HEARD.
                <br />
                <span className="text-gold">GET REMEMBERED.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-8 text-muted leading-relaxed max-w-lg">
                News media publicity, promotion, and public relations for
                brands that want to enter the cultural conversation — not just
                buy impressions. Editorial outreach, press narrative, and
                promotion with discipline.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
