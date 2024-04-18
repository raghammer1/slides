import { Menu, MenuItem } from '@mui/material';
import React from 'react';

/**
 * EditMenu provides a context menu for editing slide components within a presentation.
 * It allows adding various elements like text, images, videos, and codes to the slides,
 * as well as accessing slide history and color changer functionalities.
 */
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
  /**
   * Closes the menu by setting the anchor element to null.
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Menu
      id="edit-slide-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'edit-slide-button', // Accessibility feature for better screen reader support.
      }}>
      <MenuItem
        data-testid={'add-text-box-btn'}
        onClick={() => {
          handleAddTextOnSlide();
        }}>
        Add Text
      </MenuItem>
      <MenuItem
        data-testid={'add-image-box-btn'}
        onClick={() => {
          setAnchorEl(null); // Close the menu before executing the action.
          handleAddImageOnSlide();
        }}>
        Add Image
      </MenuItem>
      <MenuItem
        data-testid={'add-video-box-btn'}
        onClick={() => {
          setAnchorEl(null); // Close the menu before executing the action.
          handleAddVideoOnSlide();
        }}>
        Add Video
      </MenuItem>
      <MenuItem
        data-testid={'add-code-box-btn'}
        onClick={() => {
          setAnchorEl(null); // Close the menu before executing the action.
          handleAddCodeOnSlide();
        }}>
        Add Code
      </MenuItem>
      <MenuItem
        data-testid={'goto-history-btn'}
        onClick={() => {
          setAnchorEl(null); // Close the menu before executing the action.
          handleOpenSlideHistory();
        }}>
        History
      </MenuItem>
      <MenuItem
        data-testid={'open-color-changer-btn'}
        onClick={() => {
          setAnchorEl(null); // Close the menu before executing the action.
          handleOpenColourPalette();
        }}>
        Color Changer
      </MenuItem>
    </Menu>
  );
};
export default EditMenu;
