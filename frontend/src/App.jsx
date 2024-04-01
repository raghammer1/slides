import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './authPages/loginPage/Login.js';
import RegisterPage from './authPages/registerPage/RegisterPage.js';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
