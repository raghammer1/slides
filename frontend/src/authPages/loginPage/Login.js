import React, { useState, useEffect } from 'react';
import LoginPageInputs from './LoginPageInputs';
import LoginPageFooter from './LoginPageFooter';
import { Typography } from '@mui/material';
import { validateLoginForm } from '../../shared/validators';
import AuthBox from '../../components/AuthBox';
import { login } from '../../api/api';

const Login = () => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(validateLoginForm({ mail, password }));
  }, [mail, password, setIsFormValid]);

  const handleLoginFunction = async () => {
    const loginData = await login({ email: mail, password });
    const token = loginData.data.token;
    localStorage.setItem('token', token);
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
