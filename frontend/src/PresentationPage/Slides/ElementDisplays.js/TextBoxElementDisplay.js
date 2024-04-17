import React, { useState, useCallback } from 'react';
import { Rnd } from 'react-rnd';
import TextBoxDoubleClick from './DoubleClickHandlers/TextBoxDoubleClick';
import { containerWidth, containerHeight } from '../../../shared/globals';

const TextBoxElementDisplay = ({
  selectedSlideId,
  presentationId,
  element,
  handleDeleteElement,
  onResizeStop,
  onDragStop,
  handleSelectedElement,
  renderCornerBoxes,
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
    } else {
      const timeout = setTimeout(() => {
        setClickTimeout(null);
        console.log('Single clicked:', element.id);

        handleSelectedElement(element);
      }, 500);
      setClickTimeout(timeout);
    }
  }, [clickTimeout, handleSelectedElement, element]);

  console.log(element.top, element.left, 'HEY THERE LOLOLOLOOLOLOL');

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
        data-testid={'text-box-element-test'}
        bounds="parent"
        key={element.id}
        onDragStop={(e, d) => onDragStop(e, d, element)}
        onResizeStop={(e, direction, ref, delta, position) =>
          onResizeStop(e, direction, ref, delta, position, element)
        }
        onContextMenu={(e) => handleDeleteElement(element.id, e)}
      >
        <div key={element.id} onClick={handleClick}>
          <textarea
            defaultValue={element.text}
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              fontSize: element.fontSize,
              fontFamily: element.fontFamily,
              color: element.color,
              resize: 'none',
              overflow: 'hidden',
              border: '2px solid #999',
              cursor: 'default',
              backgroundColor: 'transparent',
            }}
            readOnly
          />
          {renderCornerBoxes(element)}
        </div>
      </Rnd>
      <TextBoxDoubleClick
        open={openEditTextBox}
        handleCloseEditTextBox={handleCloseEditTextBox}
        presentationId={presentationId}
        selectedSlideId={selectedSlideId}
        element={element}
      />
    </>
  );
};

export default TextBoxElementDisplay;
