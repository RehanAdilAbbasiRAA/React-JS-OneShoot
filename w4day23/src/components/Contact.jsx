import React from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";

const Contact = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset, // this reset all form inputs
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    alert("Form Submited Successfully ✅")
    reset(); // <-- THIS CLEARS ALL INPUTS
    
  }
  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <div className="main  min-h-screen text-center p-4">
      <h1 className="text-3xl font-bold mb-4">Contact Me ☎️</h1>

      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <div className="leftCard shadow-lg dark:shadow-white/60 flex-1 left  transition-transform duration-300 hover:scale-102">
          <p className="text-xl font-bold mb-2 mt-6 hover:cursor-pointer mx-2">
            Rehan Adil Full Stack Developer
          </p>
          <p className=" text-sm m-4 hover:cursor-pointer">
            Full Stack Developer (Flask, FastAPI, Node.js) with proven
            experience delivering scalable applications in e-commerce,
            healthcare, fintech, and education. Skilled in RESTful APIs, JWT
            authentication, real-time systems (Socket.IO), and database
            management (MySQL, MongoDB). Strong expertise in multi-threading,
            multi-processing, and end-to-end project delivery with a focus on
            clean, maintainable code.
          </p>
          <div className="flex flex-row gap-4.5 socialLink justify-center hover:cursor-pointer ">
            <span className="bg-blue-100 text-blue-700  px-1.5 rounded-md text-sm  hover:bg-blue-500 hover:text-white">
              Facebook
            </span>
            <span className="bg-blue-100 text-blue-700  px-1.5 rounded-md text-sm  hover:bg-blue-500 hover:text-white">
              Instagram
            </span>
          </div>
          <div className="personalLink flex flex-row gap-4.5 socialLink justify-center mt-2 hover:cursor-pointer">
            <span className="bg-blue-100 text-blue-700  px-1.5 rounded-md text-sm  hover:bg-blue-500 hover:text-white">
              Gmail
            </span>
            <span className="bg-blue-100 text-blue-700  px-1.5 rounded-md text-sm  hover:bg-blue-500 hover:text-white">
              Phone
            </span>
          </div>
          <div className="location hover:cursor-pointer mt-4 mb-4">
            <b> Barakahu, Islamabad, Pakistan </b>
          </div>
        </div>

        <div className="rightCard shadow-lg dark:shadow-white/60 flex-1 right transition-transform duration-300 hover:scale-102">
          <div className="form mt-6 mx-10 flex flex-col items-start mb-4">
            <h2 className="text-xl font-bold mb-4 m-auto">Contact Form</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* register your input into the hook by invoking the "register" function */}
              {errors.name && (
                <span className="text-red-600 text-sm">
                  {errors.name.message}
                </span>
              )}
              <label htmlFor="name" className="text-lg font-bold">
                Name{" "}
              </label>
              <input
                className="w-full p-2 border border-gray-500 rounded-md "
                defaultValue="" placeholder="Rehan"
                {...register("name", { required: "Name is required" })}
              />


              {errors.email && (
                <span className="text-red-600 text-sm">
                  {errors.email.message}
                </span>
              )}
              <label htmlFor="email" className="text-lg font-bold">Email </label>
              <input
                className="w-full p-2 border border-gray-500 rounded-md"
                defaultValue="" placeholder="example@gmail.com"
                {...register("email", { required: "Email is required" })}
              />

              {errors.message && (
                <span className="text-red-600 text-sm">
                  {errors.message.message}
                </span>
              )}
              <label htmlFor="Message" className="text-lg font-bold">Message</label>
              <input
                className="w-full p-2 border border-gray-500 rounded-md text-black"
                defaultValue=""
                {...register("message", { required: "Message is required" })}
              />


              <input type="submit"  className="text-lg font-bold border-2 mt-4 p-2 border-gray-400  hover:cursor-cell hover:bg-blue-200 hover:border-blue-500 rounded-md"/>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
