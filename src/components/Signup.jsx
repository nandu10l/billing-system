// src/components/SignUp.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    toast.success('Account created successfully!', {
      onClose: () => navigate('/'), // after toast closes, navigate to login
      autoClose: 2000, // close after 2 seconds
    });
  };
  return (
    <div className="container">
      <h2 style={{ textAlign: "center" }}>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <input type="password" placeholder="Confirm Password" required />
        <button type="submit">Sign Up</button>
      </form>
      <p style={{ textAlign: "center", marginTop: "10px" }}>
        Already have an account? <Link to="/">Login</Link>
      </p>
      {/* Toast Container for showing toasts */}
      <ToastContainer />

    </div>
  );
}

export default SignUp;
