import axios from "axios";
const API = axios.create({
baseURL: "http://localhost:8000", // Your FastAPI URL
});


// Optional: Auto attach token later
// API.interceptors.request.use((req) => {
// const token = localStorage.getItem("token");
// if (token) req.headers.Authorization = `Bearer ${token}`;
// return req;
// });

export default API;