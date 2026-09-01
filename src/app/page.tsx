import Link from "next/link";

import { Hero } from "@/components/hero";
import { StampGrid } from "@/components/stamp-grid";
import { TornEdge } from "@/components/torn-edge";
import { getProjects } from "@/lib/data";

export default async function Home() {
  const projects = await getProjects();

  return (
    <main>
      <Hero />

      <section id="projects" className="bg-ground-sky text-ground-sky">
        <TornEdge />
        <div className="text-ink mx-auto max-w-350 px-5 pt-4 pb-20 md:px-14 md:pb-28">
          <div className="mb-10 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-display text-3xl font-bold tracking-tight uppercase font-stretch-75% md:text-5xl">
              Recent shipments
            </h2>
            <p className="text-ink-faded font-mono text-[11px] tracking-widest uppercase">
              Parcels: 04 of {String(projects.length).padStart(2, "0")}
            </p>
          </div>
          <StampGrid projects={projects.slice(0, 4)} />
          <div className="mt-12 flex justify-center">
            <Link
              href="/projects"
              className="hover-lift border-ink bg-surface text-ink hover:text-accent inline-flex -rotate-1 items-center gap-3 border-2 px-6 py-3 font-mono text-xs font-bold tracking-widest uppercase transition-colors"
            >
              See all {projects.length} — the stamp sheet
              <span aria-hidden="true" className="barcode h-4 w-10" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
