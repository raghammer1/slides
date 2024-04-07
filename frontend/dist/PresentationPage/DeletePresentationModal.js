"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _CustomModal = _interopRequireDefault(require("../components/CustomModal"));
var _material = require("@mui/material");
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
const DeletePresentationModal = _ref => {
  let {
    open,
    handleClose,
    handlePresentationDelete,
    dataTestid
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_CustomModal.default, {
    open: open,
    handleClose: handleClose,
    style: style
  }, /*#__PURE__*/_react.default.createElement(_material.Typography, null, "Are you sure you want to delete this presentation"), /*#__PURE__*/_react.default.createElement(_CustomePrimaryButton.default, {
    label: "Close",
    additionalStyle: {
      marginTop: '30px'
    },
    onClick: handleClose
  }), /*#__PURE__*/_react.default.createElement(_CustomePrimaryButton.default, {
    label: "Delete",
    additionalStyle: {
      marginTop: '30px'
    },
    onClick: handlePresentationDelete
    // eslint-disable-next-line no-unneeded-ternary
    ,
    dataTestid: dataTestid ? dataTestid : 'j'
  }));
};
var _default = exports.default = DeletePresentationModal;