import { useRef } from "react"
import { motion, useInView } from "framer-motion"
// import { useRef } from "react";
// import { useTransform, useScroll, motion } from "framer-motion";
// import Carousel from "../components/motion-components/horizontalScrollCarousel";

function Home() {
  return (
    <div>
      home page

      <div className="text-3xl font-bold border border-red-300 h-screen">
        Hey, I am ANKIT SINGH
      </div>

      {/* <Carousel /> */}
      hey
      {/* <TrippyScroll /> */}
      <AnimatedText once text="heyidgnjdodigmdngindigidogndmoinidnvinidnv itkvdnjnjnnvdjvkd's ankidlvnlkdnvlkdnvlnt" className="bg-yellow-200 m-10" el="h2" />



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
        <span className="block">
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
    x: 50,
    rotate: "180deg"
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1
    },
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