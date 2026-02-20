import { CartStore } from '../state/cartStore';

export const CartDrawer = () => {
  setTimeout(() => {
    const list = document.querySelector('#cart-items-list');
    const total = document.querySelector('#cart-total-price');
    const drawer = document.querySelector('#cart-drawer');
    const overlay = document.querySelector('#cart-overlay');

    if (list && total) {
      CartStore.subscribe((state) => {
        if (state.length === 0) {
          list.innerHTML = `
            <div class="flex flex-col items-center justify-center py-20 text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p class="font-medium">Votre panier est vide</p>
            </div>
          `;
          total.textContent = '0.00 €';
        } else {
          list.innerHTML = state.map(item => `
            <div class="flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 mb-3 group">
              <div class="w-16 h-16 rounded-lg overflow-hidden bg-white border border-slate-200 flex-shrink-0">
                <img src="${item.img}" alt="${item.titre}" class="w-full h-full object-cover">
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="font-bold text-slate-900 truncate">${item.titre}</h4>
                <p class="text-xs text-slate-500 mb-2">${item.prix} € / unité</p>
                <div class="flex items-center gap-3">
                  <div class="flex items-center border border-slate-200 bg-white rounded-lg overflow-hidden h-8">
                    <button class="cart-qty-btn px-2 hover:bg-slate-50 transition-colors" data-id="${item.id}" data-action="decrease">-</button>
                    <span class="w-8 text-center text-sm font-bold border-x border-slate-100">${item.quantity}</span>
                    <button class="cart-qty-btn px-2 hover:bg-slate-50 transition-colors" data-id="${item.id}" data-action="increase">+</button>
                  </div>
                  <button class="cart-remove-btn text-red-400 hover:text-red-600 p-1 transition-colors" data-id="${item.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          `).join('');
          
          const totalPrice = state.reduce((acc, item) => acc + (item.prix * item.quantity), 0);
          total.textContent = `${totalPrice.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €`;
        }
      });
    }

    const closeBtn = document.querySelector('#close-cart');
    if (closeBtn && drawer && overlay) {
      const close = () => {
        drawer.classList.add('translate-x-full');
        overlay.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      };
      closeBtn.addEventListener('click', close);
      overlay.addEventListener('click', close);
    }
  }, 0);

  return `
    <div id="cart-overlay" class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 hidden transition-opacity"></div>
    <div id="cart-drawer" class="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform translate-x-full transition-transform duration-300 ease-in-out flex flex-col">
      <div class="p-6 border-b border-slate-100 flex items-center justify-between">
        <h2 class="text-xl font-black text-slate-900 flex items-center gap-2">
          Mon Panier
          <span id="cart-items-count" class="bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded-full"></span>
        </h2>
        <button id="close-cart" class="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l18 18" />
          </svg>
        </button>
      </div>

      <div id="cart-items-list" class="flex-1 overflow-y-auto p-6 scrollbar-hide">
      </div>

      <div class="p-6 bg-slate-50 border-t border-slate-100 space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-slate-500 font-medium">Total Estimé</span>
          <span id="cart-total-price" class="text-2xl font-black text-slate-900">0.00 €</span>
        </div>
        <button class="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-slate-800 transition-all shadow-lg active:scale-[0.98]">
          Passer à la commande
        </button>
        <p class="text-center text-[10px] text-slate-400 uppercase tracking-widest font-bold">Paiement 100% sécurisé</p>
      </div>
    </div>
  `;
};
