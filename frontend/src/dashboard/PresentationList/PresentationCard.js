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
  width: 'calc(25% - 20px)',
  height: '120px',
  marginTop: '10px',
});

const PresentationCard = ({ presentation }) => {
  const nav = useNavigate();

  const handleOpenPresentation = () => {
    // Use arrow function here
    console.log(presentation);
    nav(`/presentation/${presentation.id}`);
  };

  return (
    // Pass a reference to the function instead of invoking it
    <Wrapper onClick={handleOpenPresentation}>{presentation.name}</Wrapper>
  );
};
export default PresentationCard;
