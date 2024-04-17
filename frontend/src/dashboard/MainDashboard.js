import React from 'react';
import { styled } from '@mui/system';
import CreatePresentationModal from './CreatePresentationModal';
import PresentationList from './PresentationList/PresentationList';

const MainDashboard = ({ open, handleClose, searchInput }) => {
  const Wrapper = styled('div')({
    height: '89vh',
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
  });

  return (
    <Wrapper>
      <PresentationList searchInput={searchInput} />
      <CreatePresentationModal open={open} handleClose={handleClose} />
    </Wrapper>
  );
};

export default MainDashboard;
