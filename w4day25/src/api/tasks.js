import API from "./axios";
// Read All Tasks
export const getTasks = () => API.get("/gettasks");
// Create New Task
export const addTask = (task) => API.post("/addtask", task);
// Update Task
export const updateTask = (id, task) => API.put(`/updatetask/${id}`, task);
// Delete Task
export const deleteTask = (id) => API.delete(`/deltask/${id}`);
