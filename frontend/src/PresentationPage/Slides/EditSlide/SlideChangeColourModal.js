import React, { useState } from 'react';
import CustomModal from '../../../components/CustomModal';
import { SketchPicker } from 'react-color';
import CustomPrimaryButton from '../../../components/CustomePrimaryButton';
import usePresentationListStore from '../../../zustandStore/usePresentationListStore';

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

const SlideChangeColourModal = ({
  open,
  handleCloseSlideColourPalette,
  presentationId,
  selectedSlideId,
  setAnchorEl,
  handleClose,
}) => {
  // State for color
  const [color, setColor] = useState('#fff');

  const updateSlideBackgroundColor = usePresentationListStore(
    (state) => state.updateSlideBackgroundColor
  );

  const handleChangeComplete = (color) => {
    setColor(color.hex);
  };
  const handleSetBgColor = () => {
    updateSlideBackgroundColor(presentationId, selectedSlideId, color);
    handleCloseSlideColourPalette();
    handleClose();
  };

  return (
    <CustomModal
      open={open}
      handleClose={handleCloseSlideColourPalette} // Ensure to pass the correct prop for handling close
      style={style}
    >
      <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
      <CustomPrimaryButton
        label="Set Color"
        additionalStyle={{ marginTop: '30px' }}
        onClick={handleSetBgColor}
      />
      <CustomPrimaryButton
        label="Cancel"
        additionalStyle={{ marginTop: '30px' }}
        onClick={handleCloseSlideColourPalette}
      />
    </CustomModal>
  );
};
export default SlideChangeColourModal;
