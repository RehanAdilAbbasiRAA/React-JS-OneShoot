import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

// import the components here
import Home from "./components/Home";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";


import { Routes, Route } from "react-router-dom";

import Button from "@mui/material/Button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>

    <Navbar/>

      <main style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

    </>
  );
}

export default App;



      {/* <div className="bg-gray-900 p-4">
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
      </div> */}