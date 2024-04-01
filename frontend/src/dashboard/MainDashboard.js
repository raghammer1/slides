import React, { useState } from 'react';
import { styled } from '@mui/system';
import CustomPrimaryButton from '../components/CustomePrimaryButton';
import CreatePresentationModal from './CreatePresentationModal';

const MainDashboard = () => {
  const Wrapper = styled('div')({
    height: '40px',
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
    marginTop: '20px',
  });

  // const openSetPresentationModal = () => {};
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Wrapper>
      <CustomPrimaryButton
        label={'New Dashboard'}
        additionalStyle={{ width: '200px', height: '40px' }}
        onClick={handleOpen}
      />
      MainDashboard
      {/* MODAL */}
      <CreatePresentationModal open={open} handleClose={handleClose} />
    </Wrapper>
  );
};

export default MainDashboard;
