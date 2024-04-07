import React from 'react';
import { Navigate } from 'react-router-dom';
import { initializeStore } from './zustandStore/usePresentationListStore';

const ProtectedRoute = ({ children }) => {
  const [isInitialized, setIsInitialized] = React.useState(false);

  const token = localStorage.getItem('token');

  initializeStore();
  if (!token) {
    return <Navigate to="/login" />;
  }

  React.useEffect(() => {
    const initializeAndAuthenticate = async () => {
      await initializeStore();
      setIsInitialized(true);
    };

    initializeAndAuthenticate();
  }, []);

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return children;
};

export default ProtectedRoute;
