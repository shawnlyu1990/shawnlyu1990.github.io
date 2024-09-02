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
    icon: "File",
    link: "/article/",
  },
  "/posts/IT管理/",
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
    icon: "Personal-Profile",
    link: "/intro.html",
  },
]);
