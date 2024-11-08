# 自强 commitlint Config

## 快速开始

首先安装 `commitlint`。

```
pnpm i -D @zqstudio/configs @commitlint/cli
```

之后在项目中编写 `commitlint.config.mjs` 配置文件即可。

```js [commitlint.config.mjs]
export default {
  extends: ['@zq/configs/commitlint'],
};
```

commitlint 一般是在 ci 中执行的，建议根据[官方文档](https://commitlint.js.org/guides/ci-setup.html)在 ci 中进行相应的配置。

### GitHub Actions 配置

这边简单介绍下在 GitHub Actions 中如何配置。

首先创建一份 workflow 配置文件。

```yaml
name: CI

on: [push]

jobs:
  dev:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: Install pnpm
        uses: pnpm/action-setup@v4
        with:
          version: latest
          run_install: false
      - name: Use Node.js 22
        uses: actions/setup-node@v4
        with:
          node-version: 22.x
          cache: 'pnpm'
      - name: Install dependencies
        run: pnpm install
        shell: bash
```

在安装后依赖后，运行 commitlint 校验上一次提交。

```diff
      - name: Install dependencies
        run: pnpm install
        shell: bash
+     - run: pnpm commitlint --last --verbose
+       if: github.event_name == 'push'
```

## 结合 commitizen 使用

commitlint 还可以结合 [`commitizen`](https://commitizen.github.io/cz-cli/) 自动生成规范的 commit message。

首先安装依赖。

```
pnpm i -D commitizen @commitlint/cz-commitlint
```

然后在 `package.json` 中添加 `commitizen` 配置。

```json [package.json]
...
  "config": {
    "commitizen": {
      "path": "@commitlint/cz-commitlint"
    }
  }
...
```

最后在本地执行 commitizen 即可。

```json [package.json]
...
  "scripts": {
    ...
    "commit": "git-cz",
    ...
  }
...
```

## 自强 Commit 规范参考

- feat：添加新的功能。
- update：功能更新，指对已有功能的更新，甚至删除。
- perf：性能优化，指在不影响功能的情况下对代码执行效率、资源加载效率的优化等
- fix：bug 修复。
- refactor：代码重构。包括优化代码性能、可读性和逻辑结构的修改。其特征是代码的大幅改动和外在行为不变性。
- docs：文档修改，包括 .md 文档文件以及代码注释的添加、修改。如果是代码改动伴随的文档改动，则不属于此类型。
- style：格式修改，比如改变缩进、空格，删除多余的空行，补上漏掉的分号等。是不改变代码主体的修改。
- test：测试文件的修改。
- conf：配置的修改，修改对象一般为非程序文件，或程序文件中的字符串。
- chore：事务性的修改。包括文件的移动归类、更换依赖库、数据库类型，以及项目对接、部署时产生的改动等。

细节参考钉钉文档 https://alidocs.dingtalk.com/i/nodes/OBldywvrKxo89PkzZORMJQk2ngpNbLz4?utm_scene=team_space
