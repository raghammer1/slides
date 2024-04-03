import { create } from 'zustand';

const useSlidesListStore = create((set, get) => ({
  slides: {}, // Using an object to map presentation IDs to their slides for quick access
  addSlide: (presentationId, newSlide) => {
    set((state) => {
      console.log(state);
      const currentSlides = state.slides[presentationId] || [];
      const newSlideNumber =
        currentSlides.reduce(
          (max, slide) => Math.max(max, slide.slideNumber),
          0
        ) + 1;

      const updatedSlides = [
        ...currentSlides,
        { ...newSlide, slideNumber: newSlideNumber },
      ];

      return {
        slides: { ...state.slides, [presentationId]: updatedSlides },
      };
    });
  },
  deleteSlide: (presentationId, slideNumber) => {
    set((state) => {
      const updatedSlides = state.slides[presentationId].filter(
        (slide) => slide.slideNumber !== slideNumber
      );
      return {
        slides: { ...state.slides, [presentationId]: updatedSlides },
      };
    });
  },
  deletePresentationAllSlides: (presentationId) => {
    set((state) => {
      const { [presentationId]: _, ...remainingSlides } = state.slides;
      console.log(remainingSlides, 'REMAINING SLIDES');
      return {
        slides: remainingSlides,
      };
    });
  },
  getSlidesForPresentation: (presentationId) => {
    // Using get() to access the current state
    const state = get();
    return state.slides[presentationId] || []; // Return the slides for the given ID, or an empty array if none found
  },
}));

export default useSlidesListStore;
