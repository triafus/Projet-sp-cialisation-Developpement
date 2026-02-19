import apiClient from '../config/apiClient';

export const UserService = {
  async login(mail, mdp) {
    return apiClient.post('/auth/connexion', { mail, mdp })
      .then(data => data.user || data);
  },

  async register(userData) {
    return apiClient.post('/auth/inscription', userData);
  },

  logout() {
    localStorage.removeItem('user');
    return Promise.resolve();
  }
};
  