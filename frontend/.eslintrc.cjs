/* eslint-env node */
require(`@rushstack/eslint-patch/modern-module-resolution`)

module.exports = {
  root: true,
  'extends': [
    `plugin:vue/vue3-essential`,
    `eslint:recommended`,
    `@vue/eslint-config-typescript`,
    `@vue/eslint-config-prettier/skip-formatting`
  ],
  parserOptions: {
    ecmaVersion: `latest`
  },
  
  rules: {
    "quotes": [`error`, `backtick`],
    "semi": [`error`, `never`],
    'vue/multi-word-component-names': `off`,
  }
}
