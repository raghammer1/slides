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
    version: 0,

    startTimer: () => {
      set({ timerStart: Date.now() });
    },

    stopTimer: () => {
      const startTime = get().timerStart;
      if (startTime) {
        const endTime = Date.now();
        const elapsed = endTime - startTime;
        set({
          elapsedTime: elapsed,
          timerStart: null,
        });
      }
    },

    calculateCurrentElapsedTime: () => {
      const startTime = get().timerStart;
      if (startTime) {
        const endTime = Date.now();
        return endTime - startTime;
      }
      return 0;
    },

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
      set((state) => {
        const updatedPresentations = state.presentations.filter(
          (presentation) => presentation.id !== id
        );
        return {
          presentations: updatedPresentations,
        };
      });
    },
    updatePresentationTitle: (id, edits) =>
      set((state) => ({
        presentations: state.presentations.map((presentation) =>
          presentation.id === id ? { ...presentation, ...edits } : presentation
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

        const currentTime = Date.now();
        let timeStartChanger = state.timerStart;

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

        const lastElementObject =
          updatedSlide.elements[updatedSlide.elements.length - 1];
        const lastTimeKey = Object.keys(lastElementObject)[0];
        const currentTime = Date.now();
        const lastTime = parseInt(lastTimeKey, 10);
        const elapsedTime = currentTime - lastTime;

        if (elapsedTime < 60000) {
          lastElementObject[lastTimeKey] = lastElementObject[lastTimeKey].map(
            (element) => {
              if (element.id === elementId) {
                return { ...element, top, left };
              }
              return element;
            }
          );
        } else {
          const elementsClone = lastElementObject[lastTimeKey].map(
            (element) => {
              if (element.id === elementId) {
                return { ...element, top, left };
              }
              return element;
            }
          );

          const newTimeKey = currentTime.toString();
          const newElementObject = { [newTimeKey]: elementsClone };

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

        const lastElementObject =
          updatedSlide.elements[updatedSlide.elements.length - 1];
        const lastTimeKey = Object.keys(lastElementObject)[0];
        const currentTime = Date.now();
        const lastTime = parseInt(lastTimeKey, 10);
        const elapsedTime = currentTime - lastTime;

        if (elapsedTime < 60000) {
          lastElementObject[lastTimeKey] = lastElementObject[lastTimeKey].map(
            (element) => {
              if (element.id === elementId) {
                return { ...element, width, height };
              }
              return element;
            }
          );
        } else {
          const elementsClone = lastElementObject[lastTimeKey].map(
            (element) => {
              if (element.id === elementId) {
                return { ...element, width, height };
              }
              return element;
            }
          );

          const newTimeKey = currentTime.toString();
          const newElementObject = { [newTimeKey]: elementsClone };

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

        const lastElementObject =
          updatedSlide.elements[updatedSlide.elements.length - 1];
        const lastTimeKey = Object.keys(lastElementObject)[0];
        const currentTime = Date.now();
        const lastTime = parseInt(lastTimeKey, 10);
        const elapsedTime = currentTime - lastTime;

        if (elapsedTime < 60000) {
          lastElementObject[lastTimeKey] = lastElementObject[
            lastTimeKey
          ].filter((element) => element.id !== elementId);
        } else {
          const filteredElements = lastElementObject[lastTimeKey].filter(
            (element) => element.id !== elementId
          );
          const newTimeKey = currentTime.toString();
          const newElementObject = { [newTimeKey]: filteredElements };

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
        const presentationsCopy = [...state.presentations];

        const presentationIndex = presentationsCopy.findIndex(
          (p) => p.id === presentationId
        );
        if (presentationIndex === -1) {
          console.error('Presentation not found');
          return state;
        }

        const updatedPresentation = {
          ...presentationsCopy[presentationIndex],
          slides: [...presentationsCopy[presentationIndex].slides],
        };

        const slideIndex = updatedPresentation.slides.findIndex(
          (slide) => slide.id === slideId
        );
        if (slideIndex === -1) {
          console.error('Slide not found');
          return state;
        }

        const updatedSlide = { ...updatedPresentation.slides[slideIndex] };
        const currentTime = Date.now().toString();

        updatedSlide.elements = [
          ...updatedSlide.elements,
          { [currentTime]: newValue },
        ];

        updatedPresentation.slides[slideIndex] = updatedSlide;

        presentationsCopy[presentationIndex] = updatedPresentation;

        return { presentations: presentationsCopy, version: state.version + 1 };
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
    updateElementInSlide: (
      presentationId,
      slideId,
      elementId,
      newProperties
    ) => {
      set((state) => {
        const presentationIndex = state.presentations.findIndex(
          (p) => p.id === presentationId
        );
        if (presentationIndex === -1) {
          console.error('Presentation not found');
          return;
        }

        const updatedPresentation = {
          ...state.presentations[presentationIndex],
        };
        const slideIndex = updatedPresentation.slides.findIndex(
          (slide) => slide.id === slideId
        );
        if (slideIndex === -1) {
          console.error('Slide not found');
          return;
        }

        const updatedSlide = { ...updatedPresentation.slides[slideIndex] };
        const elementsArray = updatedSlide.elements;
        if (elementsArray.length === 0) {
          console.error('No elements found');
          return;
        }

        const lastElementObject = elementsArray[elementsArray.length - 1];
        const lastTimeKey = Object.keys(lastElementObject).pop();
        const lastTime = parseInt(lastTimeKey, 10);
        const currentTime = Date.now();
        const elapsedTime = currentTime - lastTime;

        if (elapsedTime < 60000) {
          const lastElements = lastElementObject[lastTimeKey];
          const elementIndex = lastElements.findIndex(
            (element) => element.id === elementId
          );
          if (elementIndex === -1) {
            console.error('Element not found');
            return;
          }
          lastElements[elementIndex] = {
            ...lastElements[elementIndex],
            ...newProperties,
          };
        } else {
          const newElementObject = {
            [currentTime]: [
              ...lastElementObject[lastTimeKey],
              { id: elementId, ...newProperties },
            ],
          };
          updatedSlide.elements.push(newElementObject);
        }

        updatedPresentation.slides[slideIndex] = updatedSlide;
        const updatedPresentations = [...state.presentations];
        updatedPresentations[presentationIndex] = updatedPresentation;

        return {
          ...state,
          presentations: updatedPresentations,
          version: state.version + 1,
        };
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
};

export default usePresentationListStore;
