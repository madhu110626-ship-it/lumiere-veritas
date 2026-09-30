import { Intro } from "@/components/sections/Intro";
import { Hero } from "@/components/sections/Hero";
import { BrandStatement } from "@/components/sections/BrandStatement";
import { Services } from "@/components/sections/Services";
import { Signature } from "@/components/sections/Signature";
import { Work } from "@/components/sections/Work";
import { Showreel } from "@/components/sections/Showreel";
import { AICreative } from "@/components/sections/AICreative";
import { MediaPR } from "@/components/sections/MediaPR";
import { Advertising } from "@/components/sections/Advertising";
import { Events } from "@/components/sections/Events";
import { Branding } from "@/components/sections/Branding";
import { Approach } from "@/components/sections/Approach";
import { Why } from "@/components/sections/Why";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Intro />
      <Hero />
      <BrandStatement />
      <Services />
      <Signature />
      <Work limit={6} />
      <Showreel />
      <AICreative />
      <MediaPR />
      <Advertising />
      <Events />
      <Branding />
      <Approach />
      <Why />
      <About />
      <Contact />
    </>
  );
}
