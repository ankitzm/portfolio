import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Experience from "./pages/experience";
import Home from "./pages/home";
import Projects from "./pages/projects";

function App() {
  return (
    <>
      <div className="absolute top-2 left-2 sm:top-4 sm:left-8 ">
        <Navbar />
      </div>
      <div className='bg-indigo-100 flex flex-col min-h-screen justify-center items-center scroll-smooth'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
        </Routes>
      </div>
    </>
  )
}

export default App
