import React from 'react';

const Blog = ({ title, content, date, likes, onLike }) => {
  return (
    <div className="container mx-auto my-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-gray-500 text-sm mb-4">{date}</p>
        <div className="text-gray-700 mb-4">
          {content}
        </div>
        <button
          onClick={onLike}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Like ({likes})
        </button>
      </div>
    </div>
  );
};

export default Blog;