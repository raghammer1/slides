import React from 'react';
const CornerBox = ({ style }) => {
  console.log(style, 'style');

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
