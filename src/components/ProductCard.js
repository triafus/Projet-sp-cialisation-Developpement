export const ProductCard = (product) => `
  <div class="product-card group">
    <div class="product-image-container">
      <img src="${product.img}" alt="${product.titre}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
    </div>
    <div class="p-4">
      <div class="flex justify-between items-start mb-2">
        <span class="badge-category">${product.categorie}</span>
        <span class="text-sm font-bold text-slate-900">${product.prix} €</span>
      </div>
      <h3 class="font-bold text-slate-800 text-lg mb-1">${product.titre}</h3>
      <p class="text-slate-500 text-sm line-clamp-2 mb-4">${product.description}</p>
      <div class="flex items-center justify-between">
        <span class="text-xs ${product.quantite > 0 ? 'text-green-600' : 'text-red-500'} font-medium">
          ${product.quantite > 0 ? `${product.quantite} en stock` : 'Rupture de stock'}
        </span>
        <button 
          class="add-to-cart bg-slate-900 text-white p-2 rounded-lg hover:bg-slate-800 disabled:opacity-50" 
          data-product='${JSON.stringify(product).replace(/'/g, "&apos;")}'
          ${product.quantite === 0 ? 'disabled' : ''}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
`;
