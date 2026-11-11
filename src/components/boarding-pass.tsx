import Image from "next/image";

import { Barcode } from "@/components/barcode";
import { Reveal } from "@/components/reveal";
import type { Project } from "@/types";

/** Stub link: same shape for both, only the accent differs. */
function StubLink({
  href,
  label,
  accent = false,
}: {
  href: string;
  label: string;
  accent?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`tap flex min-h-11 items-center hover:underline md:min-h-0 ${accent ? "text-accent" : ""}`}
    >
      {label}
    </a>
  );
}

/**
 * One project as a boarding pass: everything readable without a click.
 * Body carries name, one-liner, description and tags; the tear-off stub
 * carries the screenshot, the barcode and the links. Stacks (stub below)
 * under md.
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
  // Import the file rather than build a path string, so the stamp gets the
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

      {/* The tear-off stub reads top-to-bottom at every width: screenshot,
          then barcode, then the source/demo links as a footer row. A full
          column on mobile keeps the artwork wide and the links off to one
          side; from md it narrows into the column beside the body. */}
      <div className="pass-stub border-rule flex shrink-0 flex-col gap-4 border-t border-dashed px-6 py-6 md:w-60 md:justify-between md:gap-6 md:border-t-0 md:border-l md:p-6">
        {/* Paper-matte die-cut: perf-edge's 10px padding is the matte ring the
            teeth bite into. The box hugs the screenshot's own ratio (no fixed
            aspect), so there's no letterbox border — only the die-cut edge. */}
        <div className="perf-edge drop-shadow-paper bg-paper w-full">
          <Image
            src={shot}
            alt={`${project.name} stamp illustration`}
            sizes="(min-width: 768px) 224px, 90vw"
            className="h-auto w-full"
          />
        </div>

        <Barcode
          value={`${project.name.toUpperCase()}-${no}`}
          className="text-ink h-10 w-full md:h-12"
        />

        <div className="border-rule flex justify-between gap-3 border-t border-dashed pt-4 font-mono text-[11px] font-bold tracking-widest md:justify-between md:border-t-0 md:pt-0">
          <StubLink href={github} label="source" />
          {website && <StubLink href={website} label="demo" accent />}
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
