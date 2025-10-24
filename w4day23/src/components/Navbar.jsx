import React from "react";
import { NavLink } from "react-router-dom";

const activeStyle = {
  fontWeight: "700",
  textDecoration: "underline",
};

const Navbar = () => {
  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #eee" }} className="bg-[#1E293B] text-white">
      <NavLink  to="/" style={({ isActive }) => (isActive ? activeStyle : undefined)} end className="inline-block hover:scale-110 transition-transform duration-200">
        Home
      </NavLink>
      {" | "}
      <NavLink to="/projects" style={({ isActive }) => (isActive ? activeStyle : undefined)} className="inline-block hover:scale-110 transition-transform duration-200">
        Projects
      </NavLink>
      {" | "}
      <NavLink to="/contact" style={({ isActive }) => (isActive ? activeStyle : undefined)} className="inline-block hover:scale-110 transition-transform duration-200">
        Contact
      </NavLink>
    </nav>
  );
};

export default Navbar;
