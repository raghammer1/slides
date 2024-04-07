import React from 'react';
import InputWithLabels from '../../components/InputLabel';

const LoginPageInputs = ({ mail, setMail, password, setPassword }) => {
  return (
    <>
      <InputWithLabels
        value={mail}
        setValue={setMail}
        type="Email"
        placeholder="Enter email"
        label="Email"
        dataTestId={'email-login-data'}
      />
      <InputWithLabels
        value={password}
        setValue={setPassword}
        type="password"
        placeholder="Enter password"
        label="password"
        dataTestId={'password-login-data'}
      />
    </>
  );
};
export default LoginPageInputs;
