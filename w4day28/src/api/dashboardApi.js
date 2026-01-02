//    # get projects, add project, delete project
const BASE_URL = "http://localhost:8000"; // Your FastAPI backend
import { fetchWithAuth } from "./authApi";

export const getUserProfile = async (userId) => {
  // check_protected=await fetch()
  return await fetchWithAuth(`/getUser/profile/${userId}`, "GET");
};
export const setUserProfile = async (userId, payload) => {
  try {
    return await fetchWithAuth(`/setUser/profile/${userId}`, "POST", payload);
  } catch (error) {
    console.log(error);
    return { message: "Network error" };
  }
};

export const getUserInfo = async (userId) => {
  try {
    return await fetchWithAuth(`/getuserInfo/${userId}`, "GET");
  } catch (error) {
    console.log(error);
    return { message: "Network error" };
  }
};

export const getUserProjects = async (userId) => {
  try {
    const data = await fetchWithAuth(`/getUserProjects/${userId}`, "GET");
    console.log("API getUserProjects data:", data);
    return data;
  } catch (error) {
    console.log(error);
    return { message: "Network error" };
  }
};

export const getUserTemplates = async (userId) => {
  try {
    const data = await fetchWithAuth(`/getUserTemplates/${userId}`, "GET");
    console.log("API getUserProjects data:", data);
    return data;
  } catch (error) {
    console.log(error);
    return { message: "Network error" };
  }
};

export const getUserStats = async (userId) => {
  try {
    const data = await fetchWithAuth(`/getUserStats/${userId}`, "GET");
    console.log("API getUserProjects data:", data);
    return data;
  } catch (error) {
    console.log(error);
    return { message: "Network error" };
  }
};

export const getAllTemplates = async () => {
  try {
    const data = await fetchWithAuth(`/getAllTemplates`, "GET");
    console.log("API getAllTemplates data:", data);
    return data;
  } catch (error) {
    console.log(error);
    return { message: "Network error" };
  }
};

export const createProject = async (payload, email) => {
  try {
    // Merge email into the project payload
    const body = { ...payload, email };

    console.log("API createProject payload:", body);

    const data = await fetchWithAuth("/user/addProject", "POST", body);

    console.log("API createProject data:", data);
    return data;
  } catch (error) {
    console.log(error);
    return { message: "Network error" };
  }
};

export const addProject = async(payload) => {
  await fetchWithAuth("/user/addProject", "POST", payload);
};

export const updateProject = async (email,id, payload) =>
  await fetchWithAuth(`/user/updateProject/${email}/${id}`, "PUT", payload);

export const deleteUserProject = async(email,project_id) =>
  await fetchWithAuth(`/user/deleteProject/${project_id}/${email}`, "DELETE");

export const getSingleProject = async(email,id) =>{
  try{
    console.log("API getSingleProject called with:", email, id);
    const data=await fetchWithAuth(`/user/project/${email}/${id}`, "GET");
    console.log("API getSingleProject data:", data);
    return data.project;
  }
  catch(error){
    console.log(error);
    return { message: "Network error" };
  }

}
