"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _material = require("@mui/material");
var _react = _interopRequireWildcard(require("react"));
var _TextBoxModal = _interopRequireDefault(require("./TextBoxModal"));
var _ImageModal = _interopRequireDefault(require("./ImageModal"));
var _VideoModal = _interopRequireDefault(require("./VideoModal"));
var _CodeModal = _interopRequireDefault(require("./CodeModal"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const EditMenu = _ref => {
  let {
    anchorEl,
    setAnchorEl,
    presentationId,
    selectedSlideId
  } = _ref;
  const openAnchor = Boolean(anchorEl);
  const [openCreateTextBox, setOpenCreateTextBox] = (0, _react.useState)(false);
  const handleOpenCreateTextBox = () => setOpenCreateTextBox(true);
  const handleCloseCreateTextBox = () => setOpenCreateTextBox(false);
  const [openImageHandler, setOpenImageHandler] = (0, _react.useState)(false);
  const handleOpenImageHandler = () => setOpenImageHandler(true);
  const handleCloseImageHandler = () => setOpenImageHandler(false);
  const [openVideoHandler, setOpenVideoHandler] = (0, _react.useState)(false);
  const handleOpenVideoHandler = () => setOpenVideoHandler(true);
  const handleCloseVideoHandler = () => setOpenVideoHandler(false);
  const [openCodeHandler, setOpenCodeHandler] = (0, _react.useState)(false);
  const handleOpenCodeHandler = () => setOpenCodeHandler(true);
  const handleCloseCodeHandler = () => setOpenCodeHandler(false);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAddTextOnSlide = () => {
    handleOpenCreateTextBox();
    console.log('Clickes');
  };
  const handleAddImageOnSlide = () => {
    handleOpenImageHandler();
  };
  const handleAddVideoOnSlide = () => {
    handleOpenVideoHandler();
  };
  const handleAddCodeOnSlide = () => {
    handleOpenCodeHandler();
  };
  return /*#__PURE__*/_react.default.createElement(_material.Menu, {
    id: "edit-slide-menu",
    anchorEl: anchorEl,
    open: openAnchor,
    onClose: handleClose,
    MenuListProps: {
      'aria-labelledby': 'edit-slide-button'
    }
  }, /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    "data-testid": 'add-text-box-btn',
    onClick: () => {
      handleAddTextOnSlide();
    }
  }, "Add Text"), /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    "data-testid": 'add-image-box-btn',
    onClick: handleAddImageOnSlide
  }, "Add Image"), /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    "data-testid": 'add-video-box-btn',
    onClick: handleAddVideoOnSlide
  }, "Add Video"), /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    "data-testid": 'add-code-box-btn',
    onClick: handleAddCodeOnSlide
  }, "Add Code"), /*#__PURE__*/_react.default.createElement(_TextBoxModal.default, {
    open: openCreateTextBox,
    handleCloseCreateTextBox: handleCloseCreateTextBox,
    presentationId: presentationId,
    selectedSlideId: selectedSlideId,
    setAnchorEl: setAnchorEl
  }), /*#__PURE__*/_react.default.createElement(_ImageModal.default, {
    open: openImageHandler,
    handleCloseImageHandler: handleCloseImageHandler,
    presentationId: presentationId,
    selectedSlideId: selectedSlideId,
    setAnchorEl: setAnchorEl
  }), /*#__PURE__*/_react.default.createElement(_VideoModal.default, {
    open: openVideoHandler,
    handleCloseVideoHandler: handleCloseVideoHandler,
    presentationId: presentationId,
    selectedSlideId: selectedSlideId,
    setAnchorEl: setAnchorEl
  }), /*#__PURE__*/_react.default.createElement(_CodeModal.default, {
    open: openCodeHandler,
    handleCloseCodeHandler: handleCloseCodeHandler,
    presentationId: presentationId,
    selectedSlideId: selectedSlideId,
    setAnchorEl: setAnchorEl
  }));
};
var _default = exports.default = EditMenu;