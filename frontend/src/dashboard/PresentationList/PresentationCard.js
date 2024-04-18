import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isValidImage } from '../../shared/isImageValid';

// FlipCard styled component providing a 3D effect for presentation cards.
const FlipCard = styled('div')({
  width: '300px',
  height: '150px',
  perspective: '1000px',
  marginTop: '10px',
});

// Card styled component handling the flipping effect.
const Card = styled('div')((props) => ({
  width: '100%',
  height: '100%',
  position: 'relative',
  backgroundColor: props.bgColor2 || '#333',
  backgroundImage: props.bgImage ? `url(${props.bgImage})` : 'none',
  textAlign: 'center',
  transition: 'transform 0.6s',
  transformStyle: 'preserve-3d',
  cursor: 'pointer',
  borderRadius: '9px',
  ':hover': {
    transform: 'rotateY(180deg)',
  },
}));

// CardSide styled component for both front and back of the card.
const CardSide = styled('div')({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
  overflow: 'hidden',
  borderRadius: '9px',
});

// CardFront styled component representing the front of the flip card.
const CardFront = styled(CardSide)((props) => ({
  backgroundColor: props.bgColor2 || '#333',
  backgroundImage: props.bgImage ? `url(${props.bgImage})` : 'none',
  color: props.color,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

// CardBack styled component representing the back of the flip card.
const CardBack = styled(CardSide)({
  backgroundColor: '#333',
  color: '#fff',
  transform: 'rotateY(180deg)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

// PresentationCard component that utilizes the flipping card effect to display presentation details.
const PresentationCard = ({ presentation }) => {
  const nav = useNavigate();
  const [isValid, setIsValid] = useState(false);

  // Validates the thumbnail to decide if it should be displayed.
  useEffect(() => {
    isValidImage(presentation.thumbnail).then(setIsValid);
  }, [presentation.thumbnail]);

  // Handles navigation to the detailed view of the presentation.
  const handleOpenPresentation = () => {
    nav(`/presentation/${presentation.id}`);
  };

  // Dynamic styles based on thumbnail validity.
  const backgroundStyle = {
    bgColor2: isValid ? undefined : '#333',
    bgImage: presentation.thumbnail,
    color: isValid ? '#333' : '#fff',
  };

  return (
    <FlipCard
      onClick={handleOpenPresentation}
      data-testid={`presentation-card-${presentation.id}`}
    >
      <Card>
        <CardFront
          bgColor2={isValid ? undefined : '#333'}
          bgImage={isValid ? `url(${presentation.thumbnail})` : undefined}
          {...backgroundStyle}
        >
          <div
            style={{
              fontSize: '22px',
              fontWeight: 'bold',
              marginBottom: '5px',
              fontFamily: 'Arial',
              background: 'rgba(150, 150, 150, 0.5)',
              padding: '10px',
              borderRadius: '9px',
            }}
          >
            {presentation.name}
          </div>
        </CardFront>
        <CardBack>
          <div
            style={{
              fontSize: '28px',
              fontWeight: 'bold',
              marginBottom: '5px',
              fontFamily: 'Arial',
            }}
          >
            {presentation.name}
          </div>
          <div
            style={{
              fontSize: '18px',
              fontWeight: '600',
              fontFamily: 'Tahoma',
            }}
          >
            Slides: {presentation.slides.length}
          </div>
          <div
            style={{
              fontSize: '16px',
              fontWeight: '400',
              fontFamily: 'Verdana',
            }}
          >
            {presentation.description || 'No description provided'}
          </div>
        </CardBack>
      </Card>
    </FlipCard>
  );
};

export default PresentationCard;
