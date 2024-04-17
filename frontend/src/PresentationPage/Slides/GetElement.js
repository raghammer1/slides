import React from 'react';
import TextBoxElementDisplay from './ElementDisplays.js/TextBoxElementDisplay';
import ImageElementDisplay from './ElementDisplays.js/ImageElementDisplay';
import VideoPlayer from './ElementDisplays.js/VideoPlayer';
import CodeElementDisplay from './ElementDisplays.js/CodeElementDisplay';

const GetElement = ({
  element,
  presentationId,
  handleDeleteElement,
  selectedSlideId,
  onDragStop,
  onResizeStop,
  renderCornerBoxes,
  handleSelectedElement,
}) => {
  if (element.type === 'textarea') {
    return (
      <TextBoxElementDisplay
        presentationId={presentationId}
        selectedSlideId={selectedSlideId}
        element={element}
        onDragStop={onDragStop}
        onResizeStop={onResizeStop}
        handleDeleteElement={handleDeleteElement}
        renderCornerBoxes={renderCornerBoxes}
        handleSelectedElement={handleSelectedElement}
      />
    );
  } else if (element.type === 'image') {
    return (
      <ImageElementDisplay
        presentationId={presentationId}
        selectedSlideId={selectedSlideId}
        element={element}
        onDragStop={onDragStop}
        onResizeStop={onResizeStop}
        handleDeleteElement={handleDeleteElement}
        renderCornerBoxes={renderCornerBoxes}
        handleSelectedElement={handleSelectedElement}
      />
    );
  } else if (element.type === 'video') {
    return (
      <VideoPlayer
        style={{
          position: 'absolute',
          top: `${element.top}`,
          left: `${element.left}`,
          width: '100%',
          height: '100%',
          padding: '10px',
          backgroundColor: '#000',
        }}
        onDragStop={onDragStop}
        onResizeStop={onResizeStop}
        handleDeleteElement={handleDeleteElement}
        renderCornerBoxes={renderCornerBoxes}
        element={element}
        onClick={() => handleSelectedElement(element)}
        presentationId={presentationId}
        selectedSlideId={selectedSlideId}
      />
    );
  }
  if (element.type === 'code') {
    return (
      <CodeElementDisplay
        element={element}
        onDragStop={onDragStop}
        onResizeStop={onResizeStop}
        handleDeleteElement={handleDeleteElement}
        renderCornerBoxes={renderCornerBoxes}
        presentationId={presentationId}
        selectedSlideId={selectedSlideId}
      />
    );
  } else {
    <></>;
  }
};
export default GetElement;
