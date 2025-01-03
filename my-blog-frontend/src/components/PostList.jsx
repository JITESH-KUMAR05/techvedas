import React, { useEffect, useState } from "react";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const PostList = () => {
  const [latestPosts, setLatestPosts] = useState([]);
  const [topPosts, setTopPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${backendUrl}/posts`);
        setLatestPosts(response.data);
      } catch (error) {
        console.error("There was an error fetching the latest posts!", error);
      }
    };

    const fetchTopPosts = async () => {
      try {
        const response = await axios.get(`${backendUrl}/posts/top`);
        setTopPosts(response.data);
      } catch (error) {
        console.error("There was an error fetching the top posts!", error);
      }
    };

    fetchPosts();
    fetchTopPosts();
  }, []);

  const handleLike = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      
      await axios.post(
        `${backendUrl}/posts/${id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      // Update posts after successful like
      const response = await axios.get(`${backendUrl}/posts`);
      setLatestPosts(response.data);
      
      const topResponse = await axios.get(`${backendUrl}/posts/top`);
      setTopPosts(topResponse.data);
    } catch (error) {
      console.error("There was an error liking the post!", error);
    }
  };

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-3xl font-bold mb-6">Latest Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestPosts.map((post) => (
          <div key={post._id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
            <p className="text-gray-700 mb-4">{post.content}</p>
            <p className="text-gray-500 text-sm">
              {new Date(post.date).toLocaleDateString()}
            </p>
            <p className="text-gray-500 text-sm">By {post.author}</p>
            <button
              onClick={() => handleLike(post._id)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Like ({post.likes?.length || 0})
            </button>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6">Top Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topPosts.map((post) => (
          <div key={post._id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
            <p className="text-gray-700 mb-4">{post.content}</p>
            <p className="text-gray-500 text-sm">
              {new Date(post.date).toLocaleDateString()}
            </p>
            <p className="text-gray-500 text-sm">By {post.author}</p>
            <button
              onClick={() => handleLike(post._id)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Like ({post.likes?.length || 0})
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;