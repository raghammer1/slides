import React from 'react';
import useSlidesListStore from '../../zustandStore/useSlidesListStore';
import styled from '@emotion/styled';
import SlidesList from './SlidesList';
import SlideDisplay from './SlideDisplay';

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

  console.log(slides[0]);
  return (
    <Wrapper>
      <SlidesList />
      <SlideDisplay />
    </Wrapper>
  );
};

// STABLE SAVE

export default SlidesMain;
