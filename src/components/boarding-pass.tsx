import Image from "next/image";

import { Reveal } from "@/components/reveal";
import { projectImage } from "@/lib/data";
import type { Project } from "@/types";

/**
 * One project as a boarding pass: everything readable without a click.
 * Body carries name, one-liner, description and tags; the tear-off stub
 * carries the barcode and the links. Stacks (stub below) under md.
 */
export function BoardingPass({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const no = String(index + 1).padStart(2, "0");
  const { github, website } = project.links;

  return (
    <article className="pass-notch hover-lift drop-shadow-paper bg-surface text-ink flex flex-col md:flex-row">
      <div className="paper-grain relative flex min-w-0 flex-1 flex-col p-6 md:p-8">
        <div className="text-ink-faded flex items-baseline justify-between gap-4 font-mono text-[10px] tracking-widest uppercase">
          <span>Boarding pass · №{no}</span>
          <span className="hidden sm:inline">AS ——— ✈ ——— You</span>
        </div>

        <div className="mt-5 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-display text-2xl leading-none font-bold tracking-tight uppercase font-stretch-75% md:text-3xl">
              {project.name}
            </h3>
            <p className="mt-2 text-sm italic md:text-base">{project.title}</p>
          </div>
          <div className="stamp-scallop drop-shadow-paper w-20 shrink-0 -rotate-3 md:w-24">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={projectImage(project.image)}
                alt=""
                fill
                sizes="96px"
                className="object-cover object-top"
              />
            </div>
          </div>
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

      <div className="pass-stub border-rule flex shrink-0 items-center justify-between gap-4 border-t border-dashed px-6 py-4 md:w-44 md:flex-col md:items-stretch md:border-t-0 md:border-l md:p-6">
        <span className="text-ink-faded hidden font-mono text-[10px] tracking-widest uppercase md:block md:[writing-mode:vertical-rl]">
          Shipped · №{no}
        </span>
        <span
          aria-hidden="true"
          className="barcode h-8 w-20 md:h-12 md:w-full"
        />
        <div className="flex gap-4 font-mono text-[11px] font-bold tracking-widest uppercase md:flex-col md:gap-2">
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noreferrer"
              className="text-accent flex min-h-11 items-center hover:underline md:min-h-0"
            >
              Visit site ↗
            </a>
          )}
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="flex min-h-11 items-center hover:underline md:min-h-0"
          >
            Source
          </a>
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
