"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _styled = _interopRequireDefault(require("@emotion/styled"));
var _react = _interopRequireDefault(require("react"));
var _reactRouterDom = require("react-router-dom");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Wrapper = (0, _styled.default)('div')({
  display: 'flex',
  // flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#333',
  color: '#fff',
  width: 'calc(25% - 20px)',
  height: '120px',
  marginTop: '10px'
});
const PresentationCard = _ref => {
  let {
    presentation
  } = _ref;
  const nav = (0, _reactRouterDom.useNavigate)();
  const handleOpenPresentation = () => {
    // Use arrow function here
    console.log(presentation);
    nav("/presentation/".concat(presentation.id));
  };
  return (
    /*#__PURE__*/
    // Pass a reference to the function instead of invoking it
    _react.default.createElement(Wrapper, {
      "data-testid": "presentation-card-".concat(presentation.id),
      onClick: handleOpenPresentation
    }, presentation.name)
  );
};
var _default = exports.default = PresentationCard;