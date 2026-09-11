import { hopeTheme } from "vuepress-theme-hope";

import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme(
  {
    // 当前网站部署到的域名
    hostname: "https://mrcharlin.com",
    // 作者信息
    author: {
      name: "昌霖学长",
      url: "https://mrcharlin.com",
      email: "shawnlyu1990@gmail.com",
    },
    // 站点的默认协议
    //license: "CC BY-NC-ND 4.0",
    license: "<a href=\"https://creativecommons.org/licenses/by-nc-nd/4.0/\"> CC BY-NC-ND 4.0 </a>",
    // 网站的 favicon 图标
    favicon: "/assets/icon/favicon.ico",
    // 导航栏图标，应为基于 .vuepress/public 文件夹的绝对路径。
    logo: "/assets/icon/apple-memojy.png",
    // 仓库配置，用于在导航栏中显示仓库链接。
    repo: "shawnlyu1990/shawnlyu1990.github.io",
    // 是否在导航栏显示仓库链接。
    repoDisplay: false,
    // 文档在仓库中的目录
    docsDir: "src",
    // 文章信息，可以填入数组，数组的顺序是各条目显示的顺序。
    pageInfo: ["Original", "Author", "Date", "Category", "Tag", "ReadingTime", "Word", "PageView"],
    // 最近更新日期
    lastUpdated: true,
    // 显示页面贡献者
    contributors: false,
    // 深色模式
    darkmode: "switch",
    // 是否展示编辑此页链接
    editLink: false,


    // 导航栏
    navbar,

    // 侧边栏
    sidebar,

    // 页脚
    footer: "此站点由 VuePress Theme Hope 支持创建",
    displayFooter: true,
    // copyright: "版权所有 © 2024-2025 昌霖学长",

    // 博客相关
    // 需要在主题配置中启用博客功能，例如：
    // plugins: {
    //   blog: true,
    // },
    blog: {
      // 博主姓名。
      // 如果不配置则默认使用 author.name 的值。
      // name: "昌霖学长",
      // 口号、座右铭或介绍语。
      description: "一只人类",
      // 博主头像。
      // 如果不配置则默认使用 logo 的值。
      // avatar: "/assets/icon/avatar.png",
      // 博主的个人介绍地址。
      intro: "/intro.html",
      medias: {
        //Baidu: "https://example.com",
        //BiliBili: "https://example.com",
        //Bitbucket: "https://example.com",
        //Dingding: "https://example.com",
        //Discord: "https://example.com",
        //Dribbble: "https://example.com",
        //Email: "mailto:info@example.com",
        //Evernote: "https://example.com",
        //Facebook: "https://example.com",
        //Flipboard: "https://example.com",
        //Gitee: "https://example.com",
        GitHub: "https://github.com/shawnlyu1990/shawnlyu1990.github.io.git",
        //Gitlab: "https://example.com",
        Gmail: "mailto:shawnlyu1990@gmail.com",
        //Instagram: "https://example.com",
        //Lark: "https://example.com",
        //Lines: "https://example.com",
        //Linkedin: "https://example.com",
        //Pinterest: "https://example.com",
        //Pocket: "https://example.com",
        //QQ: "https://example.com",
        //Qzone: "https://example.com",
        //Reddit: "https://example.com",
        //Rss: "https://example.com",
        //Steam: "https://example.com",
        //Twitter: "https://example.com",
        //Wechat: "https://example.com",
        //Weibo: "https://example.com",
        //Whatsapp: "https://example.com",
        //Youtube: "https://example.com",
        //Zhihu: "https://example.com",
        //VuePressThemeHope: {
        //  icon: "https://theme-hope-assets.vuejs.press/logo.svg",
        //  link: "https://theme-hope.vuejs.press",
        //},
      },
      articleInfo: ["Original", "Author", "Date", "PageView", "Category", "Tag"],
    },

    // 加密配置
    // 说明 https://theme-hope.vuejs.press/zh/config/theme/feature.html#encrypt-admin
    encrypt: {
      config: {
        "/demo/encrypt.html": {
          hint: "Password: 1234",
          password: "1234",
        },
      },
    },

    // 多语言配置
    //metaLocales: {
    //  editLink: "在 GitHub 上编辑此页",
    //},

    // 如果想要实时查看任何改变，启用它。注: 这对更新性能有很大负面影响
    // hotReload: true,

    // 此处开启了很多功能用于演示，你应仅保留用到的功能。
    markdown: {
      align: true,
      attrs: true,
      codeTabs: true,
      component: true,
      demo: true,
      figure: true,
      footnote: true,
      gfm: true,
      imgLazyload: true,
      imgMark: true,
      imgSize: true,
      include: true,
      mark: true,
      //plantuml: true,
      preview: true,
      spoiler: true,
      // 样式化
      // https://theme-hope.vuejs.press/zh/guide/markdown/stylize/stylize.html
      stylize: [
        {
          matcher: "Recommended",
          // oxlint-disable-next-line typescript/consistent-return
          replacer: ({ tag }) => {
            if (tag === "em") {
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
            }
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      tasklist: true,
      vPre: true,

      // 代码高亮配置
      highlighter: {
        type: "shiki", // or "prismjs"
        //themes: { light: "one-light", dark: "one-dark-pro" },
        theme: "one-dark-pro",
        // 是否显示行号
        lineNumbers: false,
        // shiki 或 prismjs 选项
        // 差异标记
        // https://theme-hope.vuejs.press/zh/guide/markdown/code/fence.html#%E5%B7%AE%E5%BC%82%E6%A0%87%E8%AE%B0
        notationDiff: true,
        // 行折叠
        // https://theme-hope.vuejs.press/zh/guide/markdown/code/fence.html#%E8%A1%8C%E6%8A%98%E5%8F%A0
        collapsedLines: true,
        // 聚焦标记
        // https://theme-hope.vuejs.press/zh/guide/markdown/code/fence.html#%E8%81%9A%E7%84%A6%E6%A0%87%E8%AE%B0
        notationFocus: true,
        // 高亮标记
        // https://theme-hope.vuejs.press/zh/guide/markdown/code/fence.html#%E9%AB%98%E4%BA%AE%E6%A0%87%E8%AE%B0
        notationHighlight: true,
        // 错误级别标记
        // https://theme-hope.vuejs.press/zh/guide/markdown/code/fence.html#%E9%94%99%E8%AF%AF%E7%BA%A7%E5%88%AB%E6%A0%87%E8%AE%B0
        notationErrorLevel: true,
        // 词高亮标记
        // https://theme-hope.vuejs.press/zh/guide/markdown/code/fence.html#%E8%AF%8D%E9%AB%98%E4%BA%AE%E6%A0%87%E8%AE%B0
        notationWordHighlight: true,
        // 空白符渲染
        // true: 启用空白符渲染，等同于 all
        // false: 禁用空白符渲染
        // 'all': 渲染所有空白符
        // 'boundary': 仅渲染行首行尾的空白符
        // 'trailing': 仅渲染行尾的空白符
        whitespace: true,
      },


      // 取消注释它们如果你需要 TeX 支持
      // math: {
      //   // 启用前安装 katex
      //   type: "katex",
      //   // 或者安装 @mathjax/src
      //   type: "mathjax",
      // },

      // 如果你需要幻灯片，安装 @vuepress/plugin-revealjs 并取消下方注释
      // revealjs: {
      //   plugins: ["highlight", "math", "search", "notes", "zoom"],
      // },

      // 在启用之前安装 chart.js
      // chartjs: true,

      // insert component easily

      // 在启用之前安装 echarts
      // echarts: true,

      // 在启用之前安装 flowchart.ts
      // flowchart: true,

      // 在启用之前安装 mermaid
      // mermaid: true,

      // playground: {
      //   presets: ["ts", "vue"],
      // },

      // 在启用之前安装 @vue/repl
      // vuePlayground: true,

      // 在启用之前安装 sandpack-vue3
      // sandpack: true,
    },

    // 在这里配置主题提供的插件
    plugins: {
      blog: true,

      // 启用之前需安装 @waline/client
      // 警告: 这是一个仅供演示的测试服务，在生产环境中请自行部署并使用自己的服务！
      // comment: {
      //   provider: "Waline",
      //   serverURL: "https://waline-comment.vuejs.press",
      // },

      components: {
        components: [
          //"ArtPlayer",
          "Badge",
          "BiliBili",
          //"CodePen",
          "PDF",
          "Share",
          "SiteInfo",
          //"StackBlitz",
          "VPBanner",
          "VPCard",
          //"VidStack",
        ],
      },

      icon: {
        prefix: "fa6-solid:",
      },

      // 如果你需要 PWA。安装 @vuepress/plugin-pwa 并取消下方注释
      // pwa: {
      //   favicon: "/favicon.ico",
      //   cacheHTML: true,
      //   cacheImage: true,
      //   appendBase: true,
      //   apple: {
      //     icon: "/assets/icon/apple-icon-152.png",
      //     statusBarColor: "black",
      //   },
      //   msTile: {
      //     image: "/assets/icon/ms-icon-144.png",
      //     color: "#ffffff",
      //   },
      //   manifest: {
      //     icons: [
      //       {
      //         src: "/assets/icon/chrome-mask-512.png",
      //         sizes: "512x512",
      //         purpose: "maskable",
      //         type: "image/png",
      //       },
      //       {
      //         src: "/assets/icon/chrome-mask-192.png",
      //         sizes: "192x192",
      //         purpose: "maskable",
      //         type: "image/png",
      //       },
      //       {
      //         src: "/assets/icon/chrome-512.png",
      //         sizes: "512x512",
      //         type: "image/png",
      //       },
      //       {
      //         src: "/assets/icon/chrome-192.png",
      //         sizes: "192x192",
      //         type: "image/png",
      //       },
      //     ],
      //     shortcuts: [
      //       {
      //         name: "Demo",
      //         short_name: "Demo",
      //         url: "/demo/",
      //         icons: [
      //           {
      //             src: "/assets/icon/guide-maskable.png",
      //             sizes: "192x192",
      //             purpose: "maskable",
      //             type: "image/png",
      //           },
      //         ],
      //       },
      //     ],
      //   },
      // },
    },
  },
  { custom: true },
);
