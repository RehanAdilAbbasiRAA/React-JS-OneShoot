import React from 'react'
import {BlogContext} from '../BlogContext/BlogPosts';
import { useContext } from 'react';
import { Link } from "react-router-dom";

const Blogs = () => {

        const { posts } = useContext(BlogContext)
  return (

    <>
    <div>Here Are My Blogs </div>
            {posts.length===0 && <h2> No Blogs avalible right now </h2>}

            {posts.map((post,index)=>(
                <div className="posts">

                <li key={index}><b> S.No:{index+1} </b>  {post.title}    {post.author} </li>
                <br />
                <Link to={`/blog_details/${index}`}>See Details</Link>
                </div>
            ))}
    </>
  )
}

export default Blogs