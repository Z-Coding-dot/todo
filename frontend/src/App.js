import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Todo from './components/Todo';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Profile from './components/Profile'; // Add this line

function App() {
  return (
    <Router>
      <div>
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/profile" element={<Profile />} /> {/* Add this line */}
      </Routes>
      <div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;