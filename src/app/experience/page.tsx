import type { Metadata } from "next";

import { Passport } from "@/components/passport";
import { SectionHead } from "@/components/section-head";
import { getExperience, hasPortrait } from "@/lib/data";

export const metadata: Metadata = {
  title: "Passport — Ankit Singh",
  description: "Work history, stamped like visas.",
};

export default async function ExperiencePage() {
  const entries = await getExperience();

  return (
    <main data-ground="navy" className="bg-ground-navy text-paper">
      <div className="mx-auto max-w-350 px-5 pt-[clamp(4.5rem,9vw,8.5rem)] md:px-14">
        <SectionHead
          as="h1"
          title="Passport"
          meta="Republic of shipped software"
        />
      </div>
      <div className="-mt-16 pb-10 md:-mt-24">
        <Passport entries={entries} hasPortrait={hasPortrait()} />
      </div>
    </main>
  );
}
