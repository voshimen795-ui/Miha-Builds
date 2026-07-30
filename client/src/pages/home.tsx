import Hero from "@/components/sections/hero";
import Projects from "@/components/sections/projects";
import Services from "@/components/sections/services";
import CV from "@/components/sections/cv";
import Skills from "@/components/sections/skills";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <Services />
      <CV />
      <Skills />
      <Contact />
      <Footer />
    </>
  );
}
