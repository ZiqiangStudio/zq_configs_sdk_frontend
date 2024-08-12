import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
// @ts-expect-error missing types
import pluginVue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import sonarjs from 'eslint-plugin-sonarjs';
import { loadJsonFileSync } from 'load-json-file';

export interface AutoImportOptions {
  /**
   * .eslintrc-auto-import.json 的位置
   * @default .eslintrc-auto-import.json
   */
  path?: string;
}

const getAutoImportGlobals = ({
  path = '.eslintrc-auto-import.json',
}: AutoImportOptions = {}) => {
  const jsonFile = loadJsonFileSync(path);
  if (
    typeof jsonFile === 'object' &&
    jsonFile &&
    'globals' in jsonFile &&
    typeof jsonFile.globals === 'object' &&
    jsonFile.globals
  ) {
    return jsonFile.globals;
  }
  return {};
};

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
  autoImport?: boolean | AutoImportOptions;
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
    autoImport = false,
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

  const autoImportOptions =
    typeof autoImport === 'object' ? autoImport : undefined;
  const autoImportGlobals = autoImport
    ? getAutoImportGlobals(autoImportOptions)
    : {};

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
          ...autoImportGlobals,
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
