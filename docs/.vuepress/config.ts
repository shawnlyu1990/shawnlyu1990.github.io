import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "昌霖学长的折腾笔记",
      description: "昌霖学长的折腾笔记",
    },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
