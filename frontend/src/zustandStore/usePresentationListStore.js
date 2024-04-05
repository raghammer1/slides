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

        // Fetch new store data asynchronously
        const storeData = await getStore(); // Assuming getStore() fetches the current store structure
        // It's important to correctly reference the actual presentations data here
        // If getStore() returns an object that directly contains the "presentations" field, you don't need to drill down further
        // storeData = storeData.data.store; // Adjust based on the actual shape of your data
        const updatedData = {
          store: {
            ...storeData.store,
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
  presentationsChangeLogger((set) => ({
    presentations: [],
    addPresentation: (newPresentation) => {
      set((state) => {
        console.log(state);
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
    updatePresentationTitle: (id, newTitle) =>
      set((state) => ({
        presentations: state.presentations.map((presentation) =>
          presentation.id === id
            ? { ...presentation, name: newTitle }
            : presentation
        ),
      })),
  }))
);

// const initializeStore = async () => {
//   const initialStore = await setStore();
//   usePresentationListStore.setState({
//     presentations: initialStore.presentation,
//   });
// };

// // Immediately call the function to initialize the store
// initializeStore();

export default usePresentationListStore;
