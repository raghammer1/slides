import React, { useCallback, useState } from 'react';
import { Rnd } from 'react-rnd';
import ImageBoxDoubleClick from './DoubleClickHandlers/ImageBoxDoubleClick';
const ImageElementDisplay = ({
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
      // Perform your double-click action here
    } else {
      const timeout = setTimeout(() => {
        setClickTimeout(null);
        console.log('Single clicked:', element.id);
        // Perform your single-click action here
        handleSelectedElement(element);
      }, 500); // 500ms for double click interval
      setClickTimeout(timeout);
    }
  }, [clickTimeout, handleSelectedElement, element]);

  return (
    <>
      <Rnd
        default={{
          x: element.top,
          y: element.left,
          width: `${element.width}%`,
          height: `${element.height}%`,
        }}
        className={element.id}
        data-testid={'image-box-element-test'}
        bounds="parent"
        key={element.id}
        onDragStop={(e, d) => onDragStop(e, d, element)}
        onResizeStop={(e, direction, ref, delta, position) =>
          onResizeStop(e, direction, ref, delta, position, element)
        }
        onContextMenu={(e) => handleDeleteElement(element.id, e)}
      >
        <div key={element.id} onClick={handleClick}>
          <img
            draggable="false"
            src={element.src}
            alt={element.alt}
            style={{
              position: 'absolute',
              top: element.top,
              left: element.left,
              height: '100%',
              width: '100%',
              resize: 'none',
            }}
          />
          {renderCornerBoxes(element)}
        </div>
      </Rnd>
      <ImageBoxDoubleClick
        open={openEditTextBox}
        handleCloseEditTextBox={handleCloseEditTextBox}
        presentationId={presentationId}
        selectedSlideId={selectedSlideId}
        element={element}
      />
    </>
  );
};
export default ImageElementDisplay;
