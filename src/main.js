import './style.css';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Auth } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import { CSPReports } from './pages/CSPReports';
import { ROUTES } from './routes/routes';
import { UserService } from './services/userService';
import { CartStore } from './state/cartStore';
import { ProductCard } from './components/ProductCard';

const app = document.querySelector('#app');

const navigate = async () => {
  const path = window.location.pathname;
  const user = localStorage.getItem('user');
  const protectedRoutes = [ROUTES.DASHBOARD, ROUTES.SECURITY];

  if (protectedRoutes.includes(path) && !user) {
    window.history.pushState({}, '', ROUTES.AUTH);
    return navigate();
  }

  if (path === ROUTES.AUTH && user) {
    window.history.pushState({}, '', ROUTES.HOME);
    return navigate();
  }

  let content = '';

  if (path === ROUTES.AUTH) {
    content = Auth();
  } else if (path === ROUTES.DASHBOARD) {
    content = await Dashboard();
  } else if (path === ROUTES.SECURITY) {
    content = await CSPReports();
  } else {
    content = await Home();
  }

  app.innerHTML = Layout(content);
  
  if (path === ROUTES.AUTH && window.attachAuthEvents) {
    window.attachAuthEvents();
  }

  if (path === ROUTES.DASHBOARD && window.attachDashboardEvents) {
    window.attachDashboardEvents();
  }
};

window.addEventListener('popstate', navigate);
document.addEventListener('DOMContentLoaded', navigate);

document.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  if (link && link.href && link.href.startsWith(window.location.origin)) {
    e.preventDefault();
    window.history.pushState({}, '', link.getAttribute('href'));
    navigate();
    return;
  }

  const cartBtn = e.target.closest('#cart-btn');
  if (cartBtn && window.openCart) {
    window.openCart();
    return;
  }

  const logoutBtn = e.target.closest('#logout-btn');
  if (logoutBtn) {
    UserService.logout().then(() => {
      window.history.pushState({}, '', ROUTES.HOME);
      navigate();
    });
    return;
  }
});

// Ajout des fonctions globales pour les actions du panier simplifiées
window.addToCart = (id) => {
  const product = window.allProducts.find(p => p.id === id);
  if (product) CartStore.addItem(product);
};

window.removeFromCart = (id) => {
  CartStore.removeItem(id);
};

window.updateQty = (id, delta) => {
  const item = CartStore.getState().find(i => i.id === id);
  if (item) {
    CartStore.updateQuantity(id, item.quantity + delta);
  }
};

document.addEventListener('input', (e) => {
  if (e.target.id === 'search-input') {
    const query = e.target.value.toLowerCase().trim();
    const grid = document.querySelector('#product-grid');
    if (grid && window.allProducts) {
      const filtered = window.allProducts.filter(p => 
        p.titre.toLowerCase().includes(query)
      );
      grid.innerHTML = filtered.map(p => ProductCard(p)).join('');
    }
  }
});
