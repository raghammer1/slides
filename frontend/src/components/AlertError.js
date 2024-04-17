import React, { createContext, useContext, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { styled } from '@mui/system';

const AlertContext = createContext();

// Create a styled component for SnackbarContent
const StyledSnackbarContent = styled(SnackbarContent)(({ theme, bgColor }) => ({
  backgroundColor: bgColor || theme.palette.primary.main,
}));

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alertState, setAlertState] = useState({
    open: false,
    message: '',
    bgColor: 'default',
  });

  const showAlert = (message, bgColor = 'default') => {
    setAlertState({
      open: true,
      message,
      bgColor,
    });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertState((prevState) => ({
      ...prevState,
      open: false,
    }));
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Snackbar
        open={alertState.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <StyledSnackbarContent
          bgColor={alertState.bgColor} // Pass bgColor as a prop to styled component
          message={<span id="client-snackbar">{alertState.message}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon style={{ color: '#fff' }} />
            </IconButton>,
          ]}
        />
      </Snackbar>
    </AlertContext.Provider>
  );
};
