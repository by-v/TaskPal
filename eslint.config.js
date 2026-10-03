import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  prettier,
  {
    ignores: ['node_modules/**', 'dist/**', 'workspace/**'],
  },
  {
    files: ['client/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    files: ['server/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
];
