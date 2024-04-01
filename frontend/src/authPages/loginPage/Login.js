import React, { useState, useEffect } from 'react';
import LoginPageInputs from './LoginPageInputs';
import LoginPageFooter from './LoginPageFooter';
import { Typography } from '@mui/material';
import { validateLoginForm } from '../../shared/validators';
import AuthBox from '../../components/AuthBox';
import { login } from '../../api/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const nav = useNavigate();

  useEffect(() => {
    setIsFormValid(validateLoginForm({ mail, password }));
  }, [mail, password, setIsFormValid]);

  const handleLoginFunction = async () => {
    const loginData = await login({ email: mail, password });
    console.log(loginData);
    const token = loginData.data.token;
    localStorage.setItem('token', token);

    if (loginData?.status === 200) {
      nav('/dashboard');
    }

    console.log('logged in now', token);
  };

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
