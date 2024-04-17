import React from 'react';

const TextBoxPreview = ({ element, size }) => {
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
      }}
      readOnly
    />
  );
};
export default TextBoxPreview;
