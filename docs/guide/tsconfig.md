# 自强 tsconfig Config

## 快速开始

首先安装依赖。

```
pnpm i -D @zqstudio/configs
```

之后在 `tsconfig.json` 配置文件中扩展 `@zq/configs/tsconfig/base` 即可。

```json [tsconfig.json]
{
  "extends": "@zq/configs/tsconfig/base",
  "include": ["src/**/*"],
  "exclude": ["**/__tests__/**/*"]
}
```

覆盖配置可以参考 [`tsconfig` 文档](https://www.typescriptlang.org/tsconfig/)。

## tsconfig 配置参考

```json [base.json]
{
  "compilerOptions": {
    "target": "esnext",
    "lib": ["esnext", "dom", "dom.iterable", "scripthost"],
    "allowJs": true,
    "module": "esnext",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": false,
    "jsx": "preserve",
    "experimentalDecorators": true,
    "resolveJsonModule": true,
    "moduleResolution": "node"
  },
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "Base"
}
```
