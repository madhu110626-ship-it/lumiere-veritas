import { Reveal } from "@/components/ui/Reveal";
import { VideoTile } from "@/components/ui/VideoTile";
import { aiCreativeFilms } from "@/data/projects";

export function AICreative() {
  return (
    <section id="ai" className="bg-bg-secondary py-24 md:py-32 border-y border-text/5">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
        <div className="max-w-3xl">
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

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {aiCreativeFilms.map((film) => (
            <Reveal key={film.id}>
              <article>
                <div className="relative aspect-[3/4] overflow-hidden bg-bg border border-text/10">
                  <VideoTile
                    src={film.src}
                    poster={film.poster}
                    label="AI Creative"
                    title={film.title}
                    minimal
                  />
                </div>
                <p className="mt-3 text-[10px] tracking-[0.28em] uppercase text-gold">
                  AI Creative
                </p>
                <h3 className="mt-1 font-display text-xl md:text-2xl text-text">
                  {film.title}
                </h3>
                <p className="mt-1 text-xs text-muted">
                  Concept artwork · AI-assisted commercial
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
