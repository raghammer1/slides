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
const RegisterPageFooter = _ref => {
  let {
    handleRegister,
    isFormValid
  } = _ref;
  const nav = (0, _reactRouterDom.useNavigate)();
  const handlePushToLoginPage = () => {
    nav('/login');
  };
  const getNotFormValid = () => {
    return isFormValid.message;
  };
  const getFormValid = () => {
    return 'Press to register';
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.Tooltip, {
    title: !isFormValid.valid ? getNotFormValid() : getFormValid()
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_CustomePrimaryButton.default, {
    label: "Register",
    additionalStyle: {
      marginTop: '30px'
    },
    disabled: !isFormValid.valid,
    onClick: handleRegister,
    dataTestid: "register-button"
  }))), /*#__PURE__*/_react.default.createElement(_RedirectInfo.default, {
    text: "Already have an account? ",
    redirectText: "Login here",
    additionalStyles: {
      marginTop: '5px'
    },
    redirectHandler: handlePushToLoginPage
  }));
};
var _default = exports.default = RegisterPageFooter;