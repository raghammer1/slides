/* eslint-disable no-debugger */
import React from 'react';
import usePresentationListStore from '../../zustandStore/usePresentationListStore';
import PresentationCard from './PresentationCard';
import styled from '@emotion/styled';

const Wrapper = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  gap: '20px',
  flexWrap: 'wrap',
  overflow: 'auto',
});

const PresentationList = () => {
  const { presentations } = usePresentationListStore();
  // debugger;
  console.log(presentations, 'JJRIUOHIUWHYIWEGIRYEWGRYUWEGR');

  return (
    <Wrapper>
      {presentations.map((presentation, index) => (
        <PresentationCard key={presentation.id} presentation={presentation} />
      ))}
    </Wrapper>
  );
};
export default PresentationList;
