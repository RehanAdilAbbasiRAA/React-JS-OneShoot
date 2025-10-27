import React from 'react'
import Navbar from './Navbar'
import { useState,useEffect,useContext } from "react";


import { AuthContext } from "../CustomHooks/AuthProvider";

const Dashboard = () => {
    const { darkMode,setDarkMode,user,setUser,login,setLogin,onSubmit,register,handleSubmit,reset,formState: { errors }} = useContext(AuthContext);
  return (
    <>
    <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
    <div>Dashboard</div>
    <div className="main" >
        <h1>Welcome <b>{user} 👋</b></h1>
        <p>You are Currently Authenticated {login ? "✅" : "❌"}</p>
    </div>
    </>
  )
}

export default Dashboard