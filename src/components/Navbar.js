import { ROUTES } from '../routes/routes';
import { CartStore } from '../state/cartStore';

export const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  setTimeout(() => {
    const badge = document.querySelector('#cart-count');
    if (badge) {
      CartStore.subscribe((state) => {
        const count = state.reduce((acc, item) => acc + item.quantity, 0);
        badge.textContent = count;
        badge.classList.toggle('hidden', count === 0);
      });
    }
  }, 0);

  return `
    <nav class="nav-container">
      <div class="nav-content">
        <a href="${ROUTES.HOME}" class="text-2xl font-bold">LSA <span class="text-blue-500">Shop</span></a>
        <div class="space-x-6 flex items-center">
          <a href="${ROUTES.HOME}" class="hover:text-blue-400 transition-colors tracking-tight">Catalogue</a>
          
          <button id="cart-btn" class="relative p-2 text-slate-600 hover:text-blue-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span id="cart-count" class="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full hidden">0</span>
          </button>

          ${user 
            ? `
              <a href="${ROUTES.DASHBOARD}" class="hover:text-blue-400 transition-colors">Dashboard</a>
              <a href="${ROUTES.SECURITY}" class="hover:text-blue-400 transition-colors">Sécurité</a>
              <a href="${ROUTES.STATS}" class="hover:text-blue-400 transition-colors">Stats</a>
              <button id="logout-btn" class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-medium transition-all text-white">Déconnexion</button>
            `
            : `<a href="${ROUTES.AUTH}" class="btn-primary">Connexion</a>`
          }
        </div>
      </div>
    </nav>
  `;
};
