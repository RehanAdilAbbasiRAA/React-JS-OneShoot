import logo from './logo.svg';
import './App.css';
import {BlogContext} from './BlogContext/BlogPosts';
import { useContext } from 'react';
import Blogs from './Components/Blogs';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from './Components/Home';
import AddBlog from './Components/AddBlog';
import BlogDetails from './Components/BlogDetails';

function App() {
  const { posts } = useContext(BlogContext)
  return (
    <>
    <BrowserRouter>

        <div className="main">
          <h2>Hello to <b> Rehan's </b> Blog Page ✅</h2>

            <Routes>
              <Route path="/" element={<Home></Home>}></Route>
              <Route path="/blogs" element={<Blogs></Blogs>}></Route>
              <Route path="/blog_details/:index" element={<BlogDetails></BlogDetails>}></Route>
              <Route path="/AddBlog" element={<AddBlog></AddBlog>}></Route>

            </Routes>



        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
