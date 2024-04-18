import React from 'react';

// ImagePreview: Component for displaying an image based on the provided 'element' props
const ImagePreview = ({ element, size }) => {
  // Calculate styles based on element's position and size
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
