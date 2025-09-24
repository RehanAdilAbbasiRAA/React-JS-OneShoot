

import PropTypes from 'prop-types'
import axios from "axios"
import React,{useState,useEffect} from 'react'

function PostList(props) {
    const [post,setPost]=useState([]) 
    const [load,setLoad]=useState(true) 
    const [error,setError]=useState(null) 

    const [search, setSearch] = useState(""); // for search input
    const [visibleCount, setVisibleCount] = useState(10); // show 10 initially
        const getPost=(e)=>{
            axios.get("https://jsonplaceholder.typicode.com/posts")
            .then(res=>{setPost(res.data); setLoad(false)})
            .catch(err=>{console.error("Error fetching joke:", err); setError(err.message);setLoad(false)});
        }
        useEffect(() => {
            console.log("Component mounted");
            getPost();
        }, []); // empty array → runs only on mount
        if (load) return <h2> loading</h2>;
        if (error) return <h2> Error: {error}</h2>;

          // filter posts by search text
        const filterPost=post.filter((i)=>i.title.toLowerCase().includes(search.toLowerCase()));

        // only show visibleCount posts
        const visiblePost=filterPost.slice(0,visibleCount)
        // alert(`Filtered posts count: ${filterPost.length}`)

    return (
         <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h1>Post List</h1>

      {/* Search box */}
      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "16px" }}
      />

      <ol>
        {visiblePost.map((i) => (
        <li key={i.id}>
            <h3>{i.title}</h3>
            <p>{i.body}</p>
        </li>
        ))}
      </ol>

      {/* Load More button */}
        <button 
        disabled={visibleCount >= filterPost.length} 
        onClick={() => setVisibleCount(prev => prev + 10)}
        >
        Load More
        </button>
    </div>
        
    );
    }


PostList.propTypes = {}

export default PostList
