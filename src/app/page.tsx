
import { ContactSection } from "@/components/landingPage/contact";
import { FeaturesSection } from "@/components/landingPage/features";
import Footer from "@/components/landingPage/footer";
import { HeroSection } from "@/components/landingPage/hero";
import { NavbarSection } from "@/components/landingPage/navbar";
import { TimelineSection } from "@/components/landingPage/time-line";


export default function Home() {
  return (
<main className="flex flex-col w-full h-auto" >
  <NavbarSection/>
  <HeroSection/>
  <TimelineSection/>
  <FeaturesSection/>
  <ContactSection/>
  <Footer/>
</main>
  );
}
