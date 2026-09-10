import Link from "next/link";

import { BookingLazy } from "@/components/booking-lazy";
import { Passport } from "@/components/passport";
import { Hero } from "@/components/hero";
import { PassGrid } from "@/components/boarding-pass";
import { TornEdge } from "@/components/torn-edge";
import { getExperience, getProjects, hasPortrait } from "@/lib/data";

export default async function Home() {
  const [projects, experience] = await Promise.all([
    getProjects(),
    getExperience(),
  ]);
  const portrait = hasPortrait();

  return (
    <main data-ground="paper">
      <Hero hasPortrait={portrait} />

      <section
        id="projects"
        data-ground="sky"
        className="bg-ground-sky text-ground-sky relative"
      >
        <TornEdge />
        <div className="text-ink mx-auto max-w-350 px-5 pt-20 pb-20 md:px-14 md:pt-28 md:pb-28">
          <div className="mb-10 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-display text-3xl font-bold tracking-tight uppercase font-stretch-75% md:text-5xl">
              Recent shipments
            </h2>
            <p className="text-ink-faded font-mono text-[11px] tracking-widest uppercase">
              Parcels: 04 of {String(projects.length).padStart(2, "0")}
            </p>
          </div>
          <PassGrid projects={projects.slice(0, 4)} />
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

      <section
        id="experience"
        data-ground="navy"
        className="bg-ground-navy text-ground-navy relative"
      >
        <TornEdge />
        <div className="text-paper mx-auto max-w-350 px-5 pt-20 md:px-14 md:pt-28">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-display text-3xl font-bold tracking-tight uppercase font-stretch-75% md:text-5xl">
              Transit log
            </h2>
            <Link
              href="/experience"
              className="text-paper/70 hover:text-paper font-mono text-[11px] tracking-widest uppercase transition-colors"
            >
              Full passport →
            </Link>
          </div>
        </div>
        <div className="text-paper -mt-16 pb-10 md:-mt-24">
          <Passport
            entries={experience.slice(0, 3)}
            hasPortrait={portrait}
            home
          />
        </div>
      </section>

      <section
        id="booking"
        data-ground="kraft"
        className="bg-ground-kraft text-ground-kraft relative"
      >
        <TornEdge />
        <div className="text-ink mx-auto max-w-350 px-5 pt-24 pb-24 md:px-14 md:pt-32 md:pb-32">
          <div className="mb-10 text-center">
            <p className="rubber-stamp mb-6 text-[11px]">Final destination</p>
            <h2 className="font-display text-3xl font-bold tracking-tight uppercase font-stretch-75% md:text-5xl">
              Send something back
            </h2>
            <p className="text-ink/70 mx-auto mt-3 max-w-md text-sm leading-relaxed">
              Available for new projects. Tear the stub, pick a slot, and
              let&apos;s talk shipping.
            </p>
          </div>
          <BookingLazy />
        </div>
      </section>
    </main>
  );
}
