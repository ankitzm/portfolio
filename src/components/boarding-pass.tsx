import Image from "next/image";

import { Barcode } from "@/components/barcode";
import { Reveal } from "@/components/reveal";
import type { Project } from "@/types";

/**
 * One project as a boarding pass: everything readable without a click.
 * Body carries name, one-liner, description and tags; the tear-off stub
 * carries the barcode and the links. Stacks (stub below) under md.
 */
export async function BoardingPass({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const no = String(index + 1).padStart(2, "0");
  const { github, website } = project.links;
  // Dynamic import (not projectImage's string path) so the stamp gets the
  // screenshot's real width/height — each one has its own ratio, and only
  // the width is set in CSS, so the stamp takes the shape of the image.
  const { default: shot } = await import(
    `../../public/projects/webp/${project.image}.webp`
  );

  return (
    <article className="pass-notch hover-lift drop-shadow-paper bg-surface text-ink flex flex-col md:flex-row">
      <div className="paper-grain relative flex min-w-0 flex-1 flex-col p-6 md:p-8">
        <div className="text-ink-faded flex items-baseline justify-between gap-4 font-mono text-[10px] tracking-widest uppercase">
          <span>Boarding pass · No. {no}</span>
          <span className="hidden sm:inline">AS ——— ✈ ——— You</span>
        </div>

        <div className="mt-5 min-w-0">
          <h3 className="font-display text-2xl leading-none font-bold tracking-tight uppercase font-stretch-75% md:text-3xl">
            {project.name}
          </h3>
          <p className="mt-2 text-sm italic md:text-base">{project.title}</p>
        </div>

        <p className="text-ink-faded mt-4 line-clamp-3 max-w-prose text-sm leading-relaxed">
          {project.description}
        </p>

        <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
          {project.tags.slice(0, 5).map((tag) => (
            <li
              key={tag}
              className="border-rule border px-1.5 py-0.5 font-mono text-[9px] tracking-wider uppercase"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>

      <div className="pass-stub border-rule flex shrink-0 flex-col justify-between gap-6 border-t border-dashed px-6 py-6 md:w-48 md:border-t-0 md:border-l md:p-6">
        {/* Perforation bitten straight out of the screenshot's own edge: no
            matte, no caption, just the die-cut. */}
        <div className="perf-bare drop-shadow-paper relative aspect-4/3 w-36 self-center md:w-full md:self-auto">
          <Image
            src={shot}
            alt=""
            fill
            sizes="(min-width: 768px) 160px, 144px"
            className="object-cover object-top-left"
          />
        </div>

        <Barcode
          value={`${project.name.toUpperCase()}-${no}`}
          className="text-ink h-10 w-full md:h-12"
        />

        <div className="flex justify-between gap-4 font-mono text-[11px] font-bold tracking-widest md:gap-3">
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="flex min-h-11 items-center hover:underline md:min-h-0"
          >
            source
          </a>
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noreferrer"
              className="text-accent flex min-h-11 items-center hover:underline md:min-h-0"
            >
              demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

/** Two passes per row on large screens, one below. */
export function PassGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
      {projects.map((project, index) => (
        <Reveal key={project.name} index={index % 2}>
          <BoardingPass project={project} index={index} />
        </Reveal>
      ))}
    </div>
  );
}
