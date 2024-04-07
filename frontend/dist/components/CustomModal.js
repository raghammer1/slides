"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _material = require("@mui/material");
var _system = require("@mui/system");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const CustomModal = _ref => {
  let {
    open,
    handleCloseCreateTextBox,
    style,
    children
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_material.Modal, {
    open: open,
    onClose: handleCloseCreateTextBox,
    "aria-labelledby": "modal-modal-title",
    "aria-describedby": "modal-modal-description"
  }, /*#__PURE__*/_react.default.createElement(_system.Box, {
    sx: style
  }, children));
};
var _default = exports.default = CustomModal;