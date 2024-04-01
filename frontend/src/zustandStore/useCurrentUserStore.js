import { create } from 'zustand';

/**
 * @typedef {Object} CurrentUser
 * @property {number} id - The unique identifier for the user.
 * @property {string} name - The name of the user.
 * @property {string} [email] - The email of the user. Optional property.
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
