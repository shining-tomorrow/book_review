/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './const.ts'],
  theme: {
    extend: {
      colors: {
        lineColor: '#d4d8e9',
        buttonColor: '#0c1325',
      },
      spacing: {
        'header-height': '48px',
        'desktop-header-height': '56px',
        'bottom-nav-height': '60px',
      },
    },
  },
  plugins: [],
};
