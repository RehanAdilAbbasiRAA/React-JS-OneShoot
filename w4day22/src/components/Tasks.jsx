import React from 'react'
import { useState,useCallback  } from 'react';
import { Link, Route, Routes, BrowserRouter,useNavigate  } from "react-router-dom";

const Tasks = ({tasks,setTask,filter,setFilter,filtredTasks}) => {
    console.log("Tasks")

  const navigate = useNavigate();

//   const AddBlog = () => {
//     navigate("/AddTask")
//   }

  // ✅ useCallback ensures this function is not recreated on every render
  const AddBlog = useCallback(() => {
    navigate("/AddTask");
  }, [navigate]);

//   const taskDone = (id) => {
//     setTask(tasks.map((task) => {
//       if (task.id === id) {
//         return { ...task, completed: true };
//       }
//       return task;
//     }));
//   }

    // ✅ same here – depends on setTask only
  const taskDone = useCallback((id) => {
    setTask((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    );
  }, [setTask]);

  return (
    <>
    <button onClick={AddBlog}  >Add Task</button>
    <h2>All Tasks</h2>
    <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("incomplete")}>Incomplete</button>
    </div>
        <div className="tasks">
        {filtredTasks.map((task,index) => (
        <div key={index}>
            <p>{task.text} — {task.completed ? "✅" : "❌"}  {task.completed ? ("Completed") : (<button onClick={()=>taskDone(task.id)}>Done</button>) } </p>
        </div>
        ))}
    </div>
    </>
  )
}

// export default Tasks

// ✅ Memoize the entire component so it doesn’t re-render unnecessarily
export default React.memo(Tasks);