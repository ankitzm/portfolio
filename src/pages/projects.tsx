import { ProjectCard } from "../components/ProjectCard"
import AOS from 'aos';
import 'aos/dist/aos.css';
import projects from "./../data/projects.json"

export default function Projects() {
  AOS.init({
    easing: "ease-in-out-sine",
    delay: 200,
    offset: 150
  });

  return (
    <div className="flex flex-col gap-10 justify-center items-center m-30 min-h-screen w-full">
      <div className="flex justify-center gap-20 my-40 scroll-smooth">

        <div className=" flex flex-col gap-20">
          {projects.slice(0, projects.length / 2).map(project => (
            <ProjectCard name={project.name} animation="fade-right" projectImage={project.image} description={project.description} tags={["frontend", "express"]} />
          ))}
        </div>

        <div className="flex flex-col gap-20">
          {projects.slice(projects.length / 2, projects.length).map(project => (
            <ProjectCard name={project.name} animation="fade-left" projectImage={project.image} description={project.description} tags={["something", "abc"]} />
          ))}
        </div>
      </div>
    </div>
  )
}