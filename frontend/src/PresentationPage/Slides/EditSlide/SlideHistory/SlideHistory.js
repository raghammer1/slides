/* eslint-disable multiline-ternary */
import React, { useState } from 'react';
import { styled, Menu } from '@mui/material';
import usePresentationListStore from '../../../../zustandStore/usePresentationListStore';
import PreviewTheOlderVersion from './PreviewTheOlderVersion';

// Styled component for a sliding panel, typically used for showing slide history.
const SlidePanel = styled(Menu)(({ theme, open }) => ({
  '& .MuiPaper-root': {
    position: 'fixed',
    width: '30%',
    height: '100vh',
    right: open ? 0 : '-30%',
    top: 0,
    transition: theme.transitions.create('right', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    zIndex: 1200,
  },
}));

// Wrapper component with hover effect styling for individual history entries.
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

// Component that displays a history of changes made to a slide.
const SlideHistory = ({
  open,
  handleCloseCodeHandler,
  presentationId,
  selectedSlideId,
  setAnchorEl,
}) => {
  const [selectedSlideHistory, setSelectedSlideHistory] = useState({});
  const [openPreviewHandler, setOpenPreviewHandler] = useState(false);
  const handleOpenPreviewHandler = () => setOpenPreviewHandler(true);
  const handleClosePreviewHandler = () => setOpenPreviewHandler(false);

  const handlePreviewOldSlide = () => {
    handleOpenPreviewHandler();
  };

  const handleClose = () => {
    handleCloseCodeHandler();
    if (setAnchorEl) {
      setAnchorEl(null);
    }
  };

  // Fetch slide data from the store.
  const slide = usePresentationListStore((state) =>
    state.getSlideFromPresentationById(presentationId, selectedSlideId)
  );

  // Helper function to format timestamps.
  const formatDate = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    return date.toLocaleString();
  };

  // Function to select a particular historical state for preview.
  const goToThisTimeHistory = (elementObj) => {
    handlePreviewOldSlide(elementObj);
    setSelectedSlideHistory(elementObj);
  };

  return (
    <div>
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
      <PreviewTheOlderVersion
        open={openPreviewHandler}
        handleClosePreviewHandler={handleClosePreviewHandler}
        presentationId={presentationId}
        selectedSlideId={selectedSlideId}
        setAnchorEl={setAnchorEl}
        selectedSlideHistory={selectedSlideHistory}
      />
    </div>
  );
};

export default SlideHistory;
