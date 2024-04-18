import React from 'react';
import { styled } from '@mui/system';
import CreatePresentationModal from './CreatePresentationModal';
import PresentationList from './PresentationList/PresentationList';
import usePresentationListStore from '../zustandStore/usePresentationListStore';

// MainDashboard component that orchestrates the presentation of lists and modal forms within the dashboard.
const MainDashboard = ({ open, handleClose, searchInput }) => {
  const Wrapper = styled('div')({
    height: '89vh',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '20px',
  });

  const { presentations } = usePresentationListStore((state) => ({
    presentations: state.presentations,
  }));

  return (
    <>
      <Wrapper>
        <PresentationList
          presentations={presentations}
          searchInput={searchInput}
        />
        <CreatePresentationModal open={open} handleClose={handleClose} />
      </Wrapper>
    </>
  );
};

export default MainDashboard;
