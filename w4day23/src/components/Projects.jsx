import React from "react";
import Button from "@mui/material/Button";
import coinimg from "../assets/coin.png";
import aquaimg from "../assets/aqua.png";
import slfimg from "../assets/slf.png";

const projects = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "A personal portfolio showcasing skills and projects.",
    image: coinimg,
    tech: ["React", "Tailwind", "Material UI"],
    live: "#",
    code: "#",
  },
  {
    id: 2,
    title: "Todo App",
    description: "A modern Todo app with animations and local storage.",
    image: aquaimg,
    tech: ["React", "CSS", "LocalStorage"],
    live: "#",
    code: "#",
  },
  {
    id: 3,
    title: "Ecommerce UI",
    description: "An elegant ecommerce front-end with clean UI components.",
    image: slfimg,
    tech: ["React", "Tailwind"],
    live: "#",
    code: "#",
  },
  {
    id: 4,
    title: "The Game Changer",
    description: "An elegant Game changer Web UI components.",
    image: slfimg,
    tech: ["React", "Tailwind"],
    live: "#",
    code: "#",
  },
];

const Projects = () => {
  return (
    <section className="px-6 py-6  min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-10">
        My Projects 💼
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
         {/* h-[850px]   add this hight to change the hight of projects box size*/}
        {projects.map((project) => (
          <div
            key={project.id}
            className= "Cards shadow-lg dark:shadow-white/60 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 flex flex-col h-full hover:bg-gray-200 dark:hover:bg-gray-700 "
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-50 object-cover"
            />

            <div className="p-4 flex flex-col space-y-3 h-full">
              <h2 className="text-xl font-semibold">{project.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{project.description.slice(0, 36)}..</p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-md hover:bg-blue-400"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex justify-between mt-auto pt-4">
                <Button variant="contained" size="small" href={project.live}>
                  Live
                </Button>
                <Button variant="outlined" size="small" href={project.code}>
                  Code
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
