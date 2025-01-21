import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Sign Up
  const [formData, setFormData] = useState({ name: '', email: '', password: '' }); // Form state
  const [errorMessage, setErrorMessage] = useState(''); // Error handling
  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/login' : '/signup';
    try {
      const response = await axios.post(`http://localhost:5000${endpoint}`, formData);

      if (isLogin) {
        // If login is successful, store token and navigate to Todo page
        localStorage.setItem('token', response.data.token);
        navigate('/todo');
      } else {
        // If sign-up is successful, prompt user to log in
        alert('Sign Up Successful! Please log in.');
        setIsLogin(true); // Switch to login mode
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'Something went wrong! Please try again.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="card shadow-lg p-4" style={{ maxWidth: '500px', width: '100%',height:'500px',color:'#ae86ff',backgroundColor:'transparent',boxShadow:'10px 20px 30px #fff' }}>
        <h2 className="text-center mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>

        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        <form onSubmit={handleSubmit}>
          {!isLogin && ( // Show Name field only in Sign Up mode
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                value={formData.name}
                onChange={handleInputChange}
                required={!isLogin}
                placeholder="Enter your name"
              />
            </div>
          )}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="btn w-100 mb-3" style={{ backgroundColor: '#ae86ff', color: 'white' }}>
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="text-center">
          <button className="btn btn-link" onClick={() => {
            setIsLogin(!isLogin);
            setErrorMessage(''); // Clear error message on toggle
          }}>
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
