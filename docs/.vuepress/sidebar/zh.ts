import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/posts/Blogs/": [
    {
      text: "IT管理",
      icon: "Flow",
      prefix: "ITManage/",
      // 设置分组是否可以折叠，默认值是 false
      collapsible: true,
      // 设置分组是否默认展开，默认值是 false
      expanded: false,
      children: "structure",
    },
    {
      text: "网络安全",
      icon: "CyberSecurity",
      prefix: "CyberSecurity/",
      // 设置分组是否可以折叠，默认值是 false
      collapsible: true,
      // 设置分组是否默认展开，默认值是 false
      expanded: false,
      children: "structure",
    },
    {
      text: "数据库",
      icon: "Database",
      prefix: "Database/",
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
      prefix: "Markdown/",
      // 设置分组是否可以折叠，默认值是 false
      collapsible: true,
      // 设置分组是否默认展开，默认值是 false
      expanded: false,
      children: "structure",
    },
    {
      text: "网络",
      icon: "Global-Network",
      prefix: "Network/",
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
          children: [
            {
              text: "数据链路层",
              icon: "Network-Protocol",
              prefix: "数据链路层/",
              // 设置分组是否可以折叠，默认值是 false
              collapsible: true,
              // 设置分组是否默认展开，默认值是 false
              expanded: false,
              children: "structure",
            },
          ],
        },
      ],
    },
    {
      text: "云和虚拟化",
      icon: "Cloud",
      prefix: "CloudAndVMs/",
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
          children: [
            {
              text: "VMware Desktop Hypervisor",
              icon: "VMware-Workstation",
              prefix: "VMware Desktop Hypervisor/",
              // 设置分组是否可以折叠，默认值是 false
              collapsible: true,
              // 设置分组是否默认展开，默认值是 false
              expanded: false,
              children: "structure",
            },
            {
              text: "VMware vSphere",
              icon: "VMwarevSphere",
              prefix: "VMware vSphere/",
              // 设置分组是否可以折叠，默认值是 false
              collapsible: true,
              // 设置分组是否默认展开，默认值是 false
              expanded: false,
              children: "structure",
            },
          ],
        },
      ],
    },
    {
      text: "macOS",
      icon: "macOS",
      prefix: "macOS/",
      // 设置分组是否可以折叠，默认值是 false
      collapsible: true,
      // 设置分组是否默认展开，默认值是 false
      expanded: false,
      children: "structure",
    },
    {
      text: "Windows",
      icon: "Windows",
      prefix: "Windows/",
      // 设置分组是否可以折叠，默认值是 false
      collapsible: true,
      // 设置分组是否默认展开，默认值是 false
      expanded: false,
      children: "structure",
    },
    {
      text: "Linux",
      icon: "Linux",
      prefix: "Linux/",
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
      prefix: "CodeSnippets/",
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
  ],
  "/posts/Collection/": [
    "OpensourceProject.md",
    "OnlineTools.md",
    {
      text: "软件工具列表",
      icon: "Software",
      // 设置分组是否可以折叠，默认值是 false
      collapsible: true,
      // 设置分组是否默认展开，默认值是 false
      expanded: false,
      children: [
        "macOS软件工具列表.md",
      ],
    },
  ],
  "/posts/ThinkAndTalk/": [
    {
      text: "网络安全",
      icon: "CyberSecurity",
      prefix: "CyberSecurity/",
      // 设置分组是否可以折叠，默认值是 false
      collapsible: true,
      // 设置分组是否默认展开，默认值是 false
      expanded: false,
      children: "structure",
    },
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
  "/posts/uncategorized/": [
    {
      text: "未分类",
      icon: "uncatelogued",
      prefix: "",
      // 设置分组是否可以折叠，默认值是 false
      collapsible: true,
      // 设置分组是否默认展开，默认值是 false
      expanded: false,
      children: "structure",
    },
  ],
  "/": [
    "intro",
  ],
});
