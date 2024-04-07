"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Fold = _interopRequireDefault(require("./Fold/Fold"));
var _MainDashboard = _interopRequireDefault(require("./MainDashboard"));
var _DashboardFooter = _interopRequireDefault(require("./DashboardFooter"));
var _system = require("@mui/system");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Dashboard = () => {
  const Wrapper = (0, _system.styled)('div')({
    margin: 0,
    padding: 0
  });
  return /*#__PURE__*/_react.default.createElement(Wrapper, null, /*#__PURE__*/_react.default.createElement(_Fold.default, null), /*#__PURE__*/_react.default.createElement(_MainDashboard.default, null), /*#__PURE__*/_react.default.createElement(_DashboardFooter.default, null));
};
var _default = exports.default = Dashboard;