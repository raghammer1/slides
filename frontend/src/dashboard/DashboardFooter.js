import React, { useState, useEffect } from 'react';

const DashboardFooter = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getFooterStyle = () => ({
    backgroundColor: '#f0f0f0',
    color: '#333',
    textAlign: 'center',
    padding:
      windowWidth > 1024 ? '20px 0' : windowWidth > 768 ? '15px 0' : '10px 0',
    position: 'fixed',
    left: '0',
    bottom: '0',
    width: '100%',
    borderTop: '1px solid #e7e7e7',
    fontSize: windowWidth > 1024 ? '16px' : windowWidth > 768 ? '14px' : '12px',
  });

  return (
    <div style={getFooterStyle()}>
      <p>© {new Date().getFullYear()} Raghav & Vansh Co. </p>
    </div>
  );
};

export default DashboardFooter;
