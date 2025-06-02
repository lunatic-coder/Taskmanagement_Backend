// eslint.config.js
import eslintPluginImport from 'eslint-plugin-import';
import typescript from '@typescript-eslint/eslint-plugin';

export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      sourceType: 'module'
    },
    plugins: {
      import: eslintPluginImport,
      '@typescript-eslint': typescript
    },
    rules: {
      'import/no-unresolved': 'error',
      'import/order': ['warn', { groups: [['builtin', 'external', 'internal']] }],
      '@typescript-eslint/no-unused-vars': ['warn']
    }
  }
];
