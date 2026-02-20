import { ReportService } from '../services/reportService';

export const CSPReports = async () => {
  const reports = await ReportService.getCSPReports();

  return `
    <div class="max-w-6xl mx-auto">
      <div class="mb-16">
        <h1 class="text-4xl font-bold uppercase tracking-tighter text-slate-200">Security Reports</h1>
        <p class="text-[10px] uppercase tracking-[0.4em] text-slate-400 mt-2">CSP Audit Logs</p>
      </div>

      <div class="overflow-x-auto">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Cible</th>
              <th>Type</th>
              <th>Date</th>
              <th class="text-right">Gravité</th>
            </tr>
          </thead>
          <tbody>
            ${reports.length > 0 ? reports.map(r => `
              <tr>
                <td class="font-mono text-[10px] text-slate-500 truncate max-w-[200px]">${r.document_uri}</td>
                <td class="font-bold text-xs uppercase tracking-tight">${r.violated_directive}</td>
                <td class="text-slate-400 text-[10px]">${new Date().toLocaleDateString()}</td>
                <td class="text-right">
                  <span class="text-[9px] font-black uppercase text-red-400 border border-red-100 px-2 py-0.5">High</span>
                </td>
              </tr>
            `).join('') : '<tr><td colspan="4" class="text-center py-20 text-slate-300 uppercase text-xs tracking-widest italic">Aucun incident détecté</td></tr>'}
          </tbody>
        </table>
      </div>
    </div>
  `;
};
