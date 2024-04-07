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
      // Note: Making this async may not directly work as intended
      // Get the current state
      const currentState = get();

      // Proceed to update the state
      set(nextState, ...args);

      // After state update, check for changes in 'slides'
      const newState = get();
      if (currentState.presentations !== newState.presentations) {
        console.log('presentations changed:', newState.presentations);

        const updatedData = {
          store: {
            presentations: newState.presentations,
          },
        };
        await setStore(updatedData); // Sen
      }
    },
    get,
    api
  );

const usePresentationListStore = create(
  presentationsChangeLogger((set, get) => ({
    presentations: [],
    addPresentation: (newPresentation) => {
      set((state) => {
        // Assuming the newPresentation already has an initial slide as per the structure you provided
        // Here we ensure the initial slide conforms to the expected structure

        const presentationWithStandardizedSlide = {
          ...newPresentation,
          slides: newPresentation.slides.map((slide, index) => ({
            ...slide,
            // Assign slideNumber 1 to the initial slide, assuming slideNumber is required
            slideNumber: index + 1,
            elements: slide.elements || [], // Ensure each slide has an elements array, even if empty
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
        // Find the index of the target presentation by its ID
        const presentationIndex = state.presentations.findIndex(
          (p) => p.id === presentationId
        );
        if (presentationIndex === -1) {
          console.error('Presentation not found');
          return state; // Return the current state if the presentation is not found
        }

        // Clone the target presentation and update its slides
        const updatedPresentation = {
          ...state.presentations[presentationIndex],
        };
        const newSlideNumber =
          updatedPresentation.slides.reduce(
            (max, slide) => Math.max(max, slide.slideNumber || 0),
            0
          ) + 1;

        // Assuming newSlide doesn't have a slideNumber, add it here
        const updatedSlides = [
          ...updatedPresentation.slides,
          { ...newSlide, slideNumber: newSlideNumber },
        ];

        // Update the target presentation with the new slides array
        updatedPresentation.slides = updatedSlides;

        // Clone the presentations array and replace the target presentation with the updated one
        const updatedPresentations = [...state.presentations];
        updatedPresentations[presentationIndex] = updatedPresentation;

        // Return the updated state
        return { ...state, presentations: updatedPresentations };
      });
    },
    deleteSlide: (presentationId, slideId) => {
      set((state) => {
        // Find the index of the target presentation
        const presentationIndex = state.presentations.findIndex(
          (p) => p.id === presentationId
        );
        if (presentationIndex === -1) {
          console.error('Presentation not found');
          return state; // Return the current state if the presentation is not found
        }

        // Clone the target presentation
        const updatedPresentation = {
          ...state.presentations[presentationIndex],
        };

        // Filter out the slide to be deleted and renumber remaining slides
        const updatedSlides = updatedPresentation.slides
          .filter((slide) => slide.id !== slideId)
          .map((slide, index) => ({ ...slide, slideNumber: index + 1 }));

        // Update the presentation with the new slides array
        updatedPresentation.slides = updatedSlides;

        // Clone the presentations array and replace the target presentation with the updated one
        const updatedPresentations = [...state.presentations];
        updatedPresentations[presentationIndex] = updatedPresentation;

        // Return the updated state
        return { ...state, presentations: updatedPresentations };
      });
    },
    getSlidesForPresentation: (presentationId) => {
      const state = get(); // Get the current state
      const presentation = state.presentations.find(
        (p) => p.id === presentationId
      );
      return presentation ? presentation.slides : [];
    },
    getSlideFromPresentationById: (presentationId, slideId) => {
      const state = get(); // Get the current store state
      const presentation = state.presentations.find(
        (p) => p.id === presentationId
      );
      if (!presentation) return null; // Return null if no such presentation exists

      const slide = presentation.slides.find((s) => s.id === slideId);
      return slide || null; // Return the found slide or null if not found
    },
    addElementToSlide: (presentationId, slideId, newElement) => {
      set((state) => {
        // Find the index of the target presentation
        const presentationIndex = state.presentations.findIndex(
          (p) => p.id === presentationId
        );
        if (presentationIndex === -1) {
          console.error('Presentation not found');
          return state; // Exit if the target presentation is not found
        }

        // Clone the target presentation to avoid direct mutation
        const updatedPresentation = {
          ...state.presentations[presentationIndex],
        };

        // Find the index of the target slide within the presentation
        const slideIndex = updatedPresentation.slides.findIndex(
          (slide) => slide.id === slideId
        );
        if (slideIndex === -1) {
          console.error('Slide not found');
          return state; // Exit if the target slide is not found
        }

        // Clone the target slide to avoid direct mutation and add the new element to its elements array
        const updatedSlide = { ...updatedPresentation.slides[slideIndex] };
        updatedSlide.elements = [...updatedSlide.elements, newElement]; // Add new element

        // Update the slide in the cloned presentation
        updatedPresentation.slides[slideIndex] = updatedSlide;

        // Clone the presentations array to insert the updated presentation
        const updatedPresentations = [...state.presentations];
        updatedPresentations[presentationIndex] = updatedPresentation;

        // Return the updated state
        return { ...state, presentations: updatedPresentations };
      });
    },
    updateElementPosition: (presentationId, slideId, elementId, top, left) => {
      set((state) => {
        // Find the index of the target presentation
        const presentationIndex = state.presentations.findIndex(
          (p) => p.id === presentationId
        );
        if (presentationIndex === -1) {
          console.error('Presentation not found');
          return state; // Exit if the target presentation is not found
        }

        // Clone the target presentation to avoid direct mutation
        const updatedPresentation = {
          ...state.presentations[presentationIndex],
        };

        // Find the index of the target slide within the presentation
        const slideIndex = updatedPresentation.slides.findIndex(
          (slide) => slide.id === slideId
        );
        if (slideIndex === -1) {
          console.error('Slide not found');
          return state; // Exit if the target slide is not found
        }

        // Clone the target slide to avoid direct mutation and update the element's position
        const updatedSlide = { ...updatedPresentation.slides[slideIndex] };
        updatedSlide.elements = updatedSlide.elements.map((element) => {
          if (element.id === elementId) {
            return { ...element, top, left }; // Update the targeted element's position
          }
          return element; // Return all other elements unchanged
        });

        // Update the slide in the cloned presentation
        updatedPresentation.slides[slideIndex] = updatedSlide;

        // Clone the presentations array and replace the target presentation with the updated one
        const updatedPresentations = [...state.presentations];
        updatedPresentations[presentationIndex] = updatedPresentation;

        // Return the updated state
        return { ...state, presentations: updatedPresentations };
      });
    },
    updateElementSize: (presentationId, slideId, elementId, width, height) => {
      set((state) => {
        // Find the index of the target presentation
        const presentationIndex = state.presentations.findIndex(
          (p) => p.id === presentationId
        );
        if (presentationIndex === -1) {
          console.error('Presentation not found');
          return state; // Exit if the target presentation is not found
        }

        // Clone the target presentation to avoid direct mutation
        const updatedPresentation = {
          ...state.presentations[presentationIndex],
        };

        // Find the index of the target slide within the presentation
        const slideIndex = updatedPresentation.slides.findIndex(
          (slide) => slide.id === slideId
        );
        if (slideIndex === -1) {
          console.error('Slide not found');
          return state; // Exit if the target slide is not found
        }

        // Clone the target slide to avoid direct mutation and update the element's position
        const updatedSlide = { ...updatedPresentation.slides[slideIndex] };
        updatedSlide.elements = updatedSlide.elements.map((element) => {
          if (element.id === elementId) {
            return { ...element, width, height }; // Update the targeted element's position
          }
          return element; // Return all other elements unchanged
        });

        // Update the slide in the cloned presentation
        updatedPresentation.slides[slideIndex] = updatedSlide;

        // Clone the presentations array and replace the target presentation with the updated one
        const updatedPresentations = [...state.presentations];
        updatedPresentations[presentationIndex] = updatedPresentation;

        // Return the updated state
        return { ...state, presentations: updatedPresentations };
      });
    },
    deleteElementFromSlide: (presentationId, slideId, elementId) => {
      set((state) => {
        // Find the index of the target presentation
        const presentationIndex = state.presentations.findIndex(
          (p) => p.id === presentationId
        );
        if (presentationIndex === -1) {
          console.error('Presentation not found');
          return state; // Exit if the target presentation is not found
        }

        // Clone the target presentation to avoid direct mutation
        const updatedPresentation = {
          ...state.presentations[presentationIndex],
        };

        // Find the index of the target slide within the presentation
        const slideIndex = updatedPresentation.slides.findIndex(
          (slide) => slide.id === slideId
        );
        if (slideIndex === -1) {
          console.error('Slide not found');
          return state; // Exit if the target slide is not found
        }

        // Clone the target slide to avoid direct mutation and filter out the targeted element
        const updatedSlide = { ...updatedPresentation.slides[slideIndex] };
        updatedSlide.elements = updatedSlide.elements.filter(
          (element) => element.id !== elementId
        );

        // Update the slide in the cloned presentation
        updatedPresentation.slides[slideIndex] = updatedSlide;

        // Clone the presentations array and replace the target presentation with the updated one
        const updatedPresentations = [...state.presentations];
        updatedPresentations[presentationIndex] = updatedPresentation;

        // Return the updated state
        return { ...state, presentations: updatedPresentations };
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
