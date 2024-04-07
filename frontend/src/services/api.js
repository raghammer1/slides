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

export const getStore = async () => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found');
    }

    const response = await apiClient.get('/store', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) return response.data.store;
  } catch (e) {
    return { error: true, message: e.message };
  }
};

export const setStore = async (data) => {
  try {
    const token = localStorage.getItem('token');
    console.log('DATA', data);

    // Ensure token exists before proceeding
    if (!token) {
      throw new Error('No token found');
    }

    const response = await apiClient.put('/store', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (e) {
    return { error: true, message: e.message };
  }
};

// STORE SCHEMA
/**
 * @typedef {Object} Store
 * @property {Object} Slides - The unique identifier for the user.
 * @property {Object} Presentations - The name of the user.
 */

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

// await setStore( { hoooo: 'WOW' } );
// const oldData = await getStore();
// console.log(oldData, 'STORE');
