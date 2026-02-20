import { ReportService } from '../services/reportService';

export const CSPReports = async () => {
  const data = await ReportService.getCSPReports();
  const reports = data?.reports || [];

  return `
    <div class="space-y-6">
      <div>
        <h1 class="text-3xl font-bold text-slate-900 border-l-4 border-slate-800 pl-4">Rapports de Sécurité (CSP)</h1>
        <p class="text-slate-500 mt-2 ml-5">Journal des violations de la politique de sécurité du contenu.</p>
      </div>

      <div class="admin-table-container shadow-sm">
        <table class="admin-table">
          <thead>
            <tr class="bg-slate-800">
              <th class="text-white">Directive Violée</th>
              <th class="text-white">URI Bloqué</th>
              <th class="text-white">Date de l'incident</th>
            </tr>
          </thead>
          <tbody>
            ${reports.length > 0 
              ? reports.map(r => `
                <tr class="hover:bg-slate-50 transition-colors">
                  <td class="font-mono text-xs text-red-600 font-bold">${r.directive}</td>
                  <td class="text-xs text-slate-600 break-all">${r.blockedUri}</td>
                  <td class="text-xs text-slate-400 font-sans italic">${new Date(r.timestamp).toLocaleString('fr-FR')}</td>
                </tr>
              `).join('')
              : `<tr><td colspan="3" class="text-center py-12 text-slate-400 italic">Aucun incident de sécurité rapporté.</td></tr>`
            }
          </tbody>
        </table>
      </div>
    </div>
  `;
};
