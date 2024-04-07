"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _usePresentationListStore = _interopRequireDefault(require("../zustandStore/usePresentationListStore"));
var _CustomePrimaryButton = _interopRequireDefault(require("../components/CustomePrimaryButton"));
var _DeletePresentationModal = _interopRequireDefault(require("./DeletePresentationModal"));
var _material = require("@mui/material");
var _styled = _interopRequireDefault(require("@emotion/styled"));
var _EditPresentationTitleModal = _interopRequireDefault(require("./EditPresentationTitleModal"));
var _SlidesMain = _interopRequireDefault(require("./Slides/SlidesMain"));
var _templateObject;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
const Wrapper = (0, _styled.default)('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '30px',
  marginTop: '15px'
});
const StyledTypography = (0, _styled.default)(_material.Typography)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  position: relative;\n  font-size: 32px;\n  text-align: center;\n\n  &:hover::before {\n    content: '';\n    position: absolute;\n    bottom: -5px; // Adjust this value as per your Typography line-height\n    left: 0;\n    width: 100%;\n    height: 2px; // Line thickness\n    background-color: black; // Line color\n    animation: lineAnimation 0.5s forwards; // Animation time\n  }\n\n  @keyframes lineAnimation {\n    from {\n      width: 0;\n    }\n    to {\n      width: 100%;\n    }\n  }\n\n  &:hover {\n    cursor: pointer;\n  }\n"])));
const PresentationDetail = () => {
  const {
    id
  } = (0, _reactRouterDom.useParams)(); // Get the id from route parameters
  const nav = (0, _reactRouterDom.useNavigate)();
  const [open, setOpen] = (0, _react.useState)(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openEdit, setOpenEdit] = (0, _react.useState)(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const {
    presentations,
    deleteOnePresentation,
    updatePresentationTitle
  } = (0, _usePresentationListStore.default)();
  const presentation = presentations.find(p => p.id === id);
  const [title, setTitle] = (0, _react.useState)("".concat(presentation.name));
  const handlePresentationDelete = () => {
    console.log('delete');
    setOpen(false);
    deleteOnePresentation(id);
    nav('/dashboard');
  };
  const handleGoBack = () => {
    nav('/dashboard');
  };
  const handlePresentationTitleEdit = (0, _react.useCallback)(() => {
    updatePresentationTitle(presentation.id, title);
    handleCloseEdit();
  }, [title]);
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-around'
    }
  }, /*#__PURE__*/_react.default.createElement(StyledTypography, {
    sx: {
      fontSize: '32px',
      textAlign: 'center'
    },
    onClick: handleOpenEdit
  }, /*#__PURE__*/_react.default.createElement("b", null, "Title -"), " ", presentation.name), /*#__PURE__*/_react.default.createElement(Wrapper, null, /*#__PURE__*/_react.default.createElement(_CustomePrimaryButton.default, {
    label: "Delete",
    additionalStyle: {
      width: '200px'
    },
    onClick: handleOpen,
    dataTestid: "presentation-delete-".concat(presentation.id)
  }), /*#__PURE__*/_react.default.createElement(_CustomePrimaryButton.default, {
    label: "Back",
    additionalStyle: {
      width: '200px'
    },
    onClick: handleGoBack,
    dataTestid: "presentation-go-back-".concat(presentation.id)
  }))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_SlidesMain.default, {
    presentationId: presentation.id
  })), /*#__PURE__*/_react.default.createElement(_DeletePresentationModal.default, {
    open: open,
    handleClose: handleClose,
    handlePresentationDelete: handlePresentationDelete,
    dataTestid: "presentation-delete-modal-button-".concat(presentation.id)
  }), /*#__PURE__*/_react.default.createElement(_EditPresentationTitleModal.default, {
    open: openEdit,
    handleClose: handleCloseEdit,
    handlePresentationEdit: handlePresentationTitleEdit,
    title: title,
    setTitle: setTitle
  }));
};
var _default = exports.default = PresentationDetail;