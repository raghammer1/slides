import styled from '@emotion/styled';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled('div')((props) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: props.bgColor || '#333', // default to #333 if no bgColor is provided
  backgroundImage: props.bgImage ? `url(${props.bgImage})` : 'none',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: '#fff',
  width: '300px',
  height: '150px',
  marginTop: '10px',
  padding: '10px',
  textAlign: 'center',
  cursor: 'pointer',
  overflow: 'hidden',
}));

const PresentationCard = ({ presentation }) => {
  const nav = useNavigate();
  const handleOpenPresentation = () => {
    console.log(presentation);
    nav(`/presentation/${presentation.id}`);
  };

  // Determine background style based on the thumbnail URL
  const backgroundStyle = {
    bgColor: presentation.thumbnail ? undefined : '#333', // If no thumbnail, use #999
    bgImage: presentation.thumbnail,
  };

  return (
    <Wrapper
      data-testid={`presentation-card-${presentation.id}`}
      onClick={handleOpenPresentation}
      {...backgroundStyle} // spread the background style props
    >
      <div
        style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}
      >
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
