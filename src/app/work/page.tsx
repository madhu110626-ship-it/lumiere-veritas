import type { Metadata } from "next";
import { Work } from "@/components/sections/Work";
import { Contact } from "@/components/sections/Contact";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Creative possibilities from Lumiere Veritas — concept placeholders for campaigns, film, brand, social, outdoor, events & AI.",
};

export default function WorkPage() {
  return (
    <>
      <section className="bg-bg text-text pt-32 md:pt-40 pb-12 md:pb-16">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
          <Reveal>
            <p className="text-xs tracking-[0.28em] uppercase text-gold mb-4">
              Creative Possibilities
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[0.9]">
              CONCEPTS
              <br />
              <span className="text-gold">IN WAITING.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-muted">
              Placeholder directions ready to be replaced with real case studies.
              No invented clients or results.
            </p>
          </Reveal>
        </div>
      </section>
      <Work showAllLink={false} />
      <Contact />
    </>
  );
}
