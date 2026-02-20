import axios from 'axios';
import { ROUTES } from '../routes/routes';
import { Toast } from '../utils/toast';

export const API_BASE_URL = "http://localhost:5000/api";

const instance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN'
});

instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.location.href = ROUTES.AUTH;
    } else {
      const msg = error.response?.data?.message || "Une erreur réseau est survenue.";
      Toast.show(msg, 'error');
    }
    return Promise.reject(error);
  }
);

const apiClient = {
  get: (endpoint) => instance.get(endpoint).then(res => res.data),
  post: (endpoint, data) => instance.post(endpoint, data).then(res => res.data),
  put: (endpoint, data) => instance.put(endpoint, data).then(res => res.data),
  delete: (endpoint) => instance.delete(endpoint).then(res => res.data)
};

export default apiClient;
