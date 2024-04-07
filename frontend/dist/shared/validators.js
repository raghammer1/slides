"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateRegisterForm = exports.validateMail = exports.validateLoginForm = void 0;
const validateLoginForm = _ref => {
  let {
    mail,
    password
  } = _ref;
  const isMailValid = validateMail(mail);
  const isPassValid = validatePassword(password);
  return isMailValid && isPassValid;
};
exports.validateLoginForm = validateLoginForm;
const validateRegisterForm = _ref2 => {
  let {
    mail,
    username,
    password,
    checkPassword
  } = _ref2;
  const isMailValid = validateMail(mail);
  const isPassValid = validatePassword(password);
  const isUsernameValid = validateUsername(username);
  const passwordsMatch = password === checkPassword;
  let message = 'Username must contain between 3 and 12 characters, password must contain between 6 to 12 characters';
  if (!isMailValid) {
    message = 'Email must be of valid type';
  } else if (!passwordsMatch) {
    message = 'Passwords must match';
  }
  return {
    message,
    valid: isMailValid && isPassValid && isUsernameValid && passwordsMatch
  };
};
exports.validateRegisterForm = validateRegisterForm;
const validateUsername = username => {
  return username.length >= 3 && username.length <= 12;
};
const validatePassword = pass => {
  return pass.length >= 6 && pass.length <= 12;
};
const validateMail = mail => {
  const emailPatter = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPatter.test(mail);
};
exports.validateMail = validateMail;