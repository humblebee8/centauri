const path = require('path');

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('tailwindcss/nesting'),
    require('autoprefixer'),
    require('postcss-preset-env')
  ]
};