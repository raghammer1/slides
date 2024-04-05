import React, { useCallback, useState } from 'react';
import useSlidesListStore from '../../zustandStore/useSlidesListStore';
import { Typography } from '@mui/material';
import EditMenu from './EditSlide/EditMenu';
import VideoPlayer from './VideoPlayer';
import CornerBox from './CornerBox';
import { Rnd } from 'react-rnd';

const SlideDisplay = ({ presentationId, selectedSlideId }) => {
  const {
    selectedSlide,
    updateElementPosition,
    updateElementSize,
    deleteElementFromSlide,
  } = useSlidesListStore((store) => ({
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

  const handleSelectedElement = (element) => {
    setSelectedElement(element);
  };

  // Handler for updating element position
  const onDragStop = (e, d, element) => {
    // const newPosition = {
    //   top: `${(d.y / 500) * 100}%`, // Convert pixels back to percentage
    //   left: `${(d.x / 1000) * 100}%`,
    // };

    // const top = `${(d.x / 500) * 100}%`; // Convert pixels back to percentage
    // const left = `${(d.y / 1000) * 100}%`

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

  // Handler for updating element size
  const onResizeStop = (e, direction, ref, delta, position, element) => {
    const newSize = {
      width: `${(ref.offsetWidth / 1000) * 100}`, // Convert pixels back to percentage
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
    setSelectedElement({ ...element, ...newSize, ...newPosition });
  };

  const handleDeleteElement = (elementId, e) => {
    e.preventDefault(); // Prevent the default context menu from opening
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
      // Assuming top, left, width, height are in percentages
      const containerWidth = 1000; // SlideDisplay width in pixels
      const containerHeight = 500; // SlideDisplay height in pixels
      const elementWidthPx =
        (parseInt(selectedElement.width) / 100) * containerWidth;
      const elementHeightPx =
        (parseInt(selectedElement.height) / 100) * containerHeight;

      // Positions for each corner box, now in pixels
      const corners = [
        { top: 0, left: 0 }, // Top-left
        { top: 0, left: 0 + elementWidthPx - 10 }, // Top-right, assuming corner box width of 10px
        { top: 0 + elementHeightPx - 10, left: 0 }, // Bottom-left, assuming corner box height of 10px
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
      {selectedSlide?.elements?.map((element) => {
        if (element.type === 'textarea') {
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
              <div key={element.id}>
                <textarea
                  defaultValue={element.text}
                  style={{
                    position: 'absolute',
                    top: element.top,
                    left: element.left,
                    height: '100%',
                    width: '100%',
                    fontSize: element.fontSize,
                    color: element.color,
                    resize: 'none',
                    overflow: 'hidden',
                    border: '2px solid #999',
                    cursor: 'default',
                  }}
                  readOnly
                  onClick={() => handleSelectedElement(element)}
                />
                {renderCornerBoxes(element)}
              </div>
            </Rnd>
          );
        } else if (element.type === 'image') {
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
              <div key={element.id}>
                <img
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
                  onClick={() => handleSelectedElement(element)}
                />
                {renderCornerBoxes(element)}
              </div>
            </Rnd>
          );
        } else if (element.type === 'video') {
          return (
            <VideoPlayer
              style={{
                position: 'absolute',
                top: `${element.top}`,
                left: `${element.left}`,
                width: `${element.width}%`,
                height: `${element.height}%`,
              }}
              key={element.id}
              element={element}
              onClick={() => handleSelectedElement(element)}
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
