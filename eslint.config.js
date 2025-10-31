// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import preferArrowFunctions from 'eslint-plugin-prefer-arrow-functions';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config({ ignores: ['dist'] }, {
  extends: [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    importPlugin.flatConfigs.recommended,
  ],
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
    'simple-import-sort': simpleImportSort,
    'prefer-arrow-functions': preferArrowFunctions,
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.app.json',
      },
      node: {
        paths: ['public'],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.svg', '.png', '.jpg', '.gif']
      }
    },
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': [
      'error',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    ES6PreferShortImport: 'off',
    'no-restricted-imports': 'error',
    'prefer-arrow-functions/prefer-arrow-functions': [
      'error',
      {
        classPropertiesAllowed: false,
        disallowPrototype: false,
        returnStyle: 'unchanged',
        singleReturnOnly: false,
      },
    ],
    'no-undef': 'error',
    'no-unused-vars': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    'no-var': 'error',
    eqeqeq: 'error',
    'no-else-return': 'error',
    'prefer-arrow-callback': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // 1. Side effect imports
          ['^\\u0000'],
          // 2. React and packages
          ['^react$', '^@?\\w'],
          // 3. Absolute imports and anything not matched in another group
          ['^@', '^'],
          // 4. relative imports
          ['^\\./', '^\\.\\./'],
          [
            // 5. media imports
            '^.+\\.(gif|png|svg|jpg)$',
          ],
        ],
      },
    ],
    'import/no-unresolved': 'error',
    'import/no-duplicates': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-cycle': 'error',
    'import/no-self-import': 'error',
    'import/no-useless-path-segments': 'error',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
}, storybook.configs["flat/recommended"]);