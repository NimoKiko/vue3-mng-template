# 配置部分

## 1. Eslint配置

- 作用：对代码按一定规则进行校验
- 安装：npm i eslint -D
- 生成eslint配置文件：npx eslint --init
- 生成完后会生成一个 .eslintrc.cjs 文件

### 1.1 Vue3环境代码校验插件

```
# 让所有与prettier规则冲突的Eslint rules失效，并使用prettier进行代码检查
"eslint-config-prettier"
"eslint-plugin-import"
"eslint-plugin-node"
# 运行更漂亮的Eslint，使prettier规则优先级更高，Eslint优先级低
"eslint-plugin-prettier"
# Vue.js的Eslint插件(查找vue语法错误，发现错误指令，查找违规风格指南)
"eslint-plugin-vue"
# 该解析器允许使用Eslint校验所有babel code
"@babel/eslint-parser"
```

### 1.2 安装指令：

```
npm i -D eslint-plugin-import eslint-plugin-vue eslint-plugin-node eslint-plugin-prettier eslint-config-prettier @babel/eslint-parser
```

### 1.3 Eslint 忽略文件：

```
在根目录下创建文件：.eslintignore，把不需要检查的文件写入该文件内
dist
node_modules
```

### 1.4 修改.eslintrc.cjs 配置文件

```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-essential',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  // 指定如何解析语法
  parser: 'vue-eslint-parser',
  // 优先级低于parser的语法解析配置
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true,
    },
  },
  // 继承已有的规则
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-essential',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'vue'],
  /**
   * "off" 或 0 - 关闭规则
   * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
   * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
   */
  rules: {
    // eslint(https://eslint.bootcss.com/docs/rules/)
    'no-var': 'error', // 禁止使用var
    'no-multiple-empty-lines': ['warn', { max: 1 }], // 禁止出现多行空行
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 禁止console
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 禁止debugger
    'no-unexpected-multiline': 'error', // 禁止出现令人困惑的多行表达式
    'no-useless-escape': 'off', // 禁用不必要的转义字符

    // typescript(https://typescript-eslint.io/rules)
    '@typescript-eslint/no-unused-vars': 'off', // 禁止定义未使用的变量
    '@typescript-eslint/prefer-ts-expect-error': 'error', // 禁止使用 @ts-expect-error 代替 @ts-ignore
    '@typescript-eslint/no-explicit-any': 'off', // 禁止使用any类型
    '@typescript-eslint/no-non-null-assertion': 'off', // 禁止使用非空断言
    '@typescript-eslint/no-namespace': 'off', // 禁止使用命名空间
    '@typescript-eslint/semi': 'off', // 禁止使用分号

    // eslint-plugin-vue(https://eslint.vuejs.org/rules/)
    'vue/multi-word-component-names': 'off', // 组件名始终为 " - " 连接的单词
    'vue/script-setup-uses-vars': 'error', // 检查 <script setup> 中的变量是否被使用
    'vue/no-mutating-props': 'off', // 禁止修改 props
    'vue/attribute-hyphenation': 'off', // 组件属性名始终为 " - " 连接的单词
  },
}
```

### 1.5 运行脚本

package.json新增两个运行脚本

```
"script": {
    'lint': "eslint src",
    'fix': "eslint src --fix"

}
```

## 2. prettier配置

eslint是针对js的检测语法的工具，包含js语法以及少部分的格式化问题。

prettier属于格式化工具，prettier支持包含js在内的多种语言。

eslint和prettier一个保证js代码质量，一个保证代码美观。

### 2.1 安装依赖包

```
npm i -D prettier
```

### 2.2 .prettierrc.json添加规则

```json
{
  "singleQuote": true,
  "semi": false,
  "bracketSpacing": true,
  "htmlWhitespaceSensitivity": "ignore",
  "endOfLine": "auto",
  "trailingComma": "all",
  "tabWidth": 2
}
```

### 2.3 prettier忽略文件 .prettierignore

```
/dist/*
/html/*
.local
/node_modules/**
**/*.svg
**/*.sh
/public/*
```

## 3. 配置husky

上面已经配置好了代码检验工具，但是每次需要手动执行才能执行格式化代码。

使用husky可以在提交代码前触发git hook，然后执行npm run format 来自动格式化代码

- 安装husky

```
npm i -D husky
```

- 生成配置文件

```
npx husky-init
```

会在根目录下生成一个.husky目录，其中会有一个pre-commit文件，这个文件会在执行git commit的时候执行。

