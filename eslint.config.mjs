import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        // project: true is deliberately absent.
        // Type-aware lint rules require per-package tsconfig.json.
        // Will be added in Task 2 (packages/shared) and Task 5 (apps/api).
      },
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
    },
  },
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      '.next/**',
      'apps/**',
      'packages/**',
    ],
  },
];
