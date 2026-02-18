import apiClient from '../config/apiClient';

export const ProductService = {
  async getAll() {
    return apiClient.get('/produits').then(data => {
      return data.produits || [];
    });
  },

  async getById(id) {
    return apiClient.get(`/produits/${id}`).then(data => {
      return data.produit || data;
    });
  },

  async create(productData) {
    return apiClient.post('/produits', productData).then(data => {
      return data;
    });
  },

  async update(id, productData) {
    return apiClient.put(`/produits/${id}`, productData).then(data => {
      return data;
    });
  },

  async delete(id) {
    return apiClient.delete(`/produits/${id}`).then(data => {
      return data;
    });
  },


};
