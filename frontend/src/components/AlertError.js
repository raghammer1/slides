import React, { createContext, useContext, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

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
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <SnackbarContent
          className={classes.snackbar}
          style={{ backgroundColor: alertState.bgColor }}
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
