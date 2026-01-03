//    # get projects, add project, delete project
const BASE_URL = "http://localhost:8000"; // Your FastAPI backend
import { fetchWithAuth } from "./authApi";

export const getUserProfile = async (userId) => {
  // check_protected=await fetch()
  try{
  return await fetchWithAuth(`/getUser/profile/${userId}`, "GET");
  } catch (error) {
    console.error("Network error:", error)
    throw error // ✅ THIS IS REQUIRED
    // return { message: "Network error" };
  }

};
export const setUserProfile = async (userId, payload) => {
  try {
    return await fetchWithAuth(`/setUser/profile/${userId}`, "POST", payload);
  } catch (error) {
    console.error("Network error:", error)
    throw error // ✅ THIS IS REQUIRED
    // return { message: "Network error" };
  }
};

export const getUserInfo = async (userId) => {
  try {
    const response = await fetchWithAuth(`/getuserInfo/${userId}`, "GET");
    return response
  } catch (error) {
    console.error("Network error:", error)
    throw error // ✅ THIS IS REQUIRED
    // return { message: "Network error" };
  }
};

export const getUserProjects = async (userId) => {
  try {
    const data = await fetchWithAuth(`/getUserProjects/${userId}`, "GET");
    console.log("API getUserProjects data:", data);
    return data;
  } catch (error) {
    console.error("Network error:", error)
    throw error // ✅ THIS IS REQUIRED
    // return { message: "Network error" };
  }
};

export const getUserTemplates = async (userId) => {
  try {
    const data = await fetchWithAuth(`/getUserTemplates/${userId}`, "GET");
    console.log("API getUserProjects data:", data);
    return data;
  } catch (error) {
    console.error("Network error:", error)
    throw error // ✅ THIS IS REQUIRED
    // return { message: "Network error" };
  }
};

export const getUserStats = async (userId) => {
  try {
    const data = await fetchWithAuth(`/getUserStats/${userId}`, "GET");
    console.log("API getUserProjects data:", data);
    return data;
  } catch (error) {
    console.error("Network error:", error)
    throw error // ✅ THIS IS REQUIRED
    // return { message: "Network error" };
  }
};

export const getAllTemplates = async () => {
  try {
    const data = await fetchWithAuth(`/getAllTemplates`, "GET");
    console.log("API getAllTemplates data:", data);
    return data;
  } catch (error) {
    console.error("Network error:", error)
    throw error // ✅ THIS IS REQUIRED
    // return { message: "Network error" };
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
    console.error("Network error:", error)
    throw error // ✅ THIS IS REQUIRED
    // return { message: "Network error" };
  }
};

export const addProject = async(payload) => {
  try {
  await fetchWithAuth("/user/addProject", "POST", payload);
  }
  catch(error){
        console.error("Network error:", error)
    throw error // ✅ THIS IS REQUIRED
  }


};

export const updateProject = async (email,id, payload) =>{
  try {
  await fetchWithAuth(`/user/updateProject/${email}/${id}`, "PUT", payload);
  }
  catch(error){
        console.error("Network error:", error)
    throw error // ✅ THIS IS REQUIRED
  }}

export const deleteUserProject = async(email,project_id) =>{
  try {
  await fetchWithAuth(`/user/deleteProject/${project_id}/${email}`, "DELETE");
  }
  catch(error){
        console.error("Network error:", error)
    throw error // ✅ THIS IS REQUIRED
  }}

export const getSingleProject = async(email,id) =>{
  try{
    console.log("API getSingleProject called with:", email, id);
    const data=await fetchWithAuth(`/user/project/${email}/${id}`, "GET");
    console.log("API getSingleProject data:", data);
    return data.project;
  }
  catch(error){
        console.error("Network error:", error)
    throw error // ✅ THIS IS REQUIRED
    // return { message: "Network error" };
  }

}
