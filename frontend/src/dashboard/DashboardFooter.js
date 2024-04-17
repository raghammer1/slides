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
    position: 'fixed',
    left: '0',
    bottom: '0',
    width: '100%',
    borderTop: '1px solid #e7e7e7',
    fontSize: windowWidth > 1024 ? '14px' : windowWidth > 768 ? '12px' : '10px',
    height: '25px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  });

  return (
    <div style={getFooterStyle()}>
      <p>© {new Date().getFullYear()} Raghav & Vansh</p>
    </div>
  );
};

export default DashboardFooter;
