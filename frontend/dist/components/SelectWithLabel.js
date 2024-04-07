"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// In your components/SelectWithLabel.js or .jsx file

const SelectWithLabel = _ref => {
  let {
    label,
    value,
    setValue,
    options
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("label", null, label), /*#__PURE__*/_react.default.createElement("select", {
    value: value,
    onChange: e => setValue(e.target.value)
  }, options.map(option => /*#__PURE__*/_react.default.createElement("option", {
    key: option.value,
    value: option.value
  }, option.label))));
};
var _default = exports.default = SelectWithLabel;