import { createContext, useContext, useState, useEffect } from "react";

export const ThemeContext = createContext(); // <-- export it

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.className = "";
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      if (prev === "light") return "dark";
      if (prev === "dark") return "theme-ocean";
      if (prev === "theme-ocean") return "theme-forest";
      if (prev === "theme-forest") return "theme-deepblue";
      if (prev === "theme-deepblue") return "theme-sunset";
      if (prev === "theme-sunset") return "theme-neonfrost";
      if (prev === "theme-neonfrost") return "theme-midnight";
      return "light";
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
