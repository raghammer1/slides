"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _CustomModal = _interopRequireDefault(require("../../../components/CustomModal"));
var _CustomePrimaryButton = _interopRequireDefault(require("../../../components/CustomePrimaryButton"));
var _uuid = require("uuid");
var _InputLabelRange = _interopRequireDefault(require("../../../components/InputLabelRange"));
var _TextBoxWithLabel = _interopRequireDefault(require("../../../components/TextBoxWithLabel"));
require("prismjs/themes/prism-okaidia.css");
var _prismjs = _interopRequireDefault(require("prismjs"));
var _SelectWithLabel = _interopRequireDefault(require("../../../components/SelectWithLabel"));
require("prismjs/components/prism-javascript");
require("prismjs/components/prism-python");
require("prismjs/components/prism-c");
var _InputLabel = _interopRequireDefault(require("../../../components/InputLabel"));
var _usePresentationListStore = _interopRequireDefault(require("../../../zustandStore/usePresentationListStore"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// Feel free to choose another theme

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#555',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};
const CodeModal = _ref => {
  let {
    open,
    handleCloseCodeHandler,
    presentationId,
    selectedSlideId,
    setAnchorEl
  } = _ref;
  const [code, setCode] = (0, _react.useState)('');
  const [sizeTextBoxWidth, setSizeTextBoxWidth] = (0, _react.useState)('50');
  const [sizeTextBoxHeight, setSizeTextBoxHeight] = (0, _react.useState)('50');
  const [fontSizeTextBox, setFontSizeTextBox] = (0, _react.useState)('1');
  const [language, setLanguage] = (0, _react.useState)('javascript');
  const detectLanguage = codeSnippet => {
    // Define simple patterns/keywords for each supported language
    const patterns = {
      javascript: /\b(function|=>|var|let|const)\b/,
      python: /\b(def|print|import|from)\b/,
      c: /\b(#include|int|printf|char)\b/
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
  (0, _react.useEffect)(() => {
    setLanguage(detectLanguage(code));
    _prismjs.default.highlightAll();
  }, [code, language]);
  const {
    addElementToSlide
  } = (0, _usePresentationListStore.default)();
  const handlePresentationcodeCreateTextBox = () => {
    const idElements = (0, _uuid.v4)();
    const element = {
      id: idElements,
      type: 'code',
      text: code,
      top: '0',
      left: '0',
      height: sizeTextBoxHeight,
      width: sizeTextBoxWidth,
      fontSize: "".concat(fontSizeTextBox, "em"),
      language
    };
    addElementToSlide(presentationId, selectedSlideId, element);
    setCode('');
    handleCloseCodeHandler();
    setAnchorEl(null);
  };
  return /*#__PURE__*/_react.default.createElement(_CustomModal.default, {
    open: open,
    handleCloseCreateTextBox: handleCloseCodeHandler,
    style: style
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '100px',
      height: '100px'
    }
  }, /*#__PURE__*/_react.default.createElement("pre", {
    "aria-hidden": "true",
    style: {
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
      fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace'
    }
  }, /*#__PURE__*/_react.default.createElement("code", {
    className: "language-".concat(language)
  }, code))), /*#__PURE__*/_react.default.createElement(_SelectWithLabel.default, {
    label: "Language",
    value: language,
    setValue: setLanguage,
    options: [{
      value: 'javascript',
      label: 'JavaScript'
    }, {
      value: 'python',
      label: 'Python'
    }, {
      value: 'c',
      label: 'C'
    }]
  }), /*#__PURE__*/_react.default.createElement(_TextBoxWithLabel.default, {
    dataTestId: 'main-code-box-test',
    value: code,
    setValue: setCode,
    type: "code",
    placeholder: "Enter code",
    label: "code"
  }), /*#__PURE__*/_react.default.createElement(_InputLabel.default, {
    dataTestId: 'main-code-box-font-size-test',
    value: fontSizeTextBox,
    setValue: setFontSizeTextBox,
    type: "Font Size",
    placeholder: "Font Size",
    label: "Font Size"
  }), /*#__PURE__*/_react.default.createElement(_InputLabelRange.default, {
    value: sizeTextBoxWidth,
    setValue: setSizeTextBoxWidth,
    label: 'Width',
    max: '100',
    min: '0',
    sign: '%',
    customeStyle: {
      marginTop: '20px'
    }
  }), /*#__PURE__*/_react.default.createElement(_InputLabelRange.default, {
    value: sizeTextBoxHeight,
    setValue: setSizeTextBoxHeight,
    label: "Height",
    max: '100',
    min: '0',
    sign: '%'
  }), /*#__PURE__*/_react.default.createElement(_CustomePrimaryButton.default, {
    dataTestid: 'create-new-code-box-btn',
    label: "Create Now",
    additionalStyle: {
      marginTop: '30px'
    },
    onClick: handlePresentationcodeCreateTextBox
  }));
};
var _default = exports.default = CodeModal; // Import Prism CSS for syntax highlighting styles
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