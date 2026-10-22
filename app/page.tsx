import Nav from "@/components/nav";
import Hero from "@/components/hero";
import Leak from "@/components/leak";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Leak />
      </main>
    </>
  );
}
