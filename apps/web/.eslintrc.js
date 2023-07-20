module.exports = {
  root: true,
  extends: ['custom'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  /**
   * https://eslint.org/docs/latest/rules
   */
  rules: {
    '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }],
    // '@typescript-eslint/explicit-function-return-type': ['error', {
    //   'allowExpressions': false
    // }],
    'no-unused-vars': [
      'error',
      // 'warn',
      {
        vars: 'all',
        // args: 'after-used',
        args: 'none',
        ignoreRestSiblings: false,
      },
    ],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
  },
  overrides: [
    {
      // enable the rule specifically for TypeScript files
      files: ['*.tsx', '*.ts'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': ['off'],
      },
    },
  ],
}
