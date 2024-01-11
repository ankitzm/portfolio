import { ProjectCard } from "../components/ProjectCard"
import projects from "./../data/projects.json"
import "./../styles/timelineScroll.css"

function Projects() {
  const totalProjects = projects.length

  return (
    <div className="flex justify-center items-center m-30 min-h-screen w-full pattern-bank-note-orange-500/40 pattern-bank-note-scale-150 bg-fixed">

      <div className="columns" id="columns">
        <div className="column column-reverse">
          {projects.slice(0, totalProjects / 2).map((project, index) => (
            <ProjectCard key={index} name={project.name} projectImage={project.image} description={project.description} tags={project.tags} links={project.links} />
          ))}

          {/* edge case(ui issue) - if number of projects are odd */}
          {
            projects.length % 2 && window.innerWidth > 700 ?
              <div className="grid place-items-center rounded-2xl w-80 md:w-96 lg:w-128 h-128 p-2 isolate bg-white/20 backdrop-blur-sm shadow-xl ring-1 ring-black/5 text-2xl lg:text-4xl font-sans font-bold">
                That's all for now !! <br /><br />
                Yup, I am building more, <br />
                check out later : )
              </div> :
              <></>
          }
        </div>
        <div className="column">
          {projects.slice(totalProjects / 2, totalProjects).map((project, index) => (
            <ProjectCard key={index} name={project.name} projectImage={project.image} description={project.description} tags={project.tags} links={project.links} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Projects;