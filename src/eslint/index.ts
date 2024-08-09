import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
// @ts-expect-error missing types
import pluginVue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import sonarjs from 'eslint-plugin-sonarjs';

export interface ZqEslintConfigOptions {
  /**
   * 是否开启 Vue
   * @default true
   */
  vue?: boolean;
  /**
   * 是否开启 TypeScript
   * @default false
   */
  ts?: boolean;

  /**
   * 是否开启 sonarjs
   * @default true
   */
  sonar?: boolean;
  /**
   * 是否开启 Prettier
   * @default true
   */
  prettier?: boolean;
  /**
   * 是否开启 unplugin-auto-import 插件
   * @default false
   */
  autoImport?: boolean;
  /**
   * 忽略列表
   * @default []
   */
  ignores?: string[];
}

export const config = (options: ZqEslintConfigOptions = {}) => {
  const {
    ts = false,
    vue = true,
    sonar = true,
    prettier = true,
    ignores = [],
  } = options;

  const vueConfig = ts
    ? [
        ...pluginVue.configs['flat/essential'],
        {
          languageOptions: {
            parser: vueParser,
            parserOptions: {
              parser: tseslint.parser,
              sourceType: 'module',
            },
          },
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
