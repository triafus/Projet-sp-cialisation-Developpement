export const ProductCard = (product) => `
  <div class="product-card">
    <div class="product-image-container">
      <img src="${product.img}" alt="${product.titre}" class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500">
    </div>
    <div class="flex flex-col gap-1 mt-2">
      <span class="badge-category">${product.categorie}</span>
      <h3 class="text-sm font-bold uppercase tracking-tight">${product.titre}</h3>
      <div class="flex justify-between items-center mt-2">
        <span class="text-sm font-medium">${product.prix.toFixed(2)}€</span>
        <button 
          onclick="window.addToCart(${product.id})"
          class="text-[11px] font-bold uppercase border-b border-black hover:text-slate-400 hover:border-slate-400 transition-colors"
        >
          Ajouter
        </button>
      </div>
    </div>
  </div>
`;
