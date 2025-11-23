import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector to Read data From Redux Store
import { useDispatch } from "react-redux"; //To update data (dispatch login/logout):
import { login, logout } from "../features/authSlice"; //To update data (dispatch login/logout):

const Footer = () => {
  const links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Copyrights", path: "/copyrights" },
    { name: "About", path: "/about" },
  ];

  const dispatch = useDispatch(); //To update data (dispatch login/logout):
  const { isAuthenticated, user } = useSelector((state) => state.auth); // Import useSelector to Read data From Redux Store
  return (
    <>
      <footer className="flex flex-row justify-between items-center p-1 border-t border-[var(--color-footer-border)] bg-[var(--color-footer)] text-[var(--color-footer-text)] relative">
        <div className="footer">
          {isAuthenticated &&
            links.map((link) => (
              <NavLink
                className={({ isActive }) =>
                  `px-3 py-1 rounded-md transition ${
                    isActive
                      ? "bg-[var(--color-active)] text-[var(--color-primary)]"
                      : "text-[var(--color-text)] hover:opacity-80"
                  }`
                }
                key={link.name}
                to={link.path}
              >
                {link.name}
              </NavLink>
            ))}
        </div>
        <div className="right">All rights reserved ©2025 RAA</div>
      </footer>
    </>
  );
};

export default Footer;
