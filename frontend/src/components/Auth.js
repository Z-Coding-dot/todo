import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function Auth() {
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between Login and Sign Up
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Error handling
  const navigate = useNavigate();

  // In Auth.js
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', { username, email, password });
    const endpoint = isSignUp ? '/signup' : '/login';
    try {
      const response = await axios.post(`http://localhost:5000${endpoint}`, { username, email, password });
      console.log('Response:', response.data);
  
      if (isSignUp) {
        alert('Sign Up Successful! Please log in.');
        setIsSignUp(false); // Switch to login mode
      } else {
        localStorage.setItem('token', response.data.token);
        navigate('/todo');
      }
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      setErrorMessage(error.response?.data?.error || 'Something went wrong! Please try again.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg" style={{ width: '400px' }}>
        <h2 className="text-center mb-4">{isSignUp ? 'Sign Up' : 'Login'}</h2>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          )}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>
        </form>
        <div className="text-center mt-3">
          <small>
            {isSignUp ? (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  className="btn btn-link p-0"
                  onClick={() => setIsSignUp(false)}
                >
                  Login
                </button>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <button
                  type="button"
                  className="btn btn-link p-0"
                  onClick={() => setIsSignUp(true)}
                >
                  Sign Up
                </button>
              </>
            )}
          </small>
        </div>
      </div>
    </div>
  );
}

export default Auth;