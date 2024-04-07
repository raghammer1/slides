"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _InputLabel = _interopRequireDefault(require("../../components/InputLabel"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const LoginPageInputs = _ref => {
  let {
    mail,
    setMail,
    password,
    setPassword
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_InputLabel.default, {
    value: mail,
    setValue: setMail,
    type: "Email",
    placeholder: "Enter email",
    label: "Email",
    dataTestId: 'email-login-data'
  }), /*#__PURE__*/_react.default.createElement(_InputLabel.default, {
    value: password,
    setValue: setPassword,
    type: "password",
    placeholder: "Enter password",
    label: "password",
    dataTestId: 'password-login-data'
  }));
};
var _default = exports.default = LoginPageInputs;