import { create } from 'zustand';
import { getStore, setStore } from '../services/api';

/**
 * @Each  presentation will be an object having following properties
 * @property {String} id
 * @property {String} presentationName
 * @property {Array[Objects]} slides
 */

const presentationsChangeLogger = (config) => (set, get, api) =>
  config(
    async (nextState, ...args) => {
      const currentState = get();

      set(nextState, ...args);

      const newState = get();
      if (currentState.presentations !== newState.presentations) {
        console.log('presentations changed:', newState.presentations);

        const updatedData = {
          store: {
            presentations: newState.presentations,
          },
        };
        await setStore(updatedData);
      }
    },
    get,
    api
  );

const usePresentationListStore = create(
  presentationsChangeLogger((set, get) => ({
    presentations: [],
    timerStart: null,
    elapsedTime: 0,

    // Method to start the timer
    startTimer: () => {
      set({ timerStart: Date.now() });
    },
    // Method to stop the timer and calculate elapsed time
    stopTimer: () => {
      const startTime = get().timerStart;
      if (startTime) {
        const endTime = Date.now();
        const elapsed = endTime - startTime;
        set({
          elapsedTime: elapsed,
          timerStart: null, // Reset timer start
        });
      }
    },
    // Calculate the elapsed time dynamically
    calculateCurrentElapsedTime: () => {
      const startTime = get().timerStart;
      if (startTime) {
        const endTime = Date.now();
        return endTime - startTime;
      }
      return 0; // Return 0 if the timer has not been started
    },
    // Get the current elapsed time
    getElapsedTime: () => get().elapsedTime,

    addPresentation: (newPresentation) => {
      set((state) => {
        const presentationWithStandardizedSlide = {
          ...newPresentation,
          slides: newPresentation.slides.map((slide, index) => ({
            ...slide,

            slideNumber: index + 1,
            elements: slide.elements || [],
          })),
        };

        return {
          presentations: [
            ...state.presentations,
            presentationWithStandardizedSlide,
          ],
        };
      });
    },

    clearPresentations: () => set({ presentations: [] }),
    deleteOnePresentation: (id) => {
      console.log(`Deleting presentation with ID: ${id}`);
      set((state) => {
        const updatedPresentations = state.presentations.filter(
          (presentation) => presentation.id !== id
        );
        return {
          presentations: updatedPresentations,
        };
      });
    },
    updatePresentationTitle: (id, newTitle) =>
      set((state) => ({
        presentations: state.presentations.map((presentation) =>
          presentation.id === id
            ? { ...presentation, name: newTitle }
            : presentation
        ),
      })),
    addSlide: (presentationId, newSlide) => {
      set((state) => {
        const presentationIndex = state.presentations.findIndex(
          (p) => p.id === presentationId
        );
        if (presentationIndex === -1) {
          console.error('Presentation not found');
          return state;
        }

        const updatedPresentation = {
          ...state.presentations[presentationIndex],
        };
        const newSlideNumber =
          updatedPresentation.slides.reduce(
            (max, slide) => Math.max(max, slide.slideNumber || 0),
            0
          ) + 1;

        const updatedSlides = [
          ...updatedPresentation.slides,
          { ...newSlide, slideNumber: newSlideNumber },
        ];

        updatedPresentation.slides = updatedSlides;

        const updatedPresentations = [...state.presentations];
        updatedPresentations[presentationIndex] = updatedPresentation;

        return { ...state, presentations: updatedPresentations };
      });
    },
    deleteSlide: (presentationId, slideId) => {
      set((state) => {
        const presentationIndex = state.presentations.findIndex(
          (p) => p.id === presentationId
        );
        if (presentationIndex === -1) {
          console.error('Presentation not found');
          return state;
        }

        const updatedPresentation = {
          ...state.presentations[presentationIndex],
        };

        const updatedSlides = updatedPresentation.slides
          .filter((slide) => slide.id !== slideId)
          .map((slide, index) => ({ ...slide, slideNumber: index + 1 }));

        updatedPresentation.slides = updatedSlides;

        const updatedPresentations = [...state.presentations];
        updatedPresentations[presentationIndex] = updatedPresentation;

        return { ...state, presentations: updatedPresentations };
      });
    },
    getSlidesForPresentation: (presentationId) => {
      const state = get();
      const presentation = state.presentations.find(
        (p) => p.id === presentationId
      );
      return presentation ? presentation.slides : [];
    },
    getSlideFromPresentationById: (presentationId, slideId) => {
      const state = get();
      const presentation = state.presentations.find(
        (p) => p.id === presentationId
      );
      if (!presentation) return null;

      const slide = presentation.slides.find((s) => s.id === slideId);
      return slide || null;
      // return slide[0] || null;
    },
    addElementToSlide: (presentationId, slideId, newElement) => {
      set((state) => {
        const presentationIndex = state.presentations.findIndex(
          (p) => p.id === presentationId
        );
        if (presentationIndex === -1) {
          console.error('Presentation not found');
          return state;
        }

        const updatedPresentation = {
          ...state.presentations[presentationIndex],
        };

        const slideIndex = updatedPresentation.slides.findIndex(
          (slide) => slide.id === slideId
        );
        if (slideIndex === -1) {
          console.error('Slide not found');
          return state;
        }

        const updatedSlide = { ...updatedPresentation.slides[slideIndex] };
        updatedSlide.elements = [...updatedSlide.elements, newElement];

        updatedPresentation.slides[slideIndex] = updatedSlide;

        const updatedPresentations = [...state.presentations];
        updatedPresentations[presentationIndex] = updatedPresentation;

        return { ...state, presentations: updatedPresentations };
      });
    },
    updateElementPosition: (presentationId, slideId, elementId, top, left) => {
      set((state) => {
        const presentationIndex = state.presentations.findIndex(
          (p) => p.id === presentationId
        );
        if (presentationIndex === -1) {
          console.error('Presentation not found');
          return state;
        }

        const updatedPresentation = {
          ...state.presentations[presentationIndex],
        };

        const slideIndex = updatedPresentation.slides.findIndex(
          (slide) => slide.id === slideId
        );
        if (slideIndex === -1) {
          console.error('Slide not found');
          return state;
        }

        const updatedSlide = { ...updatedPresentation.slides[slideIndex] };
        updatedSlide.elements = updatedSlide.elements.map((element) => {
          if (element.id === elementId) {
            return { ...element, top, left };
          }
          return element;
        });

        updatedPresentation.slides[slideIndex] = updatedSlide;

        const updatedPresentations = [...state.presentations];
        updatedPresentations[presentationIndex] = updatedPresentation;

        return { ...state, presentations: updatedPresentations };
      });
    },
    updateElementSize: (presentationId, slideId, elementId, width, height) => {
      set((state) => {
        const presentationIndex = state.presentations.findIndex(
          (p) => p.id === presentationId
        );
        if (presentationIndex === -1) {
          console.error('Presentation not found');
          return state;
        }

        const updatedPresentation = {
          ...state.presentations[presentationIndex],
        };

        const slideIndex = updatedPresentation.slides.findIndex(
          (slide) => slide.id === slideId
        );
        if (slideIndex === -1) {
          console.error('Slide not found');
          return state;
        }

        const updatedSlide = { ...updatedPresentation.slides[slideIndex] };
        updatedSlide.elements = updatedSlide.elements.map((element) => {
          if (element.id === elementId) {
            return { ...element, width, height };
          }
          return element;
        });

        updatedPresentation.slides[slideIndex] = updatedSlide;

        const updatedPresentations = [...state.presentations];
        updatedPresentations[presentationIndex] = updatedPresentation;

        return { ...state, presentations: updatedPresentations };
      });
    },
    deleteElementFromSlide: (presentationId, slideId, elementId) => {
      set((state) => {
        const presentationIndex = state.presentations.findIndex(
          (p) => p.id === presentationId
        );
        if (presentationIndex === -1) {
          console.error('Presentation not found');
          return state;
        }

        const updatedPresentation = {
          ...state.presentations[presentationIndex],
        };

        const slideIndex = updatedPresentation.slides.findIndex(
          (slide) => slide.id === slideId
        );
        if (slideIndex === -1) {
          console.error('Slide not found');
          return state;
        }

        const updatedSlide = { ...updatedPresentation.slides[slideIndex] };
        updatedSlide.elements = updatedSlide.elements.filter(
          (element) => element.id !== elementId
        );

        updatedPresentation.slides[slideIndex] = updatedSlide;

        const updatedPresentations = [...state.presentations];
        updatedPresentations[presentationIndex] = updatedPresentation;

        return { ...state, presentations: updatedPresentations };
      });
    },
    setSlidesForPresentation: (presentationId, newSlides) => {
      set((state) => {
        const presentationIndex = state.presentations.findIndex(
          (p) => p.id === presentationId
        );
        if (presentationIndex === -1) {
          console.error('Presentation not found');
          return state;
        }

        const updatedPresentations = state.presentations.map(
          (presentation, index) => {
            if (index === presentationIndex) {
              return {
                ...presentation,
                slides: newSlides.map((slide, idx) => ({
                  ...slide,
                  slideNumber: idx + 1,
                })),
              };
            }
            return presentation;
          }
        );

        return { presentations: updatedPresentations };
      });
    },
  }))
);

export const initializeStore = async () => {
  const initialStore = await getStore();
  usePresentationListStore.setState({
    presentations: initialStore.store.presentations
      ? initialStore.store.presentations
      : [],
  });
  console.log(
    `${
      initialStore.store.presentations ? initialStore.store.presentations : {}
    }`
  );
};

export default usePresentationListStore;
