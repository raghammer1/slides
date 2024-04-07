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
  justifyContent: 'center',
  flexDirection: 'column',
  width: '100%'
});
const Label = (0, _system.styled)('p')({
  color: '#a5d8ff',
  textTransform: 'uppercase',
  fontWeight: '600',
  fontSize: '16px'
});
const Input = (0, _system.styled)('textarea')({
  flexGrow: 1,
  height: '40px',
  border: '1px solid black',
  borderRadius: '5px',
  color: '#dcddde',
  background: '#35393f',
  margin: 0,
  fontSize: '16px',
  padding: '0 5px'
});
const TextBoxWithLabel = _ref => {
  let {
    value,
    setValue,
    label,
    type,
    placeholder,
    dataTestId
  } = _ref;
  const handleValueChange = event => {
    setValue(event.target.value);
  };
  return /*#__PURE__*/_react.default.createElement(Wrapper, null, /*#__PURE__*/_react.default.createElement(Label, null, label), /*#__PURE__*/_react.default.createElement(Input, {
    value: value,
    onChange: handleValueChange,
    placeholder: placeholder,
    type: type
    // eslint-disable-next-line no-unneeded-ternary
    ,
    "data-testid": dataTestId ? dataTestId : ''
  }));
};
var _default = exports.default = TextBoxWithLabel;