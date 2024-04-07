"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _system = require("@mui/system");
var _reactRouterDom = require("react-router-dom");
var _CustomePrimaryButton = _interopRequireDefault(require("../../components/CustomePrimaryButton"));
var _useCurrentUserStore = _interopRequireDefault(require("../../zustandStore/useCurrentUserStore"));
var _usePresentationListStore = _interopRequireDefault(require("../../zustandStore/usePresentationListStore"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Fold = () => {
  const NavWrapper = (0, _system.styled)('div')({
    height: '40px',
    backgroundColor: '#333',
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 1000
  });
  const {
    clearCurrentUser
  } = (0, _useCurrentUserStore.default)();
  const {
    clearPresentations
  } = (0, _usePresentationListStore.default)();
  const nav = (0, _reactRouterDom.useNavigate)();

  //! CLEAR ANY AND ALL ZU-STAND STORE SLICES
  const LogoutUser = () => {
    localStorage.clear();
    clearCurrentUser();
    clearPresentations();
    nav('/login');
  };
  return /*#__PURE__*/_react.default.createElement(NavWrapper, null, /*#__PURE__*/_react.default.createElement(_CustomePrimaryButton.default, {
    label: 'HI',
    additionalStyle: {
      width: '100px',
      height: '30px'
    }
  }), /*#__PURE__*/_react.default.createElement(_CustomePrimaryButton.default, {
    label: 'Logout',
    additionalStyle: {
      width: '100px',
      height: '30px'
    },
    onClick: LogoutUser,
    dataTestid: 'logout-btn'
  }));
};
var _default = exports.default = Fold;