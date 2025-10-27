import React from 'react'
import Navbar from './Navbar'

import { useState,useEffect,useContext } from "react";

import { AuthContext } from "../CustomHooks/AuthProvider";

const Logout = () => {
    const { logout,darkMode,setDarkMode,user,setUser,login,setLogin,onSubmit,register,handleSubmit,reset,formState: { errors }} = useContext(AuthContext);
  return (
    <>
    <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
    <div>Logout</div>
    <div className="main flex justify-center items-center">
<button
  onClick={logout}
  type="submit"
  className="text-lg font-bold tracking-wide px-6 py-2 rounded-full border-2 border-red-500 text-red-500
  hover:bg-red-500 hover:text-white transition-all duration-300 shadow-md hover:shadow-red-400/50
  active:scale-95"
>
  Logout
</button>
    </div>
    </>
  )
}

export default Logout