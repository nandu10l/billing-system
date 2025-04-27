// src/components/GenerateBill.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing

function GenerateBill() {
  const [items, setItems] = useState([{ name: "", quantity: "", price: "" }]);
  const [address, setAddress] = useState("");
  const [downloadType, setDownloadType] = useState("PDF");
  const [template, setTemplate] = useState("template1"); // New State for Template

  const addItem = () => {
    setItems([...items, { name: "", quantity: "", price: "" }]);
  };

  const removeItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const calculateTotal = () => {
    return items.reduce((acc, item) => acc + (Number(item.quantity) * Number(item.price)), 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Bill Generated Successfully in ${downloadType} format using ${template}!`);
  };

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {/* Main Generate Bill Container */}
      <div className="generate-bill-container" style={{ flex: 1 }}>
        <h2 style={{ margin: 0, marginBottom: '20px' }}>Generate Bill</h2>
        
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Enter Business Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows="3"
            style={{ resize: "none" }}
            required
          />

          <h4>Items</h4>

          <div className="item-headings">
            <div>Item Name</div>
            <div>Quantity</div>
            <div>Price(For 1)</div>
            <div>Action</div>
          </div>

          {items.map((item, index) => (
            <div key={index} className="item-row">
              <input
                type="text"
                placeholder="Item Name"
                value={item.name}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(e) => handleChange(index, 'quantity', e.target.value)}
                min="1"
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={item.price}
                onChange={(e) => handleChange(index, 'price', e.target.value)}
                min="0"
                required
              />
              <button type="button" onClick={() => removeItem(index)} className="remove-btn">
                Remove
              </button>
            </div>
          ))}

          <button type="button" onClick={addItem} className="add-btn" style={{ marginTop: "10px" }}>
            + Add More Items
          </button>

          <h4 style={{ marginTop: "20px" }}>Total Amount: ₹{calculateTotal()}</h4>

          {/* New: Select Template */}
          <div style={{ marginTop: "20px" }}>
            <label>Select Bill Template:</label>
            <select
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="download-select"
            >
              <option value="template1">Template 1 - Classic</option>
              <option value="template2">Template 2 - Modern</option>
            </select>
          </div>

          {/* New: Select Download Format */}
          <div style={{ marginTop: "20px" }}>
            <label>Select Download Format:</label>
            <select
              value={downloadType}
              onChange={(e) => setDownloadType(e.target.value)}
              className="download-select"
            >
              <option value="PDF">PDF</option>
              <option value="JPEG">JPEG</option>
            </select>
          </div>

          <button type="submit" style={{ marginTop: "20px" }}>
            Generate Bill
          </button>
        </form>

        {/* Render Bill Preview based on Template */}
        <div className="bill-preview" style={{ marginTop: "40px" }}>
          <h3>Bill Preview</h3>
          {template === 'template1' ? (
            <div className="bill-template-1">
              <h4>Business Address:</h4>
              <p>{address}</p>
              <h4>Items:</h4>
              <ul>
                {items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} - {item.quantity} × ₹{item.price} = ₹{item.quantity * item.price}
                  </li>
                ))}
              </ul>
              <h4>Total: ₹{calculateTotal()}</h4>
            </div>
          ) : (
            <div className="bill-template-2">
              <h4>🏢 Address</h4>
              <p style={{ fontStyle: "italic" }}>{address}</p>
              <table style={{ width: "100%", marginTop: "10px", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ borderBottom: "1px solid #777" }}>Item</th>
                    <th style={{ borderBottom: "1px solid #777" }}>Qty</th>
                    <th style={{ borderBottom: "1px solid #777" }}>Price(For 1)</th>
                    <th style={{ borderBottom: "1px solid #777" }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>₹{item.price}</td>
                      <td>₹{item.quantity * item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h4 style={{ marginTop: "10px" }}>Grand Total: ₹{calculateTotal()}</h4>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Container */}
      <div style={{ 
        position: 'sticky',
        top: '20px',
        height: 'fit-content',
        padding: '20px'
      }}>
        <Link 
          to="/" 
          className="back-home-button"
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
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default GenerateBill;
