import { ProductService } from '../services/productService';

export const Dashboard = async () => {
  const products = await ProductService.getAll();

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

    document.querySelector('#modal-title').textContent = 'Modifier';
    document.querySelector('#product-modal').classList.remove('hidden');
  };

  window.handleDashboardDelete = (id) => {
    if (confirm('Supprimer ce produit ?')) {
      ProductService.delete(id).then(() => {
        window.dispatchEvent(new Event('popstate'));
      });
    }
  };

  window.attachDashboardEvents = () => {
    const modal = document.querySelector('#product-modal');
    const form = document.querySelector('#product-form');
    
    document.querySelector('#add-product-btn')?.addEventListener('click', () => {
      form.reset();
      form.id.value = '';
      document.querySelector('#modal-title').textContent = 'Nouveau Produit';
      modal.classList.remove('hidden');
    });

    document.querySelectorAll('.edit-btn').forEach(btn => 
      btn.addEventListener('click', () => window.handleDashboardEdit(btn.dataset.id))
    );

    document.querySelectorAll('.delete-btn').forEach(btn => 
      btn.addEventListener('click', () => window.handleDashboardDelete(btn.dataset.id))
    );

    document.querySelector('#close-modal')?.addEventListener('click', () => modal.classList.add('hidden'));
    document.querySelector('#cancel-modal')?.addEventListener('click', () => modal.classList.add('hidden'));

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

  return `
    <div class="max-w-6xl mx-auto">
      <div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <h1 class="text-4xl font-bold uppercase tracking-tighter">Dashboard</h1>
          <p class="text-slate-400 text-xs tracking-[0.3em] uppercase mt-2">Gestion des stocks</p>
        </div>
        <button id="add-product-btn" class="border border-black px-8 py-3 font-bold text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all">
          Ajouter
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Im.</th>
              <th>Nom</th>
              <th>Catégorie</th>
              <th>Prix</th>
              <th>Stock</th>
              <th class="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${products.map(p => `
              <tr>
                <td class="w-16">
                  <img src="${p.img}" class="w-10 h-10 object-cover grayscale">
                </td>
                <td class="font-bold uppercase text-[11px]">${p.titre}</td>
                <td class="text-slate-400 text-[10px] uppercase">${p.categorie}</td>
                <td class="font-medium text-xs">${p.prix.toFixed(2)}€</td>
                <td class="text-xs ${p.quantite < 5 ? 'text-red-500 font-bold' : 'text-slate-400'}">${p.quantite}</td>
                <td class="text-right flex items-center justify-end gap-4 py-4">
                  <button class="edit-btn text-[10px] font-bold uppercase hover:underline" data-id="${p.id}">Éditer</button>
                  <button class="delete-btn text-[10px] font-bold uppercase text-red-300 hover:text-black" data-id="${p.id}">&times;</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div id="product-modal" class="modal-overlay hidden">
      <div class="modal-content overflow-hidden">
        <div class="flex justify-between items-center mb-8">
          <h2 id="modal-title" class="text-xl font-bold uppercase tracking-tighter">Produit</h2>
          <button id="close-modal" class="text-2xl hover:text-slate-400">&times;</button>
        </div>
        <form id="product-form" class="space-y-6">
          <input type="hidden" name="id">
          
          <div class="grid grid-cols-2 gap-6">
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
            <textarea name="description" class="form-input h-20 resize-none" required></textarea>
          </div>

          <div class="grid grid-cols-3 gap-6">
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
              <input type="text" name="img" class="form-input" required>
            </div>
          </div>

          <div class="flex justify-end gap-6 pt-6 border-t border-slate-100">
            <button type="button" id="cancel-modal" class="text-xs uppercase font-bold tracking-widest text-slate-400 hover:text-black">Annuler</button>
            <button type="submit" class="border border-black px-8 py-2 font-bold text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all">Enregistrer</button>
          </div>
        </form>
      </div>
    </div>
  `;
};
