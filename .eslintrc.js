module.exports = {
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  extends: ['airbnb', 'prettier', 'airbnb-typescript'],
  env: {
    browser: true,
    commonjs: true,
    node: true,
    jest: true,
  },
  rules: {
    'react/forbid-prop-types': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'no-plusplus': 'off',
    'no-underscore-dangle': 'off',
    'jsx-a11y/label-has-for': 'off',
    'import/prefer-default-export': 'off',

    quotes: [
      'error',
      'single',
      {
        allowTemplateLiterals: true,
      },
    ],
  },
};
