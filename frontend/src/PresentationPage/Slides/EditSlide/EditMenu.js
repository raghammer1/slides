import { Menu, MenuItem } from '@mui/material';
import React from 'react';
import useSlidesListStore from '../../../zustandStore/useSlidesListStore';
import { v4 as uuidv4 } from 'uuid';

const EditMenu = ({
  anchorEl,
  setAnchorEl,
  presentationId,
  selectedSlideId,
}) => {
  const open = Boolean(anchorEl);

  const { addElementToSlide } = useSlidesListStore();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddTextOnSlide = () => {
    const idElements = uuidv4();
    // OPEN MODAL HERE THEN ADD ELEMENT TO THE ELEMENTS ARRAYS AND IN THE DIPLAY PAGE CREATE CODE TO DISPAY THAT ELEMENT ACCORDING TO THE PROPERTIES YOU HAVE SET IN THE ELEMENTS OBJECT SAVED IN THE ZUSTAND
    // !OPEN MODAL FIRST THEN WHEN CLICKED CREATE THEN DO THIS :
    const element = {
      id: idElements,
      type: 'textarea',
      text: 'LOL',
      top: '0',
      left: '0',
      height: '10em',
      width: '10em',
    };
    addElementToSlide(presentationId, selectedSlideId, element);
    console.log('Clickes');
  };
  return (
    <Menu
      id="edit-slide-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'edit-slide-button',
      }}
    >
      <MenuItem
        onClick={() => {
          handleClose();
          handleAddTextOnSlide();
        }}
      >
        Add Text
      </MenuItem>
      <MenuItem onClick={handleClose}>Option 2</MenuItem>
    </Menu>
  );
};
export default EditMenu;
