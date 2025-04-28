import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../components/login.jsx'; 
import SignUp from '../components/Signup.jsx';
import GenerateBill from '../components/GenerateBill.jsx';
import History from '../components/History.jsx';
import Dashboard from '../components/Dashboard.jsx';
import AnimatedBackground from '../components/AnimatedBackground.jsx';
import '../styles/styles.css';

function App() {
  return (
    <Router>
      {/* AnimatedBackground will be present on all pages */}
      <AnimatedBackground />
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Routes>
          
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/generate-bill" element={<GenerateBill />} />
          <Route path="/history" element={<History />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
