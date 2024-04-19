// Validates the input of a login form.
export const validateLoginForm = ({ mail, password }) => {
  const isMailValid = validateMail(mail);
  const isPassValid = validatePassword(password);
  return isMailValid && isPassValid;
};

// Validates the input of a registration form.
export const validateRegisterForm = ({
  mail,
  username,
  password,
  checkPassword,
}) => {
  const isMailValid = validateMail(mail);
  const isPassValid = validatePassword(password);
  const isUsernameValid = validateUsername(username);
  const passwordsMatch = password === checkPassword;

  let message =
    'Username must contain between 3 and 12 characters, password must contain between 6 to 12 characters';

  if (!isMailValid) {
    message = 'Email must be of valid type';
  } else if (!passwordsMatch) {
    message = 'Passwords must match';
  }

  return {
    message,
    valid: isMailValid && isPassValid && isUsernameValid && passwordsMatch,
  };
};

// Validates a username based on length.
const validateUsername = (username) => {
  return username.length >= 3 && username.length <= 12;
};

// Validates a password based on length.
const validatePassword = (pass) => {
  return pass.length >= 6 && pass.length <= 12;
};

// Validates an email address using a regular expression.
export const validateMail = (mail) => {
  const emailPatter = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPatter.test(mail);
};
