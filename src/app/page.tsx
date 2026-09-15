import Link from "next/link";

import { BookingLazy } from "@/components/booking-lazy";
import { Passport } from "@/components/passport";
import { Hero } from "@/components/hero";
import { PassGrid } from "@/components/boarding-pass";
import { SectionHead } from "@/components/section-head";
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
        <div className="section-band text-ink mx-auto max-w-350 px-5 md:px-14">
          <SectionHead
            title="Recent shipments"
            meta={`Parcels: 04 of ${String(projects.length).padStart(2, "0")}`}
            className="mb-10"
          />
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
        <div className="text-paper mx-auto max-w-350 px-5 pt-[clamp(4.5rem,9vw,8.5rem)] md:px-14">
          <SectionHead
            title="Transit log"
            meta={
              <Link
                href="/experience"
                className="hover:text-paper transition-colors"
              >
                Full passport →
              </Link>
            }
          />
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
        <div className="section-band text-ink mx-auto max-w-350 px-5 md:px-14">
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
