import React, { useState } from 'react';
import { styled } from '@mui/system';
import CustomPrimaryButton from '../components/CustomePrimaryButton';
import CreatePresentationModal from './CreatePresentationModal';
import PresentationList from './PresentationList/PresentationList';

const MainDashboard = () => {
  const Wrapper = styled('div')({
    height: '89vh',
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Wrapper>
      <div style={{ backgroundColor: '#444', padding: '20px' }}>
        <CustomPrimaryButton
          label={'New Presentation'}
          additionalStyle={{ width: '200px', height: '40px' }}
          onClick={handleOpen}
        />
      </div>
      <PresentationList />
      {/* MODAL */}
      <CreatePresentationModal open={open} handleClose={handleClose} />
    </Wrapper>
  );
};

export default MainDashboard;
