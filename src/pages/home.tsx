import { useRef } from "react";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion"
import { FaGithub, FaTwitter, FaLinkedin, FaBlogger } from "react-icons/fa";

function Home() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const scale = useTransform(scrollYProgress, [0, 0.2, 1], [1, 5, 20])
  const imageX = useTransform(scrollYProgress, [0, 1], [50, 0])
  const imageXSmallScreen = useTransform(scrollYProgress, [0, 1], [10, 0])
  const imageXCalc = useMotionTemplate`max(0px, calc(${window.innerWidth > 786 ? imageX : imageXSmallScreen}% + 3*calc(${imageX}vw/7)))`

  return (
    <div className="w-full">

      <div className="h-screen flex flex-col justify-center items-center pattern-falling-triangles-orange-600/20 pattern-falling-triangles-scale-150 font-poppins text-xl sm:text-2xl md:text-3xl pl-4">
        <span>
          Hey I am,
        </span>
        <div className="flex flex-col sm:flex-row text-6xl sm:text-8xl md:10xl lg:text-20xl gap-2 sm:gap-8 font-righteous mt-2">
          <span>ANKIT</span>
          <span>SINGH</span>
        </div>
        <div className="flex flex-col mx-2 md:mx-4 mt-4 gap-2">
          <span>➡ Final year Computer Science Engineering student. </span>
          <span>➡ A Curious developer, diving into different stuff and exploring. </span>
          <span>➡ I am in love with Design, Frontend and Blockchain development. </span>
        </div>

        <div className="absolute bg-neutral-950 flex bottom-20 rounded-lg gap-3 p-3">
          <a href="https://twitter.com/ankitzm"
            target="_blank" rel='noreferrer'
            className="bg-white backdrop-blur-md bg-opacity-40 hover:bg-opacity-50 rounded-md p-2"
          >
            <FaGithub size={35} />
          </a>
          <a href="https://www.linkedin.com/in/ankitzm"
            target="_blank" rel='noreferrer'
            className="bg-white backdrop-blur-md bg-opacity-40 hover:bg-opacity-50 rounded-md p-2"
          >
            <FaLinkedin size={35} />
          </a>
          <a href="https://github.com/ankitzm"
            target="_blank" rel='noreferrer'
            className="bg-white backdrop-blur-md bg-opacity-40 hover:bg-opacity-50 rounded-md p-2"
          >
            <FaTwitter size={35} />
          </a>
          <a href="https://hashnode.com/@ankitzm"
            target="_blank" rel='noreferrer'
            className="bg-white backdrop-blur-md bg-opacity-40 hover:bg-opacity-50 rounded-md p-2"
          >
            <FaBlogger size={35} />
          </a>
        </div>
      </div>

      <div ref={ref} className="relative h-[200vh] z-10 overflow-clip">

        <motion.div
          style={{ scale }}
          className="hero-bg sticky left-0 top-0 grid place-items-center h-screen w-full origin-[50%_80%] md:origin-[80%_40%] p-0 sm:p-10"
        >
          <div className="flex flex-col md:flex-row md:h-screen w-full justify-center rounded-3xl z-10 bg-transparent">
            <div className="grid place-items-center h-[30vh] md:h-full bg-slate-400 w-full md:w-1/2 rounded-t-2xl md:rounded-t-none md:rounded-l-3xl font-extrabold text-2xl md:text-4xl lg:text-6xl text-slate-800 spacing">
              Peek through <br />
              this 'window' <br />
              to see what <br />
              I have done so far !!
            </div>
            <div className="window-mask grid place-items-center h-full bg-white py-16 w-full rounded-b-xl md:rounded-b-none md:rounded-r-3xl md:w-1/2 min-w-[300px]">
              {/* window */}
              <div className="my-auto w-[200px] sm:w-[300px] aspect-[5/8] rounded-full bg-slate-400">
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="p-4 sm:p-10 mt-[-200vh] h-[200vh] overflow-clip bg-pastelOrange">
        <motion.span
          style={{ x: imageXCalc }}
          className="bg-neutral-800 w-[90vw] sm:w-[80%] rounded-3xl grid content-center mx-auto sticky top-1/3 font-bold py-10 pr-10 text-pastelOrange gap-4 text-right font-casteRock pattern-architect-orange-600/20">
          <>
            <span className="text-3xl sm:text-4xl">I Create</span>
            <div className="flex flex-col text-6xl sm:text-8xl md:text-11xl lg:text-14xl gap-4">
              <span>
                WEBSITES
              </span>
              <span>
                DAPPS
              </span>
              <span>
                BlOGS
              </span>
            </div>
          </>
        </motion.span>
      </div>

      <div className="h-screen flex flex-col justify-center items-center text-2xl border-2 sm:text-4xl gap-6 font-bold bg-pastelOrange">
        Framer Motion is really cool  ❤️
      </div>

    </div>
  )
}

export default Home;