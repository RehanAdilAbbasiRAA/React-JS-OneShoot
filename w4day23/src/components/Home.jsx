import React from "react";
import Button from "@mui/material/Button";
import myImage from "../assets/raa.png"; // ✅ Import your picture here

const Home = () => {
  return (
    <section className="min-h-[80vh] flex flex-col md:flex-row items-center justify-center px-10 py-10 ">
      {/* Left text section */}
      <div className="flex-1 text-center md:text-left space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold">
          Hey, I am Rehan Adil RAA👋
        </h1>

        <p className="text-lg md:text-xl ">
          Full Stack Developer (Flask, FastAPI, Node.js) with proven experience
          delivering scalable applications in e-commerce, healthcare, fintech,
          and education. Skilled in RESTful APIs, JWT authentication, real-time
          systems (Socket.IO), and database management (MySQL, MongoDB). Strong
          expertise in multi-threading, multi-processing, and end-to-end project
          delivery with a focus on clean, maintainable code.
        </p>

        <div className="flex gap-4 mt-4 justify-center md:justify-normal">
          <Button variant="contained" size="large" href="/projects">
            View Projects
          </Button>

          <Button
            variant="outlined"
            size="large"
            href="/contact"
            sx={{
              borderColor: "blue-200",
              borderWidth: "3px",
              "&:hover": {
                borderColor: "blue-200",
                borderWidth: "3px",
                backgroundColor: "transparent",
              },
            }}
          >
            Contact Me
          </Button>
        </div>
      </div>

      {/* Right image section (optional for later) */}
      <div className="flex-1 mt-10 md:mt-0 flex justify-center ">
        <img
          src={myImage}
          alt="profile placeholder"
          className="rounded-2xl shadow-lg w-60 md:w-72 hover:scale-110 duration-300 transition-transform dark:shadow-white/60"
        />
      </div>
    </section>
  );
};

export default Home;

// items-center	Vertically align children to center.
// justify-center	Horizontally center children.
