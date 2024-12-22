import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white shadow-md h-full flex items-center">
      <div className="container  mx-auto flex justify-between items-center px-10 py-2">
        <div className="text-2xl font-bold">
          <a href="/">TechVedas</a>
        </div>
        <nav className="space-x-4">
          <Link to="/" className="hover:text-gray-400">Home</Link>
          <Link to="/create" className="hover:text-gray-400">Create</Link>
          <Link to="/blogs" className="hover:text-gray-400">Blogs</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;