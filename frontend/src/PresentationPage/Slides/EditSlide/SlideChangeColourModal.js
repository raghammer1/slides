import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import CustomModal from '../../../components/CustomModal';
import CustomPrimaryButton from '../../../components/CustomePrimaryButton';
import usePresentationListStore from '../../../zustandStore/usePresentationListStore';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
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
}) => {
  const [color1, setColor1] = useState('#ffffff');
  const [color2, setColor2] = useState('#000000');
  const [gradientDirection, setGradientDirection] = useState('to bottom');

  const handleColor1Change = (color) => {
    setColor1(color.hex);
  };

  const handleColor2Change = (color) => {
    setColor2(color.hex);
  };

  const updateSlideBackgroundColor = usePresentationListStore(
    (state) => state.updateSlideBackgroundColor
  );

  const applyGradient = () => {
    const gradient = `linear-gradient(${gradientDirection}, ${color1}, ${color2})`;
    updateSlideBackgroundColor(presentationId, selectedSlideId, gradient);
    handleCloseSlideColourPalette();
  };

  return (
    <CustomModal
      open={open}
      handleCloseSlideColourPalette={handleCloseSlideColourPalette}
      style={style}
    >
      <h2>Set Slide Background Color</h2>
      <div style={{ display: 'flex' }}>
        <SketchPicker color={color1} onChangeComplete={handleColor1Change} />
        <SketchPicker color={color2} onChangeComplete={handleColor2Change} />
      </div>

      <div>
        <label htmlFor="gradient-direction">Choose Gradient Direction:</label>
        <select
          id="gradient-direction"
          value={gradientDirection}
          onChange={(e) => setGradientDirection(e.target.value)}
        >
          <option value="to bottom">Top to Bottom</option>
          <option value="to right">Left to Right</option>
          <option value="to bottom right">
            Diagonal (Top Left to Bottom Right)
          </option>
          <option value="to top right">
            Diagonal (Bottom Left to Top Right)
          </option>
        </select>
      </div>

      <CustomPrimaryButton
        label="Set Gradient Background"
        onClick={applyGradient}
      />
      <CustomPrimaryButton
        label="Cancel"
        onClick={handleCloseSlideColourPalette}
      />
    </CustomModal>
  );
};

export default SlideChangeColourModal;
