"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _usePresentationListStore = _interopRequireDefault(require("../../zustandStore/usePresentationListStore"));
var _PresentationCard = _interopRequireDefault(require("./PresentationCard"));
var _styled = _interopRequireDefault(require("@emotion/styled"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable no-debugger */

const Wrapper = (0, _styled.default)('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  gap: '20px',
  flexWrap: 'wrap',
  overflow: 'auto'
});
const PresentationList = () => {
  const {
    presentations
  } = (0, _usePresentationListStore.default)();
  // debugger;
  console.log(presentations, 'JJRIUOHIUWHYIWEGIRYEWGRYUWEGR');
  return /*#__PURE__*/_react.default.createElement(Wrapper, null, presentations.map((presentation, index) => /*#__PURE__*/_react.default.createElement(_PresentationCard.default, {
    key: presentation.id,
    presentation: presentation
  })));
};
var _default = exports.default = PresentationList;