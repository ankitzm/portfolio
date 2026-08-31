import { CursorEffects } from "@/components/cursor-effects";
import { Experience } from "@/components/experience";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";

export default function Home() {
  return (
    <>
      <CursorEffects />
      <Header />

      <main className="bg-ground relative z-1">
        <Hero />
        <Projects />
        <Experience />
      </main>

      <Footer />
    </>
  );
}
