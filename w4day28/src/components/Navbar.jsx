import React, { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // nice lightweight icons

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Dashboard", path: "/" },
    { name: "Templates", path: "/templates" },
    { name: "Settings", path: "/settings" },
    { name: "Contact", path: "/contact" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className="flex justify-between items-center p-4 border-b border-[var(--color-border)] relative">
      {/* Logo */}
      <h1 className="text-xl font-bold">RAA Portfolio</h1>

      {/* Desktop links */}
      <div className="hidden md:flex flex-row gap-4">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            end
            className={({ isActive }) =>
              `px-3 py-1 rounded-md transition ${
                isActive
                  ? "bg-[var(--color-active)] text-[var(--color-primary)]"
                  : "text-[var(--color-text)] hover:opacity-80"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <span className="text-sm hidden sm:inline">{theme}</span>
        <button
          onClick={toggleTheme}
          className="px-3 py-1 rounded-lg border border-[var(--color-border)] hover:opacity-80"
        >
          Toggle Theme
        </button>

        {/* Hamburger button (only on mobile) */}
        <button
          className="md:hidden p-2 border rounded-lg border-[var(--color-border)]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[var(--color-primary)] border-t border-[var(--color-border)] flex flex-col items-start p-4 md:hidden z-50">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end
              onClick={() => setIsOpen(false)} // close after click
              className={({ isActive }) =>
                `w-full text-left px-3 py-2 rounded-md transition ${
                  isActive
                    ? "bg-[var(--color-active)] text-[var(--color-primary)]"
                    : "text-[var(--color-text)] hover:opacity-80"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;



// | Prefix | Min width | Typical Device                          |
// | ------ | --------- | --------------------------------------- |
// | `sm:`  | 640px     | Small tablets, large phones (landscape) |
// | `md:`  | 768px     | Tablets                                 |
// | `lg:`  | 1024px    | Small laptops                           |
// | `xl:`  | 1280px    | Desktops                                |
// | `2xl:` | 1536px    | Large / wide monitors                   |
