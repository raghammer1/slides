"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRnd = require("react-rnd");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const VideoPlayer = _ref => {
  let {
    style,
    element,
    onDragStop,
    onResizeStop,
    handleDeleteElement,
    renderCornerBoxes
  } = _ref;
  // State to manage whether autoplay is enabled
  // Construct the YouTube video URL with autoplay parameter

  // Function to extract YouTube video ID from URL
  const extractVideoID = url => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\s*[^/\n\s]+\/|(?:v|e(?:mbed)?)\/|\S+?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  // const videoSrc = `${element.src}?autoplay=${element.autoplay ? '1' : '0'}`;
  const videoSrc = "https://www.youtube.com/embed/".concat(extractVideoID(element.src), "?autoplay=").concat(element.autoplay ? '1' : '0', "&mute=1");
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
    style: style
  }, /*#__PURE__*/_react.default.createElement("iframe", {
    width: style.width,
    height: style.height,
    src: videoSrc,
    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
    allowFullScreen: true
  })), renderCornerBoxes(element));
};
var _default = exports.default = VideoPlayer;