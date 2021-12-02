module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.{scss,sass,css}', './src/**/*.{astro,js,jsx,ts,tsx,vue,svelte,scss,sass,css}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'astro': '#000014',
        'centauri': '#40167e'
      }
    },
  },
  plugins: [],
}