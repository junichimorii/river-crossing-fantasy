/**
 * .eslint.js
 *
 * ESLint configuration file.
 */

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
  ],
  plugins: [
    'import',
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type'
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        },
      },
    ],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports'
      }
    ],
  },
  ignorePatterns: [
    'dev-dist',
    'docs'
  ]
}
