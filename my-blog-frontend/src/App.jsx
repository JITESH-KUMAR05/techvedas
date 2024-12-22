import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';

function App() {
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
          </Routes>
        </main>
        <footer className="h-1/6">
          <Footer />
        </footer>
      </div>
    </Router>
  );
}

export default App;