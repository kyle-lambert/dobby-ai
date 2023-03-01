const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  plugins: [
    require('@tailwindcss/forms'),
    plugin(({ addVariant, e }) => {
      addVariant('sidebar-expanded', ({ modifySelectors, separator }) => {
        modifySelectors(
          ({ className }) => `.sidebar-expanded .${e(`sidebar-expanded${separator}${className}`)}`
        );
      });
    }),
  ],
};
