import { create } from 'zustand';

const useSlidesListStore = create((set, get) => ({
  slides: {},
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
        { ...newSlide, slideNumber: newSlideNumber, elements: [] },
      ];

      return {
        slides: { ...state.slides, [presentationId]: updatedSlides },
      };
    });
  },
  deleteSlide: (presentationId, slideId) => {
    set((state) => {
      const updatedSlides = state.slides[presentationId].filter(
        (slide) => slide.id !== slideId
      );
      const renumberedSlides = updatedSlides.map((slide, index) => ({
        ...slide,
        slideNumber: index + 1,
      }));
      return {
        slides: { ...state.slides, [presentationId]: renumberedSlides },
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
    const state = get();
    return state.slides[presentationId] || [];
  },
  getSlideFromPresentationById: (presentationId, slideId) => {
    const state = get();
    const slides = state.slides[presentationId] || [];
    return slides.find((slide) => slide.id === slideId);
  },
  addElementToSlide: (presentationId, slideId, newElement) => {
    set((state) => {
      // Clone the current state to avoid direct mutations
      const newState = { ...state };

      // Ensure the presentation exists
      if (!newState.slides[presentationId]) {
        console.warn('Presentation not found');
        return newState; // Return the current state unmodified
      }

      // Find the target slide
      const slideIndex = newState.slides[presentationId].findIndex(
        (slide) => slide.id === slideId
      );
      if (slideIndex === -1) {
        console.warn('Slide not found');
        return newState; // Return the current state unmodified
      }

      // Clone the slide and its elements to avoid direct mutations
      const updatedSlide = { ...newState.slides[presentationId][slideIndex] };
      updatedSlide.elements = [...updatedSlide.elements, newElement]; // Add the new element

      // Update the slide in the presentation's slides array
      newState.slides[presentationId][slideIndex] = updatedSlide;

      return { slides: newState.slides }; // Return the updated state
    });
  },
}));

export default useSlidesListStore;
