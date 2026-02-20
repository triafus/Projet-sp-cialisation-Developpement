import { UserService } from '../services/userService';
import { ROUTES } from '../routes/routes';

let isLogin = true;

const handleToggle = () => {
  isLogin = !isLogin;
  window.dispatchEvent(new Event('popstate'));
};

const handleSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  if (isLogin) {
    UserService.login(data.email, data.password).then(user => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        window.history.pushState({}, '', ROUTES.HOME);
        window.dispatchEvent(new Event('popstate'));
      } else {
        alert('Identifiants incorrects');
      }
    });
  } else {
    UserService.register({ mail: data.email, mdp: data.password, nom: data.name }).then(() => {
      alert('Inscription réussie !');
      handleToggle();
    });
  }
};

window.attachAuthEvents = () => {
  document.querySelector('#auth-form')?.addEventListener('submit', handleSubmit);
  document.querySelector('#toggle-auth')?.addEventListener('click', handleToggle);
};

export const Auth = () => `
  <div class="auth-card">
    <div class="text-center mb-12">
      <h2 class="text-2xl font-bold uppercase tracking-tighter">${isLogin ? 'Connexion' : 'Inscription'}</h2>
      <p class="text-slate-400 text-[10px] uppercase tracking-widest mt-2">Accès Client</p>
    </div>

    <form id="auth-form" class="space-y-6">
      ${!isLogin ? `
        <div class="form-group">
          <label class="form-label">Nom Complet</label>
          <input type="text" name="name" class="form-input" required>
        </div>
      ` : ''}
      
      <div class="form-group">
        <label class="form-label">Email</label>
        <input type="email" name="email" class="form-input" required>
      </div>

      <div class="form-group">
        <label class="form-label">Mot de passe</label>
        <input type="password" name="password" class="form-input" required>
      </div>

      <button type="submit" class="w-full bg-black text-white py-4 font-bold text-sm uppercase tracking-widest hover:bg-slate-800 transition-all mt-8">
        Continuer
      </button>
    </form>

    <div class="text-center pt-8 border-t border-slate-100 mt-8">
      <button id="toggle-auth" class="text-[11px] uppercase tracking-widest font-bold hover:underline">
        ${isLogin ? 'Créer un compte' : 'Déjà un compte ?'}
      </button>
    </div>
  </div>
`;
