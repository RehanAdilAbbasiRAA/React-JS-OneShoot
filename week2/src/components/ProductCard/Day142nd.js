import { useState, useEffect } from "react";

// ---------------- PARENT ----------------
function Day141() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null); // store task being edited

  // Load from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  }, []);

  // Save to localStorage whenever tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  // CRUD functions
  const addTask = (task) =>
    setTasks([...tasks, { text:task, id: Date.now(), completed: false }]);

  const deleteTask = (id) =>
    setTasks(tasks.filter((t) => t.id !== id));

  const toggleTask = (id) =>
    setTasks(tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));

  const updateTask = (id, newText) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, text: newText } : t)));
    setEditTask(null); // close edit form
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>ToDo Tasks</h1>

      {/* Add Task Form */}
      <TaskForm onAdd={addTask} />

      {/* Edit Task Form (shows only when editing) */}
      {editTask && (
        <TaskEditForm
          task={editTask}
          onUpdate={updateTask}
          onCancel={() => setEditTask(null)}
        />
      )}

      {/* Task List */}
      <TaskList

        tasks={tasks}
        onDelete={deleteTask}
        onToggle={toggleTask}
        onEdit={setEditTask} // 👈 pass down setter
      />
    </div>
  );
}

// ---------------- CHILD: Add Form ----------------
function TaskForm({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Enter a task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

// ---------------- CHILD: Edit Form ----------------
function TaskEditForm({ task, onUpdate, onCancel }) {
  const [text, setText] = useState(task.text);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onUpdate(task.id, text);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Update</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
}

// ---------------- CHILD: Task List ----------------
function TaskList({ tasks, onDelete, onToggle, onEdit }) {
  return (
    <table border="1" cellPadding="8" style={{ marginTop: "20px" }}>
      <thead>
        <tr>
          <th>S.no</th>
          <th>Task</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((t, index) => (
          <tr key={t.id}>
            <td>{index + 1}</td>
            <td>{t.text}</td>
            <td>{t.completed ? "Completed" : "Incomplete"}</td>
            <td>
              <button onClick={() => onEdit(t)}>Edit</button>
              <button onClick={() => onDelete(t.id)}>Delete</button>
              <button onClick={() => onToggle(t.id)}>
                {t.completed ? "Undo" : "Complete"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Day141;
