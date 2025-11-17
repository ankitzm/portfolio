import ProjectCard from "../components/ProjectCard";
import ProjectsGrid from "../components/ProjectsGrid";

export default function ProjectsPage() {
  return (
    <main className="relative h-full w-full overflow-y-auto">
      <ProjectsGrid>
        <ProjectCard colSpan={6} />
        <ProjectCard colSpan={4} />
        <ProjectCard colSpan={3} />
        <ProjectCard colSpan={4} />
        <ProjectCard colSpan={3} />
        <ProjectCard colSpan={4} />
        <ProjectCard colSpan={6} />
        <ProjectCard colSpan={3} />
        <ProjectCard colSpan={4} />
        <ProjectCard colSpan={3} />
      </ProjectsGrid>
    </main>
  );
}


