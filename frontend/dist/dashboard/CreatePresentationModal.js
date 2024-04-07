"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _CustomModal = _interopRequireDefault(require("../components/CustomModal"));
var _InputLabel = _interopRequireDefault(require("../components/InputLabel"));
var _material = require("@mui/material");
var _CustomePrimaryButton = _interopRequireDefault(require("../components/CustomePrimaryButton"));
var _uuid = require("uuid");
var _usePresentationListStore = _interopRequireDefault(require("../zustandStore/usePresentationListStore"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#555',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};
const CreatePresentationModal = _ref => {
  let {
    open,
    handleClose
  } = _ref;
  const [name, setName] = (0, _react.useState)('');
  const [isFormValid, setIsFormValid] = (0, _react.useState)(false);
  const {
    addPresentation
  } = (0, _usePresentationListStore.default)();
  // const { addSlide } = usePresentationListStore();

  (0, _react.useEffect)(() => {
    setIsFormValid(name.length > 3);
  }, [name, setIsFormValid]);
  const getNotFormValid = () => {
    return 'Presentation name must be greater than 3 characters';
  };
  const getFormValid = () => {
    return 'Create New Presentation';
  };
  const handleCreatePresentationFunction = () => {
    const presentationId = (0, _uuid.v4)();
    const randomIdSlides = (0, _uuid.v4)();
    const newPresentation = {
      id: presentationId,
      name,
      slides: [{
        id: randomIdSlides
      }]
    };
    addPresentation(newPresentation);
    // addSlide(presentationId, slide);
    handleClose();
  };
  return /*#__PURE__*/_react.default.createElement(_CustomModal.default, {
    open: open,
    handleClose: handleClose,
    style: style
  }, /*#__PURE__*/_react.default.createElement(_InputLabel.default, {
    value: name,
    setValue: setName,
    type: "Presentation Name",
    placeholder: "Enter Presentation Name",
    dataTestId: 'create-presentation-name-test',
    label: "Presentation Name"
  }), /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.Tooltip, {
    title: !isFormValid ? getNotFormValid() : getFormValid()
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_CustomePrimaryButton.default, {
    label: "Create",
    additionalStyle: {
      marginTop: '30px'
    },
    disabled: !isFormValid,
    onClick: handleCreatePresentationFunction,
    dataTestid: 'create-presentation-name-test-button'
  })))));
};
var _default = exports.default = CreatePresentationModal;