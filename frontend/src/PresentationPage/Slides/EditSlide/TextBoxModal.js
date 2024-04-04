import React, { useState } from 'react';
import CustomModal from '../../../components/CustomModal';
import InputWithLabels from '../../../components/InputLabel';
import CustomPrimaryButton from '../../../components/CustomePrimaryButton';
import useSlidesListStore from '../../../zustandStore/useSlidesListStore';
import { v4 as uuidv4 } from 'uuid';

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

const TextBoxModal = ({
  open,
  handleClose,
  presentationId,
  selectedSlideId,
  handleCloseCreateTextBox,
}) => {
  const [title, setTitle] = useState('');
  const [sizeTextBoxWidth, setSizeTextBoxWidth] = useState('');
  const [sizeTextBoxHeight, setSizeTextBoxHeight] = useState('');
  const [fontSizeTextBox, setFontSizeTextBox] = useState('');
  const [colourTextBox, setColourTextBox] = useState('');

  const { addElementToSlide } = useSlidesListStore();

  const handlePresentationTitleCreateTextBox = () => {
    const idElements = uuidv4();
    const element = {
      id: idElements,
      type: 'textarea',
      text: title,
      top: '0',
      left: '0',
      height: sizeTextBoxWidth,
      width: sizeTextBoxHeight,
      fontSize: fontSizeTextBox,
      color: colourTextBox,
    };
    addElementToSlide(presentationId, selectedSlideId, element);
    setTitle('');
    handleClose();
    handleCloseCreateTextBox();
  };

  return (
    <CustomModal open={open} handleClose={handleClose} style={style}>
      <InputWithLabels
        value={title}
        setValue={setTitle}
        type="Title"
        placeholder="Enter Title"
        label="Title"
      />
      <InputWithLabels
        value={sizeTextBoxWidth}
        setValue={setSizeTextBoxWidth}
        type="Width"
        placeholder="width"
        label="Width"
      />
      <InputWithLabels
        value={sizeTextBoxHeight}
        setValue={setSizeTextBoxHeight}
        type="Height"
        placeholder="Enter Height"
        label="Height"
      />
      <InputWithLabels
        value={fontSizeTextBox}
        setValue={setFontSizeTextBox}
        type="Font Size"
        placeholder="Enter Font Size"
        label="Font Size"
      />
      <InputWithLabels
        value={colourTextBox}
        setValue={setColourTextBox}
        type="Font Colour"
        placeholder="Enter Font Colour"
        label="Font Colour"
      />
      <CustomPrimaryButton
        label="Create Now"
        additionalStyle={{ marginTop: '30px' }}
        onClick={handlePresentationTitleCreateTextBox}
      />
    </CustomModal>
  );
};
export default TextBoxModal;
