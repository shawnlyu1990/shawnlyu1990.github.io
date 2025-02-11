import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/posts/Blogs/": [
    {
      text: "IT管理",
      icon: "/assets/blogicons/工作流程.png",
      prefix: "ITManage/",
      // 设置分组是否可以折叠，默认值是 false
      collapsible: true,
      // 设置分组是否默认展开，默认值是 false
      expanded: false,
      children: "structure",
    },
    {
      text: "网络安全",
      icon: "/assets/blogicons/网络安全.png",
      prefix: "CyberSecurity/",
      // 设置分组是否可以折叠，默认值是 false
      collapsible: true,
      // 设置分组是否默认展开，默认值是 false
      expanded: false,
      children: "structure",
    },
    {
      text: "数据库",
      icon: "/assets/blogicons/数据库服务器.png",
      prefix: "Database/",
      // 设置分组是否可以折叠，默认值是 false
      collapsible: true,
      // 设置分组是否默认展开，默认值是 false
      expanded: false,
      children: [
        {
          text: "PostgreSQL",
          icon: "/assets/blogicons/PostgreSQL.png",
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
      icon: "/assets/blogicons/Markdown.png",
      prefix: "Markdown/",
      // 设置分组是否可以折叠，默认值是 false
      collapsible: true,
      // 设置分组是否默认展开，默认值是 false
      expanded: false,
      children: "structure",
    },
    {
      text: "网络",
      icon: "/assets/blogicons/网络.png",
      prefix: "Network/",
      // 设置分组是否可以折叠，默认值是 false
      collapsible: true,
      // 设置分组是否默认展开，默认值是 false
      expanded: false,
      children: [
        {
          text: "路由交换",
          icon: "/assets/blogicons/路由器.png",
          prefix: "路由交换/",
          // 设置分组是否可以折叠，默认值是 false
          collapsible: true,
          // 设置分组是否默认展开，默认值是 false
          expanded: false,
          children: "structure",
        },
        {
          text: "软路由",
          icon: "/assets/blogicons/无线路由器.png",
          prefix: "软路由/",
          // 设置分组是否可以折叠，默认值是 false
          collapsible: true,
          // 设置分组是否默认展开，默认值是 false
          expanded: false,
          children: "structure",
        },
        {
          text: "网络协议",
          icon: "/assets/blogicons/协议.png",
          prefix: "网络协议/",
          // 设置分组是否可以折叠，默认值是 false
          collapsible: true,
          // 设置分组是否默认展开，默认值是 false
          expanded: false,
          children: [
            {
              text: "数据链路层",
              icon: "/assets/blogicons/链.png",
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
      icon: "/assets/blogicons/云.png",
      prefix: "CloudAndVMs/",
      // 设置分组是否可以折叠，默认值是 false
      collapsible: true,
      // 设置分组是否默认展开，默认值是 false
      expanded: false,
      children: [
        {
          text: "VMware",
          icon: "/assets/blogicons/VMW.png",
          prefix: "VMware/",
          // 设置分组是否可以折叠，默认值是 false
          collapsible: true,
          // 设置分组是否默认展开，默认值是 false
          expanded: false,
          children: [
            {
              text: "VMware Desktop Hypervisor",
              icon: "/assets/blogicons/VMware-Workstation.png",
              prefix: "VMware Desktop Hypervisor/",
              // 设置分组是否可以折叠，默认值是 false
              collapsible: true,
              // 设置分组是否默认展开，默认值是 false
              expanded: false,
              children: "structure",
            },
            {
              text: "VMware vSphere",
              icon: "/assets/blogicons/VMwarevSphere.png",
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
      icon: "/assets/blogicons/Apple.png",
      prefix: "macOS/",
      // 设置分组是否可以折叠，默认值是 false
      collapsible: true,
      // 设置分组是否默认展开，默认值是 false
      expanded: false,
      children: "structure",
    },
    {
      text: "Windows",
      icon: "/assets/blogicons/Windows.png",
      prefix: "Windows/",
      // 设置分组是否可以折叠，默认值是 false
      collapsible: true,
      // 设置分组是否默认展开，默认值是 false
      expanded: false,
      children: "structure",
    },
    {
      text: "Linux",
      icon: "/assets/blogicons/Linux.png",
      prefix: "Linux/",
      // 设置分组是否可以折叠，默认值是 false
      collapsible: true,
      // 设置分组是否默认展开，默认值是 false
      expanded: false,
      children: [
        {
          text: "标准规范",
          icon: "/assets/blogicons/规则手册.png",
          prefix: "标准规范/",
          // 设置分组是否可以折叠，默认值是 false
          collapsible: true,
          // 设置分组是否默认展开，默认值是 false
          expanded: false,
          children: "structure",
        },
        {
          text: "服务部署",
          icon: "/assets/blogicons/部署.png",
          prefix: "服务部署/",
          // 设置分组是否可以折叠，默认值是 false
          collapsible: true,
          // 设置分组是否默认展开，默认值是 false
          expanded: false,
          children: "structure",
        },
        {
          text: "FAQ",
          icon: "/assets/blogicons/常问问题.png",
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
      icon: "/assets/blogicons/源代码.png",
      prefix: "CodeSnippets/",
      // 设置分组是否可以折叠，默认值是 false
      collapsible: true,
      // 设置分组是否默认展开，默认值是 false
      expanded: false,
      children: [
        {
          text: "Bash",
          icon: "/assets/blogicons/Bash.png",
          prefix: "Bash/",
          // 设置分组是否可以折叠，默认值是 false
          collapsible: true,
          // 设置分组是否默认展开，默认值是 false
          expanded: false,
          children: "structure",
        },
        {
          text: "Python",
          icon: "/assets/blogicons/Python.png",
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
      icon: "/assets/blogicons/应用列表.png",
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
