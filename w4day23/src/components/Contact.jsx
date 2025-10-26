import React from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";

const Contact = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <div className="bg-gray-200 min-h-screen text-center p-4 ">
      <h1 className="text-3xl font-bold mb-4">Contact Me ☎️</h1>

      <div className="leftCard flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 h-[70vh]">
        <div className="flex-1 left h-full bg-gray-300  transition-transform duration-300 hover:scale-105">
          <p className="text-xl font-bold mb-2 mt-6 hover:cursor-pointer">
            Rehan Adil Full Stack Developer
          </p>
          <p className="text-gray-800 text-sm m-4 hover:cursor-pointer">
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
          <div className="location hover:cursor-pointer mt-4">
            {" "}
            <b> Barakahu, Islamabad, Pakistan </b>
          </div>
        </div>

        <div className="rightCard flex-1 right bg-gray-300 h-full transition-transform duration-300 hover:scale-105">
          <div className="form mt-6 mx-10 flex flex-col items-start ">
            <h2 className="text-xl font-bold mb-4">Contact Form</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* register your input into the hook by invoking the "register" function */}
              <label htmlFor="name" className="text-lg font-bold">
                Name{" "}
              </label>
              <input
                className="w-full p-2 border border-gray-500 rounded-md bg-white text-black"
                defaultValue="" placeholder="Rehan"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <span className="text-red-600 text-sm">
                  {errors.name.message}
                </span>
              )}

              <label htmlFor="email" className="text-lg font-bold">Email </label>
              <input
                className="w-full p-2 border border-gray-500 rounded-md bg-white text-black"
                defaultValue="" placeholder="example@gmail.com"
                {...register("email", { required: "Email is required" })}
              />
              {errors.name && (
                <span className="text-red-600 text-sm">
                  {errors.name.message}
                </span>
              )}

              <label htmlFor="Message" className="text-lg font-bold">Message</label>
              <input
                className="w-full p-2 border border-gray-500 rounded-md bg-white text-black"
                defaultValue=""
                {...register("message", { required: "Message is required" })}
              />
              {errors.name && (
                <span className="text-red-600 text-sm">
                  {errors.name.message}
                </span>
              )}

              {/* errors will return when field validation fails  */}
              {errors.exampleRequired && <span>This field is required</span>}

              <input type="submit"  className="text-lg font-bold"/>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
