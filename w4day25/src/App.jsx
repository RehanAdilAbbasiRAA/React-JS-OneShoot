import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Tasks from './components/Tasks'



function App() {
  const [count, setCount] = useState(0)


  return (
    <>
<div className="main">
  <h1>Hello Rehan Adil You are on the Dashboard</h1>
  {/* <button onClick={() => getTasks} >To Get All Task</button> */}
  <Tasks></Tasks>
</div>
    </>
  )
}

export default App
