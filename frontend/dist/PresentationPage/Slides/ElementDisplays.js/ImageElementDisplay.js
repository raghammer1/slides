"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRnd = require("react-rnd");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ImageElementDisplay = _ref => {
  let {
    element,
    handleDeleteElement,
    onResizeStop,
    onDragStop,
    handleSelectedElement,
    renderCornerBoxes
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_reactRnd.Rnd, {
    default: {
      x: element.top,
      y: element.left,
      width: "".concat(element.width, "%"),
      // Initial width based on element's width
      height: "".concat(element.height, "%") // Initial height based on element's height
    },
    className: element.id,
    "data-testid": 'image-box-element-test'
    // minWidth={(parseFloat(element.width) / 100) * 1000}
    // minHeight={(parseFloat(element.height) / 100) * 500}
    ,
    bounds: "parent",
    key: element.id,
    onDragStop: (e, d) => onDragStop(e, d, element),
    onResizeStop: (e, direction, ref, delta, position) => onResizeStop(e, direction, ref, delta, position, element),
    onContextMenu: e => handleDeleteElement(element.id, e)
  }, /*#__PURE__*/_react.default.createElement("div", {
    key: element.id
  }, /*#__PURE__*/_react.default.createElement("img", {
    draggable: "false",
    src: element.src,
    alt: element.alt,
    style: {
      position: 'absolute',
      top: element.top,
      left: element.left,
      height: '100%',
      width: '100%',
      resize: 'none'
    }
  }), renderCornerBoxes(element)));
};
var _default = exports.default = ImageElementDisplay;