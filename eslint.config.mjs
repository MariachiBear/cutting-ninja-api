import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
   baseDirectory: __dirname,
   recommendedConfig: js.configs.recommended,
   allConfig: js.configs.all,
});

export default [
   {
      ignores: ['**/.eslintrc.js'],
   },
   ...fixupConfigRules(
      compat.extends(
         'airbnb',
         'eslint:recommended',
         'plugin:@typescript-eslint/recommended',
         'plugin:prettier/recommended',
         'prettier',
         'plugin:import/typescript',
      ),
   ),
   {
      plugins: {
         '@typescript-eslint': fixupPluginRules(typescriptEslint),
         prettier: fixupPluginRules(prettier),
      },

      languageOptions: {
         globals: {
            ...globals.jest,
            ...globals.node,
         },

         parser: tsParser,
         ecmaVersion: 5,
         sourceType: 'module',

         parserOptions: {
            project: 'tsconfig.json',
         },
      },

      settings: {
         'import/resolver': {
            typescript: {},
         },

         react: {
            version: '999.999.999',
         },
      },

      rules: {
         '@typescript-eslint/explicit-function-return-type': 'off',
         '@typescript-eslint/explicit-module-boundary-types': 'off',
         '@typescript-eslint/interface-name-prefix': 'off',
         '@typescript-eslint/no-explicit-any': 'off',
         '@typescript-eslint/no-shadow': 'error',
         'no-empty-function': 'off',

         'class-methods-use-this': [
            'error',
            {
               exceptMethods: ['main', 'getMe'],
            },
         ],

         'import/extensions': ['error', 'never'],
         'import/no-cycle': 'off',

         'import/no-extraneous-dependencies': [
            'error',
            {
               devDependencies: true,
            },
         ],

         'import/prefer-default-export': 'off',
         'max-classes-per-file': ['error', 2],
         'no-await-in-loop': 'off',
         'no-shadow': 'off',

         'no-underscore-dangle': [
            'error',
            {
               allow: ['_id'],
            },
         ],

         'no-useless-constructor': 'off',
      },
   },
];
