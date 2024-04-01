import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import CustomPrimaryButton from '../../components/CustomePrimaryButton';
import RedirectInfo from '../../components/RedirectInfo';

const RegisterPageFooter = ({ handleRegister, isFormValid }) => {
  const nav = useNavigate();

  const handlePushToLoginPage = () => {
    nav('/login');
  };

  const getNotFormValid = () => {
    return isFormValid.message;
  };

  const getFormValid = () => {
    return 'Press to register';
  };

  return (
    <>
      <Tooltip title={!isFormValid.valid ? getNotFormValid() : getFormValid()}>
        <div>
          <CustomPrimaryButton
            label="Register"
            additionalStyle={{ marginTop: '30px' }}
            disabled={!isFormValid.valid}
            onClick={handleRegister}
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
