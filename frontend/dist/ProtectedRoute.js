"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRouterDom = require("react-router-dom");
var _usePresentationListStore = require("./zustandStore/usePresentationListStore");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ProtectedRoute = _ref => {
  let {
    children
  } = _ref;
  const [isInitialized, setIsInitialized] = _react.default.useState(false);
  // Check for token in localStorage or however you store it
  const token = localStorage.getItem('token');

  // If there is no token, redirect to the login page
  (0, _usePresentationListStore.initializeStore)();
  if (!token) {
    return /*#__PURE__*/_react.default.createElement(_reactRouterDom.Navigate, {
      to: "/login"
    });
  }
  _react.default.useEffect(() => {
    const initializeAndAuthenticate = async () => {
      await (0, _usePresentationListStore.initializeStore)(); // Initialize your store
      setIsInitialized(true);
      // Perform authentication check here and update isAuthenticated accordingly
      // setIsAuthenticated(authenticated);
    };
    initializeAndAuthenticate();
  }, []);
  if (!isInitialized) {
    return /*#__PURE__*/_react.default.createElement("div", null, "Loading..."); // Or any other loading indicator
  }

  // If there is a token, proceed to render the children components
  return children;
};
var _default = exports.default = ProtectedRoute;