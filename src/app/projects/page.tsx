import type { Metadata } from "next";

import { PassGrid } from "@/components/boarding-pass";
import { getProjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Shipped Work — Ankit Singh",
  description: "Twelve shipped projects, collected as a stamp sheet.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main data-ground="sky" className="bg-ground-sky">
      <div className="text-ink mx-auto max-w-350 px-5 py-14 md:px-14 md:py-20">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
          <h1 className="font-display text-4xl font-bold tracking-tight uppercase font-stretch-75% md:text-6xl">
            Shipped work
          </h1>
          <p className="text-ink-faded font-mono text-[11px] tracking-widest uppercase">
            {projects.length} stamps on file
          </p>
        </div>
        <p className="rubber-stamp mb-12 text-[11px]">Entering: shipped work</p>
        <PassGrid projects={projects} />
      </div>
    </main>
  );
}
