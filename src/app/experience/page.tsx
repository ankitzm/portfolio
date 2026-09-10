import type { Metadata } from "next";

import { Passport } from "@/components/passport";
import { getExperience, hasPortrait } from "@/lib/data";

export const metadata: Metadata = {
  title: "Passport — Ankit Singh",
  description: "Work history, stamped like visas.",
};

export default async function ExperiencePage() {
  const entries = await getExperience();

  return (
    <main data-ground="navy" className="bg-ground-navy text-paper">
      <div className="mx-auto max-w-350 px-5 pt-14 md:px-14 md:pt-20">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h1 className="font-display text-4xl font-bold tracking-tight uppercase font-stretch-75% md:text-6xl">
            Passport
          </h1>
          <p className="font-mono text-[11px] tracking-widest uppercase opacity-70">
            Republic of shipped software
          </p>
        </div>
      </div>
      <div className="-mt-16 pb-10 md:-mt-24">
        <Passport entries={entries} hasPortrait={hasPortrait()} />
      </div>
    </main>
  );
}
