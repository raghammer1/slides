"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _zustand = require("zustand");
/**
 * @typedef {Object} CurrentUser
 * @property {number} id - The unique identifier for the user.
 * @property {string} name - The name of the user.
 * @property {string} [email] - The email of the user. Optional property.
 */

const useCurrentUserStore = (0, _zustand.create)(set => ({
  currentUser: {
    name: '',
    email: ''
  },
  setCurrentUser: userDetails => set({
    currentUser: userDetails
  }),
  clearCurrentUser: () => set({
    currentUser: {
      name: '',
      email: ''
    }
  }),
  updateNameCurrentUser: name => set(state => ({
    currentUser: {
      ...state.currentUser,
      name
    }
  }))
}));
var _default = exports.default = useCurrentUserStore;