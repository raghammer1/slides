"use strict";

var _react = _interopRequireDefault(require("react"));
var _App = _interopRequireDefault(require("./App"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
describe('<App />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount( /*#__PURE__*/_react.default.createElement(_App.default, null));
  });
});