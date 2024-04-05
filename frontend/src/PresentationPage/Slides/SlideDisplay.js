import React, { useState } from 'react';
import useSlidesListStore from '../../zustandStore/useSlidesListStore';
import { Typography } from '@mui/material';
import EditMenu from './EditSlide/EditMenu';
import VideoPlayer from './VideoPlayer';
import CornerBox from './CornerBox';

const SlideDisplay = ({ presentationId, selectedSlideId }) => {
  const { selectedSlide } = useSlidesListStore((store) => ({
    selectedSlide: store.getSlideFromPresentationById(
      presentationId,
      selectedSlideId
    ),
  }));

  const [selectedElement, setSelectedElement] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelectedElement = (element) => {
    setSelectedElement(element);
  };

  const renderCornerBoxes = () => {
    console.log(selectedElement);
    if (selectedElement === null) return null;
    const { top, left, width, height } = selectedElement; // Assuming these are numerical values for simplicity

    console.log(top, left, width, height);

    // Positions for each corner box
    const corners = [
      { top: `${parseInt(top)}%`, left: `${parseInt(left)}%` }, // Top-left
      {
        top: `${parseInt(top)}%`,
        left: `${parseInt(left) + parseInt(width) - (10 / 1000) * 100}%`,
      }, // Top-right
      {
        top: `${parseInt(top) + parseInt(height) - (10 / 500) * 100}%`,
        left: `${parseInt(left)}%`,
      }, // Bottom-left
      {
        top: `${parseInt(top) + parseInt(height) - (10 / 500) * 100}%`,
        left: `${parseInt(left) + parseInt(width) - (10 / 1000) * 100}%`,
      }, // Bottom-right
    ];
    console.log(corners);

    return corners.map((style, index) => (
      <CornerBox key={index} style={style} />
    ));
  };

  return (
    <div
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
            <div key={element.id}>
              <textarea
                defaultValue={element.text}
                style={{
                  position: 'absolute',
                  top: element.top,
                  left: element.left,
                  height: `${element.height}%`,
                  width: `${element.width}%`,
                  fontSize: element.fontSize,
                  color: element.color,
                  resize: 'none',
                  overflow: 'hidden',
                  border: '2px solid #999',
                }}
                onClick={() => handleSelectedElement(element)}
              />
              {renderCornerBoxes()}
            </div>
          );
        } else if (element.type === 'image') {
          return (
            <div key={element.id}>
              <img
                src={element.src}
                alt={element.alt}
                style={{
                  position: 'absolute',
                  top: element.top,
                  left: element.left,
                  height: `${element.height}%`,
                  width: `${element.width}%`,
                  resize: 'none',
                }}
                onClick={() => handleSelectedElement(element)}
              />
              {renderCornerBoxes()}
            </div>
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
