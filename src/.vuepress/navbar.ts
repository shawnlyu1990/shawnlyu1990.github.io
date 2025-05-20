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
      "/posts/Blogs/Markdown/",
      "/posts/Blogs/Network/",
      "/posts/Blogs/Linux/",
      "/posts/Blogs/CodeSnippets/",
    ],
  },
  {
    text: "软件/工具/配置/服务",
    icon: "/assets/blogicons/计算机设置.png",
    children: [
      "/posts/Config/Database/",
      "/posts/Config/VMware/",
      "/posts/Config/macOS/",
      "/posts/Config/Windows/",
      "/posts/Config/Linux/",
      "/posts/Config/CodeSnippets/",
      "/posts/Config/Docker/",
    ],
  },
  {
    text: "收集箱",
    icon: "/assets/blogicons/收件箱.png",
    children: [
      "/posts/Collection/OpensourceProject.md",
      "/posts/Collection/OnlineTools.md",
      {
        text: "macOS",
        icon: "/assets/blogicons/macos.png",
        children: [
          {
            text: "macOS 软件工具列表",
            icon: "/assets/blogicons/AppStore.png",
            link: "/posts/Collection/macOS软件工具列表.md",
          },
          {
            text: "macOS IPSW 格式安装镜像下载",
            icon: "/assets/blogicons/macos.png",
            link: "/posts/Collection/macOS_IPSW_格式安装镜像下载.md",
          },
        ],
      },
    ],
  },
  {
    text: "关于我",
    icon: "/assets/blogicons/用户.png",
    link: "/intro.html",
  },
]);
