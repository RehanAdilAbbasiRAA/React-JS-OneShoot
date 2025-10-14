import React from 'react'
import {  useTheme } from "../context/themeContext";

const Welcomepage = () => {
    const { name,counter,increment,decrement,reset } = useTheme();
    
  return (
    <>
    <h1>{counter}</h1>
    <div>welcome to {name}</div>
    <div style={{display:"flex",justifyContent:'space-between',marginTop:"20px",padding:"20px" ,gap: "10px"}}>
    <button style={{padding:" 10px 20px",cursor:"pointer"}} onClick={increment}>Increment</button>
    <button style={{padding:" 10px 20px",cursor:"pointer"}} onClick={decrement}>Decrement</button>
    <button style={{padding:" 10px 20px",cursor:"pointer"}} onClick={reset}>Reset</button>
    </div>

    </>
  )
}

export default Welcomepage