import { useState, useEffect } from "react";

function Day14() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({ id: "", text: "", completed: false });
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!task.text.trim()) return;
    setTasks([...tasks, { ...task, id: Date.now() }]);
    setTask({ id: "", text: "", completed: false });
  };

  const handleDelete = (id) => setTasks(tasks.filter((t) => t.id !== id));

  const handleToggle = (id) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));

  const handleEdit = (t) => setEditTask(t);

  const handleUpdate = (e) => {
    e.preventDefault();
    setTasks(tasks.map((t) => (t.id === editTask.id ? editTask : t)));
    setEditTask(null);
  };

  return (
    <>
      <form onSubmit={handleAdd}>
        <input
          type="text"
          value={task.text}
          placeholder="Enter a task"
          onChange={(e) => setTask({ ...task, text: e.target.value })}
        />
        <button>Add</button>
      </form>

      {editTask && (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={editTask.text}
            onChange={(e) => setEditTask({ ...editTask, text: e.target.value })}
          />
          <button>Update</button>
        </form>
      )}

      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Task</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t, idx) => (
            <tr key={t.id}>
              <td>{idx + 1}</td>
              <td>{t.text}</td>
              <td>{t.completed ? "Completed" : "Incomplete"}</td>
              <td>
                <button onClick={() => handleEdit(t)}>Edit</button>
                <button onClick={() => handleDelete(t.id)}>Delete</button>
                <button onClick={() => handleToggle(t.id)}>
                  {t.completed ? "Undo" : "Complete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Day14;
