import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/posts`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setPosts(response.data);
    };

    fetchUserPosts();
  }, []);

  return (
    <div>
      <h1>Your Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post._id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserPosts;