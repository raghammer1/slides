import { Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import TextBoxModal from './TextBoxModal';
import ImageModal from './ImageModal';
import VideoModal from './VideoModal';
import CodeModal from './CodeModal';
import SlideHistory from './SlideHistory/SlideHistory';

const EditMenu = ({
  anchorEl,
  setAnchorEl,
  presentationId,
  selectedSlideId,
}) => {
  const openAnchor = Boolean(anchorEl);

  const [openCreateTextBox, setOpenCreateTextBox] = useState(false);
  const handleOpenCreateTextBox = () => setOpenCreateTextBox(true);
  const handleCloseCreateTextBox = () => setOpenCreateTextBox(false);

  const [openImageHandler, setOpenImageHandler] = useState(false);
  const handleOpenImageHandler = () => setOpenImageHandler(true);
  const handleCloseImageHandler = () => setOpenImageHandler(false);

  const [openVideoHandler, setOpenVideoHandler] = useState(false);
  const handleOpenVideoHandler = () => setOpenVideoHandler(true);
  const handleCloseVideoHandler = () => setOpenVideoHandler(false);

  const [openCodeHandler, setOpenCodeHandler] = useState(false);
  const handleOpenCodeHandler = () => setOpenCodeHandler(true);
  const handleCloseCodeHandler = () => setOpenCodeHandler(false);

  const [OpenSlideHistoryHandler, setOpenSlideHistoryHandler] = useState(false);
  const handleOpenSlideHistoryHandler = () => setOpenSlideHistoryHandler(true);
  const handleCloseSlideHistoryHandler = () =>
    setOpenSlideHistoryHandler(false);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddTextOnSlide = () => {
    handleOpenCreateTextBox();
  };

  const handleAddImageOnSlide = () => {
    handleOpenImageHandler();
  };

  const handleAddVideoOnSlide = () => {
    handleOpenVideoHandler();
  };

  const handleAddCodeOnSlide = () => {
    handleOpenCodeHandler();
  };

  const handleOpenSlideHistory = () => {
    handleOpenSlideHistoryHandler();
  };

  return (
    <Menu
      id="edit-slide-menu"
      anchorEl={anchorEl}
      open={openAnchor}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'edit-slide-button',
      }}
    >
      <MenuItem
        data-testid={'add-text-box-btn'}
        onClick={() => {
          handleAddTextOnSlide();
        }}
      >
        Add Text
      </MenuItem>
      <MenuItem
        data-testid={'add-image-box-btn'}
        onClick={handleAddImageOnSlide}
      >
        Add Image
      </MenuItem>
      <MenuItem
        data-testid={'add-video-box-btn'}
        onClick={handleAddVideoOnSlide}
      >
        Add Video
      </MenuItem>
      <MenuItem data-testid={'add-code-box-btn'} onClick={handleAddCodeOnSlide}>
        Add Code
      </MenuItem>
      <MenuItem
        data-testid={'goto-history-btn'}
        onClick={handleOpenSlideHistory}
      >
        History
      </MenuItem>
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
    </Menu>
  );
};
export default EditMenu;
