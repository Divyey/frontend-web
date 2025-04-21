import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css'; // Reuse existing styles

const CreateUser = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/', userData, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      setMessage('User created successfully!');
      console.log('User created:', response.data);
      setUserData({ username: '', email: '', password: '', role: 'user' });
    } catch (error) {
      console.error('Error creating user:', error);
      setMessage('Failed to create user.');
    }
  };

  return (
    <div className="login-form-container">
      <h2 className="login-form-title">Create Account</h2>
      {message && <p className="response-msg">{message}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label className="form-label">Username:</label>
          <input
            name="username"
            type="text"
            value={userData.username}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email:</label>
          <input
            name="email"
            type="email"
            value={userData.email}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password:</label>
          <input
            name="password"
            type="password"
            value={userData.password}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Role:</label>
          <select
            name="role"
            value={userData.role}
            onChange={handleChange}
            className="form-input"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">Create User</button>
      </form>
    </div>
  );
};

export default CreateUser;
