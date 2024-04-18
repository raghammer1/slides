import React from 'react';
// Component for rendering a small red box with absolute positioning
const CornerBox = ({ style }) => {
  return (
    <div
      style={{
        width: '10px',
        height: '10px',
        backgroundColor: 'red',
        position: 'absolute',
        ...style,
      }}
    />
  );
};

export default CornerBox;
