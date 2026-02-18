import { ProductService } from '../services/productService';

export const Dashboard = async () => {
  const products = await ProductService.getAll();

  const handleEdit = (id) => {
    console.log('Edit product', id);
  };

  const handleDelete = (id) => {
    if (confirm('Voulez-vous vraiment supprimer ce produit ?')) {
      ProductService.delete(id).then(() => {
        window.dispatchEvent(new Event('popstate'));
      });
    }
  };

  const render = () => `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-slate-900">Dashboard Admin</h1>
          <p class="text-slate-500">Gérez votre catalogue de produits.</p>
        </div>
        <button id="add-product-btn" class="btn-primary flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Nouveau Produit
        </button>
      </div>

      <div class="admin-table-container">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Produit</th>
              <th>Catégorie</th>
              <th>Prix</th>
              <th>Stock</th>
              <th class="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${products.map(p => `
              <tr>
                <td>
                  <div class="flex items-center gap-3">
                    <img src="${p.img}" class="w-10 h-10 rounded-lg object-cover border border-slate-100">
                    <span class="font-semibold text-slate-800">${p.titre}</span>
                  </div>
                </td>
                <td><span class="badge-category">${p.categorie}</span></td>
                <td><span class="font-medium">${p.prix} €</span></td>
                <td>
                  <span class="${p.quantite > 0 ? 'text-green-600' : 'text-red-500'} font-medium">
                    ${p.quantite}
                  </span>
                </td>
                <td class="text-right space-x-2">
                  <button onclick="handleDashboardEdit('${p.id}')" class="text-blue-600 hover:text-blue-800 font-medium">Modifier</button>
                  <button onclick="handleDashboardDelete('${p.id}')" class="text-red-600 hover:text-red-800 font-medium">Supprimer</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Form (Hidden by default) -->
    <div id="product-modal" class="modal-overlay hidden">
      <div class="modal-content">
        <div class="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h2 id="modal-title" class="text-xl font-bold text-slate-900">Ajouter un produit</h2>
          <button id="close-modal" class="text-slate-400 hover:text-slate-600 font-sans text-2xl">&times;</button>
        </div>
        <form id="product-form" class="p-6 space-y-4">
          <input type="hidden" name="id">
          <div class="grid grid-cols-2 gap-4">
            <div class="form-group">
              <label class="form-label">Titre</label>
              <input type="text" name="titre" class="form-input" required>
            </div>
            <div class="form-group">
              <label class="form-label">Catégorie</label>
              <input type="text" name="categorie" class="form-input" required>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Description</label>
            <textarea name="description" class="form-input h-24 resize-none" required></textarea>
          </div>
          <div class="grid grid-cols-3 gap-4">
            <div class="form-group">
              <label class="form-label">Prix (€)</label>
              <input type="number" name="prix" step="0.01" class="form-input" required>
            </div>
            <div class="form-group">
              <label class="form-label">Stock</label>
              <input type="number" name="quantite" class="form-input" required>
            </div>
            <div class="form-group">
              <label class="form-label">Image (URL)</label>
              <input type="text" name="img" class="form-input" placeholder="https://..." required>
            </div>
          </div>
          <div class="flex justify-end gap-3 pt-4">
            <button type="button" id="cancel-modal" class="px-6 py-2 rounded-lg font-semibold text-slate-600 hover:bg-slate-100 transition-all">Annuler</button>
            <button type="submit" class="btn-primary px-8">Enregistrer</button>
          </div>
        </form>
      </div>
    </div>
  `;

  window.handleDashboardEdit = (id) => {
    const p = products.find(prod => String(prod.id) === String(id));
    if (!p) return;
    
    const form = document.querySelector('#product-form');
    form.id.value = p.id;
    form.titre.value = p.titre;
    form.categorie.value = p.categorie;
    form.description.value = p.description;
    form.prix.value = p.prix;
    form.quantite.value = p.quantite;
    form.img.value = p.img;

    document.querySelector('#modal-title').textContent = 'Modifier le produit';
    document.querySelector('#product-modal').classList.remove('hidden');
  };

  window.handleDashboardDelete = (id) => handleDelete(id);

  window.attachDashboardEvents = () => {
    const modal = document.querySelector('#product-modal');
    const form = document.querySelector('#product-form');
    const addBtn = document.querySelector('#add-product-btn');
    const closeBtn = document.querySelector('#close-modal');
    const cancelBtn = document.querySelector('#cancel-modal');

    addBtn?.addEventListener('click', () => {
      form.reset();
      form.id.value = '';
      document.querySelector('#modal-title').textContent = 'Ajouter un produit';
      modal.classList.remove('hidden');
    });

    [closeBtn, cancelBtn].forEach(btn => 
      btn?.addEventListener('click', () => modal.classList.add('hidden'))
    );

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      const id = data.id;
      
      const action = id 
        ? ProductService.update(id, data) 
        : ProductService.create(data);

      action.then(() => {
        modal.classList.add('hidden');
        window.dispatchEvent(new Event('popstate'));
      });
    });
  };

  return render();
};
