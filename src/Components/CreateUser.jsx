import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user', // default role
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
    <div>
      <h2>Create New User</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={userData.username}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={userData.email}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={userData.password}
          onChange={handleChange}
          required
        />
        <br />
        <select name="role" value={userData.role} onChange={handleChange} style={{width:"100%"}}>
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
        <br />
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default CreateUser;
