import React from 'react';
const CodePreview = ({ element, size }) => {
  const topStyle = `${(element.left / 500) * size.height}px`;
  const leftStyle = `${(element.top / 1000) * size.width}px`;

  return (
    <div
      style={{
        position: 'relative',
        width: element.width,
        height: element.height,
      }}
    >
      <textarea
        defaultValue={element.text}
        onChange={(e) => {
          /* Handler to update code text */
        }}
        style={{
          width: '100%',
          height: '100%',
          fontFamily:
            'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
          position: 'absolute',
          top: topStyle,
          left: leftStyle,
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
