import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Experience from "./pages/experience";
import Home from "./pages/home";
import Projects from "./pages/projects";

function App() {
  return (
    <>
      <div className="absolute top-2 left-4 sm:top-4 sm:left-8 ">
        <Navbar />
      </div>
      <div className='bg-indigo-50 flex flex-col min-h-screen justify-center items-center scroll-smooth border-4 border-blue-700'>
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
