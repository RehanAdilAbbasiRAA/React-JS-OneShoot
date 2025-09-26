import { useState, useEffect, useRef } from "react";

function Day14() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({ id: "", text: "", completed: false });
  const [btnDisplay, setDisplay] = useState("none");
  const [data, editTask] = useState({ id: "", text: "", completed: false });
  const btnEdit = useRef(true);

  // ✅ Load tasks from localStorage on first render
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    console.log("Loading from localStorage:", savedTasks);
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // ✅ Save tasks to localStorage whenever tasks change
  useEffect(() => {
     if (tasks.length > 0) {  // 👈 prevent overwriting with []
    console.log("Saving to localStorage:", tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }}, [tasks]);

  const taskDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const taskComplete = (id, completed) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !completed } : task
      )
    );
  };

  const showEdit = (id) => {
    setDisplay("block");
    editTask(tasks.find((task) => task.id === id));
  };

  const taskEdit = (e) => {
    e.preventDefault();
    setTasks(
      tasks.map((task) =>
        task.id === data.id ? { ...task, text: data.text } : task
      )
    );
    setDisplay("none"); // hide the form again
  };

  const getTask = (e) => {
    setTask({ ...task, text: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.text.trim() === "") return;

    const newTask = { ...task, id: Date.now() }; // 👈 assign id here
    setTasks([...tasks, newTask]);
    setTask({ id: "", text: "", completed: false });
  };


  return (
    <>
      <div> Hello </div>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="text"></label>
          <input
            type="text"
            value={task.text}
            placeholder="Enter the Task "
            onChange={getTask}
          />
          <button type="submit"> Add </button>
        </form>
      </div>
      <h1>ToDo Tasks</h1>

      <form style={{ display: btnDisplay, marginBottom: "10px" }} onSubmit={taskEdit}>
        <label htmlFor="edit">Correct the Task </label>
        <input
          type="text"
          value={data.text}
          onChange={(e) => editTask({ ...data, text: e.target.value })}
        />
        <button>Add</button>
      </form>

      <div
        style={{
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
          justifyItems: "center",
          marginBottom: "40px",
        }}
      >
        <table style={{ border: "1px solid black" }}>
          <thead style={{ border: "2px solid black" }}>
            <tr>
              <td>
                <b>S.no </b>
              </td>
              <td>
                <b>Task </b>
              </td>
              <td>
                <b>Completed/InComplete </b>
              </td>
              <td>
                <b>Action </b>
              </td>
            </tr>
          </thead>
          <tbody>
            {tasks.map((i, index) => {
              return (
                <tr key={i.id} style={{ border: "1px solid black" }}>
                  <td> {index + 1}</td>
                  <td> {i.text}</td>
                  <td> {i.completed ? "Completed" : "InComplete"}</td>
                  <td>
                    <button onClick={() => showEdit(i.id)}> Edit </button>
                    <button onClick={() => taskDelete(i.id)}> Delete </button>
                    <button onClick={() => taskComplete(i.id, i.completed)}>
                      {i.completed ? "InCompleted" : "Complete"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Day14;










