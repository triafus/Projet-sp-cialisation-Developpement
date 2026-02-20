import { ProductService } from '../services/productService';
import { ProductCard } from '../components/ProductCard';

export const Home = async () => {
  const products = await ProductService.getAll();
  window.allProducts = products;

  return `
    <section class="max-w-4xl mx-auto">
      <div class="mb-20 text-center md:text-left">
        <h1 class="text-5xl font-bold uppercase tracking-tighter mb-4">LSA COLLECTION</h1>
        <p class="text-slate-400 text-xs tracking-[0.3em] uppercase font-medium">Épure & Minimalisme</p>
      </div>

      <div class="mb-16">
        <input type="text" id="search-input" placeholder="RECHERCHE..." class="search-input text-center md:text-left">
      </div>

      <div id="product-grid" class="product-grid">
        ${products.map(p => ProductCard(p)).join('')}
      </div>
    </section>
  `;
};
