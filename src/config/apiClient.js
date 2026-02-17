import axios from 'axios';

export const API_BASE_URL = "http://localhost:5000/api";

const apiClient = {
  async get(endpoint) {
    return axios.get(`${API_BASE_URL}${endpoint}`)
      .then(response => response.data)
      .catch(error => console.error(error));
  },

  async post(endpoint, data) {
    return axios.post(`${API_BASE_URL}${endpoint}`, data)
      .then(response => response.data)
      .catch(error => console.error(error));
  },

  async put(endpoint, data) {
    return axios.put(`${API_BASE_URL}${endpoint}`, data)
      .then(response => response.data)
      .catch(error => console.error(error));
  },

  async delete(endpoint) {
    return axios.delete(`${API_BASE_URL}${endpoint}`)
      .then(response => response.data)
      .catch(error => console.error(error));
  }
};

export default apiClient;
