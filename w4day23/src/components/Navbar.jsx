import React from "react";
import { NavLink } from "react-router-dom";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";

const Navbar = ({ darkMode, setDarkMode }) => {
  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-blue-700 to-gray-900 dark:from-gray-900 dark:via-gray-800 dark:to-black text-white shadow-lg py-4 px-6 flex justify-between items-center transition-all duration-300">

      {/* Navigation Links */}
      <div className="space-x-6">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive
              ? "font-bold underline"
              : "opacity-80 hover:opacity-100 hover:scale-110 transition-all"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/projects"
          className={({ isActive }) =>
            isActive
              ? "font-bold underline"
              : "opacity-80 hover:opacity-100 hover:scale-110 transition-all"
          }
        >
          Projects
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "font-bold underline"
              : "opacity-80 hover:opacity-100 hover:scale-110 transition-all"
          }
        >
          Contact
        </NavLink>
      </div>

      {/* Dark Mode Toggle Button */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-full bg-white/20 dark:bg-black/30 hover:bg-white/40 dark:hover:bg-black/50 transition-all backdrop-blur-md"
      >
        {darkMode ? (
          <BsSunFill className="text-yellow-300" size={20} />
        ) : (
          <BsMoonStarsFill className="text-blue-300" size={20} />
        )}
      </button>

    </nav>
  );
};

export default Navbar;
