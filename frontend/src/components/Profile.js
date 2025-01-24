import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [profile, setProfile] = useState({ username: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('JWT Token:', token); // Check if the token is stored correctly
        const response = await axios.get('/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error.response?.data || error.message);
        setMessage(error.response?.data?.error || 'Failed to fetch profile');
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage('');
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put('/api/profile', profile, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProfile(response.data);
    setMessage('Profile updated successfully');
  } catch (error) {
    console.error('Error updating profile:', error.response?.data || error.message);
    setMessage(error.response?.data?.error || 'Failed to update profile');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4" style={{
          color: '#ae86ff',
          backgroundColor: 'transparent',
          boxShadow: '10px 20px 30px rgba(0, 0, 0, 0.2)',
        }}>
        <h2 className="text-center mb-4">Profile</h2>
        {message && <div className="alert alert-info">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              className="form-control"
              value={profile.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              value={profile.email}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;