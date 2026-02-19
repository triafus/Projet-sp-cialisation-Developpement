import { ReportService } from '../services/reportService';

export const Stats = async () => {
  const stats = await ReportService.getStats().then(data => data || { categories: [], global: { totalItems: 0, totalValue: 0 } });

  return `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold text-slate-900">Analyse du Catalogue</h1>
        <p class="text-slate-500 mt-1">Indicateurs de performance et répartition des stocks.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p class="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Articles</p>
            <h3 class="text-3xl font-black text-slate-900 mt-1">${stats.global.totalItems}</h3>
          </div>
          <div class="bg-blue-50 text-blue-600 p-4 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
        </div>

        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p class="text-sm font-bold text-slate-500 uppercase tracking-wider">Valeur du Stock</p>
            <h3 class="text-3xl font-black text-slate-900 mt-1">${stats.global.totalValue.toLocaleString('fr-FR')} €</h3>
          </div>
          <div class="bg-green-50 text-green-600 p-4 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="admin-table-container">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Catégorie</th>
              <th>Nombre de Références</th>
              <th class="text-right">Prix Moyen</th>
            </tr>
          </thead>
          <tbody>
            ${stats.categories.length > 0
              ? stats.categories.map(c => `
                <tr class="hover:bg-slate-50 transition-colors">
                  <td class="font-bold text-slate-800">${c.nom}</td>
                  <td><span class="badge-category">${c.count} items</span></td>
                  <td class="text-right font-medium text-slate-900">${c.avgPrice.toFixed(2)} €</td>
                </tr>
              `).join('')
              : `<tr><td colspan="3" class="text-center py-10 text-slate-400 italic">Aucune donnée disponible.</td></tr>`
            }
          </tbody>
        </table>
      </div>
    </div>
  `;
};
