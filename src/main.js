import './style.css';

const app = document.querySelector('#app');

app.innerHTML = `
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-blue-600 mb-4">LSA E-commerce</h1>
      <p class="text-lg text-gray-600">Structure initialisée avec succès (Vite + Tailwind + JS Vanille)</p>
      <div class="mt-8 p-4 bg-white shadow-lg rounded-lg">
        <p class="text-sm font-medium">Phase 1 : Structure des dossiers en cours...</p>
      </div>
    </div>
  </div>
`;

console.log('Application initialisée');
