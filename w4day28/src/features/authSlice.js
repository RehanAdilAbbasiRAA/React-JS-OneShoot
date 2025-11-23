import { createSlice } from "@reduxjs/toolkit";
const storedUser = localStorage.getItem("user");
const storedUserData = localStorage.getItem("user_data");

let parsedUser = null;
let lightUser = null;
if (storedUserData) {
  try {
    parsedUser = JSON.parse(storedUserData);
    lightUser = {
      user_id: parsedUser.user_id,
      name: parsedUser.name,
      email: parsedUser.email,
    };
  } catch (err) {
    console.error("Invalid stored user JSON:", err);
  }
}

const initialState = {
  isAuthenticated: storedUser ? true : false,
  user: storedUser ? JSON.parse(storedUser) : null,
  user_data: lightUser ? lightUser : null,
};
// const initialState = {
//   isAuthenticated: false,
//   user: null, // You can store name, email, token, etc.
// };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { user_id, name, email, access_token, refresh_token, fullUser } =
        action.payload;

      state.isAuthenticated = true;

      // If you want to store the full backend user object
      state.user = fullUser || null;

      // Only storing the parts you need
      state.user_data = parsedUser||{ user_id, name, email };

      // Store tokens if needed
      state.tokens = {
        access: access_token || null,
        refresh: refresh_token || null,
      };
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.user_data = null;
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
