import './style.css';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Auth } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import { CSPReports } from './pages/CSPReports';
import { Stats } from './pages/Stats';
import { ROUTES } from './routes/routes';
import { UserService } from './services/userService';
import { CartStore } from './state/cartStore';
import { ProductCard } from './components/ProductCard';

const app = document.querySelector('#app');

const navigate = async () => {
  const path = window.location.pathname;
  const user = localStorage.getItem('user');
  
  const protectedRoutes = [ROUTES.DASHBOARD, ROUTES.SECURITY, ROUTES.STATS];

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
  } else if (path === ROUTES.STATS) {
    content = await Stats();
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

  const logoutBtn = e.target.closest('#logout-btn');
  if (logoutBtn) {
    UserService.logout().then(() => {
      window.history.pushState({}, '', ROUTES.HOME);
      navigate();
    });
    return;
  }

  const cartBtn = e.target.closest('#cart-btn');
  if (cartBtn) {
    const drawer = document.querySelector('#cart-drawer');
    const overlay = document.querySelector('#cart-overlay');
    if (drawer && overlay) {
      drawer.classList.remove('translate-x-full');
      overlay.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    }
    return;
  }

  const addToCartBtn = e.target.closest('.add-to-cart');
  if (addToCartBtn) {
    const product = JSON.parse(addToCartBtn.dataset.product);
    CartStore.addItem(product);
    return;
  }

  const qtyBtn = e.target.closest('.cart-qty-btn');
  if (qtyBtn) {
    const { id, action } = qtyBtn.dataset;
    const item = CartStore.getState().find(i => i.id === parseInt(id));
    if (item) {
      const newQty = action === 'increase' ? item.quantity + 1 : item.quantity - 1;
      CartStore.updateQuantity(parseInt(id), newQty);
    }
    return;
  }

  const removeBtn = e.target.closest('.cart-remove-btn');
  if (removeBtn) {
    CartStore.removeItem(parseInt(removeBtn.dataset.id));
    return;
  }
});

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
