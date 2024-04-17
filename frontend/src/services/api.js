import apiClient from './client';

export const login = async (data) => {
  return await apiClient.post('/admin/auth/login', data);
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
