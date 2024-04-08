import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5005',
  timeout: 1000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        config.headers.Authorization = `Bearer ${token}`;
      } catch (err) {
        console.log(err);
      }
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default apiClient;
