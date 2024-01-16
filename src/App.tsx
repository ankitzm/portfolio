import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Experience from "./pages/experience";
import Home from "./pages/home";
import Projects from "./pages/projects";
import { AnimatePresence } from "framer-motion";
import transition from "./components/motion-components/pageTransition";
import { inject } from '@vercel/analytics';
import Contact from "./pages/contact";


function App() {
  inject();
  const location = useLocation()

  useEffect(() => {
    // Reset the scroll position to top when the pathname changes (component unmounts)
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 1000);
  }, [location.pathname]);

  return (
    <>
      <div className="absolute">
        <Navbar />
      </div>
      <div className='bg-pastelRed flex flex-col min-h-screen w-full justify-center items-center'>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route index element={transition(Home)} />
            <Route path="/projects" element={transition(Projects)} />
            <Route path="/experience" element={transition(Experience)} />
            <Route path="/contact" element={transition(Contact)} />
          </Routes>
        </AnimatePresence>
      </div>
    </>
  )
}

export default App
