import React from 'react'
import { NavLink } from "react-router-dom";

const Footer = () => {
    const links = [
    { name: "Dashboard", path: "/" },
    { name: "Copyrights", path: "/copyrights" },
    { name: "About", path: "/about" },
  ];
  return (
    <>
    <footer className='flex flex-row justify-between items-center p-1 border-t border-[var(--color-border)] relative'>

            <div className="footer">
                {links.map((link) => (
                    <NavLink
                    className={({ isActive }) =>
                      `px-3 py-1 rounded-md transition ${ 
                        isActive
                          ? "bg-[var(--color-active)] text-[var(--color-primary)]"
                          : "text-[var(--color-text)] hover:opacity-80"
                      }`
                    }
                      key={link.name}
                      to={link.path}>
                        {link.name}
                      </NavLink>))}
            </div>
            <div className="right">
               All rights reserved ©2025 RAA
            </div>

    </footer>
    </>
  )
}

export default Footer