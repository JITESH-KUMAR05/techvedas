import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Header from './components/Header';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import UserPosts from './components/UserPosts';
import AdminDashboard from './components/AdminDashboard'; // Assuming you have an AdminDashboard component
import Blog from './components/Blog';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token validity
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const isValid = decodedToken.exp * 1000 > Date.now();
        setIsAuthenticated(isValid);
        if (!isValid) {
          localStorage.removeItem('token');
        }
      } catch (error) {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      }
    }
  }, []);
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <header className="h-1/6">
          <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        </header>
        <main className="flex-grow px-10 container overflow-auto">
          <Routes>
            <Route path="/" element={isAuthenticated ? <PostList /> : <Navigate to="/signin" />} />
            <Route path="/create" element={isAuthenticated ? <CreatePost /> : <Navigate to="/signin" />} />
            <Route path="/signin" element={isAuthenticated ? <Navigate to="/" /> : <Signin setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <Signup />} />
            <Route path="/profile" element={isAuthenticated ? <UserPosts /> : <Navigate to="/signin" />} />
            <Route path="/blogs" element={<Blog />} />
            <Route path="/admin" element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/signin" />} />
            <Route path="/:username" element={isAuthenticated ? <UserPosts /> : <Navigate to="/signin" />} /> {/* Add this line */}
          </Routes>
        </main>
        <footer className="h-1/6">
          <Footer />
        </footer>
        <Chatbot />
      </div>
    </Router>
  );
};

export default App;