import React, { useContext, useState, useRef, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { NavLink } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast"; // to use toast we import its

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const dropdownRef = useRef();

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Templates", path: "/templates" },
    { name: "Settings", path: "/settings" },
    { name: "Contact", path: "/contact" },
    { name: "About", path: "/about" },
  ];

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout Successful ✅");
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center p-4 border-b border-[var(--color-navbar-border)] bg-[var(--color-navbar)] text-[var(--color-navbar-text)]  relative">
      {/* Logo */}
      <h1
        className="text-xl font-bold cursor-pointer hover:opacity-80"
        onClick={() => navigate("/dashboard")}
      >
        RAA Portfolio
      </h1>

      {/* Desktop links */}
      <div className="hidden md:flex flex-row gap-4 items-center">
        {isAuthenticated &&
          links.map((link) => (
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

        {/* Dropdown for user settings */}
        {isAuthenticated && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 px-3 py-1 rounded-md border hover:opacity-80"
            >
              {user?.name || "Account"}
              <ChevronDown size={16} />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-[var(--color-navbar)] border rounded-md shadow-md flex flex-col">
                <NavLink
                  to="/settings"
                  className="px-3 py-2 hover:bg-[var(--color-active)] transition"
                >
                  Settings
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 text-left hover:bg-[var(--color-active)] transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <span className="text-sm hidden sm:inline border-b border-[var(--color-navbar-border)]">
          {theme}
        </span>
        <button
          onClick={toggleTheme}
          className="px-3 py-1 rounded-lg border border-[var(--color-navbar-border)] hover:opacity-80"
        >
          Toggle Theme
        </button>

        {/* Hamburger button (mobile) */}
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
          {isAuthenticated &&
            links.map((link) => (
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
          {/* Mobile dropdown */}
          {isAuthenticated && (
            <div className="mt-2 flex flex-col w-full">
              <NavLink
                to="/settings"
                className="px-3 py-2 w-full hover:bg-[var(--color-active)] transition"
              >
                Settings
              </NavLink>
              <button
                onClick={handleLogout}
                className="px-3 py-2 text-left w-full hover:bg-[var(--color-active)] transition"
              >
                Logout
              </button>
            </div>
          )}
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
