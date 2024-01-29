module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-essential",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  // 指定如何解析语法
  parser: "vue-eslint-parser",
  // 优先级低于parser的语法解析配置
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
    jsxPragma: "React",
    ecmaFeatures: {
      jsx: true,
    },
  },
  // 继承已有的规则
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-essential",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint", "vue"],
  /**
   * "off" 或 0 - 关闭规则
   * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
   * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
   */
  rules: {
    // eslint(https://eslint.bootcss.com/docs/rules/)
    "no-var": "error", // 禁止使用var
    "no-multiple-empty-lines": ["warn", { max: 1 }], // 禁止出现多行空行
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 禁止console
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off", // 禁止debugger
    "no-unexpected-multiline": "error", // 禁止出现令人困惑的多行表达式
    "no-useless-escape": "off", // 禁用不必要的转义字符

    // typescript(https://typescript-eslint.io/rules)
    "@typescript-eslint/no-unused-vars": "off", // 禁止定义未使用的变量
    "@typescript-eslint/prefer-ts-expect-error": "error", // 禁止使用 @ts-expect-error 代替 @ts-ignore
    "@typescript-eslint/no-explicit-any": "off", // 禁止使用any类型
    "@typescript-eslint/no-non-null-assertion": "off", // 禁止使用非空断言
    "@typescript-eslint/no-namespace": "off", // 禁止使用命名空间
    "@typescript-eslint/semi": "off", // 禁止使用分号

    // eslint-plugin-vue(https://eslint.vuejs.org/rules/)
    "vue/multi-word-component-names": "off", // 组件名始终为 " - " 连接的单词
    "vue/script-setup-uses-vars": "error", // 检查 <script setup> 中的变量是否被使用
    "vue/no-mutating-props": "off", // 禁止修改 props
    "vue/attribute-hyphenation": "off", // 组件属性名始终为 " - " 连接的单词
  },
};
