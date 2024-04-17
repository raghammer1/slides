import { Menu, MenuItem } from '@mui/material';
import React from 'react';

const EditMenu = ({
  anchorEl,
  setAnchorEl,
  presentationId,
  selectedSlideId,
  handleAddTextOnSlide,
  handleAddImageOnSlide,
  handleAddVideoOnSlide,
  handleAddCodeOnSlide,
  handleOpenSlideHistory,
  handleOpenColourPalette,
}) => {
  const openAnchor = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
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
        onClick={() => {
          setAnchorEl(null);
          handleAddImageOnSlide();
        }}
      >
        Add Image
      </MenuItem>
      <MenuItem
        data-testid={'add-video-box-btn'}
        onClick={() => {
          setAnchorEl(null);
          handleAddVideoOnSlide();
        }}
      >
        Add Video
      </MenuItem>
      <MenuItem
        data-testid={'add-code-box-btn'}
        onClick={() => {
          setAnchorEl(null);
          handleAddCodeOnSlide();
        }}
      >
        Add Code
      </MenuItem>
      <MenuItem
        data-testid={'goto-history-btn'}
        onClick={() => {
          setAnchorEl(null);
          handleOpenSlideHistory();
        }}
      >
        History
      </MenuItem>
      <MenuItem
        data-testid={'open-color-changer-btn'}
        onClick={() => {
          setAnchorEl(null);
          handleOpenColourPalette();
        }}
      >
        Color Changer
      </MenuItem>
    </Menu>
  );
};
export default EditMenu;
