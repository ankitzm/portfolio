import { Reveal } from "@/components/reveal";
import { Stamp } from "@/components/stamp";
import type { Project } from "@/types";

/** Philatelic sheet: 2 stamps per row on mobile, 3 on desktop. */
export function StampGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-8">
      {projects.map((project, index) => (
        <Reveal key={project.name} index={index % 4}>
          <Stamp project={project} index={index} />
        </Reveal>
      ))}
    </div>
  );
}
