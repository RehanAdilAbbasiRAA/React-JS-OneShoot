import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { loginUser } from "../api/authApi";

import { useSelector } from "react-redux"; // Import useSelector to Read data From Redux Store
import { useDispatch } from "react-redux"; //To update data (dispatch login/logout):
import { login, logout } from "../features/authSlice"; //To update data (dispatch login/logout):

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // to use toast we import it

const LoginSignup = () => {
  const dispatch = useDispatch(); //To update data (dispatch login/logout):
  const { isAuthenticated, user } = useSelector((state) => state.auth); // Import useSelector to Read data From Redux Store
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sex, setSex] = useState("");
  const [error, setError] = useState("");
  const [isFlipped, setIsFlipped] = useState(true); // toggle login/signup

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError("Email and password cannot be empty");
      return; // stop submission
    } else if (!email.endsWith("@gmail.com") || !email.includes("@")) {
      setError("Invalid Email");
      return;
    } else if (password.length < 6) {
      setError("Password is too short");
      return;
    }
    // Call API
    const result = await loginUser(email, password);

    if (result.message === "Login successful") {
      // Inside handleSubmit after successful login
      if (result.access_token && result.refresh_token) {
        localStorage.setItem("access_token", result.access_token);
        localStorage.setItem("refresh_token", result.refresh_token);
      }
      setError("");
      // alert(`Login Successful with details ${email}`);
      const userData = {
        user_id: result.user_id,
        email: result.email,
        name: result.name,
      };
      localStorage.setItem("user_data", JSON.stringify(userData)); //✔️ And remember: localStorage only stores strings
      localStorage.setItem("user", JSON.stringify(result.user)); // ✅ stringify here
      setEmail("");
      setPassword("");
        dispatch(
          login({
            user_id: result.user_id,
            email: result.email,
            name: result.name,
            access_token: result.access_token,
            refresh_token: result.refresh_token,
            fullUser: result.user
          })
        );
 // Dispatch login action
      toast.success("Login Successful ✅");
      // after login success
      navigate("/dashboard");
    } else {
      toast.error("Login Failed ❌");
      console.log(result.message);
      setError(result.message); // Show "Invalid credentials" or network errors
      return;
    }
  };

  return (
    <>
      {isFlipped ? (
        <Login
          setEmail={setEmail}
          setPassword={setPassword}
          setIsFlipped={setIsFlipped}
          error={error}
          setError={setError}
          handleSubmit={handleSubmit}
          email={email}
          password={password}
          name={name}
          phone={phone}
          sex={sex}
          isFlipped={isFlipped}
          setName={setName}
          setPhone={setPhone}
          setSex={setSex}
        />
      ) : (
        <Signup setIsFlipped={setIsFlipped} />
      )}
    </>
  );
};

export default LoginSignup;
