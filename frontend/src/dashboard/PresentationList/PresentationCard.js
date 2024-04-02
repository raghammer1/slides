import styled from '@emotion/styled';
import React from 'react';

const PresentationCard = ({ presentation }) => {
  const Wrapper = styled('div')({
    display: 'flex',
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    color: '#fff',
    width: 'calc(33.333% - 20px)',
    aspectRatio: '2 / 1',
    marginTop: '10px',
  });
  return <Wrapper>{presentation.name}</Wrapper>;
};
export default PresentationCard;
