module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'astro': '#000014',
        'centauri': '#40167e'
      }
    }
  }
};