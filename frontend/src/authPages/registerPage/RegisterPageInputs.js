import React from 'react';
import InputWithLabels from '../../components/InputLabel';

const RegisterPageInputs = (props) => {
  const {
    mail,
    setMail,
    username,
    setUsername,
    password,
    setPassword,
    checkPassword,
    setCheckPassword,
  } = props;
  return (
    <>
      <InputWithLabels
        value={mail}
        setValue={setMail}
        label="Email-address"
        type="text"
        placeholder="Enter the email address"
      />
      <InputWithLabels
        value={username}
        setValue={setUsername}
        label="Username"
        type="text"
        placeholder="Enter the username"
      />
      <InputWithLabels
        value={password}
        setValue={setPassword}
        label="Enter-Password"
        type="password"
        placeholder="Enter password"
      />
      <InputWithLabels
        value={checkPassword}
        setValue={setCheckPassword}
        label="Re-Enter-Password"
        type="password"
        placeholder="Enter password"
      />
    </>
  );
};
export default RegisterPageInputs;