在.husky/pre-coomit 文件添加如下命令：

```
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
 要执行的npm代码 eg: npm run fix
```

**Tips: 需要在项目本地git init才行，此模板就不做配置**

## 4. 强制使用npm包管理器工具

在根目录创建scripts/preinstall.js文件，添加下面的内容

```js
if (!/npm/.test(process.env.npm_execpath || '')) {
  console.warn(
    `\u001b[33mThis repository must using npm as the package manager ` +
      ` for scripts to work properly.\u001b[39m\n`,
  )
  process.exit(1)
}
```

配置命令

```json
"scripts": {
  "preinstall": "node .scripts/preinstall.js"
}
```

如此一来，当我们使用其他包管理工具的时候就会报错。

# 项目集成

## 1. 集成Element-Plus

安装：

```
npm i element-plus @element-plus/icons-vue
```

入口文件main.ts全局安装element-plus，并设置语言为中文

```ts
// 导入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 导入element-plus的中文包
import { zhCn } from 'element-plus/es/locales.mjs'
// 使用element-plus
app.use(ElementPlus, {
  locale: zhCn, //element-plus使用中文
})
```

## 2. 配置环境变量

**项目开发过程中，至少会经历开发环境，测试环境和生产环境三个阶段。不同阶段请求的状态不尽相同，若手动切换接口地址容易出错，于是配置环境变量的需求就应运而生。**

开发环境（development）
开发时使用的化境，每位开发人员在自己的dev分支上工作，开发到一定程度，由负责人合并代码，进行联调。

测试环境（testing）
负责测试的同时工作的环境，一般由测试的同事自己部署，然后在测试环境进行测试。

生产环境（production）
生产环境指的是正式对外提供服务，一般会关掉错误报告，打开错误日志。（正式提供给用户使用的环境）

注意：一般情况下，一个环境对应一台服务器，也有的公司开发与测试的环境是一台服务器。

项目根目录根分别添加开发、测试和生产环境的文件

```
.env.development
.env.production
.env.test
```

文件内容

```ts
# 变量必须以VITE_开头才能暴露给外部读取
# 开发环境
NODE_ENV = 'development'
VITE_APP_TITLE = '管理后台'
VITE_APP_BASE_API = '/api'
VITE_SERVE = "http://localhost:3000"
```

```ts
# 生产环境
NODE_ENV = 'production'
VITE_APP_TITLE = '管理后台'
VITE_APP_BASE_API = '/prod-api'
VITE_SERVE = "http://localhost:3000"
```

```ts
# 测试环境
NODE_ENV = 'test'
VITE_APP_TITLE = '管理后台'
VITE_APP_BASE_API = '/test-api'
VITE_SERVE = "http://localhost:3000"
```

配置运行命令：package.json

```json
"scripts": {
  "build:test": "vue-tsc && vite build --mode test",
  "build:pro": "vue-tsc && vite build --mode production",
}
```

通过import.meta.env获取环境变量

## 3. 集成less

安装命令：

```
npm i less less-loader --save
```

## 4. axios二次封装

在开发项目的时候，前后端一定会进行交互，此时需要使用axios进行网络请求。

在开发中我们一般会对axios进行二次封装。

安装命令：

```
npm i axios
```

目的：

1. 使用请求拦截其，可以在请求拦截器中处理一些业务（开始进度条、请求头携带公共参数等...）

2. 使用响应拦截器，可以在响应拦截器中处理一些业务（进度条结束、简化服务器返回的数据、处理http网络错误等...）

在根目录中创建utils/request.ts

```ts
// 导入axios
import axios from 'axios'
import { ElMessage } from 'element-plus'

const request = axios.create({
  // 配置基础路径
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000, // 请求超时
})
// 请求拦截器
request.interceptors.request.use((config) => {
  // config配置对象，headers属性请求头，经常给服务器端携带公共参数
  // 返回配置对象
  return config
})

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 简化数据
    return response.data
  },
  (error) => {
    // 定义一个变量：存储网络错误信息
    let message = ''
    // http状态码
    let status = error.response.status
    switch (status) {
      case 401:
        message = 'TOKEN过期'
        break
      case 403:
        message = '你无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器出现问题'
      default:
        message = '网络出现问题'
        break
    }
    // 提示错误信息
    ElMessage({
      type: 'error',
      message,
    })

    // 错误处理
    return Promise.reject(error)
  },
)

// 对外暴露
export default request
```
