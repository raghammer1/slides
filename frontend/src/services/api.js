import apiClient from './client';

// Performs login operation using the provided credentials.
export const login = async (data) => {
  return await apiClient.post('/admin/auth/login', data);
};

// Registers a new user with the given data.
export const register = async (data) => {
  try {
    return await apiClient.post('/admin/auth/register', data);
  } catch (e) {
    return { error: true, e };
  }
};

// Retrieves store data from the server, requiring a valid token stored in localStorage.
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

// Updates the store data on the server with the provided data, requiring a valid token.
export const setStore = async (data) => {
  try {
    const token = localStorage.getItem('token');

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
