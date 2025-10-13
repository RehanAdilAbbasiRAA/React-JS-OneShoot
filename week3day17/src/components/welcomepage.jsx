import React from 'react'
import {  useTheme } from "../context/themeContext";

const Welcomepage = () => {
    const { name } = useTheme();
    
  return (
    <>
    <div>welcome to {name}</div>
    </>
  )
}

export default Welcomepage