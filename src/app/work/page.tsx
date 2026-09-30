import type { Metadata } from "next";
import { Work } from "@/components/sections/Work";
import { Contact } from "@/components/sections/Contact";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work from Lumiere Veritas — campaigns, film, brand, digital & events. Placeholder case studies.",
};

export default function WorkPage() {
  return (
    <>
      <section className="bg-ink text-cream pt-32 md:pt-40 pb-16 md:pb-20">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
          <Reveal>
            <p className="text-xs tracking-[0.28em] uppercase text-lime mb-4">
              Portfolio
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[0.9]">
              SELECTED
              <br />
              WORK
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-cream/55">
              Placeholder projects pending real case studies. Filter by category
              below.
            </p>
          </Reveal>
        </div>
      </section>
      <Work showAllLink={false} />
      <Contact />
    </>
  );
}
