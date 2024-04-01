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
      />
      <InputWithLabels
        value={password}
        setValue={setPassword}
        type="password"
        placeholder="Enter password"
        label="password"
      />
    </>
  );
};
export default LoginPageInputs;
