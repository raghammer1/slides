"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _axios = _interopRequireDefault(require("axios"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const apiClient = _axios.default.create({
  baseURL: 'http://localhost:5005',
  timeout: 1000
});
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // Retrieve token from localStorage
  if (token) {
    try {
      config.headers.Authorization = "Bearer ".concat(token);
    } catch (err) {
      console.log(err);
    }
  }
  return config;
}, err => {
  return Promise.reject(err);
});
var _default = exports.default = apiClient;