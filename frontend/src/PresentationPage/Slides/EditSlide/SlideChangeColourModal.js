import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import CustomModal from '../../../components/CustomModal';
import CustomPrimaryButton from '../../../components/CustomePrimaryButton';
import usePresentationListStore from '../../../zustandStore/usePresentationListStore';
import styled from 'styled-components';

const Title = styled.h2`
  color: #fff;
  text-align: center;
  margin: 0;
  margin-bottom: 20px;
`;

const ColorPickerContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  padding: 20px;
  background-color: #444; // Slightly darker background for better contrast
  border-radius: 8px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.25); // Soft inset shadow for depth
`;

const GradientDirectionSelector = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  label {
    color: #fff;
    margin-right: 10px;
  }
  select {
    padding: 8px;
    border-radius: 4px;
    background-color: #eee;
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

// Modal for changing the background color of a slide using a color picker.
const SlideChangeColourModal = ({
  open,
  handleCloseSlideColourPalette,
  presentationId,
  selectedSlideId,
}) => {
  const [color1, setColor1] = useState('#ffffff'); // Initial color state.
  const [color2, setColor2] = useState('#000000'); // Initial secondary color state.
  const [gradientDirection, setGradientDirection] = useState('to bottom'); // Direction of the gradient.

  const handleColor1Change = (color) => {
    setColor1(color.hex);
  };

  const handleColor2Change = (color) => {
    setColor2(color.hex);
  };

  const updateSlideBackgroundColor = usePresentationListStore(
    (state) => state.updateSlideBackgroundColor
  );

  // Function to apply the selected colors as a gradient background to the slide.
  const applyGradient = () => {
    const gradient = `linear-gradient(${gradientDirection}, ${color1}, ${color2})`;
    updateSlideBackgroundColor(presentationId, selectedSlideId, gradient);
    handleCloseSlideColourPalette();
  };

  return (
    <CustomModal
      open={open}
      handleCloseCreateTextBox={handleCloseSlideColourPalette}
      style={{
        padding: 0,
        backgroundColor: 'transparent',
        boxShadow: 'none',
        height: '1000px',
      }}>
      <Title>Set Slide Background Color</Title>
      <ColorPickerContainer>
        <SketchPicker color={color1} onChangeComplete={handleColor1Change} />
        <SketchPicker color={color2} onChangeComplete={handleColor2Change} />
      </ColorPickerContainer>
      <GradientDirectionSelector>
        <label htmlFor="gradient-direction">Choose Gradient Direction:</label>
        <select
          id="gradient-direction"
          value={gradientDirection}
          onChange={(e) => setGradientDirection(e.target.value)}>
          <option value="to bottom">Top to Bottom</option>
          <option value="to right">Left to Right</option>
          <option value="to bottom right">
            Diagonal (Top Left to Bottom Right)
          </option>
          <option value="to top right">
            Diagonal (Bottom Left to Top Right)
          </option>
        </select>
      </GradientDirectionSelector>
      <CustomPrimaryButton
        label="Set Gradient Background"
        onClick={applyGradient}
      />
    </CustomModal>
  );
};

export default SlideChangeColourModal;
