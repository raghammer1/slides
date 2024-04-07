"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRouterDom = require("react-router-dom");
var _material = require("@mui/material");
var _CustomePrimaryButton = _interopRequireDefault(require("../../components/CustomePrimaryButton"));
var _RedirectInfo = _interopRequireDefault(require("../../components/RedirectInfo"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const LoginPageFooter = _ref => {
  let {
    handleLoginFunction,
    isFormValid
  } = _ref;
  const nav = (0, _reactRouterDom.useNavigate)();
  const handlePushToRegisterPage = () => {
    nav('/register');
  };
  const getNotFormValid = () => {
    return 'Enter correct email and password should contain between 6 and 12 characters';
  };
  const getFormValid = () => {
    return 'Press to log in';
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.Tooltip, {
    title: !isFormValid ? getNotFormValid() : getFormValid()
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_CustomePrimaryButton.default, {
    label: "Log in",
    additionalStyle: {
      marginTop: '30px'
    },
    disabled: !isFormValid,
    onClick: handleLoginFunction,
    dataTestid: "login-button"
  }))), /*#__PURE__*/_react.default.createElement(_RedirectInfo.default, {
    text: "Need an account? ",
    redirectText: "Create an account",
    additionalStyles: {
      marginTop: '5px'
    },
    redirectHandler: handlePushToRegisterPage
  }));
};
var _default = exports.default = LoginPageFooter;