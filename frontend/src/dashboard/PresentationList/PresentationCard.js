import styled from '@emotion/styled';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled('div')({
  display: 'flex',
  // flexDirection: 'row',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#333',
  color: '#fff',
  width: '300px',
  height: '150px',
  marginTop: '10px',
  padding: '10px',
  textAlign: 'center',
  cursor: 'pointer', // Makes it clear that the card is clickable
  overflow: 'hidden',
});

const PresentationCard = ({ presentation }) => {
  const nav = useNavigate();
  const handleOpenPresentation = () => {
    console.log(presentation);
    nav(`/presentation/${presentation.id}`);
  };

  return (
    // <Wrapper
    //   data-testid={`presentation-card-${presentation.id}`}
    //   onClick={handleOpenPresentation}>
    //   {presentation.name}, {presentation.slides.length}
    // </Wrapper>
    <Wrapper
      data-testid={`presentation-card-${presentation.id}`}
      onClick={handleOpenPresentation}>
      <div
        style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}>
        {presentation.name}
      </div>
      <div style={{ fontSize: '14px', marginBottom: '5px' }}>
        Slides: {presentation.slides.length}
      </div>
      <div style={{ fontSize: '12px', color: '#ccc' }}>
        {presentation.description || 'No description provided'}
      </div>
    </Wrapper>
  );
};
export default PresentationCard;
