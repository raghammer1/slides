import React, { useState, useEffect, useCallback } from 'react';
import LoginPageInputs from './LoginPageInputs';
import LoginPageFooter from './LoginPageFooter';
import { Typography } from '@mui/material';
import { validateLoginForm } from '../../shared/validators';
import AuthBox from '../../components/AuthBox';
import { login } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import useCurrentUserStore from '../../zustandStore/useCurrentUserStore';
import { useAlert } from '../../components/AlertError';

// Main login component which manages the login state and orchestrates the login process.
const Login = () => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const { showAlert } = useAlert();
  const { setCurrentUser } = useCurrentUserStore();
  const nav = useNavigate();

  // Validates the login form every time mail or password changes.
  useEffect(() => {
    setIsFormValid(validateLoginForm({ mail, password }));
  }, [mail, password, setIsFormValid]);

  // Asynchronously logs in the user, manages local storage of token, and handles navigation and error alerts.
  const handleLoginFunction = useCallback(async () => {
    try {
      const response = await login({ email: mail, password });
      const token = response.data.token;
      localStorage.setItem('token', token);

      setCurrentUser({ name: '', email: mail });
      showAlert('Welcome back', 'green');

      nav('/dashboard');
    } catch (error) {
      if (error.response) {
        console.log('Error data:', error.response.data);
        const errorMessage =
          error.response.data.error || 'An unexpected error occurred';
        showAlert(errorMessage, 'tomato');
      } else if (error.request) {
        console.log('Error request:', error.request);
      } else {
        console.log('Error', error.message);
      }
    }
  }, [mail, password]);

  return (
    <AuthBox>
      <Typography variant="h5" sx={{ color: 'white' }}>
        Login
      </Typography>

      <LoginPageInputs
        mail={mail}
        setMail={setMail}
        password={password}
        setPassword={setPassword}
      />
      <LoginPageFooter
        isFormValid={isFormValid}
        handleLoginFunction={handleLoginFunction}
      />
    </AuthBox>
  );
};

export default Login;
