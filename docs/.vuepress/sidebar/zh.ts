import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    {
      text: "网络安全",
      icon: "CyberSecurity",
      prefix: "posts/CyberSecurity/",
      // 设置分组是否可以折叠，默认值是 false
      collapsible: true,
      // 设置分组是否默认展开，默认值是 false
      expanded: false,
      children: "structure",
    },
    {
      text: "数据库",
      icon: "Database",
      prefix: "posts/Database/",
      // 设置分组是否可以折叠，默认值是 false
      collapsible: true,
      // 设置分组是否默认展开，默认值是 false
      expanded: false,
      children: [
        {
          text: "PostgreSQL",
          icon: "PostgreSQL",
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
      icon: "Markdown",
      prefix: "posts/Markdown/",
      // 设置分组是否可以折叠，默认值是 false
      collapsible: true,
      // 设置分组是否默认展开，默认值是 false
      expanded: false,
      children: "structure",
    },
    {
      text: "网络",
      icon: "Global-Network",
      prefix: "posts/Network/",
      // 设置分组是否可以折叠，默认值是 false
      collapsible: true,
      // 设置分组是否默认展开，默认值是 false
      expanded: false,
      children: [
        {
          text: "路由交换",
          icon: "Network-Wired",
          prefix: "路由交换/",
          // 设置分组是否可以折叠，默认值是 false
          collapsible: true,
          // 设置分组是否默认展开，默认值是 false
          expanded: false,
          children: "structure",
        },
        {
          text: "软路由",
          icon: "WiFi-Router",
          prefix: "软路由/",
          // 设置分组是否可以折叠，默认值是 false
          collapsible: true,
          // 设置分组是否默认展开，默认值是 false
          expanded: false,
          children: "structure",
        },
        {
          text: "网络协议",
          icon: "Network-Protocol",
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
      icon: "Cloud",
      prefix: "posts/CloudAndVMs/",
      // 设置分组是否可以折叠，默认值是 false
      collapsible: true,
      // 设置分组是否默认展开，默认值是 false
      expanded: false,
      children: [
        {
          text: "VMware",
          icon: "VM",
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
      icon: "macOS",
      prefix: "posts/macOS/",
      // 设置分组是否可以折叠，默认值是 false
      collapsible: true,
      // 设置分组是否默认展开，默认值是 false
      expanded: false,
      children: "structure",
    },
    {
      text: "Windows",
      icon: "Windows",
      prefix: "posts/Windows/",
      // 设置分组是否可以折叠，默认值是 false
      collapsible: true,
      // 设置分组是否默认展开，默认值是 false
      expanded: false,
      children: "structure",
    },
    {
      text: "Linux",
      icon: "Linux",
      prefix: "posts/Linux/",
      // 设置分组是否可以折叠，默认值是 false
      collapsible: true,
      // 设置分组是否默认展开，默认值是 false
      expanded: false,
      children: [
        {
          text: "标准规范",
          icon: "Rule",
          prefix: "标准规范/",
          // 设置分组是否可以折叠，默认值是 false
          collapsible: true,
          // 设置分组是否默认展开，默认值是 false
          expanded: false,
          children: "structure",
        },
        {
          text: "服务部署",
          icon: "Environment-Deploy",
          prefix: "服务部署/",
          // 设置分组是否可以折叠，默认值是 false
          collapsible: true,
          // 设置分组是否默认展开，默认值是 false
          expanded: false,
          children: "structure",
        },
        {
          text: "FAQ",
          icon: "Question",
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
      icon: "code",
      prefix: "posts/CodeSnippets/",
      // 设置分组是否可以折叠，默认值是 false
      collapsible: true,
      // 设置分组是否默认展开，默认值是 false
      expanded: false,
      children: [
        {
          text: "Bash",
          icon: "Terminal",
          prefix: "Bash/",
          // 设置分组是否可以折叠，默认值是 false
          collapsible: true,
          // 设置分组是否默认展开，默认值是 false
          expanded: false,
          children: "structure",
        },
        {
          text: "Python",
          icon: "Python",
          prefix: "Python/",
          // 设置分组是否可以折叠，默认值是 false
          collapsible: true,
          // 设置分组是否默认展开，默认值是 false
          expanded: true,
          children: "structure",
        },
      ],
    },
    {
      text: "未分类",
      icon: "uncatelogued",
      prefix: "posts/未分类/",
      // 设置分组是否可以折叠，默认值是 false
      collapsible: true,
      // 设置分组是否默认展开，默认值是 false
      expanded: false,
      children: "structure",
    },
    "intro",
    {
      text: "幻灯片",
      icon: "person-chalkboard",
      link: "https://plugin-md-enhance.vuejs.press/zh/guide/content/revealjs/demo.html",
    },
  ],
});
