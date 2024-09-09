import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: true,
});

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ts.configs.recommended,
      ,
      ...tseslint.configs.recommended,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      prettier: 'eslint-plugin-prettier',
      import: 'eslint-plugin-import',
      react: react,
      'react-hooks': reactHooks,
      'react-refresh': 'eslint-plugin-react-refresh',
      'simple-import-sort': simpleImportSort,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
);
