import axios from 'axios';

const client = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1',
  timeout: 10000,
});

client.interceptors.response.use(
  (resp) => resp,
  (error) => {
    const message = error?.response?.data?.message || error.message || 'Network error';
    return Promise.reject(new Error(message));
  }
);

export default client;