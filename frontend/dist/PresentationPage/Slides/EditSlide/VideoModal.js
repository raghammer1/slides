"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _CustomModal = _interopRequireDefault(require("../../../components/CustomModal"));
var _material = require("@mui/material");
var _InputLabel = _interopRequireDefault(require("../../../components/InputLabel"));
var _uuid = require("uuid");
var _CustomePrimaryButton = _interopRequireDefault(require("../../../components/CustomePrimaryButton"));
var _InputLabelRange = _interopRequireDefault(require("../../../components/InputLabelRange"));
var _usePresentationListStore = _interopRequireDefault(require("../../../zustandStore/usePresentationListStore"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable multiline-ternary */

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
const VideoModal = _ref => {
  let {
    open,
    handleCloseVideoHandler,
    presentationId,
    selectedSlideId,
    setAnchorEl
  } = _ref;
  const [videoUrl, setVideoUrl] = (0, _react.useState)(null);
  const [autoplay, setAutoplay] = (0, _react.useState)(false);
  const [sizeTextBoxWidth, setSizeTextBoxWidth] = (0, _react.useState)('50');
  const [sizeTextBoxHeight, setSizeTextBoxHeight] = (0, _react.useState)('50');
  const {
    addElementToSlide
  } = (0, _usePresentationListStore.default)();
  const handlePresentationTitleCreateImage = () => {
    const idElements = (0, _uuid.v4)();
    const element = {
      id: idElements,
      type: 'video',
      src: videoUrl,
      // Store the original URL as well
      top: '0',
      left: '0',
      height: sizeTextBoxHeight,
      width: sizeTextBoxWidth,
      autoplay,
      controls: true
    };
    addElementToSlide(presentationId, selectedSlideId, element);
    setVideoUrl(null);
    handleCloseVideoHandler();
    setAnchorEl(null);
  };

  // Function to handle the change of the checkbox
  const handleAutoplayChange = event => {
    // Update the autoplay state based on checkbox value
    setAutoplay(event.target.checked);
  };
  return /*#__PURE__*/_react.default.createElement(_CustomModal.default, {
    open: open,
    handleCloseCreateTextBox: handleCloseVideoHandler,
    style: style
  }, /*#__PURE__*/_react.default.createElement(_InputLabel.default, {
    dataTestId: 'title-video-url-box-test',
    value: videoUrl,
    setValue: setVideoUrl,
    type: "Video URL",
    placeholder: "Enter Video URL",
    label: "Video URL"
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
  }), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'row',
      gap: '10px'
    }
  }, /*#__PURE__*/_react.default.createElement("h3", null, "AutoPlay"), /*#__PURE__*/_react.default.createElement("input", {
    "data-testid": 'autoplay-checkbox-btn',
    type: "checkbox",
    checked: autoplay,
    onChange: handleAutoplayChange
  })), /*#__PURE__*/_react.default.createElement(_material.Tooltip, {
    title: videoUrl === null ? 'Give a valid url' : 'submit video'
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_CustomePrimaryButton.default, {
    dataTestid: 'create-new-video-box-btn',
    disabled: videoUrl === null,
    label: "Create Now",
    additionalStyle: {
      marginTop: '30px'
    },
    onClick: handlePresentationTitleCreateImage
  }))));
};
var _default = exports.default = VideoModal;