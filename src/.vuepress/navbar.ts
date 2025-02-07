import { navbar } from "vuepress-theme-hope";

export default navbar([
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
  {
    text: "笔记",
    icon: "File",
    children: [
      "/posts/Blogs/ITManage/",
      "/posts/Blogs/CyberSecurity/",
      "/posts/Blogs/Database/",
      "/posts/Blogs/Markdown/",
      "/posts/Blogs/Network/",
      "/posts/Blogs/CloudAndVMs/",
      "/posts/Blogs/macOS/",
      "/posts/Blogs/Windows/",
      "/posts/Blogs/Linux/",
      "/posts/Blogs/CodeSnippets/",
    ],
  },
  {
    text: "收集箱",
    icon: "File",
    children: [
      "/posts/Collection/OpensourceProject.md",
      "/posts/Collection/OnlineTools.md",
      {
        text: "软件工具列表",
        icon: "software",
        children: [
          {
            text: "macOS软件工具列表",
            icon: "Software",
            link: "/posts/Collection/macOS软件工具列表.md",
          },
        ],
      },
    ],
  },
  {
    text: "随便写写",
    icon: "File",
    link: "/posts/ThinkAndTalk/",
  },
  {
    text: "关于我",
    icon: "Personal-Profile",
    link: "/intro.html",
  },
]);
