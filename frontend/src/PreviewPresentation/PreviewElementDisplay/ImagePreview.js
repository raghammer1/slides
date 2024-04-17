import React from 'react';
import { containerWidth, containerHeight } from '../../shared/globals';

const ImagePreview = ({ element, size }) => {
  const topStyle = `${(element.left / containerHeight) * size.height}px`;
  const leftStyle = `${(element.top / containerWidth) * size.width}px`;

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
