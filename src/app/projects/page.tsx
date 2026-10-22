import type { Metadata } from "next";

import { PassGrid } from "@/components/boarding-pass";
import { SectionHead } from "@/components/section-head";
import { getProjects } from "@/lib/data";

export async function generateMetadata(): Promise<Metadata> {
  const projects = await getProjects();
  return {
    title: "Shipped Work — Ankit Singh",
    description: `${projects.length} shipped projects across web3, AI and developer tools, collected as a stamp sheet.`,
  };
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main data-ground="sky" className="bg-ground-sky">
      <div className="section-band text-ink mx-auto max-w-350 px-5 md:px-14">
        <SectionHead
          as="h1"
          title="Shipped work"
          meta={`${projects.length} stamps on file`}
          className="mb-4"
        />
        <p className="rubber-stamp mb-12 text-[11px]">Entering: shipped work</p>
        <PassGrid projects={projects} />
      </div>
    </main>
  );
}
