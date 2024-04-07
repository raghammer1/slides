import React, { useEffect, useState } from 'react';
import CustomModal from '../../../components/CustomModal';
import CustomPrimaryButton from '../../../components/CustomePrimaryButton';
import { v4 as uuidv4 } from 'uuid';
import InputLabelRange from '../../../components/InputLabelRange';
import TextBoxWithLabel from '../../../components/TextBoxWithLabel';
import 'prismjs/themes/prism-okaidia.css'; // Feel free to choose another theme
import Prism from 'prismjs';
import SelectWithLabel from '../../../components/SelectWithLabel';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-c';
import InputWithLabels from '../../../components/InputLabel';
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

  const detectLanguage = (codeSnippet) => {
    // Define simple patterns/keywords for each supported language
    const patterns = {
      javascript: /\b(function|=>|var|let|const)\b/,
      python: /\b(def|print|import|from)\b/,
      c: /\b(#include|int|printf|char)\b/,
    };

    // Attempt to detect the language by matching patterns
    for (const [language, pattern] of Object.entries(patterns)) {
      if (pattern.test(codeSnippet)) {
        return language;
      }
    }

    // Default to JavaScript if no specific patterns are found
    return 'javascript';
  };

  useEffect(() => {
    setLanguage(detectLanguage(code));
    Prism.highlightAll();
  }, [code, language]);

  const { addElementToSlide } = usePresentationListStore();

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

  return (
    <CustomModal
      open={open}
      handleCloseCreateTextBox={handleCloseCodeHandler}
      style={style}
    >
      <div style={{ width: '100px', height: '100px' }}>
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
            width: '300px',
            overflow: 'auto',
            height: '100px',
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
        dataTestId={'main-code-box-test'}
        value={code}
        setValue={setCode}
        type="code"
        placeholder="Enter code"
        label="code"
      />
      <InputWithLabels
        dataTestId={'main-code-box-font-size-test'}
        value={fontSizeTextBox}
        setValue={setFontSizeTextBox}
        type="Font Size"
        placeholder="Font Size"
        label="Font Size"
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

      {/* <InputLabelRange
        value={fontSizeTextBox}
        setValue={setFontSizeTextBox}
        label="Font Size"
        max={'10'}
        min={'0'}
        sign={'em'}
      /> */}
      <CustomPrimaryButton
        dataTestid={'create-new-code-box-btn'}
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
