import React, { useCallback, useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import RegisterPageInputs from './RegisterPageInputs';
import RegisterPageFooter from './RegisterPageFooter';
import { validateRegisterForm } from '../../shared/validators';
import AuthBox from '../../components/AuthBox';
import { register } from '../../services/api';
import useCurrentUserStore from '../../zustandStore/useCurrentUserStore';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../components/AlertError';

const RegisterPage = () => {
  const [mail, setMail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const { showAlert } = useAlert();

  const [isFormValid, setIsFormValid] = useState(true);

  const { setCurrentUser } = useCurrentUserStore();

  const nav = useNavigate();

  useEffect(() => {
    setIsFormValid(
      validateRegisterForm({ mail, username, password, checkPassword })
    );
  }, [mail, password, username, checkPassword, setIsFormValid]);

  const handleRegister = useCallback(async () => {
    try {
      const response = await register({
        email: mail,
        password,
        name: username,
      });

      if (response?.status === 200) {
        const token = response.data.token;
        localStorage.setItem('token', token);
        setCurrentUser({ name: username, email: mail });

        showAlert(
          `${
            username.charAt(0).toUpperCase() + username.slice(1)
          } Successfully registered`,
          'green'
        );

        nav('/dashboard');
      }
    } catch (error) {
      if (error.response) {
        console.log('Error data:', error.response.data);
        const errorMessage =
          error.response.data.message ||
          'Registration failed. Please try again.';
        showAlert(errorMessage, 'tomato');
      } else if (error.request) {
        console.log('Error request:', error.request);
        showAlert(
          'No response from the server. Please check your network connection.',
          'tomato'
        );
      } else {
        console.log('Error', error.message);
        showAlert('An unexpected error occurred. Please try again.', 'tomato');
      }
    }
  }, [mail, password, username, setCurrentUser, nav, showAlert]);

  return (
    <AuthBox>
      <Typography variant="h5" sx={{ color: 'white' }}>
        Create an account
      </Typography>
      <RegisterPageInputs
        mail={mail}
        username={username}
        setUsername={setUsername}
        setMail={setMail}
        password={password}
        setPassword={setPassword}
        checkPassword={checkPassword}
        setCheckPassword={setCheckPassword}
      />
      <RegisterPageFooter
        isFormValid={isFormValid}
        handleRegister={handleRegister}
      />
    </AuthBox>
  );
};

export default RegisterPage;
