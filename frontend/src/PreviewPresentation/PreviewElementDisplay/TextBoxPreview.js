import React from 'react';

const TextBoxPreview = ({ element }) => {
  return (
    <textarea
      defaultValue={element.text}
      style={{
        position: 'absolute',
        top: `${(element.top / 500) * 100}%`,
        left: element.left,
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
