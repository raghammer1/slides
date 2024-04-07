"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _InputLabel = _interopRequireDefault(require("../../components/InputLabel"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const RegisterPageInputs = props => {
  const {
    mail,
    setMail,
    username,
    setUsername,
    password,
    setPassword,
    checkPassword,
    setCheckPassword
  } = props;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_InputLabel.default, {
    value: mail,
    setValue: setMail,
    label: "Email-address",
    type: "text",
    placeholder: "Enter the email address"
  }), /*#__PURE__*/_react.default.createElement(_InputLabel.default, {
    value: username,
    setValue: setUsername,
    label: "Username",
    type: "text",
    placeholder: "Enter the username"
  }), /*#__PURE__*/_react.default.createElement(_InputLabel.default, {
    value: password,
    setValue: setPassword,
    label: "Enter-Password",
    type: "password",
    placeholder: "Enter password"
  }), /*#__PURE__*/_react.default.createElement(_InputLabel.default, {
    value: checkPassword,
    setValue: setCheckPassword,
    label: "Re-Enter-Password",
    type: "password",
    placeholder: "Enter password"
  }));
};
var _default = exports.default = RegisterPageInputs;