import { defineUserConfig } from "vuepress";
import { getDirname, path } from "vuepress/utils";
import theme from "./theme.js";
//import { registerComponentsPlugin } from '@vuepress/plugin-register-components';

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "知识杂货铺",
      description: "简单随意的记录自己的个人经验和学习笔记，并会间歇性的对已有知识进行整理",
    },
  },

  theme,

  // plugins: [
  //   registerComponentsPlugin({
  //     componentsDir: path.resolve(__dirname, './components'),
  //   }),
  // ],

  alias: {
    "@theme-hope/modules/blog/components/BlogHero": path.resolve(
      __dirname,
      "./components/BlogHero.vue",
    ),
  },

  head: [
    // 添加 Google Analysis 统计代码
    //  ['script', { src: "https://www.googletagmanager.com/gtag/js?id=G-M1M6MQSKD7", async: true }],
    //  ['script', {},
    //    " window.dataLayer = window.dataLayer || [];\
    //              function gtag(){dataLayer.push(arguments);}\
    //              gtag('js', new Date());\
    //              gtag('config', 'G-M1M6MQSKD7');"],

    // 导入 "Noto Sans SC"（思源黑体-简中）、"Noto Sans TC"（思源黑体-台湾繁中）、"Noto Sans HK"（思源黑体-香港繁中）
    // "Noto Sans JP"（思源黑体-简中）、"Noto Sans KR"（思源黑体-简中）、"Noto Sans"、"Noto Sans Display"、"Noto Sans Symbols"（图形符号）
    ['link', { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    [
      'link',
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" }
    ],
    [
      'link',
      {
        href: "https://fonts.googleapis.com/css2?family=Noto+Sans+Display:ital,wght@0,100..900;1,100..900&family=Noto+Sans+HK:wght@100..900&family=Noto+Sans+JP:wght@100..900&family=Noto+Sans+KR:wght@100..900&family=Noto+Sans+SC:wght@100..900&family=Noto+Sans+Symbols:wght@100..900&family=Noto+Sans+TC:wght@100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap",
        rel: "stylesheet",
      }
    ],
  ],

  // Enable it with pwa
  // shouldPrefetch: false,
});
