import { Reveal } from "@/components/reveal";
import { Stamp } from "@/components/stamp";
import type { Project } from "@/types";

/** Philatelic sheet: 2 stamps per row on mobile, 3 on desktop. */
export function StampGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-10">
      {projects.map((project, index) => (
        <Reveal key={project.name} index={index % 3}>
          <Stamp project={project} index={index} />
        </Reveal>
      ))}
    </div>
  );
}
