"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setStore = exports.register = exports.login = exports.getStore = void 0;
var _client = _interopRequireDefault(require("./client"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const login = async data => {
  try {
    return await _client.default.post('/admin/auth/login', data);
  } catch (e) {
    return {
      error: true,
      e
    };
  }
};
exports.login = login;
const register = async data => {
  try {
    return await _client.default.post('/admin/auth/register', data);
  } catch (e) {
    return {
      error: true,
      e
    };
  }
};
exports.register = register;
const getStore = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const response = await _client.default.get('/store', {
      headers: {
        Authorization: "Bearer ".concat(token)
      }
    });
    if (response.status === 200) return response.data.store;
  } catch (e) {
    return {
      error: true,
      message: e.message
    };
  }
};
exports.getStore = getStore;
const setStore = async data => {
  try {
    const token = localStorage.getItem('token');
    console.log('DATA', data);

    // Ensure token exists before proceeding
    if (!token) {
      throw new Error('No token found');
    }
    const oldData = await getStore();
    console.log(oldData);
    const response = await _client.default.put('/store', data, {
      headers: {
        Authorization: "Bearer ".concat(token)
      }
    });
    return response;
  } catch (e) {
    return {
      error: true,
      message: e.message
    };
  }
};

// STORE SCHEMA
/**
 * @typedef {Object} Store
 * @property {Object} Slides - The unique identifier for the user.
 * @property {Object} Presentations - The name of the user.
 */

// WE ARE CHECKING THIS AS THIS WILL TELL US IF THE ROUTE THAT IS BEING ACCESSED BY THE USER
// IS BEING DONE WHEN THEY HAVE A VALID TOKEN ELSE THEY WON'T BE ABLE TO ACCESS THE PATH
// ONLY NEEDED ON AUTHORIZED ROUTES HENCE !
// !IMPORTANT CODE DO NOT DELETE
// const checkResponseCode = (exception) => {
//   const responseCode = exception?.response?.status;

//   if (responseCode) (responseCode === 401 || responseCode === 403) && logout();
// };
// const logout = () => {
//   localStorage.clear();
//   window.location.pathname = '/login';
// };

// await setStore( { hoooo: 'WOW' } );
// const oldData = await getStore();
// console.log(oldData, 'STORE');
exports.setStore = setStore;