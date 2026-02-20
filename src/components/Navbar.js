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
        <a href="${ROUTES.HOME}" class="text-xl font-bold tracking-tighter">LSA SHOP</a>
        <div class="flex items-center gap-8 text-sm uppercase tracking-widest font-medium">
          <a href="${ROUTES.HOME}" class="hover:underline">Catalogue</a>
          
          <button id="cart-btn" class="relative hover:underline uppercase">
            Panier (<span id="cart-count">0</span>)
          </button>

          ${user 
            ? `
              <a href="${ROUTES.DASHBOARD}" class="hover:underline">Admin</a>
              <a href="${ROUTES.SECURITY}" class="hover:underline text-slate-400">Sécurité</a>
              <button id="logout-btn" class="border border-black px-4 py-1 hover:bg-black hover:text-white transition-colors">Sortir</button>
            `
            : `<a href="${ROUTES.AUTH}" class="border border-black px-4 py-1">Login</a>`
          }
        </div>
      </div>
    </nav>
  `;
};
