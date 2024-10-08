import React from 'react';

// CodePreview: Displays a styled code block in a textarea and a preformatted text element
const CodePreview = ({ element, size }) => {
  // Dynamic styles based on the element's properties
  const topStyle = `${element.left}%`;
  const leftStyle = `${element.top}%`;
  const widthStyle = `${element.width}%`;
  const heightStyle = `${element.height}%`;

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
      {/* Textarea for capturing code but not meant for user interaction */}
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
      {/* Preformatted text for displaying syntax-highlighted code */}
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
