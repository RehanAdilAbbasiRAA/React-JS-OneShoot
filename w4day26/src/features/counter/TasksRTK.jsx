// src/features/tasks/TasksRTK.jsx
import React, { useState } from "react";
import {
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from "../../app/api";

export default function TasksRTK() {
  // Get all tasks from backend
  const { data: tasks = [], isLoading, isError, refetch } = useGetTasksQuery();

  // Hooks for Add, Update, Delete
  const [addTask] = useAddTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  // Local state for new task input
  const [newTask, setNewTask] = useState("");

  // ✅ Handle loading and error states
  if (isLoading) return <h2 className="text-center text-2xl mt-10">Loading tasks...</h2>;
  if (isError) return <h2 className="text-center text-red-500 mt-10">Error loading tasks ❌</h2>;

  // ✅ Add new task
  const handleAddTask = async () => {
    if (!newTask.trim()) return alert("Please enter a valid task!");
    await addTask({ title: newTask });
    setNewTask("");
    refetch(); // refresh the list after adding
  };

  // ✅ Delete task
  const handleDelete = async (id) => {
    await deleteTask(id);
    refetch(); // refresh the list after deleting
  };

  // ✅ Update task
  const handleUpdate = async (task) => {
    const updatedTitle = prompt("Enter new title:", task.title);
    if (!updatedTitle?.trim()) return;
    await updateTask({ id: task.id, title: updatedTitle });
    refetch(); // refresh the list after updating
  };

  // ✅ UI Rendering
  return (
    <div className="p-10 flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-6 text-blue-600">🧠 RTK Query Task Manager</h2>

      {/* Add Task Input */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Enter new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="border p-3 rounded-lg"
        />
        <button
          onClick={handleAddTask}
          className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-700"
        >
          Add Task
        </button>
      </div>

      {/* Show all tasks */}
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-2xl">No tasks available 😴</p>
      ) : (
        <ul className="w-1/2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center p-4 mb-3 bg-gray-100 rounded-lg shadow"
            >
              <span className="text-xl">{task.title}</span>
              <div className="flex gap-3">
                <button
                  onClick={() => handleUpdate(task)}
                  className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
