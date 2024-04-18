import React from 'react';
import { Modal, Box } from '@mui/material';
import SlidePreview from './SlidePreview';

// Styling for the modal box that displays the slide preview.
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#555',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// Modal component to preview older versions of a slide.
const PreviewTheOlderVersion = ({
  open,
  handleClosePreviewHandler,
  presentationId,
  selectedSlideId,
  setAnchorEl,
  selectedSlideHistory,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClosePreviewHandler}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <SlidePreview
          presentationId={presentationId}
          selectedSlideId={selectedSlideId}
          selectedSlideHistory={selectedSlideHistory}
          handleClosePreviewHandler={handleClosePreviewHandler}
        />
      </Box>
    </Modal>
  );
};

export default PreviewTheOlderVersion;
