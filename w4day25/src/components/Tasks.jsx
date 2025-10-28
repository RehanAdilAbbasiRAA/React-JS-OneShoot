import { useEffect, useState } from "react";
import { getTasks, addTask, deleteTask, updateTask } from "../api/tasks";
function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load tasks when component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

// seprate asycn function to get the tasks
  async function fetchTasks() {
    try {
      setLoading(true);
      const res = await getTasks();
      console.log(res.data);
      setTasks(res.data);
    } catch (error) {
      console.error("Failed to load tasks:", error);
    } finally {
      setLoading(false);
    }
  }
  async function handleAdd() {
    const newTask = { title: "New Task" };
    await addTask(newTask);
    fetchTasks();
  }
  async function handleDelete(id) {
    await deleteTask(id);
    fetchTasks();
  }
  async function handleUpdate(id) {
    const newTask = {title:"TTTTTTTTTTTTTTT"}
    await updateTask(id,newTask);
    fetchTasks();
  }
  return (
    <>
      <h2>Tasks from FastAPI </h2>
      <button onClick={handleAdd}>Add Task</button>
      {loading && <p>Loading...</p>}
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            <h3>{t.title}</h3>
            <p>{t.description}</p>
            <p>{t.completed?'Completed':'Not Completed'}</p>
            <button onClick={() => handleDelete(t.id)}>Delete </button>
            <button onClick={() => handleUpdate(t.id) }>Update </button>
          </li>
        ))}
      </ul>
    </>
  );
}
export default Tasks;
