import { useState,useEffect,useContext } from "react";
import "./App.css";
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Logout from "./components/Logout";
import { AuthContext } from "./CustomHooks/AuthProvider";

function App() {
const { darkMode,setDarkMode,user,setUser,login,setLogin,onSubmit,register,handleSubmit,reset,formState: { errors }} = useContext(AuthContext);

  return (
    <>
      <div className="main">
        {/* <h1 className='bg-red-200'>Rehan</h1> */}
                {/* <Navbar darkMode={darkMode} setDarkMode={setDarkMode} /> */}
        <Routes>
          <Route path="/" element={<Login></Login>} />
          <Route path="/navbar" element={<Navbar></Navbar>} />
          <Route path="/dashboard" element={<Dashboard></Dashboard>} />
          <Route path="/logout" element={<Logout></Logout>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
