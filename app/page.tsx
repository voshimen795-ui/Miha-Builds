import Nav from "@/components/nav";
import Hero from "@/components/hero";
import Leak from "@/components/sections/leak";
import Calculator from "@/components/sections/calculator";
import Systems from "@/components/sections/systems";
import Process from "@/components/sections/process";
import Tools from "@/components/sections/tools";
import Pricing from "@/components/sections/pricing";
import Trust from "@/components/sections/trust";
import About from "@/components/sections/about";
import Sites from "@/components/sections/sites";
import Faq from "@/components/sections/faq";
import Contact from "@/components/sections/contact";
import Ticker from "@/components/ticker";
import Marquee from "@/components/marquee";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <Leak />
        <Calculator />
        <Marquee />
        <Systems />
        <Process />
        <Tools />
        <Pricing />
        <Trust />
        <About />
        <Sites />
        <Faq />
        <Marquee dark />
        <Contact />
      </main>
    </>
  );
}
