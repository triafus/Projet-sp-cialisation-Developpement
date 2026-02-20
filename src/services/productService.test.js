import { ProductService } from './productService';
import apiClient from '../config/apiClient';
import { MOCK_PRODUCTS } from '../utils/mocks/product';

jest.mock('../config/apiClient');

describe('ProductService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getAll doit retourner les produits mockés', async () => {
    apiClient.get.mockResolvedValue({ produits: MOCK_PRODUCTS });

    const result = await ProductService.getAll();
    expect(result).toEqual(MOCK_PRODUCTS);
  });

  test('getById doit retourner un produit du mock spécifique', async () => {
    const product = MOCK_PRODUCTS[0];
    apiClient.get.mockResolvedValue(product);

    const result = await ProductService.getById(product.id);
    expect(result).toEqual(product);
  });
});
