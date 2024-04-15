import React from 'react';

const ImagePreview = ({ element, size }) => {
  const topStyle = `${(element.left / 500) * size.height}px`;
  const leftStyle = `${(element.top / 1000) * size.width}px`;
  console.log(topStyle, leftStyle, size);
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
