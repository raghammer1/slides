import React, { useState } from 'react';
import useSlidesListStore from '../../zustandStore/useSlidesListStore';
import styled from '@emotion/styled';
import SlidesList from './SlidesList';
import SlideDisplay from './SlideDisplay';
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

  console.log(slides[0]);
  return (
    <Wrapper>
      <SlidesList setSelectedSlide={setSelectedSlide} />
      <SlideDisplay selectedSlide={selectedSlide} />
    </Wrapper>
  );
};

export default SlidesMain;
