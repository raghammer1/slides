import React, { useState, useEffect, useCallback } from 'react';
import LoginPageInputs from './LoginPageInputs';
import LoginPageFooter from './LoginPageFooter';
import { Typography } from '@mui/material';
import { validateLoginForm } from '../../shared/validators';
import AuthBox from '../../components/AuthBox';
import { login } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import useCurrentUserStore from '../../zustandStore/useCurrentUserStore';
import { initializeStore } from '../../zustandStore/usePresentationListStore';

const Login = () => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const { setCurrentUser } = useCurrentUserStore();

  const nav = useNavigate();

  useEffect(() => {
    setIsFormValid(validateLoginForm({ mail, password }));
  }, [mail, password, setIsFormValid]);

  const handleLoginFunction = useCallback(async () => {
    const loginData = await login({ email: mail, password });

    if (loginData?.status === 200) {
      const token = loginData.data.token;
      localStorage.setItem('token', token);

      initializeStore();

      setCurrentUser({ name: '', email: mail });

      nav('/dashboard');
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
