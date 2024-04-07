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
        label="Email address"
        type="text"
        placeholder="Enter the email address"
        dataTestId={'Email-address-data'}
      />
      <InputWithLabels
        value={username}
        setValue={setUsername}
        label="Username"
        type="text"
        placeholder="Enter the username"
        dataTestId={'Username-data'}
      />
      <InputWithLabels
        value={password}
        setValue={setPassword}
        label="Enter Password"
        type="password"
        placeholder="Enter password"
        dataTestId={'Enter-Password-data'}
      />
      <InputWithLabels
        value={checkPassword}
        setValue={setCheckPassword}
        label="Re-Enter Password"
        type="password"
        placeholder="Enter password"
        dataTestId={'Re-Enter-Password-data'}
      />
    </>
  );
};
export default RegisterPageInputs;
