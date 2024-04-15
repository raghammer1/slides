import React from 'react';

const TextBoxPreview = ({ element, size }) => {
  const topStyle = `${(element.left / 500) * size.height}px`;
  const leftStyle = `${(element.top / 1000) * size.width}px`;

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
