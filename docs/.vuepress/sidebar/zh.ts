import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    "",
    {
      text: "网络安全",
      icon: "fas fa-shield-halved",
      prefix: "posts/CyberSecurity/",
      // 设置分组是否可以折叠，默认值是 false
      collapsible: true,
      // 设置分组是否默认展开，默认值是 false
      expanded: false,
      children: "structure",
    },
    {
      text: "数据库",
      icon: "fas fa-database",
      prefix: "posts/Database/",
      // 设置分组是否可以折叠，默认值是 false
      collapsible: true,
      // 设置分组是否默认展开，默认值是 false
      expanded: false,
      children: [
        {
          text: "PostgreSQL",
          icon: "fas fa-database",
          prefix: "PostgreSQL/",
          // 设置分组是否可以折叠，默认值是 false
          collapsible: true,
          // 设置分组是否默认展开，默认值是 false
          expanded: false,
          children: "structure",
        },
      ],
    },
    {
      text: "Markdown",
      icon: "fab fa-markdown",
      prefix: "posts/Markdown/",
      // 设置分组是否可以折叠，默认值是 false
      collapsible: true,
      // 设置分组是否默认展开，默认值是 false
      expanded: false,
      children: "structure",
    },
    {
      text: "网络",
      icon: "fas fa-globe",
      prefix: "posts/Network/",
      // 设置分组是否可以折叠，默认值是 false
      collapsible: true,
      // 设置分组是否默认展开，默认值是 false
      expanded: false,
      children: [
        {
          text: "路由交换",
          icon: "fas fa-network-wired",
          prefix: "路由交换/",
          // 设置分组是否可以折叠，默认值是 false
          collapsible: true,
          // 设置分组是否默认展开，默认值是 false
          expanded: false,
          children: "structure",
        },
        {
          text: "软路由",
          icon: "fas fa-route",
          prefix: "软路由/",
          // 设置分组是否可以折叠，默认值是 false
          collapsible: true,
          // 设置分组是否默认展开，默认值是 false
          expanded: false,
          children: "structure",
        },
        {
          text: "网络协议",
          icon: "fas fa-ethernet",
          prefix: "网络协议/",
          // 设置分组是否可以折叠，默认值是 false
          collapsible: true,
          // 设置分组是否默认展开，默认值是 false
          expanded: false,
          children: "structure",
        },
      ],
    },
    {
      text: "云和虚拟化",
      icon: "fas fa-cloud",
      prefix: "posts/CloudAndVMs/",
      // 设置分组是否可以折叠，默认值是 false
      collapsible: true,
      // 设置分组是否默认展开，默认值是 false
      expanded: false,
      children: [
        {
          text: "VMware",
          icon: "fas fa-clone",
          prefix: "VMware/",
          // 设置分组是否可以折叠，默认值是 false
          collapsible: true,
          // 设置分组是否默认展开，默认值是 false
          expanded: false,
          children: "structure",
        },
      ],
    },
    {
      text: "macOS",
      icon: "fab fa-apple",
      prefix: "posts/macOS/",
      // 设置分组是否可以折叠，默认值是 false
      collapsible: true,
      // 设置分组是否默认展开，默认值是 false
      expanded: false,
      children: "structure",
    },
    {
      text: "Windows",
      icon: "fab fa-windows",
      prefix: "posts/Windows/",
      // 设置分组是否可以折叠，默认值是 false
      collapsible: true,
      // 设置分组是否默认展开，默认值是 false
      expanded: false,
      children: "structure",
    },
    {
      text: "Linux",
      icon: "fab fa-linux",
      prefix: "posts/Linux/",
      // 设置分组是否可以折叠，默认值是 false
      collapsible: true,
      // 设置分组是否默认展开，默认值是 false
      expanded: false,
      children: [
        {
          text: "标准规范",
          icon: "fas fa-ruler-combined",
          prefix: "标准规范/",
          // 设置分组是否可以折叠，默认值是 false
          collapsible: true,
          // 设置分组是否默认展开，默认值是 false
          expanded: false,
          children: "structure",
        },
        {
          text: "服务部署",
          icon: "fas fa-server",
          prefix: "服务部署/",
          // 设置分组是否可以折叠，默认值是 false
          collapsible: true,
          // 设置分组是否默认展开，默认值是 false
          expanded: false,
          children: "structure",
        },
        {
          text: "FAQ",
          icon: "fas fa-circle-question",
          prefix: "FAQ/",
          // 设置分组是否可以折叠，默认值是 false
          collapsible: true,
          // 设置分组是否默认展开，默认值是 false
          expanded: false,
          children: "structure",
        },
      ],
    },
    {
      text: "代码片段",
      icon: "laptop-code",
      prefix: "posts/CodeSnippets/",
      // 设置分组是否可以折叠，默认值是 false
      collapsible: true,
      // 设置分组是否默认展开，默认值是 false
      expanded: false,
      children: [
        {
          text: "Bash",
          icon: "terminal",
          prefix: "Bash/",
          // 设置分组是否可以折叠，默认值是 false
          collapsible: true,
          // 设置分组是否默认展开，默认值是 false
          expanded: false,
          children: "structure",
        },
        {
          text: "Python",
          icon: "fab fa-python",
          prefix: "Python/",
          // 设置分组是否可以折叠，默认值是 false
          collapsible: true,
          // 设置分组是否默认展开，默认值是 false
          expanded: true,
          children: "structure",
        },
      ],
    },
    "intro",
    {
      text: "幻灯片",
      icon: "person-chalkboard",
      link: "https://plugin-md-enhance.vuejs.press/zh/guide/content/revealjs/demo.html",
    },
  ],
});
