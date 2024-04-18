import React, { useCallback, useState } from 'react';
import { Rnd } from 'react-rnd';
import ImageBoxDoubleClick from './DoubleClickHandlers/ImageBoxDoubleClick';
import { containerWidth, containerHeight } from '../../../shared/globals';

// Component for displaying an image element
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
  // State for handling double-click timeout
  const [clickTimeout, setClickTimeout] = useState(null);

  // State for controlling edit text box modal
  const [openEditTextBox, setOpenEditTextBox] = useState(false);
  const handleOpenEditTextBox = () => setOpenEditTextBox(true);
  const handleCloseEditTextBox = () => {
    setOpenEditTextBox(false);
  };
  const handleEditTextBoxSelected = () => {
    handleOpenEditTextBox();
  };

  // Function to handle click events
  const handleClick = useCallback(() => {
    // Logic for handling double-click
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);
      handleEditTextBoxSelected();
    } else {
      const timeout = setTimeout(() => {
        setClickTimeout(null);

        handleSelectedElement(element);
      }, 500);
      setClickTimeout(timeout);
    }
  }, [clickTimeout, handleSelectedElement, element]);

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
