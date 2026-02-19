import { UserService } from '../services/userService';
import { Layout } from '../components/Layout';
import { ROUTES } from '../routes/routes';

export const Auth = () => {
  let isLogin = true;

  const handleToggle = () => {
    isLogin = !isLogin;
    document.querySelector('#app').innerHTML = Layout(render());
    attachAuthEvents();
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
      UserService.register({ mail: data.email, mdp: data.password }).then(() => {
        alert('Inscription réussie ! Vous pouvez vous connecter.');
        handleToggle();
      });
    }
  };

  const render = () => `
    <div class="auth-card">
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold text-slate-900">${isLogin ? 'Connexion' : 'Inscription'}</h2>
        <p class="text-slate-500 text-sm mt-2">
          ${isLogin ? 'Ravi de vous revoir !' : 'Rejoignez notre communauté.'}
        </p>
      </div>

      <form id="auth-form" class="space-y-4">
        <div class="form-group">
          <label class="form-label">Email</label>
          <input type="email" name="email" class="form-input" required placeholder="nom@exemple.com">
        </div>
        
        <div class="form-group">
          <label class="form-label">Mot de passe</label>
          <input type="password" name="password" class="form-input" required placeholder="••••••••">
        </div>

        <button type="submit" class="w-full btn-primary py-3">
          ${isLogin ? 'Se connecter' : "S'inscrire"}
        </button>
      </form>

      <div class="mt-6 text-center text-sm">
        <span class="text-slate-500">${isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"}</span>
        <button id="toggle-auth-mode" class="text-blue-600 font-semibold hover:underline ml-1">
          ${isLogin ? "Créer un compte" : "Se connecter"}
        </button>
      </div>
    </div>
  `;

  window.attachAuthEvents = () => {
    document.querySelector('#auth-form')?.addEventListener('submit', handleSubmit);
    document.querySelector('#toggle-auth-mode')?.addEventListener('click', handleToggle);
  };

  return render();
};

