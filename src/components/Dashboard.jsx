// src/components/Dashboard.jsx
import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import AnimatedBackground from './AnimatedBackground'; // ✅ Correct import

function Dashboard() {
  const navigate = useNavigate();
  const [isZooming, setIsZooming] = useState(false);
  const nodeRef = useRef(null);

  const handleNavigation = (path, e) => {
    e.preventDefault();
    setIsZooming(true);
    
    // Add transition delay before navigation
    setTimeout(() => {
      navigate(path);
    }, 300); // Match this with CSS transition duration
  };

  return (
    <>
      <AnimatedBackground />
      <CSSTransition
        in={!isZooming}
        timeout={300}
        classNames="zoom"
        unmountOnExit
        nodeRef={nodeRef}
      >
        <div ref={nodeRef} style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: 'white',
          padding: '40px',
          width: '100%',
        }}>
          {/* View History button container */}
          <div style={{ 
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 999,
            padding: '20px'
          }}>
            <Link 
              to="/history" 
              className="nav-button"
              onClick={(e) => handleNavigation('/history', e)}
              style={{
                padding: '12px 24px',
                background: 'transparent',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '5px',
                border: '2px solid #00b894',
                transition: 'all 0.3s ease-in-out',
                display: 'inline-block',
                fontWeight: '600',
                letterSpacing: '1px'
              }}
            >
              View History
            </Link>
          </div>

          {/* Main content with Generate Bill button */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <h1 style={{ 
              marginBottom: '30px',
              fontWeight: '800',
              letterSpacing: '2px',
              textTransform: 'uppercase'
            }}>Welcome to Billing System</h1>
            <Link 
              to="/generate-bill" 
              className="nav-button generate-bill-button"
              onClick={(e) => handleNavigation('/generate-bill', e)}
            >
              Generate Bill
            </Link>
          </div>
        </div>
      </CSSTransition>
    </>
  );
}

export default Dashboard;
