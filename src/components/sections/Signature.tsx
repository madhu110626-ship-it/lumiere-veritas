import { Reveal } from "@/components/ui/Reveal";

export function Signature() {
  return (
    <section className="bg-bg-secondary py-24 md:py-36 border-y border-text/5">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14 text-center">
        <Reveal>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tight leading-[0.95] text-text">
            WE DON&apos;T JUST
            <br />
            MAKE CONTENT.
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-6 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-gold leading-[1.05]">
            WE CREATE BRAND
            <br />
            EXPERIENCES.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
