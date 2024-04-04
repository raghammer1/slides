import { Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import TextBoxModal from './TextBoxModal';

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

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddTextOnSlide = () => {
    // OPEN MODAL HERE THEN ADD ELEMENT TO THE ELEMENTS ARRAYS AND IN THE DIPLAY PAGE CREATE CODE TO DISPAY THAT ELEMENT ACCORDING TO THE PROPERTIES YOU HAVE SET IN THE ELEMENTS OBJECT SAVED IN THE ZUSTAND
    // !OPEN MODAL FIRST THEN WHEN CLICKED CREATE THEN DO THIS :
    handleOpenCreateTextBox();
    console.log('Clickes');
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
      <MenuItem onClick={handleClose}>Option 2</MenuItem>
      <TextBoxModal
        open={openCreateTextBox}
        handleClose={handleCloseCreateTextBox}
        presentationId={presentationId}
        selectedSlideId={selectedSlideId}
        handleCloseCreateTextBox={handleCloseCreateTextBox}
      />
    </Menu>
  );
};
export default EditMenu;
