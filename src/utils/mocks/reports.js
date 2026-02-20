export const MOCK_REPORTS = {
  reports: [
    { directive: 'script-src', blockedUri: 'http://hacker-cdn.com/xss-payload.js', timestamp: new Date().toISOString() },
    { directive: 'frame-ancestors (CRITICAL)', blockedUri: 'http://evil-iframe.org/clickjacking-attempt', timestamp: new Date().toISOString() },
    { directive: 'connect-src', blockedUri: 'ws://botnet-controller.io/socket', timestamp: new Date().toISOString() }
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
