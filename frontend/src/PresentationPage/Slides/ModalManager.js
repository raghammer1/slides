import React from 'react';
import TextBoxModal from './EditSlide/TextBoxModal';
import VideoModal from './EditSlide/VideoModal';
import ImageModal from './EditSlide/ImageModal';
import CodeModal from './EditSlide/CodeModal';
import SlideHistory from './EditSlide/SlideHistory/SlideHistory';
import SlideChangeColourModal from './EditSlide/SlideChangeColourModal';

// Component for managing the opening and closing of modals
const ModalManager = ({
  // Props for managing modal states and actions
  openCreateTextBox,
  handleCloseCreateTextBox,
  openImageHandler,
  handleCloseImageHandler,
  openVideoHandler,
  handleCloseVideoHandler,
  openCodeHandler,
  handleCloseCodeHandler,
  OpenSlideHistoryHandler,
  handleCloseSlideHistoryHandler,
  OpenSlideColourPalette,
  handleCloseSlideColourPalette,
  presentationId,
  selectedSlideId,
  setAnchorEl,
}) => {
  // Component logic for managing modals
  return (
    <>
      <TextBoxModal
        open={openCreateTextBox}
        handleCloseCreateTextBox={handleCloseCreateTextBox}
        presentationId={presentationId}
        selectedSlideId={selectedSlideId}
        setAnchorEl={setAnchorEl}
      />
      <ImageModal
        open={openImageHandler}
        handleCloseImageHandler={handleCloseImageHandler}
        presentationId={presentationId}
        selectedSlideId={selectedSlideId}
        setAnchorEl={setAnchorEl}
      />
      <VideoModal
        open={openVideoHandler}
        handleCloseVideoHandler={handleCloseVideoHandler}
        presentationId={presentationId}
        selectedSlideId={selectedSlideId}
        setAnchorEl={setAnchorEl}
      />
      <CodeModal
        open={openCodeHandler}
        handleCloseCodeHandler={handleCloseCodeHandler}
        presentationId={presentationId}
        selectedSlideId={selectedSlideId}
        setAnchorEl={setAnchorEl}
      />
      <SlideHistory
        open={OpenSlideHistoryHandler}
        handleCloseCodeHandler={handleCloseSlideHistoryHandler}
        presentationId={presentationId}
        selectedSlideId={selectedSlideId}
        setAnchorEl={setAnchorEl}
      />
      <SlideChangeColourModal
        open={OpenSlideColourPalette}
        handleCloseSlideColourPalette={handleCloseSlideColourPalette}
        presentationId={presentationId}
        selectedSlideId={selectedSlideId}
        setAnchorEl={setAnchorEl}
      />
    </>
  );
};

export default ModalManager;
