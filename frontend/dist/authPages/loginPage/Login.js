"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _LoginPageInputs = _interopRequireDefault(require("./LoginPageInputs"));
var _LoginPageFooter = _interopRequireDefault(require("./LoginPageFooter"));
var _material = require("@mui/material");
var _validators = require("../../shared/validators");
var _AuthBox = _interopRequireDefault(require("../../components/AuthBox"));
var _api = require("../../services/api");
var _reactRouterDom = require("react-router-dom");
var _useCurrentUserStore = _interopRequireDefault(require("../../zustandStore/useCurrentUserStore"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Login = () => {
  const [mail, setMail] = (0, _react.useState)('');
  const [password, setPassword] = (0, _react.useState)('');
  const [isFormValid, setIsFormValid] = (0, _react.useState)(false);
  const {
    setCurrentUser
  } = (0, _useCurrentUserStore.default)();
  const nav = (0, _reactRouterDom.useNavigate)();
  (0, _react.useEffect)(() => {
    setIsFormValid((0, _validators.validateLoginForm)({
      mail,
      password
    }));
  }, [mail, password, setIsFormValid]);
  const handleLoginFunction = (0, _react.useCallback)(async () => {
    const loginData = await (0, _api.login)({
      email: mail,
      password
    });
    if ((loginData === null || loginData === void 0 ? void 0 : loginData.status) === 200) {
      const token = loginData.data.token;
      localStorage.setItem('token', token);
      setCurrentUser({
        name: '',
        email: mail
      });
      nav('/dashboard');
    }
  }, [mail, password]);
  return /*#__PURE__*/_react.default.createElement(_AuthBox.default, null, /*#__PURE__*/_react.default.createElement(_material.Typography, {
    variant: "h5",
    sx: {
      color: 'white'
    }
  }, "Login"), /*#__PURE__*/_react.default.createElement(_LoginPageInputs.default, {
    mail: mail,
    setMail: setMail,
    password: password,
    setPassword: setPassword
  }), /*#__PURE__*/_react.default.createElement(_LoginPageFooter.default, {
    isFormValid: isFormValid,
    handleLoginFunction: handleLoginFunction
  }));
};
var _default = exports.default = Login;