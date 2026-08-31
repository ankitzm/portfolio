import Image from "next/image";

import { getProjects, projectHref, projectImage } from "@/lib/data";
import type { Project } from "@/types";

function ProjectItem({ project }: { project: Project }) {
  const image = projectImage(project.image);
  // `tags` is the only real taxonomy in the data, so the mono column is
  // derived from it rather than invented.
  const [lead, rest] = [
    project.tags.slice(0, 2).join(" · "),
    project.tags.slice(2).join(" / "),
  ];

  return (
    <li className="reveal border-ink/15 border-t">
      <a
        href={projectHref(project)}
        target="_blank"
        rel="noreferrer"
        data-preview={image}
        className="group ease-expo md:hover:bg-ink md:hover:text-ground block px-5 py-7 transition-[padding-left,background-color] duration-300 md:grid md:grid-cols-[1fr_320px_56px] md:gap-6 md:px-14 md:py-9 md:hover:pl-20"
      >
        <div>
          <span className="text-3xl font-extrabold tracking-tight md:text-[clamp(32px,3vw,44px)]">
            {project.name}
            <span className="ease-expo ml-3 hidden translate-y-2 text-2xl opacity-0 transition-[translate,opacity] duration-300 md:inline-block md:group-hover:translate-y-0 md:group-hover:opacity-100">
              ↗
            </span>
          </span>
          <span className="reveal-clip relative mt-4 block h-48 md:hidden">
            <Image
              src={image}
              alt={`${project.name} screenshot`}
              fill
              sizes="100vw"
              className="object-cover object-top"
            />
          </span>
          <span className="text-mute md:group-hover:text-ground/70 mt-3 block max-w-md text-sm leading-relaxed transition-colors duration-300">
            {project.title}
          </span>
        </div>
        <span className="text-mute md:group-hover:text-ground/70 mt-3 block pt-2 font-mono text-[11px] leading-relaxed uppercase transition-colors duration-300 md:mt-0">
          {lead}
          {rest && (
            <>
              <br />
              {rest}
            </>
          )}
        </span>
        <span className="text-faint md:group-hover:text-ground/60 hidden pt-2 text-right font-mono text-xs transition-colors duration-300 md:block">
          ↗
        </span>
      </a>
    </li>
  );
}

export async function Projects() {
  const projects = await getProjects();

  return (
    <section id="projects" className="scroll-mt-16">
      <div className="flex items-end justify-between px-5 pb-6 md:px-14">
        <div className="overflow-hidden">
          <h2 className="reveal-mask text-[clamp(32px,4.5vw,56px)] leading-none font-black tracking-tight uppercase">
            Selected work
          </h2>
        </div>
        <a
          href="https://github.com/ankitzm"
          target="_blank"
          rel="noreferrer"
          className="text-mute hover:border-ink hover:text-ink border-b border-transparent font-mono text-[11px] whitespace-nowrap transition-colors"
        >
          MORE ON GITHUB ↗
        </a>
      </div>
      <ul className="border-ink/15 border-b">
        {projects.map((project) => (
          <ProjectItem key={project.name} project={project} />
        ))}
      </ul>
    </section>
  );
}
