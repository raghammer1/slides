import React from 'react';
import CustomModal from '../components/CustomModal';
import { Typography } from '@mui/material';
import CustomPrimaryButton from '../components/CustomePrimaryButton';

// Style configuration for the modal's appearance
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#555',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// Component for deletion confirmation modal
const DeletePresentationModal = ({
  open,
  handleClose,
  handlePresentationDelete,
  dataTestid,
}) => {
  return (
    <CustomModal
      open={open}
      handleCloseCreateTextBox={handleClose}
      style={style}
    >
      <Typography style={{ color: '#fff' }}>
        Are you sure? you want to delete this presentation
      </Typography>
      <div style={{ display: 'flex', gap: '10px' }}>
        <CustomPrimaryButton
          label="Close"
          additionalStyle={{ marginTop: '30px' }}
          onClick={handleClose}
        />
        <CustomPrimaryButton
          label="Delete"
          additionalStyle={{ marginTop: '30px' }}
          onClick={handlePresentationDelete}
          dataTestid={dataTestid || ''}
        />
      </div>
    </CustomModal>
  );
};
export default DeletePresentationModal;
