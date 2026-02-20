import apiClient from '../config/apiClient';

export const UserService = {
  async login(mail, mdp) {
    return apiClient.post('/auth/connexion', { mail, mdp })
      .then(data => {
        if (data.token) localStorage.setItem('token', data.token);
        if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
        return data.user || data;
      });
  },

  async register(userData) {
    return apiClient.post('/auth/inscription', userData)
      .then(data => {
        if (data.token) localStorage.setItem('token', data.token);
        if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
        return data.user || data;
      });
  },

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    return Promise.resolve();
  }
};
  