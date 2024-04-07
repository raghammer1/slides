import React, { createContext, useContext, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import { makeStyles } from '@mui/styles';

const AlertContext = createContext();

const useStyles = makeStyles((theme) => ({
  // Custom snackbar styling
  snackbar: {
    backgroundColor: (props) => props.bgColor || theme.palette.primary.main, // Use provided color or fallback to theme's primary color
  },
}));

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alertState, setAlertState] = useState({
    open: false,
    message: '',
    bgColor: 'default', // default background color
  });

  const { bgColor } = alertState;
  const classes = useStyles({ bgColor });

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
          vertical: 'top', // Positions the Snackbar at the top
          horizontal: 'right', // Positions the Snackbar at the right
        }}
      >
        <SnackbarContent
          className={classes.snackbar}
          message={<span id="client-snackbar">{alertState.message}</span>}
        />
      </Snackbar>
    </AlertContext.Provider>
  );
};
