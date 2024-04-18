import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isValidImage } from '../../shared/isImageValid';

const Wrapper = styled('div')((props) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: props.bgColor || '#333',
  backgroundImage: props.bgImage ? `url(${props.bgImage})` : 'none',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: props.color,
  width: '300px',
  height: '150px',
  marginTop: '10px',
  padding: '10px',
  textAlign: 'center',
  cursor: 'pointer',
  overflow: 'hidden',
  borderRadius: '9px',
}));

const PresentationCard = ({ presentation }) => {
  const nav = useNavigate();
  const handleOpenPresentation = () => {
    nav(`/presentation/${presentation.id}`);
  };

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    isValidImage(presentation.thumbnail).then((isValid) => {
      setIsValid(isValid);
    });
  }, [presentation.thumbnail]);

  const backgroundStyle = {
    bgColor: isValid ? undefined : '#333',
    bgImage: presentation.thumbnail,
    color: isValid ? '#333' : '#fff',
  };

  return (
    <Wrapper
      data-testid={`presentation-card-${presentation.id}`}
      onClick={handleOpenPresentation}
      {...backgroundStyle}
    >
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
          marginBottom: '5px',
          fontWeight: '600',
          fontFamily: 'Tahoma',
        }}
      >
        Slides: {presentation.slides.length}
      </div>
      <div
        style={{ fontSize: '16px', fontFamily: 'Verdana', fontWeight: '400' }}
      >
        {presentation.description || 'No description provided'}
      </div>
    </Wrapper>
  );
};
export default PresentationCard;
