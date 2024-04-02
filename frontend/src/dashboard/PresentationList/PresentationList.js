import React from 'react';
import usePresentationListStore from '../../zustandStore/usePresentationListStore';
import PresentationCard from './PresentationCard';
import styled from '@emotion/styled';

const PresentationList = () => {
  const { presentations } = usePresentationListStore();
  console.log(presentations, 'JJRIUOHIUWHYIWEGIRYEWGRYUWEGR');

  const Wrapper = styled('div')({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
    flexWrap: 'wrap',
    overflow: 'auto',
  });

  return (
    <Wrapper>
      {presentations.map((presentation, index) => (
        <PresentationCard key={presentation.id} presentation={presentation} />
      ))}
    </Wrapper>
  );
};
export default PresentationList;
