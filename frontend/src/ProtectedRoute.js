import React from 'react';
import { Navigate } from 'react-router-dom';
import { initializeStore } from './zustandStore/usePresentationListStore';

const ProtectedRoute = ({ children }) => {
  const [isInitialized, setIsInitialized] = React.useState(false);
  // Check for token in localStorage or however you store it
  const token = localStorage.getItem('token');

  // If there is no token, redirect to the login page
  initializeStore();
  if (!token) {
    return <Navigate to="/login" />;
  }

  React.useEffect(() => {
    const initializeAndAuthenticate = async () => {
      await initializeStore(); // Initialize your store
      setIsInitialized(true);
      // Perform authentication check here and update isAuthenticated accordingly
      // setIsAuthenticated(authenticated);
    };

    initializeAndAuthenticate();
  }, []);

  if (!isInitialized) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  // If there is a token, proceed to render the children components
  return children;
};

export default ProtectedRoute;
