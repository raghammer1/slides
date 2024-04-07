import React from 'react';
import Button from '@mui/material/Button';

const CustomPrimaryButton = ({
  label,
  additionalStyle,
  disabled,
  onClick,
  dataTestid,
}) => {
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
      // eslint-disable-next-line no-unneeded-ternary
      data-testid={dataTestid ? dataTestid : 'j'}
    >
      {label}
    </Button>
  );
};
export default CustomPrimaryButton;
