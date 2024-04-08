import React from 'react';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';

const CustomModal = ({ open, handleCloseCreateTextBox, style, children }) => {
  return (
    <Modal
      open={open}
      onClose={handleCloseCreateTextBox}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};

export default CustomModal;
