import React, { useState } from 'react';
import useSlidesListStore from '../../zustandStore/useSlidesListStore';
import { Typography } from '@mui/material';
import EditMenu from './EditSlide/EditMenu';
import VideoPlayer from './VideoPlayer';

const SlideDisplay = ({ presentationId, selectedSlideId }) => {
  const { selectedSlide } = useSlidesListStore((store) => ({
    selectedSlide: store.getSlideFromPresentationById(
      presentationId,
      selectedSlideId
    ),
  }));

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
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
      }}
    >
      {selectedSlide?.elements?.map((element) => {
        if (element.type === 'textarea') {
          return (
            <textarea
              key={element.id}
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
            />
          );
        } else if (element.type === 'image') {
          return (
            <img
              key={element.id}
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
            />
          );
        } else if (element.type === 'video') {
          return (
            <VideoPlayer
              style={{
                top: `${element.top}`,
                left: `${element.left}`,
                width: `${element.width}%`,
                height: `${element.height}%`,
              }}
              key={element.id}
              element={element}
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
