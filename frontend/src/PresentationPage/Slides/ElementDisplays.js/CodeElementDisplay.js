import React from 'react';
import { Rnd } from 'react-rnd';
const CodeElementDisplay = ({
  element,
  onDragStop,
  onResizeStop,
  handleDeleteElement,
  renderCornerBoxes,
}) => {
  return (
    <Rnd
      default={{
        x: element.top,
        y: element.left,
        width: `${element.width}%`, // Initial width based on element's width
        height: `${element.height}%`, // Initial height based on element's height
      }}
      className={element.id}
      // minWidth={(parseFloat(element.width) / 100) * 1000}
      // minHeight={(parseFloat(element.height) / 100) * 500}
      bounds="parent"
      key={element.id}
      onDragStop={(e, d) => onDragStop(e, d, element)}
      onResizeStop={(e, direction, ref, delta, position) =>
        onResizeStop(e, direction, ref, delta, position, element)
      }
      onContextMenu={(e) => handleDeleteElement(element.id, e)}
    >
      <div
        key={element.id}
        style={{ position: 'relative', width: '100%', height: '100%' }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
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
              top: 0,
              left: 0,
              zIndex: 1,
              color: 'transparent', // Hide text in textarea, showing only the highlighted code below
              background: 'none',
              pointerEvents: 'none', // Make the textarea non-interactive
              overflowY: 'auto',
              resize: 'none',
              border: 'none',
            }}
            readOnly // Remove readOnly if you want to make it editable
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
              pointerEvents: 'none', // Prevent interaction with the highlighted code
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
        {renderCornerBoxes(element)}
      </div>
    </Rnd>
  );
};
export default CodeElementDisplay;
