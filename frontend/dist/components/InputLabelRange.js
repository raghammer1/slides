"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _system = require("@mui/system");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Wrapper = (0, _system.styled)('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
  width: '100%'
});
const SliderLabel = (0, _system.styled)('label')({
  color: '#a5d8ff',
  textTransform: 'uppercase',
  fontWeight: '600',
  fontSize: '16px'
});
const SliderInput = (0, _system.styled)('input')({
  width: '100%',
  // Make the slider take up the full width of its container
  cursor: 'pointer'
});
const SliderValue = (0, _system.styled)('span')({
  color: '#dcddde',
  fontSize: '16px'
});
const InputLabelRange = _ref => {
  let {
    customeStyle,
    sign,
    min,
    max,
    label,
    value,
    setValue
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(Wrapper, {
    style: customeStyle
  }, /*#__PURE__*/_react.default.createElement(SliderLabel, null, label), /*#__PURE__*/_react.default.createElement(SliderInput, {
    type: "range",
    min: min,
    max: max,
    value: value,
    onChange: e => setValue(e.target.value)
  }), /*#__PURE__*/_react.default.createElement(SliderValue, null, value, sign));
};
var _default = exports.default = InputLabelRange;