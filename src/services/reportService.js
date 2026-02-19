import apiClient from '../config/apiClient';
import { MOCK_REPORTS, MOCK_STATS } from '../utils/mocks/reports';

export const ReportService = {
  getStats() {
    return apiClient.get('/produits/stats').catch(() => MOCK_STATS);
  },

  getCSPReports() {
    return apiClient.get('/security/reports').catch(() => MOCK_REPORTS);
  }
};
