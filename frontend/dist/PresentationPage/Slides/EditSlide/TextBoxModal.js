"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _CustomModal = _interopRequireDefault(require("../../../components/CustomModal"));
var _InputLabel = _interopRequireDefault(require("../../../components/InputLabel"));
var _CustomePrimaryButton = _interopRequireDefault(require("../../../components/CustomePrimaryButton"));
var _uuid = require("uuid");
var _InputLabelRange = _interopRequireDefault(require("../../../components/InputLabelRange"));
var _usePresentationListStore = _interopRequireDefault(require("../../../zustandStore/usePresentationListStore"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
const TextBoxModal = _ref => {
  let {
    open,
    handleCloseCreateTextBox,
    presentationId,
    selectedSlideId,
    setAnchorEl
  } = _ref;
  const [title, setTitle] = (0, _react.useState)('');
  const [sizeTextBoxWidth, setSizeTextBoxWidth] = (0, _react.useState)('50');
  const [sizeTextBoxHeight, setSizeTextBoxHeight] = (0, _react.useState)('50');
  const [fontSizeTextBox, setFontSizeTextBox] = (0, _react.useState)('1');
  const [colourTextBox, setColourTextBox] = (0, _react.useState)('#000');
  const {
    addElementToSlide
  } = (0, _usePresentationListStore.default)();
  const handlePresentationTitleCreateTextBox = () => {
    const idElements = (0, _uuid.v4)();
    const element = {
      id: idElements,
      type: 'textarea',
      text: title,
      top: '0',
      left: '0',
      height: sizeTextBoxHeight,
      width: sizeTextBoxWidth,
      fontSize: "".concat(fontSizeTextBox, "em"),
      color: "".concat(colourTextBox)
    };
    addElementToSlide(presentationId, selectedSlideId, element);
    setTitle('');
    setColourTextBox('#000');
    setFontSizeTextBox('1');
    handleCloseCreateTextBox();
    setAnchorEl(null);
  };
  return /*#__PURE__*/_react.default.createElement(_CustomModal.default, {
    open: open,
    handleCloseCreateTextBox: handleCloseCreateTextBox,
    style: style
  }, /*#__PURE__*/_react.default.createElement(_InputLabel.default, {
    dataTestId: 'title-text-box-test',
    value: title,
    setValue: setTitle,
    type: "Title",
    placeholder: "Enter Title",
    label: "Title"
  }), /*#__PURE__*/_react.default.createElement(_InputLabel.default, {
    value: colourTextBox,
    setValue: setColourTextBox,
    type: "Font Colour",
    placeholder: "Enter Font Colour",
    label: "Font Colour"
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
  }), /*#__PURE__*/_react.default.createElement(_InputLabelRange.default, {
    value: fontSizeTextBox,
    setValue: setFontSizeTextBox,
    label: "Font Size",
    max: '10',
    min: '0',
    sign: 'em'
  }), /*#__PURE__*/_react.default.createElement(_CustomePrimaryButton.default, {
    label: "Create Now",
    additionalStyle: {
      marginTop: '30px'
    },
    onClick: handlePresentationTitleCreateTextBox,
    dataTestid: 'create-new-text-box-btn'
  }));
};
var _default = exports.default = TextBoxModal;