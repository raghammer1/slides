import { create } from 'zustand';

/**
 * @Each  presentation will be an object having following properties
 * @property {String} id
 * @property {String} presentationName
 * @property {Array[Objects]} slides
 */

const usePresentationListStore = create((set) => ({
  presentations: [],
  addPresentation: (newPresentation) => {
    set((state) => {
      // console.log(state);
      return { presentations: [...state.presentations, newPresentation] };
    });
  },
  clearPresentations: () => set({ presentations: [] }),
  deleteOnePresentation: (id) =>
    set((state) => ({
      presentations: state.presentations.filter(
        (presentation) => presentation.id !== id
      ),
    })),
  addSlideToPresentation: (id, newSlide) =>
    set((state) => ({
      presentations: state.presentations.map((presentation) =>
        presentation.id === id
          ? { ...presentation, slides: [...presentation.slides, newSlide] }
          : presentation
      ),
    })),
  updatePresentationTitle: (id, newTitle) =>
    set((state) => ({
      presentations: state.presentations.map((presentation) =>
        presentation.id === id
          ? { ...presentation, name: newTitle }
          : presentation
      ),
    })),
}));

export default usePresentationListStore;
