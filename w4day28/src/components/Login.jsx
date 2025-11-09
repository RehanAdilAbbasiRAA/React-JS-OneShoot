import React, { useState } from "react";
import { loginUser } from "../api/authApi";
import Signup from "./signup";

const Login = () => {
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
      setError("");
      alert(`Login Successful with details ${email}`);
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      setEmail("");
      setPassword("");
      window.location.replace("/dashboard");
    } else {
      console.log(result.message);
      setError(result.message); // Show "Invalid credentials" or network errors
      return;
    }
  };
  return (
    <div className="main flex justify-center items-center h-screen bg-gray-300">
      {/* login form*/}
      {isFlipped ? (
        <div className="box1 flex flex-col justify-center items-center h-[60vh] w-[40vw] bg-white rounded-4xl p-8 shadow-lg">
          <h1 className="text-3xl font-bold mb-6">LOGIN</h1>
          <div className="error text-2xl text-red-500 font-bold">{error}</div>
          <div className="form w-full">
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="flex flex-col gap-4"
            >
              <label htmlFor="email" className="text-gray-700 font-medium">
                Email :
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
              />

              <label htmlFor="password" className="text-gray-700 font-medium">
                Password :
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
              />
              <input
                type="submit"
                value="Login"
                className="bg-amber-300 hover:bg-amber-400 text-white font-bold py-2 px-4 rounded-lg"
              />
            </form>
            <div className="center flex justify-center items-center">
              <button
                onClick={() => setIsFlipped(false)}
                className="mt-4 text-blue-500 hover:underline"
              >
                Create an account ? Signup
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Signup setIsFlipped={setIsFlipped}/>
      )}
    </div>
  );
};

export default Login;
