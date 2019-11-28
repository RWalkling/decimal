module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
    ],
    env: {
        node: true,
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module'
    },

    rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        // in order to cast values to any when TypeScript cannot yet infer that the types indeed match
        '@typescript-eslint/no-explicit-any': 'off',
        // because typescript is often unable to recognize that a null check has been made
        '@typescript-eslint/no-non-null-assertion': 'off',
    },
};
