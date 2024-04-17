import React from 'react';
import { containerWidth, containerHeight } from '../../shared/globals';

const TextBoxPreview = ({ element, size }) => {
  const topStyle = `${(element.left / containerHeight) * size.height}px`;
  const leftStyle = `${(element.top / containerWidth) * size.width}px`;

  return (
    <textarea
      defaultValue={element.text}
      style={{
        position: 'absolute',
        top: topStyle,
        left: leftStyle,
        width: `${element.width}%`,
        height: `${element.height}%`,
        fontSize: element.fontSize,
        fontFamily: element.fontFamily,
        color: element.color,
        resize: 'none',
        overflow: 'hidden',
        border: 'none',
        cursor: 'default',
      }}
      readOnly
    />
  );
};
export default TextBoxPreview;
