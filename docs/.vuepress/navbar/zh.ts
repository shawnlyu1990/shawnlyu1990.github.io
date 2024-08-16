import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  //  {
  //    text: "时间线",
  //    icon: "timeline",
  //    link: "/timeline/",
  //  },
  {
    text: "所有文章",
    icon: "file-lines",
    link: "/article/",
  },
  "/posts/CyberSecurity/",
  "/posts/Database/",
  "/posts/Markdown/",
  "/posts/Network/",
  "/posts/CloudAndVMs/",
  "/posts/macOS/",
  "/posts/Windows/",
  "/posts/Linux/",
  "/posts/CodeSnippets/",
  {
    text: "关于我",
    icon: "user",
    link: "/intro.html",
  },
]);
