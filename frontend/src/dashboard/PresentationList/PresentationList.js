import React from 'react';
import PresentationCard from './PresentationCard';
import styled from '@emotion/styled';

// Wrapper for presentation list that applies a flex layout.
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

// PresentationList component filters and displays a list of presentation cards.
const PresentationList = ({ presentations, searchInput }) => {
  // Filters presentations based on the search input.
  const filteredPresentations = presentations.filter((presentation) =>
    presentation.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <Wrapper>
      {filteredPresentations.map((presentation) => (
        <PresentationCard key={presentation.id} presentation={presentation} />
      ))}
    </Wrapper>
  );
};

export default PresentationList;
