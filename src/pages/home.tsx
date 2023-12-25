import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion"
import { AnimatedText } from "../components/motion-components/AnimatedText";
import { useRef } from "react";

function Home() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const scale = useTransform(scrollYProgress, [0, 0.4, 1], [1, 2, 10])
  const imageX = useTransform(scrollYProgress, [0, 1], [50, 0])
  const imageXSmallScreen = useTransform(scrollYProgress, [0, 1], [10, 0])
  const imageXCalc = useMotionTemplate`max(0px, calc(${window.innerWidth > 786 ? imageX : imageXSmallScreen}% + 3*calc(${imageX}vw/7)))`

  return (
    <div className="w-full">

      <div className="h-screen flex flex-col justify-center gap-6 bg-green-300 relative z-10">
        <AnimatedText
          once
          className="text-2xl sm:text-4xl md:text-6xl font-bold text-center"
          text="Hey,"
          el="h1" />

        <AnimatedText
          once
          className="text-4xl sm:text-6xl md:text-8xl font-bold text-center"
          text="i am ankit singh"
          el="h1" />
      </div>

      <div ref={ref} className="relative h-[200vh] z-10 overflow-clip">

        <motion.div
          style={{ scale }}
          className="hero-bg sticky left-0 top-0 grid place-items-center h-screen w-full origin-[50%_80%] md:origin-[80%_40%] p-0 sm:p-10"
        >
          <div className="flex flex-col md:flex-row md:h-screen w-full justify-center rounded-3xl z-10">
            <div className="grid place-items-center h-[30vh] md:h-full bg-slate-400 w-full md:w-1/2 md:rounded-l-3xl font-extrabold text-2xl sm:text-4xl md:text-6xl text-slate-800">
              Let's peek through <br />
              to see what <br />
              I have done so far !!
            </div>
            <div className="window-mask grid place-items-center h-full bg-white py-16 w-full md:rounded-r-3xl md:w-1/2 min-w-[300px]">
              {/* window */}
              <div className="my-auto w-[200px] sm:w-[300px] aspect-[5/8] rounded-full bg-slate-400">
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="p-10 mt-[-200vh] h-[200vh] overflow-clip">
        <motion.span
          style={{ x: imageXCalc }} className="bg-slate-500 w-[70%] aspect-video rounded-2xl block mx-auto sticky top-1/3 font-bold text-xl sm:text-3xl text-slate-300 text-center p-10">
          something over here ...
        </motion.span>
      </div>

      <div className="h-screen flex flex-col justify-center items-center text-2xl sm:text-4xl gap-6 font-bold">
        Framer Motion is really cool  ❤️
      </div>

    </div>
  )
}

export default Home;