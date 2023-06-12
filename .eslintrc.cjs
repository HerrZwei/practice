/*
 * @Author: spOmwenda
 * @Date: 2023-06-12 11:35:24
 * @LastEditTime: 2023-06-12 14:17:13
 * @LastEditors: spOmwenda
 * @Description: desc
 * @FilePath: /practice/.eslintrc.cjs
 */
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    "vue/multi-word-component-names": ["error", {
      ignores: ["Editor"],
    }],
  },
}
