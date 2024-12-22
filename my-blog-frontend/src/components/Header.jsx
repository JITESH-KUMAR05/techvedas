import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white shadow-md h-full flex items-center">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-2xl font-bold">
          <a href="/">TechVedas</a>
        </div>
        <nav className="space-x-4">
          <a href="/" className="hover:text-gray-400">Home</a>
          <a href="/create" className="hover:text-gray-400">Create</a>
          <a href="/blogs" className="hover:text-gray-400">Blogs</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;