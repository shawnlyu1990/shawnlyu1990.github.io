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
          children: "structure",
        },
      ],
    },
    {
      text: "Linux",
      icon: "/assets/blogicons/Linux.png",
      prefix: "Linux/",
      // 设置分组是否可以折叠，默认值是 false
      collapsible: true,
      // 设置分组是否默认展开，默认值是 false
      expanded: false,
      children: "structure"
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
      text: "macOS",
      icon: "/assets/blogicons/macos.png",
      // 设置分组是否可以折叠，默认值是 false
      collapsible: true,
      // 设置分组是否默认展开，默认值是 false
      expanded: false,
      children: [
        "macOS软件工具列表.md",
        "macOS_IPSW_格式安装镜像下载.md",
      ],
    },
  ],
  "/posts/Config/VMware/": [
    {
      text: "VMware 桌面虚拟化",
      icon: "/assets/blogicons/VMware-Workstation.png",
      prefix: "VMware Desktop Hypervisor/",
      // 设置分组是否可以折叠，默认值是 false
      collapsible: true,
      // 设置分组是否默认展开，默认值是 false
      expanded: false,
      children: [
        {
          text: "安装部署",
          icon: "/assets/blogicons/部署.png",
          prefix: "Install/",
          // 设置分组是否可以折叠，默认值是 false
          collapsible: true,
          // 设置分组是否默认展开，默认值是 false
          expanded: false,
          children: "structure",
        },
        {
          text: "配置",
          icon: "/assets/blogicons/工具.png",
          prefix: "Config/",
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
      text: "VMware vSphere",
      icon: "/assets/blogicons/VMwarevSphere.png",
      prefix: "VMware vSphere/",
      // 设置分组是否可以折叠，默认值是 false
      collapsible: true,
      // 设置分组是否默认展开，默认值是 false
      expanded: false,
      children: [
        {
          text: "安装部署",
          icon: "/assets/blogicons/部署.png",
          prefix: "Install/",
          // 设置分组是否可以折叠，默认值是 false
          collapsible: true,
          // 设置分组是否默认展开，默认值是 false
          expanded: false,
          children: "structure",
        },
        {
          text: "配置",
          icon: "/assets/blogicons/工具.png",
          prefix: "Config/",
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
  ],
  "/posts/Config/Database/": [
    {
      text: "PostgreSQL",
      icon: "/assets/blogicons/PostgreSQL.png",
      prefix: "PostgreSQL/",
      // 设置分组是否可以折叠，默认值是 false
      collapsible: true,
      // 设置分组是否默认展开，默认值是 false
      expanded: false,
      children: [
        {
          text: "安装部署",
          icon: "/assets/blogicons/部署.png",
          prefix: "Install/",
          // 设置分组是否可以折叠，默认值是 false
          collapsible: true,
          // 设置分组是否默认展开，默认值是 false
          expanded: false,
          children: "structure",
        },
        {
          text: "配置",
          icon: "/assets/blogicons/工具.png",
          prefix: "Config/",
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
      text: "MySQL",
      icon: "/assets/blogicons/MySQL.png",
      prefix: "MySQL/",
      // 设置分组是否可以折叠，默认值是 false
      collapsible: true,
      // 设置分组是否默认展开，默认值是 false
      expanded: false,
      children: [
        {
          text: "安装部署",
          icon: "/assets/blogicons/部署.png",
          prefix: "Install/",
          // 设置分组是否可以折叠，默认值是 false
          collapsible: true,
          // 设置分组是否默认展开，默认值是 false
          expanded: false,
          children: "structure",
        },
        {
          text: "配置",
          icon: "/assets/blogicons/工具.png",
          prefix: "Config/",
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
  ],
  "/posts/Config/macOS/": [
    {
      text: "安装部署",
      icon: "/assets/blogicons/部署.png",
      prefix: "Install/",
      // 设置分组是否可以折叠，默认值是 false
      collapsible: true,
      // 设置分组是否默认展开，默认值是 false
      expanded: false,
      children: "structure",
    },
    {
      text: "配置",
      icon: "/assets/blogicons/工具.png",
      prefix: "Config/",
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
  "/posts/Config/Windows/": [
    {
      text: "安装部署",
      icon: "/assets/blogicons/部署.png",
      prefix: "Install/",
      // 设置分组是否可以折叠，默认值是 false
      collapsible: true,
      // 设置分组是否默认展开，默认值是 false
      expanded: false,
      children: "structure",
    },
    {
      text: "配置",
      icon: "/assets/blogicons/工具.png",
      prefix: "Config/",
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
  "/posts/Config/Linux/": [
    {
      text: "标准&规范",
      icon: "/assets/blogicons/规则手册.png",
      prefix: "Standard/",
      // 设置分组是否可以折叠，默认值是 false
      collapsible: true,
      // 设置分组是否默认展开，默认值是 false
      expanded: false,
      children: "structure",
    },
    {
      text: "安装部署",
      icon: "/assets/blogicons/部署.png",
      prefix: "Install/",
      // 设置分组是否可以折叠，默认值是 false
      collapsible: true,
      // 设置分组是否默认展开，默认值是 false
      expanded: false,
      children: "structure",
    },
    {
      text: "配置",
      icon: "/assets/blogicons/工具.png",
      prefix: "Config/",
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
  "/posts/Config/Docker/": [
    {
      text: "安装部署",
      icon: "/assets/blogicons/部署.png",
      prefix: "Install/",
      // 设置分组是否可以折叠，默认值是 false
      collapsible: true,
      // 设置分组是否默认展开，默认值是 false
      expanded: false,
      children: "structure",
    },
    {
      text: "配置",
      icon: "/assets/blogicons/工具.png",
      prefix: "Config/",
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
  "/posts/Config/CodeSnippets/": [
    {
      text: "BASH",
      icon: "/assets/blogicons/Bash.png",
      prefix: "Bash/",
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
