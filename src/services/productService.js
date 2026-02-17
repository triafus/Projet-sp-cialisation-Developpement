import apiClient from '../config/apiClient';
import { MOCK_PRODUCTS } from '../utils/mocks/product';

const USE_MOCKS = true;

export const ProductService = {
  getAll() {
    if (USE_MOCKS) {
      return Promise.resolve(MOCK_PRODUCTS)
        .then(data => data);
    }
    return apiClient.get('/produits');
  },

  getById(id) {
    if (USE_MOCKS) {
      return Promise.resolve(MOCK_PRODUCTS.find(p => p.id === parseInt(id)))
        .then(data => data);
    }
    return apiClient.get(`/produits/${id}`);
  },

  create(productData) {
    if (USE_MOCKS) {
      return Promise.resolve({ ...productData, id: Date.now() })
        .then(data => data);
    }
    return apiClient.post('/produits', productData);
  },

  update(id, productData) {
    if (USE_MOCKS) {
      return Promise.resolve({ ...productData, id: parseInt(id) })
        .then(data => data);
    }
    return apiClient.put(`/produits/${id}`, productData);
  },

  delete(id) {
    if (USE_MOCKS) {
      return Promise.resolve({ success: true })
        .then(data => data);
    }
    return apiClient.delete(`/produits/${id}`);
  }
};
