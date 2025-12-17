module.exports = {
  extend: [
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier'
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
    // 'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn', // 或者 'off' 来完全关闭
      {
        // 允许函数参数可以不使用，例如在 Vue 的 setup 或生命周期钩子中
        argsIgnorePattern: '^_'

        // 忽略所有以 'x' 开头的变量（如果您真的需要这样做）
        // 'varsIgnorePattern': 'x'
      }
    ]
  }
}
