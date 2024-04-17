import React from 'react';

const ImagePreview = ({ element, size }) => {
  const topStyle = `${element.left}%`;
  const leftStyle = `${element.top}%`;

  return (
    <img
      draggable="false"
      src={element.src}
      alt={element.alt}
      style={{
        position: 'absolute',
        top: topStyle,
        left: leftStyle,
        width: `${element.width}%`,
        height: `${element.height}%`,
        resize: 'none',
      }}
    />
  );
};
export default ImagePreview;
