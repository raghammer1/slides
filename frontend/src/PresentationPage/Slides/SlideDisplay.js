import React from 'react';

const SlideDisplay = ({ selectedSlide }) => {
  return (
    <div
      style={{
        width: '1000px',
        height: '500px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#999',
      }}
    >
      Slide: {selectedSlide.slideNumber} and id: {selectedSlide.id}
    </div>
  );
};

export default SlideDisplay;
