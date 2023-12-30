import { useRef } from "react"
import { useScroll } from "framer-motion"
import Lenis from "@studio-freight/lenis";
import ExperienceCard from "../components/ExperienceCard";
import experienceData from "./../data/experience.json"

function Experience() {
  const lenis = new Lenis()

  // smooth scroll
  lenis.on('scroll', (e: any) => {
    console.log(e)
  })

  function raf(time: any) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  })

  return (
    <div ref={container} className="bg-lime-50 w-full">
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