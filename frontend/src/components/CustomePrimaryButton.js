import React from 'react';
import Button from '@mui/material/Button';

const CustomPrimaryButton = ({ label, additionalStyle, disabled, onClick }) => {
  return (
    <Button
      variant="contained"
      sx={{
        bgcolor: '#228be6',
        color: '#ffffff',
        textTransform: 'none',
        fontSize: '15px',
        fontWeight: 500,
        width: '100%',
        height: '40px',
        '&:disabled': {
          color: '#555',
        },
      }}
      style={additionalStyle || {}}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};
export default CustomPrimaryButton;
