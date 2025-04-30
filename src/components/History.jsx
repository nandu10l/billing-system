// src/components/History.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function History() {
  // Dummy history data (replace with real API data later)
  const bills = [
    { id: 1, date: "2025-04-26", total: "₹500" },
    { id: 2, date: "2025-04-25", total: "₹1200" },
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden'
    }}>
      {/* Navigation buttons container - Fixed position */}
      <div style={{ 
        position: 'fixed',  // Changed from absolute to fixed
        top: '20px',
        right: '20px',
        zIndex: 999  // Increased z-index to ensure it stays on top
      }}>
        <Link 
          to="/dashboard" 
          className="back-home-button" 
          style={{
            padding: "12px 20px",
            background: "transparent",
            color: "white",
            textDecoration: "none",
            borderRadius: "5px",
            transition: "all 0.3s ease-in-out",
            border: "2px solid #00b894",
            fontWeight: "600",
            letterSpacing: "1px"
          }}
        >
          Back to Home
        </Link>
      </div>

      {/* Content container with scroll */}
      <div style={{
        height: '100%',
        overflowY: 'auto',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '800px',
          margin: '60px auto 20px',
          background: 'rgba(30, 30, 30, 0.95)',
          borderRadius: '12px',
          padding: '30px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.8)'
        }}>
          <h2 style={{ 
            textAlign: "center",
            color: "white",
            marginBottom: "30px"
          }}>Bill History</h2>

          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
          }}>
            {bills.map((bill) => (
              <div key={bill.id} style={{
                background: "rgba(241, 245, 249, 0.1)",
                padding: "20px",
                borderRadius: "8px",
                color: "white",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)"
              }}>
                <p style={{ margin: "5px 0" }}><strong>Date:</strong> {bill.date}</p>
                <p style={{ margin: "5px 0" }}><strong>Total:</strong> {bill.total}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;
