# 自强 tsconfig Config

## 快速开始

首先安装依赖。

```
pnpm i -D @zqstudio/configs
```

之后在 `tsconfig.json` 配置文件中扩展 `@zqstudio/configs/tsconfig/base` 即可。

```json [tsconfig.json]
{
  "extends": "@zqstudio/configs/tsconfig/base",
  "include": ["src/**/*"],
  "exclude": ["**/__tests__/**/*"]
}
```

覆盖配置可以参考 [`tsconfig` 文档](https://www.typescriptlang.org/tsconfig/)。

## tsconfig 配置参考

<<< @/../src/tsconfig/base.json
