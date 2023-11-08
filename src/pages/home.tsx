import { useRef } from "react"
import { motion, useInView } from "framer-motion"
// import { useRef } from "react";
// import { useTransform, useScroll, motion } from "framer-motion";
import IntroCarousel from "../components/motion-components/introCarousel";

function Home() {
  return (
    <div className="w-full">

      <div className="h-screen flex flex-col justify-center gap-6">
        <AnimatedText
          once
          className="text-6xl font-bold border border-red-300 text-center"
          text="Hey,"
          el="h1" />

        <AnimatedText
          once
          className="text-8xl font-bold border border-red-300 text-center"
          text="I am ANKIT SINGH"
          el="h1" />
      </div>

      <IntroCarousel />
      hey
    <div className="h-screen">din</div>
      {/* <TrippyScroll /> */}



    </div>
  )
}

type AnimatedTextProps = {
  text: string,
  el?: keyof JSX.IntrinsicElements,
  className: string,
  once: boolean
}

export function AnimatedText({
  text,
  el: Wrapper = 'p',
  className,
  once,
}: AnimatedTextProps) {

  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.5, once })


  return <Wrapper className={className}>
    <span className="sr-only">{text}</span>

    <motion.span
      ref={ref}
      className="aria-hidden"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ staggerChildren: 0.1 }}
    >
      {text.split(' ').map((word) => (
        <span className="inline-block">
          {
            word.split('').map((ch) => (
              <motion.span
                variants={defaultAnimation}
                className="inline-block"
              >
                {ch}
              </motion.span>
            ))
          }

          {/* space */}
          <span>&nbsp;</span>
        </span>
      ))}

    </motion.span>

  </Wrapper>
}

const defaultAnimation = {
  hidden: {
    opacity: 0,
    y: 50,
    rotate: "20deg"
  },
  visible: {
    opacity: 1,

    y: 0,
    transition: {
      duration: 1
    },
    // Animation: {},
    rotate: "0deg"
  }
}

// const TrippyScroll = () => {
//   const targetRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: targetRef,
//   });

//   const rotate = useTransform(scrollYProgress, [0, 1], ["0deg", "3deg"]);

//   return (
//     <div ref={targetRef} className="my-10 relative z-0 h-[400vh] w-screen bg-neutral-200">
//       <div className="sticky top-0 h-screen bg-white">
//         <Trippy rotate={rotate} />
//       </div>
//       {/* <div className="absolute top-1/2 left-40 bg-black text-white h-20 m-auto w-1/2">
//         ANKIT SINGH
//       </div> */}
//     </div>
//   );
// };

// const NUM_SECTIONS = 30;
// const PADDING = `${100 / NUM_SECTIONS / 2}vmin`;

// const generateSections = (count, color, rotate) => {
//   if (count === NUM_SECTIONS) {
//     return <></>;
//   }

//   const nextColor = color === "black" ? "white" : "orange";

//   return (
//     <Section rotate={rotate} background={color} >
//       {generateSections(count + 1, nextColor, rotate)}
//     </Section>
//   );
// };

// const Trippy = ({ rotate }) => {
//   return (
//     <motion.div className="absolute inset-0 overflow-hidden bg-black">
//       {generateSections(4, "black", rotate)}

//     </motion.div>
//   );
// };

// const Section = ({ background, children, rotate }) => {
//   return (
//     <motion.div
//       className="relative h-full w-full origin-center shadow-blue-400"
//       style={{
//         background,
//         rotate,
//         padding: PADDING,
//         // shadow: "10px 10px 10px blue",
//         border: "2px solid yellow" 
//       }}
//     >
//       {children}
//     </motion.div>
//   );
// };

export default Home;