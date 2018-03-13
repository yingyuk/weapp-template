const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  plugins: ['html'],
  settings: {
    'html/html-extensions': ['.html', '.wpy'],
  },
  globals: {
    wx: true,
  },
  rules: {
    indent: OFF,
    'arrow-parens': OFF,
    'no-debugger': process.env.NODE_ENV === 'production' ? ERROR : OFF,
    'import/no-unresolved': OFF,
    'import/extensions': OFF,
    'no-underscore-dangle': OFF,
    'import/prefer-default-export': OFF,
    'comma-dangle': OFF,
    'class-methods-use-this': WARNING,
    'no-trailing-spaces': OFF,
    'object-curly-newline': OFF,
    camelcase: WARNING,
    'no-param-reassign': WARNING,
    'no-const-assign': OFF,
  },
};
