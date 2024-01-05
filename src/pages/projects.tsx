import { ProjectCard } from "../components/ProjectCard"
import projects from "./../data/projects.json"
import "./../styles/timelineScroll.css"

function Projects() {
  const totalProjects = projects.length

  return (
    <div className="flex justify-center items-center m-30 min-h-screen w-full pattern-texture-orange-600/90 pattern-texture-scale-120 bg-fixed">

      <div className="columns" id="columns">
        <div className="column column-reverse">
          {projects.slice(0, totalProjects / 2).map((project, index) => (
            <ProjectCard key={index} name={project.name} projectImage={project.image} description={project.description} tags={project.tag} links={project.links} />
          ))}
        </div>
        <div className="column">
          {projects.slice(totalProjects / 2, totalProjects).map((project, index) => (
            <ProjectCard key={index} name={project.name} projectImage={project.image} description={project.description} tags={project.tag} links={project.links} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Projects;