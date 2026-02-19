export const MOCK_REPORTS = {
  reports: [
    { directive: 'script-src', blockedUri: 'http://malicious-site.com/script.js', timestamp: new Date().toISOString() },
    { directive: 'img-src', blockedUri: 'https://untracked-ads.net/pixel.gif', timestamp: new Date().toISOString() }
  ]
};

export const MOCK_STATS = {
  categories: [
    { nom: 'Électronique', count: 12, avgPrice: 299.99 },
    { nom: 'Vêtements', count: 45, avgPrice: 35.50 },
    { nom: 'Maison', count: 8, avgPrice: 120.00 }
  ],
  global: { totalItems: 65, totalValue: 5800.50 }
};
