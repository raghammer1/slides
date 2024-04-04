import React, { useState } from 'react';
import useSlidesListStore from '../../zustandStore/useSlidesListStore';
import { Typography } from '@mui/material';
import EditMenu from './EditSlide/EditMenu';

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
