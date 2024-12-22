import React from 'react';

const Post = ({ title, content, date }) => {
  return (
    <div className="container mx-auto my-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-gray-500 text-sm mb-4">{date}</p>
        <div className="text-gray-700">
          {content}
        </div>
      </div>
    </div>
  );
};

export default Post;