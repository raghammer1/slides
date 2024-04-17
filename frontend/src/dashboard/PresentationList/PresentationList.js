import React from 'react';
import usePresentationListStore from '../../zustandStore/usePresentationListStore';
import PresentationCard from './PresentationCard';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 20px;
  flex-wrap: wrap;
  overflow: auto;
  padding: 20px;
  align-items: flex-start;
  justify-content: center;
  align-content: flex-start;
`;

const PresentationList = ({ searchInput }) => {
  const { presentations } = usePresentationListStore((state) => ({
    presentations: state.presentations,
  }));

  const filteredPresentations = presentations.filter((presentation) =>
    presentation.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  console.log(
    searchInput,
    'searchInputsearchInputsearchInputsearchInputsearchInputsearchInput'
  );

  console.log(presentations, 'Presentation Debug Info');

  return (
    <Wrapper>
      {filteredPresentations.map((presentation) => (
        <PresentationCard key={presentation.id} presentation={presentation} />
      ))}
    </Wrapper>
  );
};

export default PresentationList;
// se
