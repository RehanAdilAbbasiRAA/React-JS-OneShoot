import React from 'react'
import {BlogContext} from '../BlogContext/BlogPosts';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';

const BlogDetails = () => {
            const { posts } = useContext(BlogContext)
            const { index } = useParams(); // 👈 get index from URL

              // find the post based on index
  const post = posts[index];

        // handle invalid index or empty posts
        if (!post) {
            return <h2>Blog not found or no data available. {index}</h2>;
        }

        return (
            <div className="details">
            <h2>Blog Details</h2>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <p><strong>Author:</strong> {post.author}</p>
            </div>
        );
}

export default BlogDetails