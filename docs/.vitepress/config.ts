import { defineConfig } from 'vitepress';

const icon = '/favicon.ico';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '自强 Configs',
  description: '自强 Studio 前端统一配置 SDK',
  head: [
    ['link', { rel: 'shortcut icon', href: icon }],
    ['link', { rel: 'icon', type: 'image/x-icon', href: icon }],
    ['link', { rel: 'mask-icon', href: icon, color: '#ffffff' }],
    ['link', { rel: 'apple-touch-icon', href: icon, sizes: '180x180' }],
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '指南', link: '/eslint' },
      { text: '关于自强', link: 'https://ziqiang.net.cn/#index' },
    ],

    sidebar: [
      {
        text: '指南',
        items: [
          { text: 'ESLint', link: '/eslint' },
          { text: 'Prettier', link: '/prettier' },
          { text: 'commitlint', link: '/commitlint' },
          { text: 'tsconfig', link: '/tsconfig' },
        ],
      },
    ],

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/ZiqiangStudio/zq_configs_sdk_frontend',
      },
    ],

    lastUpdated: {
      text: '上次更新于',
    },

    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档',
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                },
              },
            },
          },
        },
      },
    },

    footer: {
      message:
        '<a target="_blank" href="https://beian.miit.gov.cn/">鄂ICP备20004406号-1</a>',
      copyright: ` © 2024 <a target="_blank" href="https://ziqiang.net.cn/">武汉大学自强网络文化工作室</a> 保留所有权利。`,
    },

    editLink: {
      pattern: `https://github.com/ZiqiangStudio/zq_configs_sdk_frontend/blob/main/docs/:path`,
      text: '去 GitHub 上编辑内容',
    },

    outline: {
      label: '页面导航',
    },
  },
  lastUpdated: true,
});
