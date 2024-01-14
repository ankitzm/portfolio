import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Experience from "./pages/experience";
import Home from "./pages/home";
import Projects from "./pages/projects";
import { AnimatePresence } from "framer-motion";
import transition from "./components/motion-components/pageTransition";

function App() {
  const location = useLocation()

  useEffect(() => {
    // Reset the scroll position to top when the pathname changes (component unmounts)
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 1000);
  }, [location.pathname]);

  return (
    <>
      <div className="absolute top-2 left-2 sm:top-4 sm:left-8 ">
        <Navbar />
      </div>
      <div className='bg-pastelRed flex flex-col min-h-screen w-full justify-center items-center'>
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
