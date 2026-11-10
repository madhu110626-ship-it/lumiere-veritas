import type { Metadata } from "next";
import { IntlForm } from "@/components/international/IntlForm";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "International Clients",
  description:
    "Work with Lumiere Veritas Media Solutions from anywhere in the world. Remote teamwork across time zones, video calls, and pricing in USD, AED, GBP or EUR on request.",
  alternates: { canonical: "/international" },
};

const points = [
  { icon: "🌍", title: "Work with us from anywhere", text: "We work with brands in the US, UK, UAE, Europe, Australia and beyond — fully remote." },
  { icon: "🕒", title: "Across your time zone", text: "We plan calls and updates around your working hours, not ours." },
  { icon: "💱", title: "Pricing in your currency", text: "Quotes in USD, AED, GBP or EUR on request. Pricing depends on the scope of work." },
  { icon: "🎥", title: "Video calls, clear updates", text: "Kick-off and reviews on Zoom, Google Meet or WhatsApp video, with a single point of contact." },
];

const steps = [
  "Register below — it takes two minutes.",
  "We email you within one working day to book a video call.",
  "You get a clear plan and a quote in your currency.",
  "We start work and share progress at times that suit you.",
];

export default function InternationalPage() {
  return (
    <>
      <section className="bg-bg text-text pt-36 md:pt-44 pb-14">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14">
          <Reveal><p className="text-xs tracking-[0.28em] uppercase text-gold mb-4">🌐 For International Clients</p></Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[0.92]">
              WORK WITH US
              <br />
              <span className="text-gold">FROM ANYWHERE.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-8 max-w-2xl text-base md:text-lg text-muted leading-relaxed">
              Lumiere Veritas Media Solutions helps brands outside India get seen — with publicity, social media, video, branding and advertising made by one team in Mumbai. You get world-class work, clear communication and fair pricing.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <a href="#register" className="mt-10 inline-flex items-center rounded-full bg-coral px-7 py-3.5 text-sm font-medium tracking-wide text-white hover:bg-coral-dark transition-colors">
              Register as an international client →
            </a>
          </Reveal>
        </div>
      </section>

      <section className="bg-bg-secondary py-16 md:py-20 border-y border-text/5">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((p) => (
            <div key={p.title} className="bg-bg border border-highlight/40 p-6">
              <p className="text-3xl" aria-hidden>{p.icon}</p>
              <h2 className="mt-4 font-display text-2xl text-text">{p.title}</h2>
              <p className="mt-2 text-sm text-text/70 leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-bg py-16 md:py-20">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-14 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <p className="text-xs tracking-[0.28em] uppercase text-gold mb-4">How it works</p>
            <ol className="space-y-4">
              {steps.map((s, i) => (
                <li key={s} className="flex gap-4 text-text/80">
                  <span className="font-display text-3xl text-gold leading-none">{String(i + 1).padStart(2, "0")}</span>
                  <span className="pt-1 text-sm md:text-base">{s}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-7">
            <p className="text-xs tracking-[0.28em] uppercase text-gold mb-4">What we can do for you</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-text/80">
              {services.map((s) => (
                <li key={s.number} className="flex gap-2"><span className="text-gold">✦</span>{s.title}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="register" className="bg-bg-secondary py-20 md:py-28 border-t border-text/5 scroll-mt-28">
        <div className="mx-auto max-w-4xl px-5 md:px-10">
          <p className="text-xs tracking-[0.28em] uppercase text-gold mb-4">International client registration</p>
          <h2 className="font-display text-4xl sm:text-5xl font-medium leading-tight text-text">
            Tell us about your brand. <span className="text-gold">We&apos;ll take it from there.</span>
          </h2>
          <p className="mt-3 mb-10 text-sm text-text/60">This form is only for clients based outside India. We reply within one working day.</p>
          <IntlForm />
        </div>
      </section>
    </>
  );
}
