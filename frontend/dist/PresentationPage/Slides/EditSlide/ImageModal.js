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
var _styled = _interopRequireDefault(require("@emotion/styled"));
var _CustomePrimaryButton = _interopRequireDefault(require("../../../components/CustomePrimaryButton"));
var _InputLabelRange = _interopRequireDefault(require("../../../components/InputLabelRange"));
var _base64Image = require("../../../shared/base64Image");
var _usePresentationListStore = _interopRequireDefault(require("../../../zustandStore/usePresentationListStore"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable multiline-ternary */

const ImagePreview = (0, _styled.default)('img')({
  maxWidth: '100%',
  maxHeight: '200px',
  marginTop: '20px',
  borderRadius: '5px'
});
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
const ImageModal = _ref => {
  let {
    open,
    handleCloseImageHandler,
    presentationId,
    selectedSlideId,
    setAnchorEl
  } = _ref;
  // State to manage toggle between URL input and image upload
  const [imageInputType, setImageInputType] = (0, _react.useState)('url');
  const [selectedFile, setSelectedFile] = (0, _react.useState)(null);
  const [imageAlt, setImageAlt] = (0, _react.useState)(null);
  const [sizeTextBoxWidth, setSizeTextBoxWidth] = (0, _react.useState)('50');
  const [sizeTextBoxHeight, setSizeTextBoxHeight] = (0, _react.useState)('50');
  const handleFileChange = event => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      (0, _base64Image.imageEncoder)(file, base64String => {
        setSelectedFile(base64String);
      });
    } else {
      setSelectedFile(null);
      alert('Please select an image file.');
    }
  };
  const {
    addElementToSlide
  } = (0, _usePresentationListStore.default)();
  const handlePresentationTitleCreateImage = () => {
    const idElements = (0, _uuid.v4)();
    const element = {
      id: idElements,
      type: 'image',
      alt: imageAlt,
      src: selectedFile,
      top: '0',
      left: '0',
      height: sizeTextBoxHeight,
      width: sizeTextBoxWidth
    };
    addElementToSlide(presentationId, selectedSlideId, element);
    setSelectedFile(null);
    setImageAlt(null);
    handleCloseImageHandler();
    setAnchorEl(null);
  };
  return /*#__PURE__*/_react.default.createElement(_CustomModal.default, {
    open: open,
    handleCloseCreateTextBox: handleCloseImageHandler,
    style: style
  }, /*#__PURE__*/_react.default.createElement(_InputLabel.default, {
    dataTestId: 'image-box-alt-test',
    value: imageAlt,
    setValue: setImageAlt,
    type: "Alt Text",
    placeholder: "Enter Alt Text",
    label: "Image name"
  }), /*#__PURE__*/_react.default.createElement(_material.FormControl, {
    component: "fieldset"
  }, /*#__PURE__*/_react.default.createElement(_material.FormLabel, {
    style: {
      marginTop: '100px'
    },
    component: "legend"
  }, "Add Image"), /*#__PURE__*/_react.default.createElement(_material.RadioGroup, {
    row: true,
    "aria-label": "imageInputType",
    name: "imageInputType",
    value: imageInputType,
    onChange: event => setImageInputType(event.target.value)
  }, /*#__PURE__*/_react.default.createElement(_material.FormControlLabel, {
    value: "url",
    control: /*#__PURE__*/_react.default.createElement(_material.Radio, null),
    label: "URL"
  }), /*#__PURE__*/_react.default.createElement(_material.FormControlLabel, {
    value: "upload",
    control: /*#__PURE__*/_react.default.createElement(_material.Radio, null),
    label: "Upload"
  }))), /*#__PURE__*/_react.default.createElement("div", null, imageInputType === 'url' ? /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_InputLabel.default, {
    dataTestId: 'image-box-url-test',
    value: selectedFile,
    setValue: setSelectedFile,
    type: "Url",
    placeholder: "Enter Url",
    label: "Url"
  }), selectedFile && /*#__PURE__*/_react.default.createElement(ImagePreview, {
    src: selectedFile,
    alt: "Image Preview",
    onError: e => e.target.style.display = 'none'
  })) : /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_material.Button, {
    variant: "contained",
    component: "label"
  }, "Upload File", /*#__PURE__*/_react.default.createElement("input", {
    type: "file",
    hidden: true,
    accept: "image/*",
    onChange: handleFileChange
  })), selectedFile && /*#__PURE__*/_react.default.createElement("div", {
    style: {
      marginTop: '20px'
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "body1"
  }, "File: ", selectedFile.name), /*#__PURE__*/_react.default.createElement("img", {
    src: selectedFile,
    alt: "Preview",
    style: {
      maxWidth: '100%',
      maxHeight: '200px',
      marginTop: '10px'
    }
  })))), /*#__PURE__*/_react.default.createElement(_InputLabelRange.default, {
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
  }), /*#__PURE__*/_react.default.createElement(_material.Tooltip, {
    title: selectedFile === null ? 'Give a valid url or image file, also give alt' : 'submit image'
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_CustomePrimaryButton.default, {
    disabled: selectedFile === null || imageAlt === null,
    label: "Create Now",
    additionalStyle: {
      marginTop: '30px'
    },
    onClick: handlePresentationTitleCreateImage,
    dataTestid: 'image-box-create-btn-test'
  }))));
};
var _default = exports.default = ImageModal;