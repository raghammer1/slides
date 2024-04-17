import styled from '@emotion/styled';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled('div')({
  display: 'flex',
  // flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#333',
  color: '#fff',
  width: '300px',
  height: '120px',
  marginTop: '10px',
});

const PresentationCard = ({ presentation }) => {
  const nav = useNavigate();

  const handleOpenPresentation = () => {
    console.log(presentation);
    nav(`/presentation/${presentation.id}`);
  };

  return (
    <Wrapper
      data-testid={`presentation-card-${presentation.id}`}
      onClick={handleOpenPresentation}>
      {presentation.name}
    </Wrapper>
  );
};
export default PresentationCard;
