export const validateLoginForm = ({ mail, password }) => {
  const isMailValid = validateMail(mail);
  const isPassValid = validatePassword(password);
  console.log(isMailValid, isPassValid);
  return isMailValid && isPassValid;
};

export const validateRegisterForm = ({ mail, username, password }) => {
  const isMailValid = validateMail(mail);
  const isPassValid = validatePassword(password);
  const isUsernameValid = validateUsername(username);
  console.log(isMailValid, isPassValid);
  return isMailValid && isPassValid && isUsernameValid;
};

const validateUsername = (username) => {
  return username.length >= 3 && username.length <= 12;
};

const validatePassword = (pass) => {
  return pass.length >= 6 && pass.length <= 12;
};

export const validateMail = (mail) => {
  const emailPatter = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPatter.test(mail);
};
