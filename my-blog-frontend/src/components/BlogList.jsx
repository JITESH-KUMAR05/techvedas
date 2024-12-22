import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://techvedas-backend.onrender.com/posts');
        setBlogs(response.data);
      } catch (error) {
        console.error('There was an error fetching the blogs!', error);
      }
    };

    fetchBlogs();
  }, []);

  const handleLike = async (id) => {
    try {
      await axios.post(`https://techvedas-backend.onrender.com/posts/${id}/like`);
      setBlogs(blogs.map(blog => blog._id === id ? { ...blog, likes: blog.likes + 1 } : blog));
    } catch (error) {
      console.error('There was an error liking the blog!', error);
    }
  };

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-3xl font-bold mb-6">All Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map(blog => (
          <div key={blog._id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
            <p className="text-gray-700 mb-4">{blog.content}</p>
            <p className="text-gray-500 text-sm">{new Date(blog.date).toLocaleDateString()}</p>
            <button
              onClick={() => handleLike(blog._id)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Like ({blog.likes})
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;