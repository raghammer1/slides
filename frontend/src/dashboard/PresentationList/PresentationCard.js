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
    width: 'calc(25% - 20px)',
    height: '120px',
    marginTop: '10px',
  });
  return <Wrapper>{presentation.name}</Wrapper>;
};
export default PresentationCard;
