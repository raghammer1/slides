import { create } from 'zustand';
import { getStore, setStore } from '../services/api';

/**
 * Zustand store contains:
 * @property {Array[Objects]} presentations
 */

/**
 * @Each  presentation will be an object having following properties
 * @property {String} id
 * @property {String} presentationName
 * @property {String} description
 * @property {String} ThumbnailBase64Image
 * @property {Array[Objects]} slides
 */

/**
 * @Each  slide will be an object having following properties
 * @property {String} id
 * @property {String} backGroundImgOrColor
 * @property {Array[Objects]} elements
 */

/**
 * @Each  element will be an object having following properties
 * @property {key/String} creationTimeStamp Used to keep track of history of each slide
 * @property {value/Array[Objects]} historyElements The elements that were there at that point in the history of the slide
 */

/**
 * @Each  historyElements will be an object having properties that are dependent on the type of element
 * These properties are common
 * @property {String} id
 * @property {String} type showcasing the type of element
 * @property {String} top the position of element from the top of the box
 * @property {String} left the position of element from the left of the box
 * @property {String} width the width of the element
 * @property {String} height the height of the element
 *
 *    @Each properties specific to elements of type typeBox include
 *    @property {String} text
 *    @property {String} fontSize
 *    @property {String} textColor
 *    @property {String} fontFamily
 *
 *    @Each properties specific to elements of type video include
 *    @property {String} src the url of the video
 *    @property {Boolean} autoplay specifying whether a video must autoplay or not
 *    @property {Boolean} controls whether the video must have controls or not
 *
 *    @Each properties specific to elements of type image include
 *    @property {String} alt the alt text for the image
 *    @property {String} src the source of the image could be of type base64 or url
 *
 *    @Each properties specific to elements of type code include
 *    @property {String} text
 *    @property {String} fontSize
 *    @property {Select} language the language the code was written in (This properly is auto-detected)
 */

//* This is a middleware function which updates the state of the backend
//* Whenever there is a change detected to the presentations array in Zustand
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

//* This the Zustand store
const usePresentationListStore = create(
  presentationsChangeLogger((set, get) => ({
    presentations: [],
    version: 0,

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

        if (updatedSlide.elements.length > 0) {
          const lastElement =
            updatedSlide.elements[updatedSlide.elements.length - 1];
          const lastTimeKey = Object.keys(lastElement)[0];
          const elapsedTime = currentTime - parseInt(lastTimeKey);

          if (elapsedTime < 60000) {
            // Less than 1 minute since the last element was added
            lastElement[lastTimeKey].push(newElement);
          } else {
            // More than 1 minute since the last element, create a new timestamp key
            const newElementsArray = [...lastElement[lastTimeKey], newElement];
            updatedSlide.elements.push({ [currentTime]: newElementsArray });
          }
        } else {
          // No elements present, start with the new element at the current time
          updatedSlide.elements.push({ [currentTime]: [newElement] });
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
