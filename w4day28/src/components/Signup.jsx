import React from 'react'
import { registerUser } from "../api/authApi";
import { useState } from "react";
import { data } from 'react-router-dom';

const Signup = ({setIsFlipped}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sex, setSex] = useState("");
  const [error, setError] = useState("");
    const handleSignup = async (e) => {
    e.preventDefault();
    // collect signup data, API integration can be done here
    console.log({ name, email, password, phone, sex });
    // alert("Signup data collected! Check console.");
    const data = await registerUser(email, password,name, sex);
    setError(data.message);
    // setEmail("");
    // setPassword("");
    // setName("");
    // setPhone("");
    // setSex(""); 
    // setIsFlipped(true);
  };

  return (
            <div className="box1 flex flex-col justify-center items-center h-[80vh] w-[40vw] bg-white rounded-4xl p-8 shadow-lg">
          <h1 className="text-3xl font-bold mb-6">SIGNUP</h1>
          <div className="error text-2xl text-red-500 font-bold">{error}</div>

          {/* Signup form*/}
          <div className=" form w-full">
            <form
              onSubmit={(e) => handleSignup(e)}
              className="flex flex-col gap-4"
            >
              <label htmlFor="password" className="text-gray-700 font-medium">
                Name :
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
              />

              <label htmlFor="email" className="text-gray-700 font-medium">
                Email :
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
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
                required
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
              />

              <label className="text-gray-700 font-medium">SEX :</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="sex"
                    value="male"
                    required
                    checked={sex === "male"}
                    onChange={(e) => setSex(e.target.value)}
                    className="accent-amber-400"
                  />
                  Male
                </label>

                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="sex"
                    value="female"
                    checked={sex === "female"}
                    onChange={(e) => setSex(e.target.value)}
                    className="accent-amber-400"
                  />
                  Female
                </label>
              </div>

              <input
                type="submit"
                value="SignUp"
                className="bg-amber-300 hover:bg-amber-400 text-white font-bold py-2 px-4 rounded-lg"
              />
            </form>
            <div className="center flex justify-center items-center">
              <button
                onClick={() => setIsFlipped(true)}
                className="mt-4 text-blue-500 hover:underline"
              >
                Already have an account? Login
              </button>
            </div>
          </div>
        </div>
  )
}

export default Signup;