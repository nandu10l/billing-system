// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate for redirecting

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook to navigate to another page

  const handleLogin = (e) => {
    e.preventDefault();
    // Basic validation check
    if (email.trim() === '' || password.trim() === '') {
      alert('Please enter both email and password.');
    } else {
      // Redirect to GenerateBill page
      navigate('/dashboard');
    }
  };

  return (
    <div className="container">
      <h2 style={{ textAlign: "center" }}>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p style={{ textAlign: "center", marginTop: "10px" }}>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;
