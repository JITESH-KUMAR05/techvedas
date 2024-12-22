import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import BlogList from './components/BlogList';
import Blog from './components/Blog';
import Chatbot from './components/Chatbot'; // Import the Chatbot component

function App() {
  const [blogs, setBlogs] = useState([]);

  const handleLike = async (id) => {
    try {
      await axios.post(`http://localhost:5000/posts/${id}/like`);
      setBlogs(blogs.map(blog => blog._id === id ? { ...blog, likes: blog.likes + 1 } : blog));
    } catch (error) {
      console.error('There was an error liking the blog!', error);
    }
  };

  return (
    <Router>
      <div className="flex flex-col h-screen">
        <header className="h-1/6">
          <Header />
        </header>
        <main className="flex-grow overflow-auto">
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/blogs" element={<BlogList />} />
            <Route path="/blog/:id" element={<Blog onLike={handleLike} />} />
          </Routes>
        </main>
        <footer className="h-1/6">
          <Footer />
        </footer>
        <Chatbot /> 
      </div>
    </Router>
  );
}

export default App;