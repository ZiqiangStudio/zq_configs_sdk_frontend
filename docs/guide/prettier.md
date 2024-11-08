# 自强 Prettier Config

## 快速开始

自强 Prettier Config 是一套 `prettier` 配置，因此需要先安装 `prettier` 才能正常运行。

```
pnpm i -D @zqstudio/configs prettier
```

安装后可以参考 [Prettier 官网](https://prettier.io/docs/en/configuration#sharing-configurations) 进行配置。

::: code-group

```json [package.json]
...
  "prettier": "@zq/configs/prettier"
...
```

```js [prettier.config.mjs]
import config from '@zqstudio/configs/prettier';

export default config;
```

:::

::: warning
自强 Prettier Config 仅支持 `javascript` 格式的复用，暂不支持 `json` 格式的复用，即不支持 `.prettierrc` 格式的配置文件。
:::

之后可以添加 `format` 脚本在本地运行 Prettier，也可以使用 [ESLint](/guide/eslint) 自动规范代码，具体可以参考 [自强 ESLint Config](/guide/eslint)。

```json [package.json]
...
    "format": "prettier ."
...
```

## 扩展配置

扩展 Prettier 配置也非常简单。

```js [prettier.config.mjs]
import config from '@zqstudio/configs/prettier';

export default {
  ...config,
  singleQuote: false,
  printWidth: 120,
};
```

## Prettier 配置参考

```js
{
  // 一行最多 80 字符
  printWidth: 80,
  // 使用 2 个空格缩进
  tabWidth: 2,
  // 不使用缩进符，而使用空格
  useTabs: false,
  // 行尾需要有分号
  semi: true,
  // 使用单引号
  singleQuote: true,
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // 末尾需要有逗号
  trailingComma: 'all',
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  // jsx 标签的反尖括号需要换行
  bracketSameLine: false,
  // 箭头函数，只有一个参数的时候，也需要括号
  arrowParens: 'always',
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准
  proseWrap: 'preserve',
  // 解决 Vue 代码中 html 缩进问题
  htmlWhitespaceSensitivity: 'ignore',
  // vue 文件中的 script 和 style 内不用缩进
  vueIndentScriptAndStyle: false,
  // 换行符使用 lf
  endOfLine: 'lf',
  // 格式化内嵌代码
  embeddedLanguageFormatting: 'auto',
}
```
