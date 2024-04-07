"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRnd = require("react-rnd");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const CodeElementDisplay = _ref => {
  let {
    element,
    onDragStop,
    onResizeStop,
    handleDeleteElement,
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
    className: element.id
    // minWidth={(parseFloat(element.width) / 100) * 1000}
    // minHeight={(parseFloat(element.height) / 100) * 500}
    ,
    bounds: "parent",
    key: element.id,
    onDragStop: (e, d) => onDragStop(e, d, element),
    onResizeStop: (e, direction, ref, delta, position) => onResizeStop(e, direction, ref, delta, position, element),
    onContextMenu: e => handleDeleteElement(element.id, e)
  }, /*#__PURE__*/_react.default.createElement("div", {
    key: element.id,
    style: {
      position: 'relative',
      width: '100%',
      height: '100%'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      height: '100%'
    }
  }, /*#__PURE__*/_react.default.createElement("textarea", {
    defaultValue: element.text,
    onChange: e => {
      /* Handler to update code text */
    },
    style: {
      width: '100%',
      height: '100%',
      fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1,
      color: 'transparent',
      // Hide text in textarea, showing only the highlighted code below
      background: 'none',
      pointerEvents: 'none',
      // Make the textarea non-interactive
      overflowY: 'auto',
      resize: 'none',
      border: 'none'
    },
    readOnly: true // Remove readOnly if you want to make it editable
  }), /*#__PURE__*/_react.default.createElement("pre", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      margin: 0,
      padding: '10px',
      overflowY: 'auto',
      zIndex: 0,
      pointerEvents: 'none' // Prevent interaction with the highlighted code
    }
  }, /*#__PURE__*/_react.default.createElement("code", {
    style: {
      fontSize: element.fontSize
    },
    className: "language-".concat(element.language)
  }, element.text))), renderCornerBoxes(element)));
};
var _default = exports.default = CodeElementDisplay;