"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _system = require("@mui/system");
var _material = require("@mui/material");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const RedirectText = (0, _system.styled)('span')({
  color: '#00AFF4',
  fontWeight: 500,
  cursor: 'pointer'
});
const RedirectInfo = _ref => {
  let {
    text,
    redirectText,
    redirectHandler,
    additionalStyles
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_material.Typography, {
    sx: {
      color: '#72767d'
    },
    style: additionalStyles || {},
    variant: "subtitle2"
  }, text, /*#__PURE__*/_react.default.createElement(RedirectText, {
    onClick: redirectHandler
  }, redirectText));
};
var _default = exports.default = RedirectInfo;