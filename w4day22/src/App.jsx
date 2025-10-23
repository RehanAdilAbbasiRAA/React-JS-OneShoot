import logo from './logo.svg';
import './App.css';
import AddTask from './components/AddTask';
import Tasks from './components/Tasks';
import { Link, Route, Routes, BrowserRouter,useNavigate  } from "react-router-dom";
import { useState,useMemo } from 'react';
import React from 'react'

function App() {
  console.log("App")
  const navigate = useNavigate();

            const newTasks = [
                { id: 2, text: "Build a ToDo App", completed: false },
                { id: 3, text: "Deploy the App", completed: false },
                { id: 4, text: "RAA the App", completed: true },
                { id: 5, text: "HAA the App", completed: false }
              ];
        const [tasks,setTask]=useState(newTasks);

    const [filter, setFilter] = useState("all");

    const filtredTasks = useMemo(() => {
      if (filter === "incomplete") {
        return tasks.filter((task) => !task.completed);
      }
      if (filter === "completed") {
        return tasks.filter((task) => task.completed);
      }
      return tasks;
    }, [tasks, filter]);

  return (
    <div className="App">
        <h1>Hello to ToDo App</h1>
            {/* <AddTask/> */}

    <Routes>
      <Route path="/AddTask" element={<AddTask tasks={tasks} setTask={setTask}></AddTask>}></Route>
      <Route path="/" element={<Tasks tasks={tasks} setTask={setTask} filter={filter} setFilter={setFilter} filtredTasks={filtredTasks}></Tasks>}></Route>
    </Routes>


    </div>
  );
}

export default App;
