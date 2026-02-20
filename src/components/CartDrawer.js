import { CartStore } from '../state/cartStore';

export const CartDrawer = () => {
  setTimeout(() => {
    const list = document.querySelector('#cart-items');
    const total = document.querySelector('#cart-total');
    const drawer = document.querySelector('#cart-drawer');
    const overlay = document.querySelector('#cart-overlay');

    if (list && total) {
      CartStore.subscribe((state) => {
        list.innerHTML = state.map(item => `
          <div class="flex gap-4 items-center">
            <div class="w-16 h-16 bg-slate-50 border border-slate-100 shrink-0">
              <img src="${item.img}" class="w-full h-full object-cover grayscale">
            </div>
            <div class="flex-grow">
              <h4 class="text-xs font-bold uppercase">${item.titre}</h4>
              <div class="flex items-center gap-4 mt-1 text-xs">
                <button onclick="window.updateQty(${item.id}, -1)" class="hover:text-red-500">-</button>
                <span class="font-medium">${item.quantity}</span>
                <button onclick="window.updateQty(${item.id}, 1)" class="hover:text-blue-500">+</button>
                <span class="ml-auto font-bold">${(item.prix * item.quantity).toFixed(2)}€</span>
              </div>
            </div>
            <button onclick="window.removeFromCart(${item.id})" class="text-slate-300 hover:text-black">&times;</button>
          </div>
        `).join('');
        
        const totalVal = state.reduce((acc, item) => acc + (item.prix * item.quantity), 0);
        total.textContent = `${totalVal.toFixed(2)}€`;
      });
    }

    if (drawer && overlay) {
      window.openCart = () => {
        drawer.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
      };
      
      const close = () => {
        drawer.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      };
      
      document.querySelector('#close-cart').addEventListener('click', close);
      overlay.addEventListener('click', close);
    }
  }, 0);

  return `
    <div id="cart-drawer" class="fixed inset-0 z-[100] hidden">
      <div class="absolute inset-0 bg-white/60 backdrop-blur-sm" id="cart-overlay"></div>
      <div class="absolute right-0 top-0 h-full w-full max-w-sm bg-white border-l border-black p-8 flex flex-col shadow-2xl">
        <div class="flex justify-between items-center mb-12">
          <h2 class="text-xl font-bold uppercase tracking-tighter">Panier</h2>
          <button id="close-cart" class="text-2xl hover:text-slate-400">&times;</button>
        </div>
        
        <div id="cart-items" class="flex-grow overflow-y-auto space-y-8"></div>
        
        <div class="border-t border-black pt-8 mt-8">
          <div class="flex justify-between items-center mb-8">
            <span class="uppercase text-xs font-bold tracking-widest text-slate-500">Total</span>
            <span id="cart-total" class="text-xl font-bold">0.00€</span>
          </div>
          <button class="w-full border border-black py-4 uppercase font-bold text-sm hover:bg-black hover:text-white transition-all">
            Commander
          </button>
        </div>
      </div>
    </div>
  `;
};
