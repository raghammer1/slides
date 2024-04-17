import React from 'react';
// import { containerWidth, containerHeight } from '../../shared/globals';

const CodePreview = ({ element, size }) => {
  const topStyle = `${element.left}%`;
  const leftStyle = `${element.top}%`;
  const widthStyle = `${element.width}%`; // adjust according to your data structure
  const heightStyle = `${element.height}%`; // adjust according to your data structure

  return (
    <div
      style={{
        position: 'relative',
        width: widthStyle,
        height: heightStyle,
        top: topStyle,
        left: leftStyle,
      }}
    >
      <textarea
        defaultValue={element.text}
        style={{
          width: '100%',
          height: '100%',
          fontFamily:
            'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
          color: 'transparent',
          background: 'none',
          pointerEvents: 'none',
          overflowY: 'auto',
          resize: 'none',
          border: 'none',
        }}
        readOnly
      />
      <pre
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          margin: 0,
          padding: '10px',
          overflowY: 'auto',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <code
          style={{ fontSize: element.fontSize }}
          className={`language-${element.language}`}
        >
          {element.text}
        </code>
      </pre>
    </div>
  );
};
export default CodePreview;
