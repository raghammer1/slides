import { create } from 'zustand';
import { updateSlide } from './zustandHelper';

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
      // Use the helper function to update the specific slide
      const updatedSlides = updateSlide(
        state.slides,
        presentationId,
        slideId,
        (slide) => {
          // This is the update callback where you define how the slide should be updated
          return { ...slide, elements: [...slide.elements, newElement] };
        }
      );

      return { slides: updatedSlides };
    });
  },
}));

export default useSlidesListStore;
