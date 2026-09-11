---
# 文章标题
title: /proc/[pid]/autogroup 文件
# 当前页面的短标题，会在导航栏、侧边栏和路径导航中作为首选。
shortTitle: /proc/[pid]/autogroup 文件
# 当前页面内容描述。
#description: 
# 当前页面的图标，建议填写
icon: "/assets/blogicons/目录树.png"
# 作者
author: 昌霖学长
# 当前文章是否为原创
isOriginal: true
# 设置写作时间
date: 2026-09-07
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

`/proc/[pid]/autogroup` 是 Linux 内核中用于**进程自动分组（Autogroup）与 CPU 调度优化**的文件接口。

通过该文件，管理员或应用程序可以查看、修改指定进程所在的自动分组（Autogroup）以及该分组的 **CPU 调度权重（nice 值）**。

## 1. 什么是 Autogroup（自动分组）？

Autogroup（自动分组功能）在 Linux 2.6.38 内核中引入，旨在解决桌面交互或多任务环境下的 **CPU 抢占与卡顿问题**。

在没有 Autogroup 之前，Linux 的 CFS（完全公平调度器）是**按线程/进程**分配 CPU 资源的。这会导致一个问题：

如果你在终端里运行了一个并发编译任务（如 `make -j64` 生成 64 个进程），同时在另一个终端运行视频播放器或浏览器（1 个进程）。CPU 资源会被这 65 个进程平分，导致编译任务抢占了 98% 的 CPU 资源，这会直接导致界面卡死。

**Autogroup 的解决方案:**

内核通过会话（Session，通常对应一个终端窗口）对进程进行自动分组。

- 运行 `make -j64` 的终端窗口会被归为 **Group A**；
- 运行视频播放器的终端窗口会被归为 **Group B**。
- CFS 调度器首先在 **Group A 和 Group B 之间平分 CPU 资源**（各占 50%）。然后，Group A 内部的 64 个进程再平分属于它们的那 50% CPU。
- 这样一来，无论一个终端里创建了多少个子进程，都不会导致其他终端或桌面应用失去响应。

## 2. `/proc/[pid]/autogroup` 的文件内容与含义

查看某个进程的 `/proc/[pid]/autogroup` 文件，会输出类似以下内容：

```shell
cat /proc/12345/autogroup

/autogroup-20 nice 0
```

::: note 参数解释

- **`/autogroup-20`**：表示该进程当前所属的 Autogroup ID（这里是第 20 号自动分组）。所有从同一个终端会话（Session）派生出的进程，默认都会分配到同一个 `autogroup-ID` 中。

- **`nice 0`**：表示**整个 Autogroup 分组**的调度优先级权重（nice 值）。默认值为 `0`，取值范围与普通进程的 nice 值相同（`-20` 到 `19`）。

:::

## 3. 如何使用与控制 `/proc/[pid]/autogroup`？

你可以通过向该文件写入值，动态调整**整个分组**的 CPU 优先级，或者将进程从 Autogroup 中移出。

### ① 修改整个分组的 CPU 优先级

直接向 `/proc/[pid]/autogroup` 写入一个新的 nice 值（必须具备相应权限，如降低 nice 值需要 root 权限）：

```shell
# 将进程 12345 所在的分组优先级降低（nice 值设为 10，让出 CPU）
echo 10 > /proc/12345/autogroup
```

::: caution
修改的是**整个分组**的 nice 值，这意味着与该进程属于同一个终端会话（同属 `/autogroup-20`）的所有进程，其分组 nice 值都会同步变为 `10`。
:::

### ② 查看与开关全局 Autogroup 功能

Autogroup 是一个内核配置项（`CONFIG_SCHED_AUTOGROUP`），可以通过 `/proc/sys/kernel/sched_autogroup_enabled` 进行全局开关：

```shell
# 查看是否开启（1 为开启，0 为关闭）
cat /proc/sys/kernel/sched_autogroup_enabled

# 临时关闭全局 autogroup
echo 0 > /proc/sys/kernel/sched_autogroup_enabled
```

## 4. 常见应用场景与注意事项

1. **后台耗时任务降权**：如果在某个终端里运行大型编译或渲染任务，可以找到其中任意一个子进程的 PID，直接执行 `echo 15 > /proc/[pid]/autogroup`，就能瞬间将该终端下所有相关子进程的 CPU 抢占权重降下来，避免影响系统其他操作。

2. **与 cgroups（控制组）的关系**：Autogroup 实际上是内核基于 `cgroups` 的 `cpu` 子系统实现的一种轻量级自动机制。如果一个进程被显式移动到了非根节点的 cgroup（例如 Docker 容器或 systemd 服务组）中，Autogroup 对该进程的管制会自动失效，优先以 cgroup 的资源限制为准。

## 参考资料

<div class="vp-card-container" style="justify-content: flex-start;">
  <VPCard
    title="Linux下一个重要目录“/proc”，你还不知道作用？"
    desc="作者：Linux爱好者"
    logo="https://res.wx.qq.com/a/wx_fed/assets/res/NTI4MWU5.ico"
    link="https://mp.weixin.qq.com/s/UIZ8xnBESscPrtzYDahaUg"
    background="rgba(253, 230, 138, 0.15)"
  />
</div>
