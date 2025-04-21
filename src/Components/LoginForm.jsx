import React, { useState } from 'react';
import axios from 'axios';
import CreateUser from "./CreateUser";
import './LoginForm.css';  // Import the CSS file

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [responseMsg, setResponseMsg] = useState('');
  const [showCreate, setShowCreate] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new URLSearchParams();
    data.append('username', formData.username);
    data.append('password', formData.password);

    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/token', data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      localStorage.removeItem('access_token');
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('username', formData.username); // Store username in localStorage

      setResponseMsg('Login successful! Redirecting...');
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      setResponseMsg(
        error.response ? error.response.data.detail || 'Login failed' : 'Network error'
      );
    }
  };

  if (showCreate) {
    return (
      <div className="login-form-container">
        <CreateUser />
        <p className="toggle-form-text">
          Already have an account?{' '}
          <button onClick={() => setShowCreate(false)} className="toggle-form-button">Go to Login</button>
        </p>
      </div>
    );
  }

  return (
    <div className="login-form-container">
      <h2 className="login-form-title">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label className="form-label">Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-btn">Login</button>
      </form>
      {responseMsg && <p className="response-msg">{responseMsg}</p>}

      <p className="toggle-form-text">
        Don't have an account?{' '}
        <button onClick={() => setShowCreate(true)} className="toggle-form-button">Create one</button>
      </p>
    </div>
  );
};

export default LoginForm;
