import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleProfileClick = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const response = await axios.get(`${backendUrl}/user/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const username = response.data.username;
      navigate(`/${username}`);
    } catch (error) {
      console.error('There was an error fetching the user info!', error);
      navigate('/signin');
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    navigate('/signin');
  };

  return (
    <header className="bg-gray-800 text-white shadow-md h-full flex items-center">
      <div className="container mx-auto flex justify-between items-center px-10 py-2">
        <div className="text-2xl font-bold">
          <a href="/">TechVedas</a>
        </div>
        <nav className="space-x-4">
          <Link to="/" className="hover:text-gray-400">Home</Link>
          <Link to="/create" className="hover:text-gray-400">Create</Link>
          <Link to="/blogs" className="hover:text-gray-400">Blogs</Link>
          {isAuthenticated ? (
            <>
              <button onClick={handleProfileClick} className="hover:text-gray-400">Profile</button>
              <button onClick={handleSignOut} className="hover:text-gray-400">Sign Out</button>
            </>
          ) : (
            <Link to="/signin" className="hover:text-gray-400">Sign In</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;