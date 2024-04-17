import React, { useCallback, useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import EditMenu from './EditSlide/EditMenu';
import VideoPlayer from './ElementDisplays.js/VideoPlayer';
import CornerBox from './CornerBox';
import 'prismjs/themes/prism-okaidia.css';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-c';
import CodeElementDisplay from './ElementDisplays.js/CodeElementDisplay';
import ImageElementDisplay from './ElementDisplays.js/ImageElementDisplay';
import TextBoxElementDisplay from './ElementDisplays.js/TextBoxElementDisplay';
import usePresentationListStore from '../../zustandStore/usePresentationListStore';

const SlideDisplay = ({ presentationId, selectedSlideId }) => {
  // const containerWidth = 1000;
  // const containerHeight = 500;

  const {
    selectedSlide,
    updateElementPosition,
    updateElementSize,
    deleteElementFromSlide,
  } = usePresentationListStore((store) => ({
    selectedSlide: store.getSlideFromPresentationById(
      presentationId,
      selectedSlideId
    ),
    updateElementPosition: store.updateElementPosition,
    updateElementSize: store.updateElementSize,
    deleteElementFromSlide: store.deleteElementFromSlide,
  }));

  const [selectedElement, setSelectedElement] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [selectedSlide]);

  const handleSelectedElement = (element) => {
    setSelectedElement(element);
  };

  const onDragStop = (e, d, element) => {
    const top = '0';
    const left = '0';
    console.log('IENNFUHEWFIUWEBFU TOP LEFT  NEW', top, left);

    updateElementPosition(
      presentationId,
      selectedSlideId,
      element.id,
      `${d.x}`,
      `${d.y}`
    );
    setSelectedElement({ ...element, top: `${d.x}`, left: `${d.y}` });
  };

  const onResizeStop = (e, direction, ref, delta, position, element) => {
    const newSize = {
      width: `${(ref.offsetWidth / 1000) * 100}`,
      height: `${(ref.offsetHeight / 500) * 100}`,
    };
    const newPosition = {
      top: `${position.y}`,
      left: `${position.x}`,
    };
    updateElementSize(
      presentationId,
      selectedSlideId,
      element.id,
      newSize.width,
      newSize.height
    );
    updateElementPosition(
      presentationId,
      selectedSlideId,
      element.id,
      `${newPosition.left}`,
      `${newPosition.top}`
    );
    setSelectedElement({ ...element, ...newSize, ...newPosition });
  };

  const handleDeleteElement = (elementId, e) => {
    e.preventDefault();
    if (selectedElement?.id === elementId) {
      setSelectedElement(null);
    }
    deleteElementFromSlide(presentationId, selectedSlideId, elementId);
  };

  const renderCornerBoxes = useCallback(
    (element) => {
      console.log(selectedElement);
      if (selectedElement === null || selectedElement.id !== element.id) {
        return null;
      }

      const containerWidth = 1000;
      const containerHeight = 500;
      const elementWidthPx =
        (parseInt(selectedElement.width) / 100) * containerWidth;
      const elementHeightPx =
        (parseInt(selectedElement.height) / 100) * containerHeight;

      const corners = [
        { top: 0, left: 0 }, // Top-left
        { top: 0, left: 0 + elementWidthPx - 10 }, // Top-right-
        { top: 0 + elementHeightPx - 10, left: 0 }, // Bottom-left
        {
          top: 0 + elementHeightPx - 10,
          left: 0 + elementWidthPx - 10,
        }, // Bottom-right
      ];

      console.log(corners, 'corners I AM CORNER HEY HEY');

      return corners.map((style, index) => (
        <CornerBox key={index} style={style} />
      ));
    },
    [selectedElement]
  );

  // Check if there are elements and elements is not empty
  const getElements = () => {
    if (selectedSlide?.elements?.length) {
      // Access the last element in the array
      const lastElementObj =
        selectedSlide.elements[selectedSlide.elements.length - 1];

      // Assuming we don't know the key name and there's only one key per object
      const key = Object.keys(lastElementObj)[0]; // Get the key of the last object
      const values = lastElementObj[key]; // Get the value using the key which is an array

      // Now you can use 'values' which is the array associated with the last time key
      return values; // Outputs the array of the last element object
    } else {
      return [];
    }
  };

  return (
    <div
      className="slideDisplaylolol"
      style={{
        width: '1000px',
        height: '500px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#999',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {getElements().map((element) => {
        if (element.type === 'textarea') {
          return (
            <TextBoxElementDisplay
              key={element.id}
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
              key={element.id}
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
              key={element.id}
              element={element}
              onClick={() => handleSelectedElement(element)}
            />
          );
        }
        if (element.type === 'code') {
          return (
            <CodeElementDisplay
              key={element.id}
              element={element}
              onDragStop={onDragStop}
              onResizeStop={onResizeStop}
              handleDeleteElement={handleDeleteElement}
              renderCornerBoxes={renderCornerBoxes}
            />
          );
        } else {
          return <></>;
        }
      })}

      <Typography
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          color: '#fff',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          padding: '5px 10px',
          borderRadius: '5px',
        }}
        data-testid={'slide-number-for-current-slide'}
      >
        {selectedSlide?.slideNumber}
      </Typography>

      <Typography
        style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          color: '#fff',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          padding: '5px 10px',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        data-testid={'edit-btn'}
        onClick={handleClick}
      >
        Edit
      </Typography>

      <EditMenu
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        presentationId={presentationId}
        selectedSlideId={selectedSlideId}
      />
    </div>
  );
};

export default SlideDisplay;
