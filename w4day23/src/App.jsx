import { useEffect, useState } from "react";
import "./App.css";

import Home from "./components/Home";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";

import { Routes, Route } from "react-router-dom";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div
      className="bg-primary dark:bg-dark-primary dark:text-white"
    >
      {/* <div className={darkMode ? "dark bg-gray-900 text-white" : "bg-white text-black"}> */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

{
  /* <div className="bg-gray-900 p-4">
        <Button variant="contained" color="primary">
          MUI + Tailwind working!
        </Button>
      </div>
      <div className="text-[50px] bg-amber-100 text-9xl">Hello Rehan</div>

      <div className="flex justify-center items-center h-screen gap-4">
        <div className="p-4 bg-blue-500 text-white rounded">Box 1</div>
        <div className="p-4 bg-red-500 text-white rounded">Box 2</div>
      </div>

      <div className="grid grid-cols-3 gap-4 p-6">
        <div className="bg-green-500 p-4 rounded">1</div>
        <div className="bg-green-500 p-4 rounded">2</div>
        <div className="bg-green-500 p-4 rounded">3</div>
      </div> */
}

// check thi link for Dark theme and light theme https://youtu.be/ku99cfuK5wg?si=gWiNpV_o-14wVmMh