/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {},
  // eslint-disable-next-line global-require
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['corporate'],
  },
};
