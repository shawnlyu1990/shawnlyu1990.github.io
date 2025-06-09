import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  // "/posts/Blogs/": [
  //   {
  //     text: "IT管理",
  //     icon: "/assets/blogicons/工作流程.png",
  //     prefix: "ITManage/",
  //     // 设置分组是否可以折叠，默认值是 false
  //     collapsible: true,
  //     // 设置分组是否默认展开，默认值是 false
  //     expanded: false,
  //     children: "structure",
  //   },
  //   {
  //     text: "网络安全",
  //     icon: "/assets/blogicons/网络安全.png",
  //     prefix: "CyberSecurity/",
  //     // 设置分组是否可以折叠，默认值是 false
  //     collapsible: true,
  //     // 设置分组是否默认展开，默认值是 false
  //     expanded: false,
  //     children: "structure",
  //   },
  //   {
  //     text: "Markdown",
  //     icon: "/assets/blogicons/Markdown.png",
  //     prefix: "Markdown/",
  //     // 设置分组是否可以折叠，默认值是 false
  //     collapsible: true,
  //     // 设置分组是否默认展开，默认值是 false
  //     expanded: false,
  //     children: "structure",
  //   },
  //   {
  //     text: "网络",
  //     icon: "/assets/blogicons/网络.png",
  //     prefix: "Network/",
  //     // 设置分组是否可以折叠，默认值是 false
  //     collapsible: true,
  //     // 设置分组是否默认展开，默认值是 false
  //     expanded: false,
  //     children: [
  //       {
  //         text: "路由交换",
  //         icon: "/assets/blogicons/路由器.png",
  //         prefix: "路由交换/",
  //         // 设置分组是否可以折叠，默认值是 false
  //         collapsible: true,
  //         // 设置分组是否默认展开，默认值是 false
  //         expanded: false,
  //         children: "structure",
  //       },
  //       {
  //         text: "软路由",
  //         icon: "/assets/blogicons/无线路由器.png",
  //         prefix: "软路由/",
  //         // 设置分组是否可以折叠，默认值是 false
  //         collapsible: true,
  //         // 设置分组是否默认展开，默认值是 false
  //         expanded: false,
  //         children: "structure",
  //       },
  //       {
  //         text: "网络协议",
  //         icon: "/assets/blogicons/协议.png",
  //         prefix: "网络协议/",
  //         // 设置分组是否可以折叠，默认值是 false
  //         collapsible: true,
  //         // 设置分组是否默认展开，默认值是 false
  //         expanded: false,
  //         children: "structure",
  //       },
  //     ],
  //   },
  //   {
  //     text: "Linux",
  //     icon: "/assets/blogicons/Linux.png",
  //     prefix: "Linux/",
  //     // 设置分组是否可以折叠，默认值是 false
  //     collapsible: true,
  //     // 设置分组是否默认展开，默认值是 false
  //     expanded: false,
  //     children: "structure"
  //   },
  //   {
  //     text: "代码片段",
  //     icon: "/assets/blogicons/源代码.png",
  //     prefix: "CodeSnippets/",
  //     // 设置分组是否可以折叠，默认值是 false
  //     collapsible: true,
  //     // 设置分组是否默认展开，默认值是 false
  //     expanded: false,
  //     children: [
  //       {
  //         text: "Python",
  //         icon: "/assets/blogicons/Python.png",
  //         prefix: "Python/",
  //         // 设置分组是否可以折叠，默认值是 false
  //         collapsible: true,
  //         // 设置分组是否默认展开，默认值是 false
  //         expanded: true,
  //         children: "structure",
  //       },
  //     ],
  //   },
  // ],
  "/posts/Blogs/": "structure",
  "/posts/Collection/": "structure",
  "/posts/Config/VMware/": "structure",
  "/posts/Config/Database/": "structure",
  "/posts/Config/macOS/": "structure",
  "/posts/Config/Windows/": "structure",
  "/posts/Config/Linux/": "structure",
  "/posts/Config/Docker/": "structure",
  "/posts/Config/CodeSnippets/": "structure",
  "/posts/uncategorized/": "structure",
  "/": [
    "intro",
  ],
});
