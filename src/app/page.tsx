import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Services } from "@/components/sections/Services";
import { Work } from "@/components/sections/Work";
import { Showreel } from "@/components/sections/Showreel";
import { AICreative } from "@/components/sections/AICreative";
import { MediaPR } from "@/components/sections/MediaPR";
import { Outdoor } from "@/components/sections/Outdoor";
import { Events } from "@/components/sections/Events";
import { Branding } from "@/components/sections/Branding";
import { Approach } from "@/components/sections/Approach";
import { Why } from "@/components/sections/Why";
import { Clients } from "@/components/sections/Clients";
import { Testimonials } from "@/components/sections/Testimonials";
import { Stats } from "@/components/sections/Stats";
import { About } from "@/components/sections/About";
import { Insights } from "@/components/sections/Insights";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <Services />
      <Work />
      <Showreel />
      <AICreative />
      <MediaPR />
      <Outdoor />
      <Events />
      <Branding />
      <Approach />
      <Why />
      <Clients />
      <Testimonials />
      <Stats />
      <About />
      <Insights />
      <Contact />
    </>
  );
}
