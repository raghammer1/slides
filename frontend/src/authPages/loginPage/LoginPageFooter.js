import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import CustomPrimaryButton from '../../components/CustomePrimaryButton';
import RedirectInfo from '../../components/RedirectInfo';

// Footer component for the login page that handles login action and navigation to the register page.
const LoginPageFooter = ({ handleLoginFunction, isFormValid }) => {
  const nav = useNavigate();

  // Navigates to the register page when triggered.
  const handlePushToRegisterPage = () => {
    nav('/register');
  };

  // Provides tooltip message for invalid form state.
  const getNotFormValid = () => {
    return 'Enter correct email and password should contain between 6 and 12 characters';
  };

  // Provides tooltip message for valid form state.
  const getFormValid = () => {
    return 'Press to log in';
  };

  // Triggers the login function when 'Enter' is pressed and form is valid.
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && isFormValid) {
      handleLoginFunction();
    }
  };

  // Attaches and cleans up the keypress event listener.
  useEffect(() => {
    document.addEventListener('keypress', handleKeyPress);

    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [isFormValid, handleLoginFunction]);

  return (
    <>
      <Tooltip title={!isFormValid ? getNotFormValid() : getFormValid()}>
        <div>
          <CustomPrimaryButton
            label="Log in"
            additionalStyle={{ marginTop: '30px' }}
            disabled={!isFormValid}
            onClick={handleLoginFunction}
            dataTestid="login-button"
          />
        </div>
      </Tooltip>
      <RedirectInfo
        text="Need an account? "
        redirectText="Create an account"
        additionalStyles={{ marginTop: '5px' }}
        redirectHandler={handlePushToRegisterPage}
      />
    </>
  );
};
export default LoginPageFooter;
