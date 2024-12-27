import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Header from './components/Header';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <div className="flex flex-col h-screen">
        <header className="h-1/6">
          <Header />
        </header>
        <main className="flex-grow px-10 container overflow-auto">
          <Routes>
            <Route path="/" element={isAuthenticated ? <PostList /> : <Navigate to="/signin" />} />
            <Route path="/create" element={isAuthenticated ? <CreatePost /> : <Navigate to="/signin" />} />
            <Route path="/signin" element={isAuthenticated ? <Navigate to = "/" /> : <Signin setIsAuthenticated = {setIsAuthenticated} />} />
            <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <Signup /> } />
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