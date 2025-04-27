// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client'; // notice 'client' at the end!
import App from './pages/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
