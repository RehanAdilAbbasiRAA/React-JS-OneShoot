import React, { createContext } from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });
  const [login, setLogin] = useState(() => {
    return localStorage.getItem("login") === "true";
  });

  const signIn = (email) => {
    setUser(email);
    setLogin(true);
    localStorage.setItem("user", JSON.stringify(email));
    localStorage.setItem("login", "true");
  };

  const logout = () => {
    setUser(null);
    setLogin(false);
    localStorage.removeItem("user");
    localStorage.removeItem("login");
    navigate("/");
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("✅ Login Data:", data);
    if (data.email === "admin@gmail.com" && data.password === "123456") {
      alert("Login Successful!");
      signIn(data.email)
      navigate("/dashboard");
      // reset();
    } else {
      alert("Login Failed!");
      navigate("/");
    }
  };

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <AuthContext.Provider
      value={{
        logout,
        user,
        setUser,
        login,
        setLogin,
        onSubmit,
        register,
        handleSubmit,
        reset,
        formState: { errors },
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
