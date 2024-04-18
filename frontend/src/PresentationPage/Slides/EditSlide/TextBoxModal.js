import React, { useState } from 'react';
import CustomModal from '../../../components/CustomModal';
import InputWithLabels from '../../../components/InputLabel';
import CustomPrimaryButton from '../../../components/CustomePrimaryButton';
import { v4 as uuidv4 } from 'uuid';
import InputLabelRange from '../../../components/InputLabelRange';
import usePresentationListStore from '../../../zustandStore/usePresentationListStore';

//  Custom Styling for this element.
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

// Modal for creating text boxes on a presentation slide.
const TextBoxModal = ({
  open,
  handleCloseCreateTextBox,
  presentationId,
  selectedSlideId,
}) => {
  // Local state for managing text box properties
  const [title, setTitle] = useState('');
  const [sizeTextBoxWidth, setSizeTextBoxWidth] = useState('50');
  const [sizeTextBoxHeight, setSizeTextBoxHeight] = useState('50');
  const [fontSizeTextBox, setFontSizeTextBox] = useState('1');
  const [colourTextBox, setColourTextBox] = useState('#000');

  // Access the store to use the addElementToSlide action
  const { addElementToSlide } = usePresentationListStore();

  // Function to handle the creation of a new text box
  const handlePresentationTitleCreateTextBox = () => {
    const idElements = uuidv4();
    const element = {
      id: idElements, // Generate a unique ID for the new element
      type: 'textarea',
      text: title,
      top: '0',
      left: '0',
      height: sizeTextBoxHeight,
      width: sizeTextBoxWidth,
      fontSize: `${fontSizeTextBox}em`,
      color: `${colourTextBox}`,
      fonFamily: 'Arial',
    };
    addElementToSlide(presentationId, selectedSlideId, element); // Add the new text box to the slide
    setTitle(''); // Reset the title state
    setColourTextBox('#000'); // Reset the color state
    setFontSizeTextBox('1'); // Reset the font size state
    handleCloseCreateTextBox(); // Close the modal
  };

  return (
    <CustomModal
      open={open}
      handleCloseCreateTextBox={handleCloseCreateTextBox}
      style={style}>
      <InputWithLabels
        dataTestId={'title-text-box-test'}
        value={title}
        setValue={setTitle}
        type="text"
        placeholder="Enter Title"
        label="Title"
      />

      <InputWithLabels
        value={colourTextBox}
        setValue={setColourTextBox}
        type="text"
        placeholder="Enter Font Colour"
        label="Font Colour"
      />

      <InputLabelRange
        value={sizeTextBoxWidth}
        setValue={setSizeTextBoxWidth}
        label={'Width'}
        max={'100'}
        min={'0'}
        sign={'%'}
        customeStyle={{ marginTop: '20px' }}
      />
      <InputLabelRange
        value={sizeTextBoxHeight}
        setValue={setSizeTextBoxHeight}
        label="Height"
        max={'100'}
        min={'0'}
        sign={'%'}
      />

      <InputLabelRange
        value={fontSizeTextBox}
        setValue={setFontSizeTextBox}
        label="Font Size"
        max={'10'}
        min={'0'}
        sign={'em'}
      />
      <CustomPrimaryButton
        label="Create Now"
        additionalStyle={{ marginTop: '30px' }}
        onClick={handlePresentationTitleCreateTextBox}
        dataTestid={'create-new-text-box-btn'}
      />
    </CustomModal>
  );
};
export default TextBoxModal;
