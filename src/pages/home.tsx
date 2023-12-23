import { motion } from "framer-motion"
import { AnimatedText } from "../components/motion-components/AnimatedText";

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

    </div>
  )
}

export default Home;