import React, { useState } from 'react';
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
  const getSlidesForPresentation = useSlidesListStore(
    (state) => state.getSlidesForPresentation
  );
  const slides = getSlidesForPresentation(presentationId);

  const [selectedSlide, setSelectedSlide] = useState(slides[0]);

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
        />
        <SlideDisplay selectedSlide={selectedSlide} />
      </Wrapper>
      <SlideControlArrows
        presentationId={presentationId}
        selectedSlide={selectedSlide}
        setSelectedSlide={setSelectedSlide}
      />
    </div>
  );
};

export default SlidesMain;
