import React from 'react';
import { styled } from '@mui/system';
import CreatePresentationModal from './CreatePresentationModal';
import PresentationList from './PresentationList/PresentationList';

const MainDashboard = ({ open, handleClose }) => {
  const Wrapper = styled('div')({
    height: '89vh',
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
  });

  return (
    <Wrapper>
      <PresentationList />
      <CreatePresentationModal open={open} handleClose={handleClose} />
    </Wrapper>
  );
};

export default MainDashboard;
