import React from 'react';
import CustomModal from '../components/CustomModal';
import { Typography } from '@mui/material';
import CustomPrimaryButton from '../components/CustomePrimaryButton';

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
      <Typography>
        Are you sure? you want to delete this presentation
      </Typography>
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
    </CustomModal>
  );
};
export default DeletePresentationModal;
