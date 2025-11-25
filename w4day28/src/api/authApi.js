// AuthAPI.js
const BASE_URL = "http://localhost:8000"; // Your FastAPI backend

// -------------------- LOGIN --------------------
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/login/${email}/${password}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);


    // If login successful, save tokens to localStorage
    if (data.access_token && data.refresh_token) {
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
    }

    return data; // {access_token, refresh_token, user, message}
  } catch (error) {
    console.error("Error logging in:", error);
    return { message: "Network error" };
  }
};

// -------------------- REGISTER --------------------
export const registerUser = async (email, password, name, sex) => {
  try {
    const response = await fetch(
      `${BASE_URL}/register/${email}/${password}/${name}/${sex}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error registering:", error);
    return { message: "Network error" };
  }
};

// -------------------- REFRESH TOKEN --------------------
export const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) {
      console.warn("No refresh token found!");
      return null;
    }

    const response = await fetch(`${BASE_URL}/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
    console.log("Refresh token response status:", response);
    const data = await response.json();
    console.log("Refresh token response:", data);

    // If success, update the new access token
    if (data.access_token) {
      localStorage.setItem("access_token", data.access_token);
    }

    return data;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return { message: "Network error" };
  }
};

// -------------------- API WITH TOKEN --------------------
export const fetchWithAuth = async (endpoint, method = "GET", body = null) => {
  try {
    const token = localStorage.getItem("access_token");
    const headers = {
      "Content-Type": "application/json",
    };

    // if token available, add it to Authorization header
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });
      console.log("main fetchWithAuth Without Refresh:", token);

    // If token expired (401), try to refresh
    if (response.status === 401) {
      console.log("Access token expired, attempting to refresh...");
      const refreshed = await refreshAccessToken();
      if (refreshed && refreshed.access_token) {
        // Retry the same request again with the new token
        const data=await fetchWithAuth(endpoint, method, body);
        console.log("Retried fetchWithAuth after refresh:", refreshed.access_token);
        return data;
      } else {
        console.warn("Refresh failed. Please log in again.");
        return { message: "Session expired. Please log in again." };
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { message: "Network error" };
  }
};


export const getTasks = async () => {
  return await fetchWithAuth("/gettasks", "GET");
};