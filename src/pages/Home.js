import { ProductService } from '../services/productService';
import { ProductCard } from '../components/ProductCard';

export const Home = async () => {
  const products = await ProductService.getAll();

  return `
    <div class="space-y-8">
      <header class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold text-slate-900">Notre Catalogue</h1>
          <p class="text-slate-500">Découvrez nos produits sélectionnés pour vous.</p>
        </div>
        <div class="relative max-w-sm w-full font-sans">
          <input type="text" placeholder="Rechercher un produit..." class="search-input">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute left-3 top-2.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </header>

      <div class="product-grid">
        ${products.map(product => ProductCard(product)).join('')}
      </div>
    </div>
  `;
};
