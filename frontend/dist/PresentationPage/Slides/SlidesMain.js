"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styled = _interopRequireDefault(require("@emotion/styled"));
var _SlidesList = _interopRequireDefault(require("./SlidesList"));
var _SlideDisplay = _interopRequireDefault(require("./SlideDisplay"));
var _SlideControlArrows = _interopRequireDefault(require("./SlideControlArrows"));
var _DeletePresentationModal = _interopRequireDefault(require("../DeletePresentationModal"));
var _reactRouterDom = require("react-router-dom");
var _usePresentationListStore = _interopRequireDefault(require("../../zustandStore/usePresentationListStore"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// hi
const Wrapper = (0, _styled.default)('div')({
  width: '90vw',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '30px'
});
const SlidesMain = _ref => {
  let {
    presentationId
  } = _ref;
  const {
    slides,
    deleteSlide
  } = (0, _usePresentationListStore.default)(state => ({
    slides: state.getSlidesForPresentation(presentationId),
    deleteSlide: state.deleteSlide // Assuming this method exists for deleting a slide
  }));
  // const slides = getSlidesForPresentation(presentationId);

  const [selectedSlide, setSelectedSlide] = (0, _react.useState)(slides[0]);
  const selectedSlideId = selectedSlide.id;
  const [open, setOpen] = (0, _react.useState)(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  (0, _react.useEffect)(() => {
    if (!selectedSlide || !slides.find(slide => slide.id === selectedSlide.id)) {
      setSelectedSlide(slides[0] || null);
    }
  }, [slides, selectedSlide, setSelectedSlide]);
  const nav = (0, _reactRouterDom.useNavigate)();
  const handleDeleteSlide = (e, slide) => {
    e.stopPropagation();
    if (slides.length === 1) {
      handleOpen();
      return;
    }
    if (selectedSlideId === slide.id) {
      if (slide.slideNumber === 1 && slides.length > 1) {
        setSelectedSlide(slides[1]);
      } else if (slides.length > 1) {
        setSelectedSlide(slides[slide.slideNumber - 2]);
      }
    }
    deleteSlide(presentationId, slide.id);
  };
  const {
    deleteOnePresentation
  } = (0, _usePresentationListStore.default)();
  const handlePresentationDelete = () => {
    console.log('delete');
    setOpen(false);
    deleteOnePresentation(presentationId);
    nav('/dashboard');
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement(Wrapper, null, /*#__PURE__*/_react.default.createElement(_SlidesList.default, {
    presentationId: presentationId,
    setSelectedSlide: setSelectedSlide,
    selectedSlideId: selectedSlideId,
    handleDeleteSlide: handleDeleteSlide
  }), /*#__PURE__*/_react.default.createElement(_SlideDisplay.default, {
    presentationId: presentationId,
    selectedSlideId: selectedSlideId
  })), /*#__PURE__*/_react.default.createElement(_SlideControlArrows.default, {
    presentationId: presentationId,
    setSelectedSlide: setSelectedSlide,
    selectedSlideId: selectedSlideId
  }), /*#__PURE__*/_react.default.createElement(_DeletePresentationModal.default, {
    open: open,
    handleClose: handleClose,
    handlePresentationDelete: handlePresentationDelete
  }), ";");
};
var _default = exports.default = SlidesMain;