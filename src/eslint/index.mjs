import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import sonarjs from 'eslint-plugin-sonarjs';

/**
 * @typedef ZqEslintConfigOptions
 * @prop {boolean} [vue=true] 是否开启 Vue
 * @prop {boolean} [ts=false] 是否开启 TypeScript
 * @prop {boolean} [sonar=true] 是否开启 sonarjs
 * @prop {boolean} [prettier=true] 是否开启 Prettier
 * @prop {boolean} [autoImport=true] 是否开启 unplugin-auto-import 插件
 * @prop {string[]} [ignores=[]]
 */

/**
 * @param {ZqEslintConfigOptions} [options={}]
 */
export const config = (options = {}) => {
  const {
    ts = false,
    vue = true,
    sonar = true,
    prettier = true,
    ignores = [],
  } = options;

  const languageOptions =
    ts && vue
      ? {
          parser: vueParser,
          parserOptions: {
            parser: tseslint.parser,
            sourceType: 'module',
          },
        }
      : {};

  const vueConfig = ts
    ? [
        ...pluginVue.configs['flat/essential'],
        {
          rules: {
            'vue/multi-word-component-names': 0,
          },
        },
      ]
    : [
        ...pluginVue.configs['flat/recommended'],
        {
          rules: {
            'vue/multi-word-component-names': 0,
          },
        },
      ];

  return [
    {
      ignores: [
        'node_modules/**',
        'dist/**',
        '.nuxt/**',
        '.output/**',
        ...ignores,
      ],
    },
    {
      languageOptions: {
        ...languageOptions,
        globals: {
          ...globals.browser,
        },
      },
    },
    ...(vue ? vueConfig : []),
    pluginJs.configs.recommended,
    ...(ts ? tseslint.configs.recommended : []),
    ...(prettier ? [eslintPluginPrettierRecommended] : []),
    ...(sonar ? [sonarjs.configs.recommended] : []),
  ];
};
