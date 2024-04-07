"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _CustomModal = _interopRequireDefault(require("../components/CustomModal"));
var _InputLabel = _interopRequireDefault(require("../components/InputLabel"));
var _CustomePrimaryButton = _interopRequireDefault(require("../components/CustomePrimaryButton"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
const EditPresentationTitleModal = _ref => {
  let {
    open,
    handleClose,
    handlePresentationEdit,
    title,
    setTitle
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_CustomModal.default, {
    open: open,
    handleClose: handleClose,
    style: style
  }, /*#__PURE__*/_react.default.createElement(_InputLabel.default, {
    value: title,
    setValue: setTitle,
    type: "Title",
    placeholder: "Enter Title",
    label: "Title"
  }), /*#__PURE__*/_react.default.createElement(_CustomePrimaryButton.default, {
    label: "Edit Now",
    additionalStyle: {
      marginTop: '30px'
    },
    onClick: handlePresentationEdit
  }));
};
var _default = exports.default = EditPresentationTitleModal;