import { useRef } from "react"
import { useScroll } from "framer-motion"
import ExperienceCard from "../components/ExperienceCard";
import experienceData from "./../data/experience.json"
import Lenis from "@studio-freight/lenis";

function Experience() {

  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  })

  // smooth scroll
  const lenis = new Lenis()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function raf(time: any) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  return (
    <div ref={container} className="w-full pattern-topography-neutral-800/10 pattern-topography-scale-150 bg-fixed pt-16 sm:py-0 scroll-smooth">
      {
        experienceData.map((data, index) => {
          // the initial scaling part - [start(variable), end]
          const range = [index / experienceData.length, 1]

          // scale down for the previos cards
          const targetScale = 1 - (experienceData.length - index) * 0.02

          return (
            <ExperienceCard key={index} index={index} progress={scrollYProgress} range={range} targetScale={targetScale} {...data} />
          )
        })
      }
    </div>
  )
}

export default Experience;