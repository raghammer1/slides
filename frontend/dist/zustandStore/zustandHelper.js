"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateSlide = void 0;
const updateSlide = (slides, presentationId, slideId, updateCallback) => {
  if (!slides[presentationId]) {
    console.warn('Presentation not found');
    return slides; // Return the slides unmodified
  }
  const slideIndex = slides[presentationId].findIndex(slide => slide.id === slideId);
  if (slideIndex === -1) {
    console.warn('Slide not found');
    return slides; // Return the slides unmodified
  }

  // Clone the slides array for the presentation to avoid direct mutations
  const updatedSlidesForPresentation = [...slides[presentationId]];

  // Use the provided callback to update the target slide
  updatedSlidesForPresentation[slideIndex] = updateCallback(updatedSlidesForPresentation[slideIndex]);

  // Return the updated slides with the modified presentation's slides array
  return {
    ...slides,
    [presentationId]: updatedSlidesForPresentation
  };
};
exports.updateSlide = updateSlide;