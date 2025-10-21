import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"

function App() {

    const {
    register,
    handleSubmit,
    setError,
    formState: { errors ,isSubmitting},
  } = useForm();
  const onSubmit= async (data) => { 
    // await delay(1);
    console.log("Form Data : ",data);


    try {
    const res = await fetch("http://127.0.0.1:8000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    console.log("Server Response:", result);

    if (result.status === "error") {
      setError("check", { message: result.message });
    } else {
      alert("Signup successful!");
    }

  } catch (err) {
    console.error("Error:", err);
    setError("check", { message: "Failed to connect to server" });
  }

    // if (data.pass==="123456"){
    //     setError("check",{message:"password is Incorrect on Server"})
    // }
  }

  const delay= async (d)=>{
    return new Promise((resolve,reject)=>{
      setTimeout(() => {
        resolve();
      }, d*1000);
    })
  }
  

  return (
    <>

    <form onSubmit={handleSubmit(onSubmit)} >
      {isSubmitting && <h1>Loading ....</h1>}
      <h3>Signup Form</h3>
       {errors.name && <span>Name field is required</span>}
      <label htmlFor="name"> Name :</label>
      <input type="text" {...register("name", { required: true , minLength: 3})} />
      <br />

       {/* {errors.pass && <span>Password field is required</span>} */}
       {errors.pass && <span>{errors.pass.message}</span>}
      <label htmlFor="pass" > Password :</label>
      <input type="password" {...register("pass", { required: true ,maxLength: {value: 10,message:"max password length is 10"}, minLength: {value:3,message:"min password length is 3"} })} />
      <br />

      <input type="submit"  disabled={isSubmitting} />
      {errors.check && <h1>{errors.check.message}</h1>}
      <br />

    </form>
    </>
  );
}

export default App;
