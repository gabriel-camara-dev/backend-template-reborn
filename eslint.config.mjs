import pluginJs from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginImport from 'eslint-plugin-import'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import unicorn from 'eslint-plugin-unicorn'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
  {
    ignores: ['dist', 'node_modules', 'coverage', 'logs', 'src/@types/prisma', 'ecosystem.config.js'],
  },
  {
    files: ['src/**/*.{js,mjs,cjs,ts}', 'spec/**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      globals: globals.node,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.strict,
  eslintConfigPrettier,
  {
    plugins: {
      prettier: eslintPluginPrettier,
      unicorn,
      import: eslintPluginImport,
    },
    rules: {
      semi: ['error', 'never'],
      'prettier/prettier': 'error',
      'no-console': 'error',
      '@typescript-eslint/no-extraneous-class': 'off',
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
        },
      ],
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  {
    files: ['prisma/**/*.{js,ts}', 'src/env/index.ts'],
    rules: {
      'no-console': 'off',
    },
  },
]
