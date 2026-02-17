import apiClient from '../config/apiClient';
import { MOCK_USERS } from '../utils/mocks/user';

const USE_MOCKS = true;

export const UserService = {
  login(mail, mdp) {
    if (USE_MOCKS) {
      const user = MOCK_USERS.find(u => u.mail === mail && u.mdp === mdp);
      return Promise.resolve(user || null)
        .then(data => {
          return data;
        });
    }
    return apiClient.post('/auth/connexion', { mail, mdp });
  },

  register(userData) {
    if (USE_MOCKS) {
      return Promise.resolve({ ...userData, id: Date.now() })
        .then(data => {
          return data;
        });
    }
    return apiClient.post('/auth/inscription', userData);
  }
};
