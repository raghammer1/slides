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

        console.log(newSlide, 'newSlide');

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
        console.log('PRESENTATION FROM ZUSTAND', state.presentations);
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

        const currentTime = Date.now();
        let timeStartChanger = state.timerStart;
        // const elapsedTime = state.timerStart
        //   ? currentTime - state.timerStart
        //   : 0;
        if (updatedSlide.elements.length > 0) {
          const lastElementObject =
            updatedSlide.elements[updatedSlide.elements.length - 1];

          const lastTimeKey = Object.keys(lastElementObject)[0];

          const elapsedTime = currentTime - parseInt(lastTimeKey);

          if (elapsedTime < 60000) {
            const timeKey = Object.keys(lastElementObject)[0];
            lastElementObject[timeKey].push(newElement);
          }
        } else {
          const newTimeKey = currentTime;

          const newElementsArray =
            updatedSlide.elements.length > 0
              ? [
                  ...updatedSlide.elements[updatedSlide.elements.length - 1][
                    Object.keys(
                      updatedSlide.elements[updatedSlide.elements.length - 1]
                    )[0]
                  ],
                  newElement,
                ]
              : [newElement];

          timeStartChanger = Date.now();
          updatedSlide.elements.push({ [newTimeKey]: newElementsArray });
        }

        updatedPresentation.slides[slideIndex] = updatedSlide;

        const updatedPresentations = [...state.presentations];
        updatedPresentations[presentationIndex] = updatedPresentation;

        return {
          ...state,
          presentations: updatedPresentations,
          timerStart: timeStartChanger,
        };
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

        // Retrieve the last object and its timestamp
        const lastElementObject =
          updatedSlide.elements[updatedSlide.elements.length - 1];
        const lastTimeKey = Object.keys(lastElementObject)[0];
        const currentTime = Date.now();
        const lastTime = parseInt(lastTimeKey, 10);
        const elapsedTime = currentTime - lastTime;

        if (elapsedTime < 60000) {
          // Update in place if less than 1 minute has passed
          lastElementObject[lastTimeKey] = lastElementObject[lastTimeKey].map(
            (element) => {
              if (element.id === elementId) {
                return { ...element, top, left };
              }
              return element;
            }
          );
        } else {
          // If more than 1 minute has passed, clone the last object and modify the target element
          const elementsClone = lastElementObject[lastTimeKey].map(
            (element) => {
              if (element.id === elementId) {
                return { ...element, top, left };
              }
              return element;
            }
          );

          // Create a new timestamped object with the updated elements
          const newTimeKey = currentTime.toString();
          const newElementObject = { [newTimeKey]: elementsClone };

          // Append this new object to the elements array
          updatedSlide.elements.push(newElementObject);
        }

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

        // Retrieve the last object and its timestamp
        const lastElementObject =
          updatedSlide.elements[updatedSlide.elements.length - 1];
        const lastTimeKey = Object.keys(lastElementObject)[0];
        const currentTime = Date.now();
        const lastTime = parseInt(lastTimeKey, 10);
        const elapsedTime = currentTime - lastTime;

        if (elapsedTime < 60000) {
          // Update in place if less than 1 minute has passed
          lastElementObject[lastTimeKey] = lastElementObject[lastTimeKey].map(
            (element) => {
              if (element.id === elementId) {
                return { ...element, width, height };
              }
              return element;
            }
          );
        } else {
          // If more than 1 minute has passed, clone the last object and modify the target element
          const elementsClone = lastElementObject[lastTimeKey].map(
            (element) => {
              if (element.id === elementId) {
                return { ...element, width, height };
              }
              return element;
            }
          );

          // Create a new timestamped object with the updated elements
          const newTimeKey = currentTime.toString();
          const newElementObject = { [newTimeKey]: elementsClone };

          // Append this new object to the elements array
          updatedSlide.elements.push(newElementObject);
        }

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

        // Retrieve the last object and its timestamp
        const lastElementObject =
          updatedSlide.elements[updatedSlide.elements.length - 1];
        const lastTimeKey = Object.keys(lastElementObject)[0];
        const currentTime = Date.now();
        const lastTime = parseInt(lastTimeKey, 10);
        const elapsedTime = currentTime - lastTime;

        if (elapsedTime < 60000) {
          // Update in place if less than 1 minute has passed
          lastElementObject[lastTimeKey] = lastElementObject[
            lastTimeKey
          ].filter((element) => element.id !== elementId);
        } else {
          // If more than 1 minute has passed, clone the last object without the deleted element and add to the array
          const filteredElements = lastElementObject[lastTimeKey].filter(
            (element) => element.id !== elementId
          );
          const newTimeKey = currentTime.toString();
          const newElementObject = { [newTimeKey]: filteredElements };

          // Append this new object to the elements array
          updatedSlide.elements.push(newElementObject);
        }

        updatedPresentation.slides[slideIndex] = updatedSlide;

        const updatedPresentations = [...state.presentations];
        updatedPresentations[presentationIndex] = updatedPresentation;

        return { ...state, presentations: updatedPresentations };
      });
    },
    addElementToObject: (presentationId, slideId, newValue) => {
      set((state) => {
        console.log('Current state presentations:', state.presentations);

        // Clone presentations array to ensure a new reference is created
        const presentationsCopy = [...state.presentations];

        const presentationIndex = presentationsCopy.findIndex(
          (p) => p.id === presentationId
        );
        if (presentationIndex === -1) {
          console.error('Presentation not found');
          return state;
        }

        // Deep clone the presentation to ensure a new reference
        const updatedPresentation = {
          ...presentationsCopy[presentationIndex],
          slides: [...presentationsCopy[presentationIndex].slides], // Clone slides array
        };

        const slideIndex = updatedPresentation.slides.findIndex(
          (slide) => slide.id === slideId
        );
        if (slideIndex === -1) {
          console.error('Slide not found');
          return state;
        }

        // Clone the slide to ensure a new reference and update its elements array
        const updatedSlide = { ...updatedPresentation.slides[slideIndex] };
        const currentTime = Date.now().toString();
        console.log(`Adding new element at time ${currentTime}`);

        // Add the new value in a way that creates a new elements array reference
        updatedSlide.elements = [
          ...updatedSlide.elements,
          { [currentTime]: newValue },
        ];

        // Update the slide in the cloned slides array
        updatedPresentation.slides[slideIndex] = updatedSlide;

        // Update the presentation in the cloned presentations array
        presentationsCopy[presentationIndex] = updatedPresentation;

        console.log('New state presentations:', presentationsCopy);

        // Return the new state with the updated presentations array
        return { presentations: presentationsCopy };
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
    updateSlideBackgroundColor: (presentationId, slideId, newBgColor) => {
      set((state) => {
        const updatedPresentations = state.presentations.map((presentation) => {
          if (presentation.id === presentationId) {
            const updatedSlides = presentation.slides.map((slide) => {
              if (slide.id === slideId) {
                // Update the background color here
                return { ...slide, bgCol: newBgColor };
              }
              return slide;
            });

            return { ...presentation, slides: updatedSlides };
          }
          return presentation;
        });

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
