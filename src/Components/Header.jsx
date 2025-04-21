// src/Components/Header.jsx
import React from 'react';

function Header(props) {
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('username'); // Remove the username from localStorage during logout
    window.location.reload(); // Refresh the page after logout
  };

  const username = localStorage.getItem('username'); // Get the username from localStorage

  return (
    <header>
      <h1>Notes Lock App</h1>
      {username && (
        <div style={{ float: 'right', marginRight: '10px' }}>
          <span>Welcome, {username}!</span>
        </div>
      )}
      {localStorage.getItem('access_token') && (
        <button onClick={handleLogout} style={{ float: 'right', marginLeft: '10px' }}>
          Logout
        </button>
      )}
    </header>
  );
}

export default Header;
