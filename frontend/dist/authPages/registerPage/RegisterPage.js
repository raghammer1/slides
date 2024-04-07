"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _RegisterPageInputs = _interopRequireDefault(require("./RegisterPageInputs"));
var _RegisterPageFooter = _interopRequireDefault(require("./RegisterPageFooter"));
var _validators = require("../../shared/validators");
var _AuthBox = _interopRequireDefault(require("../../components/AuthBox"));
var _api = require("../../services/api");
var _useCurrentUserStore = _interopRequireDefault(require("../../zustandStore/useCurrentUserStore"));
var _reactRouterDom = require("react-router-dom");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// import { initializeStore } from '../../zustandStore/usePresentationListStore';

const RegisterPage = () => {
  const [mail, setMail] = (0, _react.useState)('');
  const [username, setUsername] = (0, _react.useState)('');
  const [password, setPassword] = (0, _react.useState)('');
  const [checkPassword, setCheckPassword] = (0, _react.useState)('');
  const [isFormValid, setIsFormValid] = (0, _react.useState)(true);
  const {
    setCurrentUser
  } = (0, _useCurrentUserStore.default)();
  const nav = (0, _reactRouterDom.useNavigate)();
  (0, _react.useEffect)(() => {
    setIsFormValid((0, _validators.validateRegisterForm)({
      mail,
      username,
      password,
      checkPassword
    }));
  }, [mail, password, username, checkPassword, setIsFormValid]);
  const handleRegister = (0, _react.useCallback)(async () => {
    const registerData = await (0, _api.register)({
      email: mail,
      password,
      name: username
    });
    if ((registerData === null || registerData === void 0 ? void 0 : registerData.status) === 200) {
      const token = registerData.data.token;
      localStorage.setItem('token', token);
      setCurrentUser({
        name: username,
        email: mail
      });

      // await initializeStore();

      nav('/dashboard');
    }
  }, [mail, password, username]);
  return /*#__PURE__*/_react.default.createElement(_AuthBox.default, null, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h5",
    sx: {
      color: 'white'
    }
  }, "Create an account"), /*#__PURE__*/_react.default.createElement(_RegisterPageInputs.default, {
    mail: mail,
    username: username,
    setUsername: setUsername,
    setMail: setMail,
    password: password,
    setPassword: setPassword,
    checkPassword: checkPassword,
    setCheckPassword: setCheckPassword
  }), /*#__PURE__*/_react.default.createElement(_RegisterPageFooter.default, {
    isFormValid: isFormValid,
    handleRegister: handleRegister
  }));
};
var _default = exports.default = RegisterPage;