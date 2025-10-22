import React from 'react'
import {BlogContext} from '../BlogContext/BlogPosts';
import { useContext,useState } from 'react';
import { useNavigate } from "react-router-dom";


const AddBlog = () => {
        const { posts,setPosts } = useContext(BlogContext)
        const [form,setForm] = useState({title:"",body:"",author:""})
        const navigate = useNavigate();
        const handleChange=(e)=>{
            e.preventDefault();
            setForm({ ...form, [e.target.name]: e.target.value })

        }

    const handleSubmit = (e) => {
        e.preventDefault(); // stop reload

        setPosts([...posts,form])

        alert("✅ Form Submitted Successfully!");
        console.log("Form Data:", form);
        setForm({ name: "", email: "", pass: "" });
        navigate("/blogs"); // redirect to blogs page
    };

  return (
    <>
    <div>AddBlog page is Here</div>
    <form onSubmit={(e)=>handleSubmit(e)}>
        <label htmlFor="title">Title :</label>
        <input type="text" name="title" value={form.title} onChange={handleChange}/>
        <br />  
        <label htmlFor="body">Body :</label>
        <input type="text" name="body" value={form.body} onChange={handleChange}/>
        <br />  
        <label htmlFor="author">Author :</label>
        <input type="text" name="author" value={form.author} onChange={handleChange}/>
        <br />  
        
        <input type="submit" />
    </form>
    </>
  )
}

export default AddBlog