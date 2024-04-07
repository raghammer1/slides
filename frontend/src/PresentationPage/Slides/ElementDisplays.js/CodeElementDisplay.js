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
        width: `${element.width}%`,
        height: `${element.height}%`,
      }}
      className={element.id}
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
        {renderCornerBoxes(element)}
      </div>
    </Rnd>
  );
};
export default CodeElementDisplay;
