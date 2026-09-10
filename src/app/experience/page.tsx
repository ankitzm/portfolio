import type { Metadata } from "next";

import { ExperienceLog } from "@/components/experience-log";
import { getExperience } from "@/lib/data";

export const metadata: Metadata = {
  title: "Passport — Ankit Singh",
  description: "Work history, stamped like visas.",
};

const idFields = [
  ["1. Forename", "Ankit"],
  ["2. Surname", "Singh"],
  ["3. Trade", "Software developer"],
  ["4. Issued", "2021 · valid indefinitely"],
] as const;

export default async function ExperiencePage() {
  const entries = await getExperience();

  return (
    <main data-ground="navy" className="bg-ground-navy text-paper">
      <div className="mx-auto max-w-350 px-5 py-14 md:px-14 md:py-20">
        <div className="mb-10 flex flex-wrap items-baseline justify-between gap-2">
          <h1 className="font-display text-4xl font-bold tracking-tight uppercase font-stretch-75% md:text-6xl">
            Passport
          </h1>
          <p className="font-mono text-[11px] tracking-widest uppercase opacity-70">
            Republic of shipped software
          </p>
        </div>

        <div className="border-visa-paper/40 relative mb-14 max-w-xl border-2 p-5 md:p-6">
          <dl className="space-y-2 font-mono text-xs tracking-wider uppercase">
            {idFields.map(([label, value]) => (
              <div
                key={label}
                className="border-visa-paper/25 flex justify-between gap-4 border-b border-dotted pb-1.5"
              >
                <dt className="opacity-70">{label}</dt>
                <dd className="font-bold">{value}</dd>
              </div>
            ))}
          </dl>
          <span className="border-accent text-accent absolute -top-3 right-3 inline-block rotate-6 rounded border-2 px-2 py-1 font-mono text-[10px] font-bold tracking-widest uppercase mix-blend-screen">
            Certified · full-stack
          </span>
        </div>

        <ExperienceLog entries={entries} />
      </div>
    </main>
  );
}
