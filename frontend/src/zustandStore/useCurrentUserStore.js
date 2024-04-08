import { create } from 'zustand';

/**
 * @typedef {Object} CurrentUser
 * @property {number} id
 * @property {string} name
 * @property {string} [email]
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
