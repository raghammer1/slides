"use strict";

var _react = _interopRequireDefault(require("react"));
var _Login = _interopRequireDefault(require("./Login"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
describe('<Login />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount( /*#__PURE__*/_react.default.createElement(_Login.default, null));
  });
});