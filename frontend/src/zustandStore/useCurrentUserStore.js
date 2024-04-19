import { create } from 'zustand';

/**
 * @typedef {Object} CurrentUser
 * @property {number} id
 * @property {string} name
 * @property {string} [email]
 */

/**
 * Provides a Zustand store for managing the current user's state.
 * Allows for setting, updating, and clearing the current user information.
 */
const useCurrentUserStore = create((set) => ({
  currentUser: { name: '', email: '' },
  setCurrentUser: (userDetails) => set({ currentUser: userDetails }),
  clearCurrentUser: () => set({ currentUser: { name: '', email: '' } }),
  updateNameCurrentUser: (name) =>
    set((state) => ({
      currentUser: { ...state.currentUser, name },
    })),
}));

export default useCurrentUserStore;
