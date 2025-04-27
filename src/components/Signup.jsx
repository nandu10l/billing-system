// src/components/SignUp.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function SignUp() {
  return (
    <div className="container">
      <h2 style={{ textAlign: "center" }}>Sign Up</h2>
      <form>
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <input type="password" placeholder="Confirm Password" required />
        <button type="submit">Sign Up</button>
      </form>
      <p style={{ textAlign: "center", marginTop: "10px" }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default SignUp;
