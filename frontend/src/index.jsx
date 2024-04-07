import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import
import App from './App.jsx';

// Use createRoot to render your app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
