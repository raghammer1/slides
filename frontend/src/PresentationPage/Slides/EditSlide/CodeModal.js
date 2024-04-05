import React, { useState } from 'react';
import CustomModal from '../../../components/CustomModal';
import CustomPrimaryButton from '../../../components/CustomePrimaryButton';
import useSlidesListStore from '../../../zustandStore/useSlidesListStore';
import { v4 as uuidv4 } from 'uuid';
import InputLabelRange from '../../../components/InputLabelRange';
import TextBoxWithLabel from '../../../components/TextBoxWithLabel';

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

const CodeModal = ({
  open,
  handleCloseCodeHandler,
  presentationId,
  selectedSlideId,
  setAnchorEl,
}) => {
  const [title, setTitle] = useState('');
  const [sizeTextBoxWidth, setSizeTextBoxWidth] = useState('50');
  const [sizeTextBoxHeight, setSizeTextBoxHeight] = useState('50');
  const [fontSizeTextBox, setFontSizeTextBox] = useState('1');

  const { addElementToSlide } = useSlidesListStore();

  const handlePresentationTitleCreateTextBox = () => {
    const idElements = uuidv4();
    const element = {
      id: idElements,
      type: 'textarea',
      text: title,
      top: '0',
      left: '0',
      height: sizeTextBoxHeight,
      width: sizeTextBoxWidth,
      fontSize: `${fontSizeTextBox}em`,
    };
    addElementToSlide(presentationId, selectedSlideId, element);
    setTitle('');
    handleCloseCodeHandler();
    setAnchorEl(null);
  };

  return (
    <CustomModal
      open={open}
      handleCloseCreateTextBox={handleCloseCodeHandler}
      style={style}
    >
      <TextBoxWithLabel
        value={title}
        setValue={setTitle}
        type="Title"
        placeholder="Enter Title"
        label="Title"
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
      />
    </CustomModal>
  );
};
export default CodeModal;
