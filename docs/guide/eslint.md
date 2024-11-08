# 自强 ESLint Config

## 快速开始

自强 ESLint Config 是一套 `eslint` 配置，因此需要先安装 `eslint` 才能正常运行。

```
pnpm i -D @zqstudio/configs eslint
```

之后在项目中编写 `eslint.config.mjs` 配置文件和 `lint` 脚本即可。

::: code-group

```js [eslint.config.mjs]
import { config } from '@zqstudio/configs/eslint';

export default config();
```

```json [package.json]
...
    "lint": "eslint ."
...
```

:::

现在在命令行中运行 `pnpm lint` 就可以检查本地代码了🎉

### 相关插件安装

开启 ESLint 相关插件需要先安装对应的依赖。

| 插件       | 依赖                   |
| ---------- | ---------------------- |
| Prettier   | `pnpm i -D pretter`    |
| TypeScript | `pnpm i -D typescript` |

## 配置

### `config`

[`config`](/api/configs.config) 函数用于创建一个定制化的 ESLint 配置，支持 Vue、TypeScript、Prettier、SonarJS 以及自动导入等功能。

::: warning
目前自强 ESLint 配置仅支持扁平模式（Flat Config）。
:::

#### 参数

- [`ZqEslintConfigOptions`](/api/configs.zqeslintconfigoptions)：一个对象，包含用于定制 ESLint 配置的选项。

#### 返回值

- 返回一个数组，包含 ESLint 的配置规则和插件。

### 示例

#### 纯 TS 项目

```js
import { config } from '@zqstudio/configs/eslint';

export default config({
  vue: false,
  ts: true,
  autoImport: {
    path: './config/.eslintrc-auto-import.json',
  },
  ignores: ['target/**'],
});
```

这个示例展示了一个用于纯 TS 项目的 ESLint 配置，
开启了 TypeScript 支持，同时启用了自动导入插件，
并指定了自定义的自动导入配置文件路径和忽略目录。

#### 扩展配置

```js
import { config } from '@zqstudio/configs/eslint';
import jest from 'eslint-plugin-jest';

export default [
  {
    files: ['test/**'],
    ...jest.configs['flat/recommended'],
    rules: {
      ...jest.configs['flat/recommended'].rules,
      'jest/prefer-expect-assertions': 'off',
    },
  },
  ...config(),
];
```

这个示例添加了一个自强 ESLint 配置所不支持的插件 `eslint-plugin-jest`，同时开启了自强 ESLint 的默认配置。
