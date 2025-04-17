// /src/Components/Header.jsx
import React from 'react';

function Header(props) {
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    sessionStorage.removeItem('user_created');
    window.location.reload(); // Refresh the page after logout
  };

  return (
    <header>
      <h1>Notes App</h1>
      {localStorage.getItem('access_token') && (
        <button onClick={handleLogout} style={{ float: 'right' }}>
          Logout
        </button>
      )}
    </header>
  );
}

export default Header;
