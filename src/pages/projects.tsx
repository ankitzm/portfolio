import { ProjectCard } from "../components/ProjectCard"
import nameIt from "./../assets/projects/open-funds.png"

export default function Projects() {
  return (
    <div className="flex flex-ProjectCardl gap-10 justify-center items-center border-2 border-blue-400 min-h-screen w-full overflow-hidden">
      projects


      <div className="w-full bg-slate-700">

        <div className="grid grid-flow-col gap-4 overflow-x-scroll pl-60 pb-6">
          <ProjectCard name="project" projectImage={nameIt} description="Lorem ipsum dolor sit amet, ProjectCardnsectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil." tags={["a", "b"]} />
          <ProjectCard name="project" projectImage={nameIt} description="Lorem ipsum dolor sit amet, ProjectCardnsectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil." tags={["a", "b"]} />
          <ProjectCard name="project" projectImage={nameIt} description="Lorem ipsum dolor sit amet, ProjectCardnsectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil." tags={["a", "b"]} />
          <ProjectCard name="project" projectImage={nameIt} description="Lorem ipsum dolor sit amet, ProjectCardnsectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil." tags={["a", "b"]} />
          <ProjectCard name="project" projectImage={nameIt} description="Lorem ipsum dolor sit amet, ProjectCardnsectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil." tags={["a", "b"]} />
          <ProjectCard name="project" projectImage={nameIt} description="Lorem ipsum dolor sit amet, ProjectCardnsectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil." tags={["a", "b"]} />
          <ProjectCard name="project" projectImage={nameIt} description="Lorem ipsum dolor sit amet, ProjectCardnsectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil." tags={["a", "b"]} />
          <ProjectCard name="project" projectImage={nameIt} description="Lorem ipsum dolor sit amet, ProjectCardnsectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil." tags={["a", "b"]} />
          <ProjectCard name="project" projectImage={nameIt} description="Lorem ipsum dolor sit amet, ProjectCardnsectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil." tags={["a", "b"]} />
          <ProjectCard name="project" projectImage={nameIt} description="Lorem ipsum dolor sit amet, ProjectCardnsectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil." tags={["a", "b"]} />
          <ProjectCard name="project" projectImage={nameIt} description="Lorem ipsum dolor sit amet, ProjectCardnsectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil." tags={["a", "b"]} />
          <ProjectCard name="project" projectImage={nameIt} description="Lorem ipsum dolor sit amet, ProjectCardnsectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil." tags={["a", "b"]} />
          <ProjectCard name="project" projectImage={nameIt} description="Lorem ipsum dolor sit amet, ProjectCardnsectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil." tags={["a", "b"]} />
          {/* <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard /> */}
        </div>
      </div>
    </div >
  )
}