import React from "react";
import { ThemeProvider, useTheme } from "./context/themeContext";
import Welcomepage from "./components/welcomepage";

// 1️⃣ This is now inside ThemeProvider — safe to use useTheme()
function Content() {
  const { theme, toggleTheme } = useTheme();

  const appStyle = {
    backgroundColor: theme === "light" ? "white" : "#333",
    color: theme === "light" ? "black" : "white",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transition: "0.3s",
  };

  return (
    <div style={appStyle}>
      <h1>Theme Mode: {theme}</h1>
      <button
        onClick={toggleTheme}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          cursor: "pointer",
          border: "1px solid gray",
          borderRadius: "5px",
        }}
      >
        Toggle Theme
      </button>

      <Welcomepage/>
    </div>
  );
}

// 2️⃣ App just wraps everything in the provider
export default function App() {
  return (
    <ThemeProvider>
      <Content />
    </ThemeProvider>
  );
}
