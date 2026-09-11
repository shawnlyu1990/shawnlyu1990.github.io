---
# 文章标题
title: /proc/[pid] 目录
# 当前页面的短标题，会在导航栏、侧边栏和路径导航中作为首选。
shortTitle: /proc/[pid] 目录
# 当前页面内容描述。
description: 每一个运行的进程都存在一个 PID ，在 `/proc` 下对应存在一个 `/proc/[pid]` 目录。`/proc/[pid]` 目录下存储的是内核实时生成的特定进程的动态运行状态与配置接口（以伪文件和虚拟目录的形式呈现）。
# 当前页面的图标，建议填写
icon: "/assets/blogicons/目录树.png"
# 作者
author: 昌霖学长
# 当前文章是否为原创
isOriginal: true
# 设置写作时间
date: 2026-09-01
# 分类，一个页面可以有多个分类
categories: 
  - Linux
  - 目录结构
# 标签，一个页面可以有多个标签
tags: 
  - 目录结构
  - Linux
  - proc
# 页面的协议信息
license: MIT 
# 置顶标记（true/false/数字），当填入数字时，数字越大，排名越靠前。
sticky: false
# 星标（true/false/数字），当填入数字时，数字越大，排名越靠前。
star: false
# 是否将该文章添加至文章列表中。
article: true
# 是否将该文章添加至时间线中。
timeline: true
# 是否开启评论
comment: false
# 预览图。请填入绝对路径。图片路径位于 .vuepress/public 下
# cover: /assets/images/cover1.jpg
# 设置横幅图片 (宽屏分享图)，请填入绝对路径。
# banner: /assets/images/cover1.jpg
---

::: important AI 辅助说明 🤖

**本文在撰写过程中借助 AI 工具（Google Gemini）进行了资料整理与文案润色，核心观点及最终内容均由作者审阅确认。**

**但考虑到作者个人局限，再叠加 AI 偶尔「一本正经胡说八道」的习性，文中部分细节难免错漏，仅供参考。如有疑问，还请以官方文档或实际结果为准。**

:::

<br>

每一个运行的进程都存在一个 PID ，在 `/proc` 下对应存在一个 `/proc/[pid]` 目录。`/proc/[pid]` 目录下存储的是内核实时生成的特定进程的动态运行状态与配置接口（以伪文件和虚拟目录的形式呈现）。通常情况下，`/proc/[pid]` 目录所属的 UID 和 GID 即为该进程的有效用户 ID（EUID）和有效组 ID（EGID）。

但是，如果一个进程由于安全限制（如 运行了 SUID 程序）导致其 dumpable 属性被关闭，为了安全考虑，内核会将该进程 `/proc/[pid]` 的所属用户和组重置为 `root:root`，以防止未授权的用户读取其内存或调试该进程。

在 Linux 4.11 内核之前，此处的 `root:root` 指的是宿主机的全局 UID 0 和 GID 0。而在 4.11 及之后的内核中，为了支持 User Namespace（用户命名空间），内核会将该目录的所有者映射为该 Namespace 内的 root 用户。

进程的 dumpable 属性可以通过以下方式改变：

- 调用 `prctl(PR_SET_DUMPABLE, ...)` 接口

- 修改 `/proc/sys/fs/suid_dumpable` 内核参数

将 dumpable 重新设置为 1 后，`/proc/[pid]` 目录及其下属文件的权限就会恢复为进程当前的有效 UID 和 GID。