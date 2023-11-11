import { ProjectCard } from "../components/ProjectCard"
import projects from "./../data/projects.json"
import "./../styles/timelineScroll.css"

function Projects() {
  const totalProjects = projects.length

  return (
    <div className="flex justify-center items-center m-30 min-h-screen w-full">

      <div className="columns" id="columns">
        <div className="column column-reverse">
          {projects.slice(0, totalProjects / 2).map(project => (
            <ProjectCard name={project.name} projectImage={project.image} description={project.description} tags={["frontend", "express"]} key={project.name} />
          ))}
        </div>
        <div className="column">
          {projects.slice(totalProjects / 2, totalProjects).map(project => (
            <ProjectCard name={project.name} projectImage={project.image} description={project.description} tags={["frontend", "express"]} key={project.name} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Projects;