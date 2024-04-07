"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const CornerBox = _ref => {
  let {
    style
  } = _ref;
  // Log the style object to the console
  console.log(style, 'style');

  // Now return your component JSX
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '10px',
      height: '10px',
      backgroundColor: 'red',
      position: 'absolute',
      ...style // Spread the received style props here
    }
  });
};
var _default = exports.default = CornerBox;