'use client';

import { useState } from 'react';

export default function Home() {
  const [items, setItems] = useState([{ name: '', price: '' }]);

  const addItem = () => {
    setItems([...items, { name: '', price: '' }]);
  };

  const handleChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      customerName: e.target.customerName.value,
      date: e.target.date.value,
      itemName: items.map(i => i.name),
      itemPrice: items.map(i => i.price),
      format: e.target.format.value,
    };

    const res = await fetch('/api/generate-bill', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      alert('Failed to generate bill');
      return;
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  return (
    <main style={{ padding: 40 }}>
      <h2>Generate Bill</h2>
      <form onSubmit={handleSubmit}>
        <label>Customer Name: <input name="customerName" required /></label><br />
        <label>Date: <input name="date" type="date" required /></label><br />

        {items.map((item, i) => (
          <div key={i}>
            <input
              placeholder="Item name"
              value={item.name}
              onChange={(e) => handleChange(i, 'name', e.target.value)}
              required
            />
            <input
              placeholder="Price"
              type="number"
              step="0.01"
              value={item.price}
              onChange={(e) => handleChange(i, 'price', e.target.value)}
              required
            />
          </div>
        ))}

        <button type="button" onClick={addItem}>Add Item</button><br /><br />

        <label>Format:
          <select name="format" required>
            <option value="pdf">PDF</option>
            <option value="jpg">JPG</option>
          </select>
        </label><br /><br />

        <button type="submit">Generate Bill</button>
      </form>
    </main>
  );
}
