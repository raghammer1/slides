import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import CustomPrimaryButton from '../../components/CustomePrimaryButton';
import RedirectInfo from '../../components/RedirectInfo';

// Footer component for the registration page, handling input validation feedback and navigation.
const RegisterPageFooter = ({ handleRegister, isFormValid }) => {
  const nav = useNavigate();

  // Navigates to the login page when prompted.
  const handlePushToLoginPage = () => {
    nav('/login');
  };

  // Provides dynamic tooltip feedback based on the form's validity.
  const getNotFormValid = () => {
    return isFormValid.message;
  };

  const getFormValid = () => {
    return 'Press to register';
  };

  // Invokes registration on 'Enter' press if form is valid.
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && isFormValid) {
      handleRegister();
    }
  };

  // Attaches and removes the keypress event listener.
  useEffect(() => {
    document.addEventListener('keypress', handleKeyPress);
    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [isFormValid, handleRegister]);

  return (
    <>
      <Tooltip title={!isFormValid.valid ? getNotFormValid() : getFormValid()}>
        <div>
          <CustomPrimaryButton
            label="Register"
            additionalStyle={{ marginTop: '30px' }}
            disabled={!isFormValid.valid}
            onClick={handleRegister}
            dataTestid="register-button"
          />
        </div>
      </Tooltip>
      <RedirectInfo
        text="Already have an account? "
        redirectText="Login here"
        additionalStyles={{ marginTop: '5px' }}
        redirectHandler={handlePushToLoginPage}
      />
    </>
  );
};
export default RegisterPageFooter;
