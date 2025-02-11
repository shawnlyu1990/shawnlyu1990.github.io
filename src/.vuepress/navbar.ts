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
    icon: "/assets/blogicons/多个文件.png",
    link: "/article/",
  },
  {
    text: "笔记",
    icon: "/assets/blogicons/笔记.png",
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
    text: "配置技巧",
    icon: "/assets/blogicons/计算机设置.png",
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
    icon: "/assets/blogicons/收件箱.png",
    children: [
      "/posts/Collection/OpensourceProject.md",
      "/posts/Collection/OnlineTools.md",
      {
        text: "软件工具列表",
        icon: "/assets/blogicons/应用列表.png",
        children: [
          {
            text: "macOS软件工具列表",
            icon: "/assets/blogicons/AppStore.png",
            link: "/posts/Collection/macOS软件工具列表.md",
          },
        ],
      },
    ],
  },
  // {
  //   text: "随便写写",
  //   icon: "File",
  //   link: "/posts/ThinkAndTalk/",
  // },
  {
    text: "关于我",
    icon: "/assets/blogicons/用户.png",
    link: "/intro.html",
  },
]);
