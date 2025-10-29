import { useEffect, useState } from "react";
import { getTasks, addTask, deleteTask, updateTask } from "../api/tasks";
import toast from "react-hot-toast";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

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
      toast.success("Task Featched ✅");
    } catch (error) {
      console.error("Failed to load tasks:", error);
      toast.error("Failed to Featched tasks ❌");
    } finally {
      setLoading(false);
    }
  }
  async function handleAdd() {
    const newTask = { title: "New Task" };
    try {
      await addTask(newTask);
      toast.success("Task Added ✅");
    } catch {
      toast.error("Failed to Add Task ❌");
    }
    fetchTasks();
  }
  async function handleDelete(id) {
    try {
      await deleteTask(id);
      toast.success("Task Deleted ✅");
    } catch {
      toast.error("Failed to Delete Task ❌");
    }
    fetchTasks();
  }
  async function handleUpdate(id) {
    const newTask = { title: "TTTTTTTTTTTTTTT" };
    try {
      toast.success("Task Updated ✅");
      await updateTask(id, newTask);
    } catch {
      toast.error("Failed to Update Task ❌");
    }
    fetchTasks();
  }
  return (
    <>
      <h2>Tasks from FastAPI </h2>
      {/* <button onClick={handleAdd}>Add Task</button> */}
      <Button onClick={handleAdd} variant="contained" color="primary">
        Add Task
      </Button>
      {loading && <p>Loading...</p>}
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            <h3>{t.title}</h3>
            <p>{t.description}</p>
            <p>{t.completed ? "Completed" : "Not Completed"}</p>
            {/* <button onClick={() => handleDelete(t.id)}>Delete </button> */}
            <Button
              onClick={() => handleDelete(t.id)}
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>

            <button onClick={() => handleUpdate(t.id)}>Update </button>
          </li>
        ))}
      </ul>
    </>
  );
}
export default Tasks;
