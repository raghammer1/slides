import React from 'react';
const CornerBox = ({ style }) => {
  // Log the style object to the console
  console.log(style, 'style');

  // Now return your component JSX
  return (
    <div
      style={{
        width: '10px',
        height: '10px',
        backgroundColor: 'red',
        position: 'absolute',
        ...style, // Spread the received style props here
      }}
    />
  );
};

export default CornerBox;
