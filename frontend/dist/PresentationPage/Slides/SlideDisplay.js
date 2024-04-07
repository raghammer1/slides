"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _EditMenu = _interopRequireDefault(require("./EditSlide/EditMenu"));
var _VideoPlayer = _interopRequireDefault(require("./ElementDisplays.js/VideoPlayer"));
var _CornerBox = _interopRequireDefault(require("./CornerBox"));
require("prismjs/themes/prism-okaidia.css");
var _prismjs = _interopRequireDefault(require("prismjs"));
require("prismjs/components/prism-javascript");
require("prismjs/components/prism-python");
require("prismjs/components/prism-c");
var _CodeElementDisplay = _interopRequireDefault(require("./ElementDisplays.js/CodeElementDisplay"));
var _ImageElementDisplay = _interopRequireDefault(require("./ElementDisplays.js/ImageElementDisplay"));
var _TextBoxElementDisplay = _interopRequireDefault(require("./ElementDisplays.js/TextBoxElementDisplay"));
var _usePresentationListStore = _interopRequireDefault(require("../../zustandStore/usePresentationListStore"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// Feel free to choose another theme

const SlideDisplay = _ref => {
  var _selectedSlide$elemen;
  let {
    presentationId,
    selectedSlideId
  } = _ref;
  const {
    selectedSlide,
    updateElementPosition,
    updateElementSize,
    deleteElementFromSlide
  } = (0, _usePresentationListStore.default)(store => ({
    selectedSlide: store.getSlideFromPresentationById(presentationId, selectedSlideId),
    updateElementPosition: store.updateElementPosition,
    updateElementSize: store.updateElementSize,
    deleteElementFromSlide: store.deleteElementFromSlide
  }));
  const [selectedElement, setSelectedElement] = (0, _react.useState)(null);
  const [anchorEl, setAnchorEl] = (0, _react.useState)(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  (0, _react.useEffect)(() => {
    _prismjs.default.highlightAll();
  }, [selectedSlide]);
  const handleSelectedElement = element => {
    setSelectedElement(element);
  };

  // Handler for updating element position
  const onDragStop = (e, d, element) => {
    // const newPosition = {
    //   top: `${(d.y / 500) * 100}%`, // Convert pixels back to percentage
    //   left: `${(d.x / 1000) * 100}%`,
    // };

    // const top = `${(d.x / 500) * 100}%`; // Convert pixels back to percentage
    // const left = `${(d.y / 1000) * 100}%`

    const top = '0';
    const left = '0';
    console.log('IENNFUHEWFIUWEBFU TOP LEFT  NEW', top, left);
    updateElementPosition(presentationId, selectedSlideId, element.id, "".concat(d.x), "".concat(d.y));
    setSelectedElement({
      ...element,
      top: "".concat(d.x),
      left: "".concat(d.y)
    });
  };

  // Handler for updating element size
  const onResizeStop = (e, direction, ref, delta, position, element) => {
    const newSize = {
      width: "".concat(ref.offsetWidth / 1000 * 100),
      // Convert pixels back to percentage
      height: "".concat(ref.offsetHeight / 500 * 100)
    };
    const newPosition = {
      top: "".concat(position.y),
      left: "".concat(position.x)
    };
    updateElementSize(presentationId, selectedSlideId, element.id, newSize.width, newSize.height);
    setSelectedElement({
      ...element,
      ...newSize,
      ...newPosition
    });
  };
  const handleDeleteElement = (elementId, e) => {
    e.preventDefault(); // Prevent the default context menu from opening
    if ((selectedElement === null || selectedElement === void 0 ? void 0 : selectedElement.id) === elementId) {
      setSelectedElement(null);
    }
    deleteElementFromSlide(presentationId, selectedSlideId, elementId);
  };
  const renderCornerBoxes = (0, _react.useCallback)(element => {
    console.log(selectedElement);
    if (selectedElement === null || selectedElement.id !== element.id) {
      return null;
    }
    // Assuming top, left, width, height are in percentages
    const containerWidth = 1000; // SlideDisplay width in pixels
    const containerHeight = 500; // SlideDisplay height in pixels
    const elementWidthPx = parseInt(selectedElement.width) / 100 * containerWidth;
    const elementHeightPx = parseInt(selectedElement.height) / 100 * containerHeight;

    // Positions for each corner box, now in pixels
    const corners = [{
      top: 0,
      left: 0
    },
    // Top-left
    {
      top: 0,
      left: 0 + elementWidthPx - 10
    },
    // Top-right, assuming corner box width of 10px
    {
      top: 0 + elementHeightPx - 10,
      left: 0
    },
    // Bottom-left, assuming corner box height of 10px
    {
      top: 0 + elementHeightPx - 10,
      left: 0 + elementWidthPx - 10
    } // Bottom-right
    ];
    console.log(corners, 'corners I AM CORNER HEY HEY');
    return corners.map((style, index) => /*#__PURE__*/_react.default.createElement(_CornerBox.default, {
      key: index,
      style: style
    }));
  }, [selectedElement]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "slideDisplaylolol",
    style: {
      width: '1000px',
      height: '500px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#999',
      position: 'relative',
      overflow: 'hidden'
    }
  }, selectedSlide === null || selectedSlide === void 0 || (_selectedSlide$elemen = selectedSlide.elements) === null || _selectedSlide$elemen === void 0 ? void 0 : _selectedSlide$elemen.map(element => {
    if (element.type === 'textarea') {
      return /*#__PURE__*/_react.default.createElement(_TextBoxElementDisplay.default, {
        key: element.id,
        element: element,
        onDragStop: onDragStop,
        onResizeStop: onResizeStop,
        handleDeleteElement: handleDeleteElement,
        renderCornerBoxes: renderCornerBoxes,
        handleSelectedElement: handleSelectedElement
      });
    } else if (element.type === 'image') {
      return /*#__PURE__*/_react.default.createElement(_ImageElementDisplay.default, {
        key: element.id,
        element: element,
        onDragStop: onDragStop,
        onResizeStop: onResizeStop,
        handleDeleteElement: handleDeleteElement,
        renderCornerBoxes: renderCornerBoxes,
        handleSelectedElement: handleSelectedElement
      });
    } else if (element.type === 'video') {
      return /*#__PURE__*/_react.default.createElement(_VideoPlayer.default, {
        style: {
          position: 'absolute',
          top: "".concat(element.top),
          left: "".concat(element.left),
          width: '100%',
          height: '100%',
          padding: '10px',
          backgroundColor: '#000'
        },
        onDragStop: onDragStop,
        onResizeStop: onResizeStop,
        handleDeleteElement: handleDeleteElement,
        renderCornerBoxes: renderCornerBoxes,
        key: element.id,
        element: element,
        onClick: () => handleSelectedElement(element)
      });
    }
    if (element.type === 'code') {
      return /*#__PURE__*/_react.default.createElement(_CodeElementDisplay.default, {
        key: element.id,
        element: element,
        onDragStop: onDragStop,
        onResizeStop: onResizeStop,
        handleDeleteElement: handleDeleteElement,
        renderCornerBoxes: renderCornerBoxes
      });
    } else {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null);
    }
  }), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    style: {
      position: 'absolute',
      bottom: '10px',
      left: '10px',
      color: '#fff',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: '5px 10px',
      borderRadius: '5px'
    }
  }, selectedSlide === null || selectedSlide === void 0 ? void 0 : selectedSlide.slideNumber), /*#__PURE__*/_react.default.createElement(_material.Typography, {
    style: {
      position: 'absolute',
      bottom: '10px',
      right: '10px',
      color: '#fff',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: '5px 10px',
      borderRadius: '5px',
      cursor: 'pointer'
    },
    "data-testid": 'edit-btn',
    onClick: handleClick
  }, "Edit"), /*#__PURE__*/_react.default.createElement(_EditMenu.default, {
    anchorEl: anchorEl,
    setAnchorEl: setAnchorEl,
    presentationId: presentationId,
    selectedSlideId: selectedSlideId
  }));
};
var _default = exports.default = SlideDisplay;