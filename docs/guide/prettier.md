# 自强 Prettier Config

## 快速开始

自强 Prettier Config 是一套 `prettier` 配置，因此需要先安装 `prettier` 才能正常运行。

```
pnpm i -D @zqstudio/configs prettier
```

安装后可以参考 [Prettier 官网](https://prettier.io/docs/en/configuration#sharing-configurations) 进行配置。

::: code-group

```js [prettier.config.mjs]
import config from '@zqstudio/configs/prettier';

export default config;
```

:::

::: warning
自强 Prettier Config 仅支持 `javascript` 格式的复用，暂不支持 `json` 格式的复用，即不支持 `.prettierrc` 格式的配置文件。
:::

之后可以添加 `format` 脚本在本地运行 Prettier，也可以使用 [ESLint](./eslint) 自动规范代码，具体可以参考 [自强 ESLint Config](./eslint)。

::: code-group

```json [package.json]
...
    "format": "prettier ."
...
```

:::

## 扩展配置

扩展 Prettier 配置也非常简单。

::: code-group

```js [prettier.config.mjs]
import config from '@zqstudio/configs/prettier';

export default {
  ...config,
  singleQuote: false,
  printWidth: 120,
};
```

:::

## Prettier 配置参考

<<< @/../src/prettier/index.ts
