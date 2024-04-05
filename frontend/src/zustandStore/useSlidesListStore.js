import { create } from 'zustand';
import { updateSlide } from './zustandHelper';
// import { getStore, setStore } from '../services/api';
// import { setStore } from '../services/api';

const slidesChangeLogger = (config) => (set, get, api) =>
  config(
    async (nextState, ...args) => {
      // Note: Making this async may not directly work as intended
      // Get the current state
      const currentState = get();

      // Proceed to update the state
      set(nextState, ...args);

      // After state update, check for changes in 'slides'
      const newState = get();
      if (currentState.slides !== newState.slides) {
        console.log('Slides changed:', newState.slides);

        // Fetch new store data asynchronously
        // let storeData = await getStore();
        // storeData = storeData.data;
        // const data = { ...storeData, slides: newState.slides };
        // await setStore(data);
      }
    },
    get,
    api
  );

const useSlidesListStore = create(
  slidesChangeLogger((set, get) => ({
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
    updateElementPosition: (presentationId, slideId, elementId, top, left) => {
      set((state) => {
        const slides = state.slides[presentationId] || [];
        const slideIndex = slides.findIndex((slide) => slide.id === slideId);

        // Check if the slide was found
        if (slideIndex === -1) return;

        // Clone the slide to avoid direct state mutation
        const updatedSlide = { ...slides[slideIndex] };

        // Update the element within the slide
        updatedSlide.elements = updatedSlide.elements.map((element) => {
          if (element.id === elementId) {
            return { ...element, top, left }; // Update the targeted element's position
          }
          return element; // Return all other elements unchanged
        });

        // Clone the slides array to insert the updated slide
        const updatedSlides = [...slides];
        updatedSlides[slideIndex] = updatedSlide;

        // Update the state with the modified slides array
        return {
          slides: {
            ...state.slides,
            [presentationId]: updatedSlides,
          },
        };
      });
    },
    updateElementSize: (presentationId, slideId, elementId, width, height) => {
      set((state) => {
        const slides = state.slides[presentationId] || [];
        const slideIndex = slides.findIndex((slide) => slide.id === slideId);

        // Check if the slide was found
        if (slideIndex === -1) return;

        // Clone the slide to avoid direct state mutation
        const updatedSlide = { ...slides[slideIndex] };

        // Update the element within the slide
        updatedSlide.elements = updatedSlide.elements.map((element) => {
          if (element.id === elementId) {
            return { ...element, width, height }; // Update the targeted element's position
          }
          return element; // Return all other elements unchanged
        });

        // Clone the slides array to insert the updated slide
        const updatedSlides = [...slides];
        updatedSlides[slideIndex] = updatedSlide;

        // Update the state with the modified slides array
        return {
          slides: {
            ...state.slides,
            [presentationId]: updatedSlides,
          },
        };
      });
    },
    deleteElementFromSlide: (presentationId, slideId, elementId) => {
      set((state) => {
        // Locate the correct slide
        const slides = state.slides[presentationId] || [];
        const slideIndex = slides.findIndex((slide) => slide.id === slideId);

        if (slideIndex === -1) return; // Slide not found, nothing to delete

        // Clone the slide to avoid direct state mutation
        const updatedSlide = { ...slides[slideIndex] };

        // Filter out the element to be deleted
        updatedSlide.elements = updatedSlide.elements.filter(
          (element) => element.id !== elementId
        );

        // Clone the slides array to insert the updated slide
        const updatedSlides = [...slides];
        updatedSlides[slideIndex] = updatedSlide;

        // Update the state with the modified slides array
        return {
          slides: {
            ...state.slides,
            [presentationId]: updatedSlides,
          },
        };
      });
    },
  }))
);

const initializeStore = async () => {
  // await setStore({ store: {} });
  // const initialSlides = await setStore();
  //   useSlidesListStore.setState({ slides: initialSlides.slides });
};

// // Immediately call the function to initialize the store
initializeStore();

export default useSlidesListStore;
