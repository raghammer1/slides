import React, { useState } from 'react';
import CustomModal from '../../../../components/CustomModal';
import InputWithLabels from '../../../../components/InputLabel';
import CustomPrimaryButton from '../../../../components/CustomePrimaryButton';
import InputLabelRange from '../../../../components/InputLabelRange';
import usePresentationListStore from '../../../../zustandStore/usePresentationListStore';
import SelectWithLabel from '../../../../components/SelectWithLabel';

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

// Modal component for editing an existing text box element.
const TextBoxDoubleClick = ({
  open,
  handleCloseEditTextBox,
  presentationId,
  selectedSlideId,
  element,
}) => {
  const [title, setTitle] = useState(element.text); // Initial text content of the text box.
  const [fontSizeTextBox, setFontSizeTextBox] = useState(
    element.fontSize.replace('em', '')
  ); // Initial font size of the text box.

  const [colourTextBox, setColourTextBox] = useState(element.color);
  // Initial font color of the text box.

  const updateElementInSlide = usePresentationListStore(
    (state) => state.updateElementInSlide
  );

  const [fontFamily, setFontFamily] = useState(element.fontFamily || 'Arial');

  // Function to save the edited text box element.
  const handleEditTextBoxHere = () => {
    updateElementInSlide(presentationId, selectedSlideId, element.id, {
      text: title,
      fontSize: `${fontSizeTextBox}em`,
      color: `${colourTextBox}`,
      fontFamily,
    });
    handleCloseEditTextBox();
  };

  return (
    <CustomModal
      open={open}
      handleCloseCreateTextBox={handleCloseEditTextBox}
      style={style}
    >
      <InputWithLabels
        dataTestId={'title-text-box-test'}
        value={title}
        setValue={setTitle}
        type="Title"
        placeholder="Enter Title"
        label="Title"
      />

      <InputWithLabels
        value={colourTextBox}
        setValue={setColourTextBox}
        type="Font Colour"
        placeholder="Enter Font Colour"
        label="Font Colour"
      />

      <InputLabelRange
        value={fontSizeTextBox}
        setValue={setFontSizeTextBox}
        label="Font Size"
        max={'10'}
        min={'0'}
        sign={'em'}
      />

      <SelectWithLabel
        label="Font Family"
        value={fontFamily}
        setValue={setFontFamily}
        options={[
          { value: 'Arial', label: 'Arial' },
          { value: 'Verdana', label: 'Verdana' },
          { value: 'Times New Roman', label: 'Times New Roman' },
          { value: 'Georgia', label: 'Georgia' },
          { value: 'Courier New', label: 'Courier New' },
        ]}
      />

      <CustomPrimaryButton
        label="Save"
        additionalStyle={{ marginTop: '30px' }}
        onClick={handleEditTextBoxHere}
        dataTestid={'create-new-text-box-btn'}
      />
    </CustomModal>
  );
};
export default TextBoxDoubleClick;
