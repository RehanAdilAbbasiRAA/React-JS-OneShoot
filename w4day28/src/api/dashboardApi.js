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