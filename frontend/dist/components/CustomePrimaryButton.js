"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Button = _interopRequireDefault(require("@mui/material/Button"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const CustomPrimaryButton = _ref => {
  let {
    label,
    additionalStyle,
    disabled,
    onClick,
    dataTestid
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_Button.default, {
    variant: "contained",
    sx: {
      bgcolor: '#228be6',
      color: '#ffffff',
      textTransform: 'none',
      fontSize: '15px',
      fontWeight: 500,
      width: '100%',
      height: '40px',
      '&:disabled': {
        color: '#555'
      }
    },
    style: additionalStyle || {},
    disabled: disabled,
    onClick: onClick
    // eslint-disable-next-line no-unneeded-ternary
    ,
    "data-testid": dataTestid ? dataTestid : 'j'
  }, label);
};
var _default = exports.default = CustomPrimaryButton;