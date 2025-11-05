import React from 'react'
import { useState } from "react";

import "../App.css";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  resetState,
  incrementByAmount,
} from "../features/counter/counterSlice";
import {
  addTodo,
  removeTodo,
  resetTodo,
  toggleTodo,
} from "../features/counter/todoSlice";

import { selectTodos, selectCompletedCount } from "../features/counter/todoSlice";

const Dashboard = () => {
      const [count, setCount] = useState("Rehan");
  const [newTodo, setNewTodo] = useState("");

  const value = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();


  const todos = useSelector((state) => state.todos.todos);

  // const todos = useSelector(selectTodos);
  const completedCount = useSelector(selectCompletedCount);
  return (
    
    <>
      <div className="main bg-green-500 font-bold text-center text-9xl">
        Hello {count}
      </div>
      <div className="flex  text-4xl justify-center gap-7 items-center mt-10">
        <button
          className="hover:bg-red-500 hover:text-white p-5 rounded-full bg-red-200"
          onClick={() => dispatch(incrementByAmount(10))}
        >
          Add 10
        </button>
        <button
          className="hover:bg-red-500 hover:text-white p-5 rounded-full bg-red-200"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span>{value}</span>
        <button
          className="hover:bg-blue-500 hover:text-white p-5 rounded-full bg-blue-200"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <button
          className="hover:bg-blue-500 hover:text-white p-5 rounded-full bg-blue-200"
          onClick={() => dispatch(resetState())}
        >
          Reset
        </button>
      </div>

      <div className="main2 flex flex-col text-2xl items-center mt-10">
        <h2 className="text-4xl font-bold mb-4">Todo List</h2>
        <h2 className="text-2xl mb-4">Completed: {completedCount}</h2>


        {todos.map((todo) => (
          <div
            key={todo.id}
            className={`flex justify-between items-center w-1/2 p-4 m-2 rounded-lg ${
              todo.completed ? "bg-green-200" : "bg-gray-200"
            }`}
          >
            <span
              // onClick={() => dispatch(toggleTodo(todo.id))}
              className={`cursor-pointer ${
                todo.completed ? "line-through" : ""
              }`}
            >
              {todo.title}
            </span>

            <span className="flex gap-3"> 
            <button
              onClick={() => dispatch(removeTodo(todo.id))}
              className="bg-red-400 px-4 py-2 rounded-lg hover:bg-red-600 text-white"
              >
              Delete
            </button>

            <button
              onClick={() => dispatch(toggleTodo(todo.id))}
              className="bg-yellow-400 px-4 py-2 rounded-lg hover:bg-yellow-600 text-white"
              >
              Update
            </button>
            </span>
          </div>
        ))}

        <button
          onClick={() => dispatch(resetTodo())}
          className="bg-blue-500 text-white px-5 py-2 rounded-lg mt-6 hover:bg-blue-700"
        >
          Reset All
        </button>
      </div>

      <div className="mt-10 flex gap-3 justify-center mb-10">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a todo..."
          className="border p-3 rounded-lg"
        />
        <button
          onClick={() => {
            dispatch(addTodo(newTodo));
            setNewTodo("");
          }}
          className="bg-green-500 px-4 py-2 text-white rounded-lg hover:bg-green-700"
        >
          Add
        </button>
      </div>
    </>
  )
}

export default Dashboard