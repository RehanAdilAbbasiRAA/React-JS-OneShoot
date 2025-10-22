import React from 'react'
import { Link } from "react-router-dom";

const Home = () => {
  return (
      <> 
      <div>We are at home Page</div>
      <Link to={`/blogs`}>See Blogs</Link>
      <br />
      <Link to={`/AddBlog`}>Add Blog</Link>

      </>
  )
}

export default Home