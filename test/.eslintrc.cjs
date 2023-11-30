module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ['standard', 'plugin:vue/vue3-essential', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['vue'],
    rules: {
        // 4个空格
        indent: [
            'error',
            4,
            {
                SwitchCase: 1,
                ignoredNodes: ['ConditionalExpression']
            }
        ],
        // 不检查回调函数的字面量
        'n/no-callback-literal': 'off',
        // 变量声明后是否需要空一行
        'newline-after-var': 'off',
        // 文件以单一的换行符结束
        'eol-last': 'off',
        camelcase: 'warn',
        quotes: ['error', 'single'],
        'vue/multi-word-component-names': 'off',
        'prettier/prettier': ['error', { endOfLine: 'auto' }]
    }
}
