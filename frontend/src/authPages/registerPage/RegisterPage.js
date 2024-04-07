import React, { useCallback, useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import RegisterPageInputs from './RegisterPageInputs';
import RegisterPageFooter from './RegisterPageFooter';
import { validateRegisterForm } from '../../shared/validators';
import AuthBox from '../../components/AuthBox';
import { register } from '../../services/api';
import useCurrentUserStore from '../../zustandStore/useCurrentUserStore';
import { useNavigate } from 'react-router-dom';
// import { initializeStore } from '../../zustandStore/usePresentationListStore';

const RegisterPage = () => {
  const [mail, setMail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');

  const [isFormValid, setIsFormValid] = useState(true);

  const { setCurrentUser } = useCurrentUserStore();

  const nav = useNavigate();

  useEffect(() => {
    setIsFormValid(
      validateRegisterForm({ mail, username, password, checkPassword })
    );
  }, [mail, password, username, checkPassword, setIsFormValid]);

  const handleRegister = useCallback(async () => {
    const registerData = await register({
      email: mail,
      password,
      name: username,
    });

    if (registerData?.status === 200) {
      const token = registerData.data.token;
      localStorage.setItem('token', token);
      setCurrentUser({ name: username, email: mail });

      nav('/dashboard');
    }
  }, [mail, password, username, setCurrentUser, nav]);

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
