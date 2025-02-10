import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import path from 'path';
import { fileURLToPath } from 'url';
import { includeIgnoreFile } from '@eslint/compat';

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname, // optional; default: process.cwd()
	resolvePluginsRelativeTo: __dirname, // optional
	recommendedConfig: js.configs.recommended, // optional unless you're using "eslint:recommended"
	allConfig: js.configs.all, // optional unless you're using "eslint:all"
});
const gitignorePath = path.resolve(__dirname, '.gitignore');

export default [
	{
		ignores: ['eslint.config.mjs'],
	},
	includeIgnoreFile(gitignorePath),
	...compat.config({
		env: {
			jest: true,
			node: true,
		},
		extends: [
			'eslint:recommended',
			'plugin:@typescript-eslint/recommended',
			'plugin:@typescript-eslint/recommended-requiring-type-checking',
			'plugin:import/recommended',
			'plugin:import/typescript',
			'plugin:prettier/recommended',
			'prettier',
		],
		ignorePatterns: ['.eslintrc.js'],
		parser: '@typescript-eslint/parser',
		parserOptions: {
			project: true,
			sourceType: 'module',
		},
		plugins: ['@typescript-eslint', 'prettier'],
		root: true,
		rules: {
			'@typescript-eslint/no-unsafe-enum-comparison': 'off',
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@typescript-eslint/interface-name-prefix': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-shadow': 'error',
			'import/extensions': ['error', 'never'],
			'import/no-cycle': 'off',
			'import/prefer-default-export': 'off',
			'max-classes-per-file': ['error', 2],
			'no-await-in-loop': 'off',
			'no-empty-function': 'off',
			'no-shadow': 'off',
			'no-useless-constructor': 'off',
			'no-underscore-dangle': [
				'error',
				{
					allow: ['_id'],
				},
			],
			'class-methods-use-this': [
				'error',
				{
					exceptMethods: ['main', 'getMe'],
				},
			],
			'import/no-extraneous-dependencies': [
				'error',
				{
					devDependencies: true,
				},
			],
		},
		settings: {
			'import/parsers': {
				'@typescript-eslint/parser': ['*.ts', '*.tsx', '*.js', '*.jsx'],
			},
			'import/resolver': {
				typescript: true,
				node: true,
			},
			react: {
				version: '999.999.999',
			},
		},
	}),
];
