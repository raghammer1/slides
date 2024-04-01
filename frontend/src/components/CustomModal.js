import React from 'react';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';

const CustomModal = ({ open, handleClose, style, children }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};

export default CustomModal;
