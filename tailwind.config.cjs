module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0a0a14',
        accent: '#f97316',
        card: '#1a1a2e',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
      },
      borderRadius: {
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
};

