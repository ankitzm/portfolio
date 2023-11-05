import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Experience from "./pages/experience";
import Home from "./pages/home";
import Projects from "./pages/projects";
// import transition from "./components/motion-components/pageTransition";
import { AnimatePresence } from "framer-motion";
import transition from "./components/motion-components/pageTransition";

function App() {
  const location = useLocation()

  return (
    <>
      <div className="absolute top-2 left-2 sm:top-4 sm:left-8 ">
        <Navbar />
      </div>
      <div className='bg-mainBG flex flex-col min-h-screen w-full justify-center items-center scroll-smooth'>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route index element={transition(Home)} />
            <Route path="/projects" element={transition(Projects)} />
            <Route path="/experience" element={transition(Experience)} />
          </Routes>
        </AnimatePresence>
      </div>
    </>
  )
}

export default App
