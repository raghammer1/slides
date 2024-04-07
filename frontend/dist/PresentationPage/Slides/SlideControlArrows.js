"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _IconButton = _interopRequireDefault(require("@mui/material/IconButton"));
var _ArrowBackIos = _interopRequireDefault(require("@mui/icons-material/ArrowBackIos"));
var _ArrowForwardIos = _interopRequireDefault(require("@mui/icons-material/ArrowForwardIos"));
var _Box = _interopRequireDefault(require("@mui/material/Box"));
var _usePresentationListStore = _interopRequireDefault(require("../../zustandStore/usePresentationListStore"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const SlideControlArrows = _ref => {
  let {
    presentationId,
    setSelectedSlide,
    selectedSlideId
  } = _ref;
  const {
    slides,
    selectedSlide
  } = (0, _usePresentationListStore.default)(state => ({
    slides: state.getSlidesForPresentation(presentationId),
    selectedSlide: state.getSlideFromPresentationById(presentationId, selectedSlideId)
  }));
  // ! STILL NEED TO ADD KEYBOARD COMMANDS
  const totalSlides = slides.length;
  const handlePrev = () => {
    const slide = slides.find(s => s.slideNumber === selectedSlide.slideNumber - 1);
    setSelectedSlide(slide);
  };
  const handleNext = () => {
    const slide = slides.find(s => s.slideNumber === selectedSlide.slideNumber + 1);
    setSelectedSlide(slide);
  };
  console.log(slides, totalSlides);
  return /*#__PURE__*/_react.default.createElement(_Box.default, {
    sx: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    onClick: handlePrev,
    disabled: selectedSlide.slideNumber === 1,
    "aria-label": "previous slide"
  }, /*#__PURE__*/_react.default.createElement(_ArrowBackIos.default, null)), /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    onClick: handleNext,
    disabled: selectedSlide.slideNumber === totalSlides,
    "aria-label": "next slide"
  }, /*#__PURE__*/_react.default.createElement(_ArrowForwardIos.default, null)));
};
var _default = exports.default = SlideControlArrows;