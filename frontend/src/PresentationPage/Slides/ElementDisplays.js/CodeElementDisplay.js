import React, { useCallback, useState } from 'react';
import { Rnd } from 'react-rnd';
import CodeBoxDoubleClick from './DoubleClickHandlers/CodeBoxDoubleClick';
import { containerWidth, containerHeight } from '../../../shared/globals';

const CodeElementDisplay = ({
  element,
  onDragStop,
  onResizeStop,
  handleDeleteElement,
  renderCornerBoxes,
  selectedSlideId,
  presentationId,
}) => {
  const [clickTimeout, setClickTimeout] = useState(null);

  const [openEditTextBox, setOpenEditTextBox] = useState(false);
  const handleOpenEditTextBox = () => setOpenEditTextBox(true);
  const handleCloseEditTextBox = () => {
    setOpenEditTextBox(false);
  };
  const handleEditTextBoxSelected = () => {
    handleOpenEditTextBox();
  };

  const handleClick = useCallback(() => {
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);
      console.log('Double clicked:', element.id);
      handleEditTextBoxSelected();
      // Perform your double-click action here
    } else {
      const timeout = setTimeout(() => {
        setClickTimeout(null);
        console.log('Single clicked:', element.id);
        // Perform your single-click action here
      }, 500); // 500ms for double click interval
      setClickTimeout(timeout);
    }
  }, [clickTimeout, element]);

  return (
    <>
      <Rnd
        default={{
          x: (element.top / 100) * containerWidth,
          y: (element.left / 100) * containerHeight,
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
          onClick={handleClick}
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
      <CodeBoxDoubleClick
        open={openEditTextBox}
        handleCloseCodeHandler={handleCloseEditTextBox}
        presentationId={presentationId}
        selectedSlideId={selectedSlideId}
        element={element}
      />
    </>
  );
};
export default CodeElementDisplay;
