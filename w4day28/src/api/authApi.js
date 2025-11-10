// # login, register, refresh token
// AuthAPI.js
const BASE_URL = "http://localhost:8000"; // Your FastAPI server

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/login/${email}/${password}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    return data; // { User: {...}, message: "Login successful" } or { message: "Invalid credentials" }
  } catch (error) {
    console.error("Error logging in:", error);
    return { message: "Network error" };
  }
};

export const registerUser = async (email, password,name,sex) => {
    try {
        const reponse =await fetch( `${BASE_URL}/register/${email}/${password}/${name}/${sex}`,
            {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
                    }
            }
  );
    const data = await reponse.json();
    return data;


    }
    catch(error){
            console.log("Error Logging : ",error)
            return {message:"Network Error"}
    }

}