import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";

export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <Experience />
    </main>
  );
}
