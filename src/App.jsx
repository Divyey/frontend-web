// /src/App.js
import React, { useState } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import LoginForm from './Components/LoginForm';
import Dashboard from './Components/Dashboard';

import "./App.css";

function App() {
  const token = localStorage.getItem('access_token'); // Check if token exists
  console.log("Success log token!")
  return (
    <div>
      {/* Pass handleLogout to Header so it's available there */}
      <Header />

      {token ? (
        <div>
          <Dashboard />
        </div>
      ) : (
        <LoginForm />
      )}
      <Footer />
    </div>
  );
}

export default App;
