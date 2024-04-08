export const updateSlide = (
  slides,
  presentationId,
  slideId,
  updateCallback
) => {
  if (!slides[presentationId]) {
    console.warn('Presentation not found');
    return slides;
  }

  const slideIndex = slides[presentationId].findIndex(
    (slide) => slide.id === slideId
  );
  if (slideIndex === -1) {
    console.warn('Slide not found');
    return slides;
  }

  const updatedSlidesForPresentation = [...slides[presentationId]];

  updatedSlidesForPresentation[slideIndex] = updateCallback(
    updatedSlidesForPresentation[slideIndex]
  );

  return { ...slides, [presentationId]: updatedSlidesForPresentation };
};
