import React, { createContext,useState,useEffect } from 'react'

export const BlogContext = createContext()


export const BlogPosts = ({children}) => {
    const [posts,setPosts] = useState(()=>{
        const localData = localStorage.getItem("posts")
        return localData ? JSON.parse(localData) : []
    })

    useEffect(()=>{
        localStorage.setItem("posts",JSON.stringify(posts))
    },[posts])
  
  return (
    <BlogContext.Provider value={{posts,setPosts}}>
      {children}
    </BlogContext.Provider>
  )
}

export default BlogPosts