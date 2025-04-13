
import { FeaturesSection } from "@/components/landingPage/features";
import { HeroSection } from "@/components/landingPage/hero";
import { HeroParallaxSection } from "@/components/landingPage/hero-parallax-demo";
import { NavbarSection } from "@/components/landingPage/navbar";


export default function Home() {
  return (
<main className="flex flex-col w-full h-auto" >
  <NavbarSection/>
  <HeroSection/>
  <HeroParallaxSection/>
  <FeaturesSection/>
</main>
  );
}
