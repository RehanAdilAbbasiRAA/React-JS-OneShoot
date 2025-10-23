import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom";

const AddTask = ({tasks,setTask}) => {
    console.log("AddTask")
            const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  
  const onSubmit = (data) => {console.log(data)
        const newTask = {
      id: Date.now(),       // unique id
      text: data.text,      // text from form
      completed: false      // default value
    };
    setTask([...tasks,newTask])
    navigate("/"); // redirect to blogs page

  }

  console.log(watch("text")) // watch input value by passing the name of it


  return (
    <>
    <h2>AddTask Page</h2>

    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input defaultValue="text" {...register("text",{ required: true }) } />

      {/* errors will return when field validation fails  */}
      {errors.text && <span>This field is required</span>}

      <input type="submit" />
    </form>

    </>
  )
}

export default AddTask