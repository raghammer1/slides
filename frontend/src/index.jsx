import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Access the root DOM node where the React app will be attached.
const root = ReactDOM.createRoot(document.getElementById('root'));
// Render the App component within the <React.StrictMode> wrapper for additional checks and warnings.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
