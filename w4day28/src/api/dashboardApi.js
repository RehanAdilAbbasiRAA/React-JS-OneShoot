//    # get projects, add project, delete project
const BASE_URL = "http://localhost:8000"; // Your FastAPI backend
import { fetchWithAuth } from "./authApi";

export const getUserProfile = async (userId) => {
  // check_protected=await fetch()
  return await fetchWithAuth(`/user/profile/${userId}`, "GET");
};
export const setUserProfile = async (userId, payload) => {
  try {
    return await fetchWithAuth(`/user/profile/${userId}`, "POST", payload);
  } catch (error) {
    console.log(error);
    return { message: "Network error" };
  }
};


export const getUserInfo = async (userId) => {
    try{
        return await fetchWithAuth(`/getuserInfo/${userId}`, "GET");
    } catch (error) {
    console.log(error);
    return { message: "Network error" };
  }
};

export const getUserProjects = async (userId) => {
    try{
        const data=await fetchWithAuth(`/getUserProjects/${userId}`, "GET");
        console.log("API getUserProjects data:", data);
        return data;
    } catch (error) {
    console.log(error);
    return { message: "Network error" };
  }
};

export const getUserTemplates = async (userId) => {
    try{
        const data=await fetchWithAuth(`/getUserTemplates/${userId}`, "GET");
        console.log("API getUserProjects data:", data);
        return data;
    } catch (error) {
    console.log(error);
    return { message: "Network error" };
  }
};

export const getUserStats = async (userId) => {
    try{
        const data=await fetchWithAuth(`/getUserStats/${userId}`, "GET");
        console.log("API getUserProjects data:", data);
        return data;
    } catch (error) {
    console.log(error);
    return { message: "Network error" };
  }
};

export const getAllTemplates = async () => {
    try{
        const data=await fetchWithAuth(`/getAllTemplates`, "GET");
        console.log("API getAllTemplates data:", data);
        return data;
    } catch (error) {
    console.log(error);
    return { message: "Network error" };
  }
};



export const createProject = (payload) =>
  fetchWithAuth("/user/addProject", "POST", payload);

export const updateProject = (id, payload) =>
  fetchWithAuth(`/user/updateProject/${id}`, "PUT", payload);

export const deleteUserProject = (id) =>
  fetchWithAuth(`/user/deleteProject/${id}`, "DELETE");

export const getSingleProject = (id) =>
  fetchWithAuth(`/user/project/${id}`, "GET");
