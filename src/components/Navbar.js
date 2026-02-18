import { ROUTES } from '../routes/routes';

export const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return `
    <nav class="nav-container">
      <div class="nav-content">
        <a href="${ROUTES.HOME}" class="text-2xl font-bold">LSA <span class="text-blue-500">Shop</span></a>
        <div class="space-x-6 flex items-center">
          <a href="${ROUTES.HOME}" class="hover:text-blue-400 transition-colors">Catalogue</a>
          ${user 
            ? `
              <a href="${ROUTES.DASHBOARD}" class="hover:text-blue-400 transition-colors">Dashboard</a>
              <button id="logout-btn" class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-medium transition-all text-white">Déconnexion</button>
            `
            : `<a href="${ROUTES.AUTH}" class="btn-primary">Connexion</a>`
          }
        </div>
      </div>
    </nav>
  `;
};
