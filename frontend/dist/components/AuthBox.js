"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Box = _interopRequireDefault(require("@mui/material/Box"));
var _system = require("@mui/system");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const BoxWrapper = (0, _system.styled)('div')({
  width: '100%',
  height: '98vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#1864ab'
});
const AuthBox = props => {
  return /*#__PURE__*/_react.default.createElement(BoxWrapper, null, /*#__PURE__*/_react.default.createElement(_Box.default, {
    sx: {
      width: 700,
      // height: 300,
      bgcolor: '#222',
      borderRadius: '5px',
      boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: '25px'
    }
  }, props.children));
};
var _default = exports.default = AuthBox;