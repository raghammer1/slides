import React, { useEffect, useState } from 'react';
import CustomModal from '../../../components/CustomModal';
import CustomPrimaryButton from '../../../components/CustomePrimaryButton';
import useSlidesListStore from '../../../zustandStore/useSlidesListStore';
import { v4 as uuidv4 } from 'uuid';
import InputLabelRange from '../../../components/InputLabelRange';
import TextBoxWithLabel from '../../../components/TextBoxWithLabel';
import 'prismjs/themes/prism-okaidia.css'; // Feel free to choose another theme
import Prism from 'prismjs';
import SelectWithLabel from '../../../components/SelectWithLabel';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-c';

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
  const [code, setCode] = useState('');
  const [sizeTextBoxWidth, setSizeTextBoxWidth] = useState('50');
  const [sizeTextBoxHeight, setSizeTextBoxHeight] = useState('50');
  const [fontSizeTextBox, setFontSizeTextBox] = useState('1');
  const [language, setLanguage] = useState('javascript');

  useEffect(() => {
    Prism.highlightAll();
  }, [code, language]);

  const { addElementToSlide } = useSlidesListStore();

  const handlePresentationcodeCreateTextBox = () => {
    const idElements = uuidv4();
    const element = {
      id: idElements,
      type: 'code',
      text: code,
      top: '0',
      left: '0',
      height: sizeTextBoxHeight,
      width: sizeTextBoxWidth,
      fontSize: `${fontSizeTextBox}em`,
      language,
    };
    addElementToSlide(presentationId, selectedSlideId, element);
    setCode('');
    handleCloseCodeHandler();
    setAnchorEl(null);
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  return (
    <CustomModal
      open={open}
      handleCloseCreateTextBox={handleCloseCodeHandler}
      style={style}
    >
      <div style={{ position: 'relative' }}>
        <textarea
          value={code}
          onChange={handleCodeChange}
          style={{
            width: '100%',
            height: '150px',
            border: 'none',
            padding: '10px',
            fontSize: '16px',
            fontFamily:
              'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
            whiteSpace: 'pre',
          }}
        />
        <pre
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            border: 'none',
            margin: '0',
            padding: '10px',
            pointerEvents: 'none',
            color: 'transparent',
            overflowY: 'scroll',
            fontSize: '16px',
            fontFamily:
              'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
          }}
        >
          <code className={`language-${language}`}>{code}</code>
        </pre>
      </div>
      <SelectWithLabel
        label="Language"
        value={language}
        setValue={setLanguage}
        options={[
          { value: 'javascript', label: 'JavaScript' },
          { value: 'python', label: 'Python' },
          { value: 'c', label: 'C' },
        ]}
      />
      <TextBoxWithLabel
        value={code}
        setValue={setCode}
        type="code"
        placeholder="Enter code"
        label="code"
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
        onClick={handlePresentationcodeCreateTextBox}
      />
    </CustomModal>
  );
};
export default CodeModal;
// Import Prism CSS for syntax highlighting styles
// import 'prismjs/themes/prism-okaidia.css'; // Feel free to choose another theme
// import Prism from 'prismjs';
// import React, { useState, useEffect } from 'react';
// import CustomModal from '../../../components/CustomModal';
// import CustomPrimaryButton from '../../../components/CustomePrimaryButton';
// import useSlidesListStore from '../../../zustandStore/useSlidesListStore';
// import { v4 as uuidv4 } from 'uuid';
// import InputLabelRange from '../../../components/InputLabelRange';
// import TextBoxWithLabel from '../../../components/TextBoxWithLabel';
// import SelectWithLabel from '../../../components/SelectWithLabel'; // Assume you have this component

// // Don't forget to import CSS for Prism (either in this file or in your App component)

// const CodeModal = ({
//   open,
//   handleCloseCodeHandler,
//   presentationId,
//   selectedSlideId,
// }) => {
//   const [code, setCode] = useState('');
//   const [language, setLanguage] = useState('javascript');
//   const [fontSize, setFontSize] = useState('1');

//   const { addElementToSlide } = useSlidesListStore();

//   const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: '#555',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
//   };
//   const handleAddCodeBlock = () => {
//     const elementId = uuidv4();
//     const element = {
//       id: elementId,
//       type: 'code',
//       code,
//       language,
//       fontSize: `${fontSize}em`,
//     };
//     addElementToSlide(presentationId, selectedSlideId, element);
//     setCode('');
//     setLanguage('javascript');
//     setFontSize('1');
//     handleCloseCodeHandler();
//   };

//   // Load Prism on component mount and code/language change
//   useEffect(() => {
//     Prism.highlightAll();
//   }, [code, language]);

//   return (
//     <CustomModal open={open} onClose={handleCloseCodeHandler} style={style}>
//       <TextBoxWithLabel
//         label="Code"
//         value={code}
//         setValue={setCode}
//         placeholder="Enter your code"
//       />
//       <SelectWithLabel
//         label="Language"
//         value={language}
//         setValue={setLanguage}
//         options={[
//           { value: 'javascript', label: 'JavaScript' },
//           { value: 'python', label: 'Python' },
//           { value: 'c', label: 'C' },
//         ]}
//       />
//       <InputLabelRange
//         label="Font Size (em)"
//         value={fontSize}
//         setValue={setFontSize}
//         min="0.5"
//         max="2"
//         step="0.1"
//       />
//       <CustomPrimaryButton
//         onClick={handleAddCodeBlock}
//         label="Add Code Block"
//       />
//     </CustomModal>
//   );
// };
// export default CodeModal;
// //
