module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-underscore-dangle': 'off',
    'no-undef': 'off',
    'func-names': 'off',
    'no-console': 'off',
    'no-irregular-whitespace': 'off',
    'consistent-return': 'off',
  },
};
