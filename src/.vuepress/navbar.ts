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
      {
        text: "开源工具",
        icon: "/assets/blogicons/macos.png",
        children: [
          {
            text: "开源项目收集",
            icon: "/assets/blogicons/Github.png",
            link: "/posts/Collection/开源工具/OpensourceProject.md",
          },
        ],
      },
      {
        text: "在线工具 & 网站",
        icon: "/assets/blogicons/网站.png",
        children: [
          {
            text: "在线资源 & 工具",
            icon: "/assets/blogicons/工具.png",
            link: "/posts/Collection/在线工具/OnlineTools.md",
          },
          {
            text: "一些有趣的网站",
            icon: "/assets/blogicons/网站.png",
            link: "/posts/Collection/在线工具/InterestingWebsite.md",
          },
        ],
      },
      {
        text: "macOS",
        icon: "/assets/blogicons/macos.png",
        children: [
          {
            text: "macOS 软件工具列表",
            icon: "/assets/blogicons/AppStore.png",
            link: "/posts/Collection/macOS/macOS软件工具列表.md",
          },
          {
            text: "macOS IPSW 格式安装镜像下载",
            icon: "/assets/blogicons/macos.png",
            link: "/posts/Collection/macOS/macOS_IPSW_格式安装镜像下载.md",
          },
        ],
      },
      {
        text: "报文格式",
        icon: "/assets/blogicons/协议.png",
        children: [
          {
            text: "数据链路层",
            icon: "/assets/blogicons/协议.png",
            link: "/posts/Collection/报文格式/数据链路层/",
          },
          // {
          //   text: "网络层",
          //   icon: "/assets/blogicons/协议.png",
          //   link: "/posts/Collection/报文格式/网络层/",
          // },
          // {
          //   text: "传输层",
          //   icon: "/assets/blogicons/协议.png",
          //   link: "/posts/Collection/报文格式/传输层/",
          // },
          // {
          //   text: "应用层",
          //   icon: "/assets/blogicons/协议.png",
          //   link: "/posts/Collection/报文格式/应用层/",
          // },
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
