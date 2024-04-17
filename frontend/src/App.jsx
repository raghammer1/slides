import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './authPages/loginPage/Login.js';
import RegisterPage from './authPages/registerPage/RegisterPage.js';
import Dashboard from './dashboard/Dashboard.js';
import ProtectedRoute from './ProtectedRoute.js';
import PresentationMainPage from './PresentationPage/PresentationMainPage.js';
import { AlertProvider } from './components/AlertError.js';
import ReArrangeMainPage from './PresentationPage/ReArrangeSlides/ReArrangeMainPage.js';
import PreviewPresentationMain from './PreviewPresentation/PreviewPresentationMain.js';

const App = () => {
  return (
    <div>
      <AlertProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/presentation/:id"
              element={
                <ProtectedRoute>
                  <PresentationMainPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/presentation/:id/rearrange"
              element={
                <ProtectedRoute>
                  <ReArrangeMainPage />
                </ProtectedRoute>
              }
            />
            <Route path="/preview/:id" element={<PreviewPresentationMain />} />
          </Routes>
        </BrowserRouter>
      </AlertProvider>
    </div>
  );
};

export default App;
