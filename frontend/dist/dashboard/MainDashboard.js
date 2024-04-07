"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _system = require("@mui/system");
var _CustomePrimaryButton = _interopRequireDefault(require("../components/CustomePrimaryButton"));
var _CreatePresentationModal = _interopRequireDefault(require("./CreatePresentationModal"));
var _PresentationList = _interopRequireDefault(require("./PresentationList/PresentationList"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const MainDashboard = () => {
  const Wrapper = (0, _system.styled)('div')({
    height: '89vh',
    display: 'flex',
    flexDirection: 'row',
    gap: '20px'
  });
  const [open, setOpen] = (0, _react.useState)(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return /*#__PURE__*/_react.default.createElement(Wrapper, null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      backgroundColor: '#444',
      padding: '20px'
    }
  }, /*#__PURE__*/_react.default.createElement(_CustomePrimaryButton.default, {
    label: 'New Presentation',
    additionalStyle: {
      width: '200px',
      height: '40px'
    },
    onClick: handleOpen,
    dataTestid: "newPresentationButton"
  })), /*#__PURE__*/_react.default.createElement(_PresentationList.default, null), /*#__PURE__*/_react.default.createElement(_CreatePresentationModal.default, {
    open: open,
    handleClose: handleClose
  }));
};
var _default = exports.default = MainDashboard;