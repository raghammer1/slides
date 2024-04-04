import { Menu, MenuItem } from '@mui/material';
import React from 'react';
// import useSlidesListStore from '../../../zustandStore/useSlidesListStore';
const EditMenu = ({
  anchorEl,
  setAnchorEl,
  presentationId,
  selectedSlideId,
}) => {
  const open = Boolean(anchorEl);

  // const { slides } = useSlidesListStore((state) => ({
  //   slides: state.getSlidesForPresentation(presentationId),
  //   addSlide: state.addSlide,
  // }));

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddTextOnSlide = () => {
    // OPEN MODAL HERE THEN ADD ELEMENT TO THE ELEMENTS ARRAYS AND IN THE DIPLAY PAGE CREATE CODE TO DISPAY THAT ELEMENT ACCORDING TO THE PROPERTIES YOU HAVE SET IN THE ELEMENTS OBJECT SAVED IN THE ZUSTAND
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
