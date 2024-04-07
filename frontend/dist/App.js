"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRouterDom = require("react-router-dom");
var _Login = _interopRequireDefault(require("./authPages/loginPage/Login.js"));
var _RegisterPage = _interopRequireDefault(require("./authPages/registerPage/RegisterPage.js"));
var _Dashboard = _interopRequireDefault(require("./dashboard/Dashboard.js"));
var _ProtectedRoute = _interopRequireDefault(require("./ProtectedRoute.js"));
var _PresentationMainPage = _interopRequireDefault(require("./PresentationPage/PresentationMainPage.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const App = () => {
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.BrowserRouter, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Routes, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    index: true,
    element: /*#__PURE__*/_react.default.createElement(_Login.default, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/login",
    element: /*#__PURE__*/_react.default.createElement(_Login.default, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/register",
    element: /*#__PURE__*/_react.default.createElement(_RegisterPage.default, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/dashboard",
    element: /*#__PURE__*/_react.default.createElement(_ProtectedRoute.default, null, /*#__PURE__*/_react.default.createElement(_Dashboard.default, null))
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/presentation/:id",
    element: /*#__PURE__*/_react.default.createElement(_ProtectedRoute.default, null, /*#__PURE__*/_react.default.createElement(_PresentationMainPage.default, null))
  }))));
};
var _default = exports.default = App;