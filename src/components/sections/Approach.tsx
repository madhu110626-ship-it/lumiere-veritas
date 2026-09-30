import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "Listen deeply — brand, audience, ambition, and the constraints that shape good work.",
  },
  {
    number: "02",
    title: "Strategize",
    description:
      "Define the idea, the channels, and the narrative architecture before a pixel moves.",
  },
  {
    number: "03",
    title: "Create",
    description:
      "Craft across film, design, copy, space, and media — with editorial discipline.",
  },
  {
    number: "04",
    title: "Amplify",
    description:
      "Push presence into the world — PR, paid, organic, outdoor, and live experiences.",
  },
] as const;

export function Approach() {
  return (
    <section id="approach" className="bg-bg py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
        <Reveal>
          <p className="mb-4 text-xs tracking-[0.28em] uppercase text-gold">
            Approach
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[0.95] text-text mb-14 md:mb-20">
            FROM IDEA
            <br />
            <span className="text-gold">TO IMPACT.</span>
          </h2>
        </Reveal>

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step, i) => (
            <StaggerItem key={step.number}>
              <div className="relative h-full border-t border-gold/40 pt-8">
                <span className="text-xs tracking-[0.28em] text-gold">
                  {step.number}
                </span>
                <h3 className="mt-4 font-display text-2xl md:text-3xl font-medium text-text">
                  {step.title}
                </h3>
                <p className="mt-4 text-sm text-muted leading-relaxed">
                  {step.description}
                </p>
                {i < steps.length - 1 && (
                  <span
                    className="hidden lg:block absolute top-0 right-0 w-8 h-px bg-gold/30 translate-x-full"
                    aria-hidden
                  />
                )}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
