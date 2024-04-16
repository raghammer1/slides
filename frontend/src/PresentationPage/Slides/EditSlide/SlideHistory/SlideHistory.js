/* eslint-disable multiline-ternary */
import React from 'react';
import { styled, Menu } from '@mui/material';
import usePresentationListStore from '../../../../zustandStore/usePresentationListStore';

// Define a styled menu that behaves as a sliding panel
const SlidePanel = styled(Menu)(({ theme, open }) => ({
  '& .MuiPaper-root': {
    position: 'fixed',
    width: '30%',
    height: '100vh',
    right: open ? 0 : '-30%', // Slide in from the right
    top: 0,
    transition: theme.transitions.create('right', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    zIndex: 1200, // Make sure it's on top of other content
  },
}));

const Wrapper = styled('div')({
  width: '100%',
  padding: '10px',
  marginBottom: '5px',
  backgroundColor: '#f9f9f9',
  paddingLeft: '20px',

  '&:hover': {
    cursor: 'pointer',
  },
});

const SlideHistory = ({
  open,
  handleCloseCodeHandler,
  presentationId,
  selectedSlideId,
  setAnchorEl,
}) => {
  // Ensure the panel closes when you expect it to
  const handleClose = () => {
    handleCloseCodeHandler();
    if (setAnchorEl) {
      setAnchorEl(null);
    }
  };

  const slide = usePresentationListStore((state) =>
    state.getSlideFromPresentationById(presentationId, selectedSlideId)
  );

  // Function to convert timestamp to human-readable date
  const formatDate = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    return date.toLocaleString(); // Converts to local date string
  };

  const goToThisTimeHistory = (elementObj) => {
    console.log(elementObj);
  };

  return (
    <SlidePanel
      id="slide-history-panel"
      anchorEl="right"
      open={open}
      onClose={handleClose}
      keepMounted
    >
      <div>
        <h1 style={{ marginLeft: '20px' }}>Slide History</h1>
        {slide && slide.elements && slide.elements.length > 0 ? (
          slide.elements.map((elementObj, index) =>
            Object.entries(elementObj).map(([timeKey, elements]) => (
              <Wrapper
                key={`${timeKey}-${index}`}
                onClick={() => goToThisTimeHistory(elementObj)}
              >
                <div>Go To Time: {formatDate(timeKey)}</div>
              </Wrapper>
            ))
          )
        ) : (
          <p>No history available for this slide.</p>
        )}
      </div>
    </SlidePanel>
  );
};

export default SlideHistory;
