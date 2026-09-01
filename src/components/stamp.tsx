import Image from "next/image";

import { projectHref, projectImage } from "@/lib/data";
import type { Project } from "@/types";

/**
 * One project as a postage stamp. Two alternating variants by index
 * parity: even stamps tilt -1° with the denomination top-right, odd
 * stamps tilt +1° with it bottom-left. The scallop mask lives on an
 * inner div; the anchor carries tilt + silhouette shadow.
 */
export function Stamp({ project, index }: { project: Project; index: number }) {
  const even = index % 2 === 0;
  const denomination = `№${String(index + 1).padStart(2, "0")}`;

  return (
    <a
      href={projectHref(project)}
      target="_blank"
      rel="noreferrer"
      className={`hover-lift drop-shadow-paper group block ${even ? "-rotate-1" : "rotate-1"}`}
    >
      <div className="stamp-scallop">
        <div className="relative aspect-4/3 overflow-hidden">
          <Image
            src={projectImage(project.image)}
            alt={`${project.name} screenshot`}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <span
            className={`bg-surface/90 text-ink absolute px-1.5 py-0.5 font-mono text-[10px] font-bold ${
              even ? "top-1.5 right-1.5" : "bottom-1.5 left-1.5"
            }`}
          >
            {denomination}
          </span>
        </div>
        <div className="flex items-baseline justify-between gap-2 px-1 pt-2 pb-0.5">
          <div className="min-w-0">
            <h3 className="font-display text-ink truncate text-sm font-bold tracking-tight uppercase md:text-base">
              {project.name}
            </h3>
            <p className="text-ink-faded truncate font-mono text-[9px] tracking-wider uppercase md:text-[10px]">
              {project.tags.slice(0, 2).join(" · ")}
            </p>
          </div>
          <span
            aria-hidden="true"
            className="text-accent text-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          >
            ↗
          </span>
        </div>
      </div>
    </a>
  );
}
