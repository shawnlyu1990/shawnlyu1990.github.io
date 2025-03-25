import { hopeTheme } from "vuepress-theme-hope";

import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme(
  {
    hostname: "https://shawnlyu1990.github.io",
    // 作者信息
    author: {
      name: "昌霖学长",
      //url: "https://mister-hope.com",
      email: "shawnlyu1990@gmail.com",
    },
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
    contributors: true,
    // 深色模式
    darkmode: "switch",
    // 是否展示编辑此页链接
    editLink: false,

    blog: {
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

    locales: {
      "/": {
        // navbar
        navbar: navbar,

        // sidebar
        sidebar: sidebar,

        copyright: "版权所有 © 2024-2025 昌霖学长",

        footer: "此站点由 VuePress Theme Hope 支持创建",

        displayFooter: true,

        blog: {
          description: "一只人类",
          intro: "/intro.html",
        },
      },
    },

    encrypt: {
      config: {
        "/demo/encrypt.html": ["1234"],
      },
    },

    // enable it to preview all changes in time
    // hotReload: true,

    // These features are enabled for demo, only preserve features you need here
    markdown: {
      align: true,
      attrs: true,
      codeTabs: true,
      component: true,
      demo: true,
      figure: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      mark: true,
      plantuml: true,
      spoiler: true,
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      tasklist: true,
      vPre: true,

      // install chart.js before enabling it
      // chart: true,

      // insert component easily

      // install echarts before enabling it
      echarts: true,

      // install flowchart.ts before enabling it
      flowchart: true,

      // gfm requires mathjax-full to provide tex support
      gfm: true,

      math: {
        type: "katex",
        //type: "mathjax",
      },

      // install mermaid before enabling it
      mermaid: true,

      // 思维导图，提前安装 markmap-lib, markmap-toolbar 和 markmap-view
      markmap: true,

      // 交互演示
      // playground: {
      //   presets: ["ts", "vue"],
      // },

      // install reveal.js before enabling it
      // revealJs: {
      //   plugins: ["highlight", "math", "search", "notes", "zoom"],
      // },

      // install @vue/repl before enabling it
      // vuePlayground: true,

      // install sandpack-vue3 before enabling it
      // sandpack: true,
    },

    plugins: {
      blog: {
        excerptLength: 0,
      },

      // Install @waline/client before enabling it
      // Note: This is for testing ONLY!
      // You MUST generate and use your own comment service in production.
      // comment: {
      //   provider: "Waline",
      //   serverURL: "https://comment-waline-taupe.vercel.app",
      //   comment: false,
      // },

      // 字体图标资源链接，支持 'iconify' 'fontawesome' 和 'fontawesome-with-brands' 关键字。
      icon: {
        assets: "iconify",
        //assets: "/assets/iconfont/iconfont.css",
        // 如果使用iconfont则需要开启此字段
        //prefix: "iconfont icon-",
      },

      // Giscus comment
      // comment: {
      //   provider: "Giscus",
      //   repo: "shawnlyu1990/shawnlyu1990.github.io",
      //   repoId: "R_kgDOMfaFVg",
      //   category: "Announcements",
      //   categoryId: "DIC_kwDOMfaFVs4CiNjo",
      //   mapping: "title",
      //   strict: false,
      //   lazyLoading: true,
      //   reactionsEnabled: true,
      //   inputPosition: "top",
      //   lightTheme: "light",
      //   darkTheme: "dark",
      // },

      components: {
        components: [
          "ArtPlayer",
          "Badge",
          "BiliBili",
          "CodePen",
          "PDF",
          "Share",
          "SiteInfo",
          "StackBlitz",
          "VPBanner",
          "VPCard",
          "VidStack",
          "XiGua",
        ],
      },

      //searchPro: true,

      copyright: {
        global: true,
      },

      // install @vuepress/plugin-pwa and uncomment these if you want a PWA
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

