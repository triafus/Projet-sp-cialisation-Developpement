import apiClient from '../config/apiClient';
import { MOCK_PRODUCTS } from '../utils/mocks/product';

export const ProductService = {
  async getAll() {
    return apiClient.get('/produits').then(data => {
      return data.produits || [];
    }).catch(err => {
      console.error('Erreur getAll produits:', err);
      return MOCK_PRODUCTS;
    });
  },

  async getById(id) {
    return apiClient.get(`/produits/${id}`).then(data => {
      return data.produit || data;
    }).catch(err => {
      console.error(`Erreur getById produit ${id}:`, err);
      throw err;
    });
  },

  async create(productData) {
    return apiClient.post('/produits', productData).then(data => {
      return data;
    }).catch(err => {
      console.error('Erreur create produit:', err);
      throw err;
    });
  },

  async update(id, productData) {
    return apiClient.put(`/produits/${id}`, productData).then(data => {
      return data;
    }).catch(err => {
      console.error(`Erreur update produit ${id}:`, err);
      throw err;
    });
  },

  async delete(id) {
    return apiClient.delete(`/produits/${id}`).then(data => {
      return data;
    }).catch(err => {
      console.error(`Erreur delete produit ${id}:`, err);
      throw err;
    });
  },


};
