import { Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import TextBoxModal from './TextBoxModal';
import ImageModal from './ImageModal';

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

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddTextOnSlide = () => {
    handleOpenCreateTextBox();
    console.log('Clickes');
  };

  const handleAddImageOnSlide = () => {
    handleOpenImageHandler();
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
        onClick={() => {
          handleAddTextOnSlide();
        }}
      >
        Add Text
      </MenuItem>
      <MenuItem onClick={handleAddImageOnSlide}>Add Image</MenuItem>
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
    </Menu>
  );
};
export default EditMenu;
