const path = require('path');

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['react'],
  extends: ['react-app'],
  settings: {
    react: {
      version: 'detect',
    },
    // Resolve the eslint-plugin-react path to a single instance
    'import/resolver': {
      node: {
        paths: [path.resolve(__dirname, 'node_modules')],
      },
    },
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      rules: {
        // You can customize TypeScript specific rules here
      },
    },
  ],
}; 