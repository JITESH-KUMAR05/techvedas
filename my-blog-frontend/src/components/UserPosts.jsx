import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const { username } = useParams(); // Get the username from the URL parameters

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await axios.get(`${backendUrl}/user/${username}/posts`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setPosts(response.data);
      } catch (error) {
        console.error('There was an error fetching the user posts!', error);
      }
    };

    fetchUserPosts();
  }, [username]);

  return (
    <div>
      <h1>{username}'s Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post._id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserPosts;