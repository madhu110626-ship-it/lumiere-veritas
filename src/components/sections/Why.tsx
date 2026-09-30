import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

const points = [
  {
    title: "One partner, full stack",
    description:
      "Strategy, creativity, media, and execution without the handoff gaps between specialists.",
  },
  {
    title: "Editorial craft",
    description:
      "We treat brand work like publishing — clear voice, intentional visuals, disciplined storytelling.",
  },
  {
    title: "Media fluency",
    description:
      "From PR and social to outdoor and film — we think in channels that people actually notice.",
  },
  {
    title: "Production-ready",
    description:
      "Ideas that survive the room and thrive on set, on press, and in the feed.",
  },
  {
    title: "Human + intelligent tools",
    description:
      "AI accelerates production. Taste, judgment, and creative direction stay human.",
  },
] as const;

export function Why() {
  return (
    <section id="why" className="bg-bg-secondary py-24 md:py-32 border-y border-text/5">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
        <Reveal>
          <p className="mb-4 text-xs tracking-[0.28em] uppercase text-gold">
            Why Us
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[0.95] text-text mb-14 md:mb-20">
            WHY LUMIERE
            <br />
            <span className="text-gold">VERITAS?</span>
          </h2>
        </Reveal>

        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-text/10">
          {points.map((point, i) => (
            <StaggerItem
              key={point.title}
              className={`bg-bg-secondary p-8 md:p-10 ${
                i === points.length - 1 ? "lg:col-span-1 md:col-span-2 lg:col-auto" : ""
              }`}
            >
              <span className="block h-px w-10 bg-gold mb-6" />
              <h3 className="font-display text-xl md:text-2xl font-medium text-text mb-3">
                {point.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {point.description}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
