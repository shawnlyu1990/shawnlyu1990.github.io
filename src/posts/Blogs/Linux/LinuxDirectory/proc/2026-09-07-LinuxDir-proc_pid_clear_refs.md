---
# 文章标题
title: /proc/[pid]/clear_refs 文件
# 当前页面的短标题，会在导航栏、侧边栏和路径导航中作为首选。
shortTitle: /proc/[pid]/clear_refs 文件
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

`/proc/[pid]/clear_refs` **是一个只写文件**，读取该文件永远返回 0 或无内容。

它是 Linux 内核暴露给管理员和分析工具的一个特殊接口，用于**重置（清空）指定进程的页表（Page Table）引用标志位或脏页（Dirty）标记**。该功能在内存性能分析、泄漏排查以及统计进程实际内存占用（如 PSS/RSS）时非常有用。

## 1. 核心作用与工作原理

Linux 内核在管理内存页（Page）时，会通过页表项（PTE）中的某些 **Bit 位**（如 Referenced bit / Accessed bit / Dirty bit）来记录这个内存页最近是否被访问过或修改过。

当你向 `/proc/[pid]/clear_refs` 写入不同的数字指令时，内核会遍历该进程的所有内存映射区（VMA），将其页表项中的对应标记位复位（置 0）。

**常见的写入值及其作用如下：**

| <div style="width:40px; margin: 0 auto;">写入的值</div> | <div style="width:180px; margin: 0 auto;">含义与作用</div> | 典型应用场景 |
| :---: | --- | --- |
| **`1`** | **清空所有页的引用标记（Referenced bits）** | 重置内存页的访问状态。写入后结合读取 `/proc/[pid]/smaps`，可以精准测量在写入该指令**之后**，进程又实际访问/调用了哪些内存页（用于分析热点内存与 Working Set 内存大小）。 |
| **`2`** | **清空匿名页（Anonymous pages）的引用标记** | 仅针对进程堆、栈、`malloc` 分配的内存等匿名页，忽略文件映射页。 |
| **`3`** | **清空文件映射页（File-backed pages）的引用标记** | 仅针对代码段、共享库（`.so`）、`mmap` 映射的文件等页。 |
| **`4`** | **清空 Soft-Dirty 标记** | 用于**内存追踪（Memory Tracking）**。写入 `4` 会清除进程所有页的 Soft-Dirty 标记；在此之后，只要进程修改了某个页，内核就会将该页重新标记为 Dirty。这常用于**容器无缝迁移（CRIU，Checkpoint/Restore in Userspace）**或内存快照技术，以找出自上次清空以来有哪些「脏页」需要增量备份。 |
| **`5`** | **重置进程的 PSS 挂起访问（Reset Peak/Pinned PSS）** | 在某些内核版本中，用于重置与进程内存占用统计相关的状态。 |

::: caution
清空这些标记**不会释放或销毁**进程占用的内存，也不会影响进程的正常运行，它只是清除了内核用于统计和追踪的「标记位」。
:::

## 2. 经典应用场景示例

**场景一：测量进程在指定时间段内真实消耗的活跃内存（Working Set Size）**

如果我们想知道一个服务在处理某个特定请求或运行某段代码时，到底**新建或触碰了多少物理内存**：

1. **先清空引用标记**：

    ```shell
    echo 1 > /proc/[PID]/clear_refs
    ```

2. **让进程运行特定业务逻辑**（例如让 Web 服务处理 1000 个请求）。

3. **检查 `/proc/[PID]/smaps` 或 `/proc/[PID]/smaps_rollup` 中的 `Referenced` 字段**：

    ```shell
    cat /proc/[PID]/smaps_rollup | grep Referenced
    ```

    输出的 `Referenced` 大小，就是进程在执行 `echo 1` 之后**真实访问并使用过的内存总量**。

**场景二：增量内存快照与热迁移（CRIU）**

CRIU 等工具需要将运行中的容器从机器 A 迁移到机器 B：

1. 第一次先将进程的所有内存 dump 保存到磁盘。

2. 执行 `echo 4 > /proc/[PID]/clear_refs` 重置 Soft-Dirty 标记。

3. 在网络传输第一份快照的过程中，进程继续运行。

4. 随后通过检查 `/proc/[PID]/pagemap` 中带有 Soft-Dirty 标记的页，仅把这段时间内被写过/修改过的「脏页」增量传输给机器 B，从而大幅缩短迁移造成的服务暂停时间（Downtime）。

::: caution 注意事项与权限要求

1. **权限要求**：向该文件写入数据**必须具备 root 权限**（或者具备 `CAP_SYS_ADMIN` 权限），普通用户无权操作。

2. **不可读（Write-Only）**：该文件只支持写入（如 `echo 1 > /proc/[pid]/clear_refs`），如果对它执行 `cat` 读取，通常会返回空或报错。

3. **性能开销**：写入该文件会导致内核遍历进程的所有虚拟内存区域（VMA）和页表（Page Table）。对于内存占用极大（如数百 GB 内存）的进程，频繁写入 `clear_refs` 可能会带来暂时的 CPU 性能开销，生产环境需慎重评估。

:::

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
