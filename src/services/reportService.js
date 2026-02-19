import apiClient from '../config/apiClient';
import { MOCK_REPORTS, MOCK_STATS } from '../utils/mocks/reports';

export const ReportService = {
  getStats() {
    return apiClient.get('/produits/stats').catch(err => {
      console.error('Erreur getStats (Mocks activés):', err);
      return MOCK_STATS;
    });
  },

  getCSPReports() {
    return apiClient.get('/security/reports').catch(err => {
      console.error('Erreur getCSPReports (Mocks activés):', err);
      return MOCK_REPORTS;
    });
  }
};
