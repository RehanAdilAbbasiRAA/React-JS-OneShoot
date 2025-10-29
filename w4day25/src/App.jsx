import { useState } from 'react'
import './App.css'
import Tasks from './components/Tasks'
import { Toaster } from "react-hot-toast";



function App() {


  return (
    <>
<div className="main">
  <h1>Hello Rehan Adil You are on the Dashboard</h1>
  {/* <button onClick={() => getTasks} >To Get All Task</button> */}
  <Tasks></Tasks>
   <Toaster position="top-right" />
</div>
    </>
  )
}

export default App
