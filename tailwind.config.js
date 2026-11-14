/** Tailwind-config van de Pareto Partners-website. Bouwen: npm run build:css */
module.exports = {
  content: ['./index.html', './privacy-policy.html', './terms-of-service.html'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'sans-serif'] },
      colors: { navy: '#0f2a4a', blauw: '#1e5bff', muted: '#6b7aad', licht: '#F1F3F7', ijs: '#EBF3FF' },
    },
  },
};
