// src/Components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import CreateUser from "./CreateUser";

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
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
      const response = await axios.post('http://127.0.0.1:3000/auth/token', data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      localStorage.setItem('access_token', response.data.access_token);
      setResponseMsg('Login successful! Redirecting...');
      setTimeout(() => window.location.href = '/dashboard', 1000);
    } catch (error) {
      setResponseMsg(error.response?.data?.detail || 'Login failed');
    }
  };

  if (showCreate) {
    return (
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <CreateUser />
        <p style={{ marginTop: '1rem' }}>
          Already have an account?{' '}
          <button onClick={() => setShowCreate(false)}>Go to Login</button>
        </p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      {responseMsg && <p>{responseMsg}</p>}
      <p>
        Don't have an account?{' '}
        <button onClick={() => setShowCreate(true)}>Create one</button>
      </p>
    </div>
  );
};

export default Login;
