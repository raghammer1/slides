import React from 'react';

// Displays a readonly textarea with text content
const TextBoxPreview = ({ element, size }) => {
  // Dynamic positioning and sizing based on element properties
  const topStyle = `${element.left}%`;
  const leftStyle = `${element.top}%`;

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
        backgroundColor: 'transparent',
      }}
      readOnly
    />
  );
};
export default TextBoxPreview;
