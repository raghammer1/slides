import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './authPages/loginPage/Login.js';
import Register from './authPages/registerPage/Register.js';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
