import { useState } from "react";

import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  resetState,
  incrementByAmount,
} from "./features/counter/counterSlice";
import {
  addTodo,
  removeTodo,
  resetTodo,
  toggleTodo,
} from "./features/counter/todoSlice";

import { selectTodos, selectCompletedCount } from "./features/counter/todoSlice";

import TasksRTK from "./features/counter/TasksRTK";
import Dasboard from "./components/Dashboard";



function App() {

  return (
    <>
    {/* <TasksRTK/> */}
    <Dasboard/>
    </>

  );
}

export default App;
