module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
    ],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
        ecmaFeatures: {
            jsx: true
        }
    },
    rules: {
        quotes: ['error', 'single', { avoidEscape: true }],
        '@typescript-eslint/explicit-function-return-type': 'off',
        'react/prop-types': 'off',
        'react/display-name': 'off'
    },
};
