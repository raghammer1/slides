import apiClient from './client';

export const login = async (data) => {
  try {
    return await apiClient.post('/admin/auth/login', data);
  } catch (e) {
    return { error: true, e };
  }
};

export const register = async (data) => {
  try {
    return await apiClient.post('/admin/auth/register', data);
  } catch (e) {
    return { error: true, e };
  }
};

// WE ARE CHECKING THIS AS THIS WILL TELL US IF THE ROUTE THAT IS BEING ACCESSED BY THE USER
// IS BEING DONE WHEN THEY HAVE A VALID TOKEN ELSE THEY WON'T BE ABLE TO ACCESS THE PATH
// ONLY NEEDED ON AUTHORIZED ROUTES HENCE !
// !IMPORTANT CODE DO NOT DELETE
// const checkResponseCode = (exception) => {
//   const responseCode = exception?.response?.status;

//   if (responseCode) (responseCode === 401 || responseCode === 403) && logout();
// };
// const logout = () => {
//   localStorage.clear();
//   window.location.pathname = '/login';
// };
