module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-custom`
  extends: ['custom'],
  settings: {
    next: {
      rootDir: ['apps/*/'],
    },
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  plugins: ['@typescript-eslint', 'react'],
  /**
   * https://eslint.org/docs/latest/rules
   */
  rules: {
    '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }],
    'no-unused-vars': [
      'error',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: false },
    ],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
  },
  overrides: [
    {
      // enable the rule specifically for TypeScript files
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'error',
      },
    },
  ],
}
