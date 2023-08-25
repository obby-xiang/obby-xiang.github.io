// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'obby-xiang',
  tagline: '让编程成为艺术',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://obby-xiang.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'obby-xiang', // Usually your GitHub org/user name.
  projectName: 'obby-xiang.github.io', // Usually your repo name.
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: {
          routeBasePath: '/',
          showReadingTime: true,
          blogSidebarCount: 'ALL',
          blogSidebarTitle: '所有博文',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: ({blogDirPath, blogPath}) =>
              `https://github.com/obby-xiang/obby-xiang.github.io/edit/master/${blogDirPath}/${blogPath}`,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      navbar: {
        title: 'obby-xiang',
        logo: {
          alt: 'obby-xiang',
          src: 'img/logo.svg',
        },
        items: [
          {
            to: '/tags',
            label: '标签',
            position: 'left',
          },
          {
            to: '/archive',
            label: '归档',
            position: 'left',
          },
          {
            href: 'https://github.com/obby-xiang/obby-xiang.github.io',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} obby-xiang. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      algolia: {
        appId: '6PGH82GV9N',
        apiKey: '1a232f947626a47b2594b7b95b45bf4d',
        indexName: 'obby-xiangio',
        contextualSearch: true,
      },
    }),

  plugins: [
    'docusaurus-plugin-sass',
    [
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: 'G-25M8JEN1TJ',
      },
    ],
    [
      '@docusaurus/plugin-google-tag-manager',
      {
        containerId: 'GTM-NJ6HC823',
      },
    ],
  ],
};

module.exports = config;
