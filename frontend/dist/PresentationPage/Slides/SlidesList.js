"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _uuid = require("uuid");
var _Delete = _interopRequireDefault(require("@mui/icons-material/Delete"));
var _IconButton = _interopRequireDefault(require("@mui/material/IconButton"));
var _usePresentationListStore = _interopRequireDefault(require("../../zustandStore/usePresentationListStore"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// import React from 'react';
// import useSlidesListStore from '../../zustandStore/useSlidesListStore';
// import { v4 as uuidv4 } from 'uuid';
// import DeleteIcon from '@mui/icons-material/Delete'; // Importing MUI Delete icon
// import IconButton from '@mui/material/IconButton'; // Importing MUI IconButton for clickable icons

// const SlidesList = ({ selectedSlideId, presentationId, setSelectedSlide }) => {
//   const { slides, addSlide } = useSlidesListStore((state) => ({
//     slides: state.getSlidesForPresentation(presentationId),
//     addSlide: state.addSlide,
//   }));

//   const handleAddNewSlide = () => {
//     const newSlide = {
//       id: uuidv4(),
//     };
//     addSlide(presentationId, newSlide);
//   };

//   return (
//     <div
//       style={{
//         overflow: 'auto',
//         height: '500px',
//       }}
//     >
//       {slides.map((slide) => (
//         <div
//           key={slide.id}
//           onClick={() => setSelectedSlide(slide)}
//           style={{
//             cursor: 'pointer',
//             padding: '10px',
//             margin: '5px',
//             border: '1px solid #ccc',
//             borderRadius: '5px',
//             backgroundColor:
//               slide.id === selectedSlideId ? '#aaf0d1' : '#f0f0f0',
//             width: '250px',
//           }}
//         >
//           Slide {slide.slideNumber} - {slide.id}
//         </div>
//       ))}
//       <div
//         onClick={handleAddNewSlide}
//         style={{
//           cursor: 'pointer',
//           padding: '10px',
//           margin: '5px',
//           border: '1px solid #ccc',
//           borderRadius: '5px',
//           backgroundColor: '#f0f0f0',
//           width: '250px',
//         }}
//       >
//         Add Slide +
//       </div>
//     </div>
//   );
// };

// export default SlidesList;

const SlidesList = _ref => {
  let {
    selectedSlideId,
    presentationId,
    setSelectedSlide,
    handleDeleteSlide
  } = _ref;
  const {
    slides,
    addSlide
  } = (0, _usePresentationListStore.default)(state => ({
    slides: state.getSlidesForPresentation(presentationId),
    addSlide: state.addSlide
  }));
  const handleAddNewSlide = () => {
    const newSlide = {
      id: (0, _uuid.v4)(),
      elements: []
    };
    addSlide(presentationId, newSlide);
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      overflow: 'auto',
      height: '500px'
    }
  }, slides.map(slide => /*#__PURE__*/_react.default.createElement("div", {
    key: slide.id,
    onClick: () => setSelectedSlide(slide),
    style: {
      cursor: 'pointer',
      padding: '10px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '5px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      backgroundColor: slide.id === selectedSlideId ? '#aaf0d1' : '#f0f0f0',
      width: '250px'
    },
    "data-testid": "data-test-slide-".concat(slide.id)
  }, /*#__PURE__*/_react.default.createElement("span", null, "Slide ", slide.slideNumber, " - ", slide.id), /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    onClick: e => handleDeleteSlide(e, slide),
    size: "small"
  }, /*#__PURE__*/_react.default.createElement(_Delete.default, {
    fontSize: "small"
  })))), /*#__PURE__*/_react.default.createElement("div", {
    onClick: handleAddNewSlide,
    style: {
      cursor: 'pointer',
      padding: '10px',
      margin: '5px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      backgroundColor: '#f0f0f0',
      width: '250px'
    },
    "data-testid": 'add-slide-button'
  }, "Add Slide +"));
};
var _default = exports.default = SlidesList;