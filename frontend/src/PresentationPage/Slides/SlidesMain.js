import React, { useEffect, useState } from 'react';
import useSlidesListStore from '../../zustandStore/useSlidesListStore';
import styled from '@emotion/styled';
import SlidesList from './SlidesList';
import SlideDisplay from './SlideDisplay';
import SlideControlArrows from './SlideControlArrows';
// hi
const Wrapper = styled('div')({
  width: '90vw',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '30px',
});

const SlidesMain = ({ presentationId }) => {
  const { slides, deleteSlide } = useSlidesListStore((state) => ({
    slides: state.getSlidesForPresentation(presentationId),
    deleteSlide: state.deleteSlide, // Assuming this method exists for deleting a slide
  }));
  // const slides = getSlidesForPresentation(presentationId);

  const [selectedSlide, setSelectedSlide] = useState(slides[0]);
  const selectedSlideId = selectedSlide.id;

  useEffect(() => {
    if (
      !selectedSlide ||
      !slides.find((slide) => slide.id === selectedSlide.id)
    ) {
      // If the selectedSlide is no longer in slides, or initially when slides is populated
      setSelectedSlide(slides[0] || null);
    }
  }, [slides, selectedSlide, setSelectedSlide]);

  const handleDeleteSlide = (e, slide) => {
    e.stopPropagation();
    if (selectedSlideId === slide.id) {
      if (slide.slideNumber === 1 && slides.length > 1) {
        setSelectedSlide(slides[1]);
      } else if (slides.length > 1) {
        setSelectedSlide(slides[slide.slideNumber - 2]);
      }
    }
    deleteSlide(presentationId, slide.id);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Wrapper>
        <SlidesList
          presentationId={presentationId}
          setSelectedSlide={setSelectedSlide}
          selectedSlideId={selectedSlideId}
          handleDeleteSlide={handleDeleteSlide}
        />
        <SlideDisplay
          presentationId={presentationId}
          selectedSlideId={selectedSlideId}
        />
      </Wrapper>
      <SlideControlArrows
        presentationId={presentationId}
        setSelectedSlide={setSelectedSlide}
        selectedSlideId={selectedSlideId}
      />
    </div>
  );
};

export default SlidesMain;
