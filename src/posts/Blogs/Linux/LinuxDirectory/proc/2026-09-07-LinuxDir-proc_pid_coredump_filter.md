---
# 文章标题
title: /proc/[pid]/coredump_filter 文件
# 当前页面的短标题，会在导航栏、侧边栏和路径导航中作为首选。
shortTitle: /proc/[pid]/coredump_filter 文件
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

`/proc/[pid]/coredump_filter` **是一个可读可写的伪文件**。

它是 Linux 内核（自 2.6.23 版本引入）暴露给用户空间的一个重要控制接口，专门用于**定义指定进程在发生崩溃（Crash / Fatal Signal）并触发 Core Dump（核心转储）时，应该将哪些类型的内存映射区（Memory Mappings）写入转储文件中**。

合理配置该文件可以有效降低 Core Dump 生成的文件体积，节省磁盘空间，同时缩短崩溃时的转储时间。

## 1. 位掩码（Bitmask）工作原理

`/proc/[pid]/coredump_filter` 的内容是一个**十六进制的位掩码（Bitmask）**。它的每一位（Bit）对应一种特定类型的内存区域。

如果某一位被设置为 `1`，当进程崩溃时，内核就会把该进程中对应类型的内存页（Pages）写入 Core 文件；如果为 `0`，则跳过该类型的内存区域。

**内核支持的各个 Bit 位说明：**

| <div style="width:60px; margin: 0 auto;">Bit 位</div> | <div style="width:60px; margin: 0 auto;">十六进制值</div> | <div style="width:150px; margin: 0 auto;">对应内存映射类型<br>(Memory Type)</div> | <div style="width:70px; margin: 0 auto;">默认状态</div> | 说明 |
| :---: | :---: | --- | :---: | --- |
| **Bit 0** | `0x01` | **Anonymous private** <br> (私有匿名内存) | 开启 (`1`) | 进程通过 `malloc`/`brk`/`mmap` 分配的普通堆、栈及私有内存。 |
| **Bit 1** | `0x02` | **Anonymous shared** <br> (共享匿名内存) | 开启 (`1`) | 进程间通过 `mmap(MAP_SHARED \| MAP_ANONYMOUS)` 共享的内存。 |
| **Bit 2** | `0x04` | **File-backed private** <br> (私有文件映射) | 关闭 (`0`) | 通过 `mmap` 以 `MAP_PRIVATE` 方式映射的文件页。 |
| **Bit 3** | `0x08` | **File-backed shared** <br> (共享文件映射) | 关闭 (`0`) | 通过 `mmap` 以 `MAP_SHARED` 方式映射的文件页。 |
| **Bit 4** | `0x10` | **ELF header** <br> (ELF 报头) | 开启 (`1`) | 可执行文件和共享库的 ELF 头部页面（Linux 2.6.24 引入，便于调试器识别 ELF 结构）。 |
| **Bit 5** | `0x20` | **Hugetlb private** <br> (私有巨页) | 关闭 (`0`) | 使用 HugeTLB（大页内存）分配的私有内存（Linux 2.6.32 引入）。 |
| **Bit 6** | `0x40` | **Hugetlb shared** <br> (共享巨页) | 关闭 (`0`) | 使用 HugeTLB 分配的共享内存（Linux 2.6.32 引入）。 |
| **Bit 7** | `0x80` | **DAX private** <br> (私有 DAX 页面) | 关闭 (`0`) | 直接访问（Direct Access）持久内存的私有页（Linux 4.12 引入）。 |
| **Bit 8** | `0x100` | **DAX shared** <br> (共享 DAX 页面) | 关闭 (`0`) | 直接访问持久内存的共享页（Linux 4.12 引入）。 |

## 2. 默认值与解读

在大部分 Linux 发行版中，查看一个新启动进程的 `coredump_filter`，通常会看到如下默认值：

```shell
$ cat /proc/self/coredump_filter
00000033
```

::: note 解析 `0x33`（二进制为 `0011 0011`）：

- Bit 0 (`0x01`) = 1：包含 **私有匿名内存**（堆、栈等关键数据）

- Bit 1 (`0x02`) = 1：包含 **共享匿名内存**

- Bit 4 (`0x10`) = 1：包含 **ELF Header**

- Bit 5 (`0x20`) = 1：包含 **私有巨页**

<font color="red"><b>注：部分内核版本的默认值为 0x33，包含了 Bit 0, 1, 4, 5 。</b></font>

这意味着：默认情况下，Linux **不会**将代码段、共享动态链接库（`.so` 文件）、普通的磁盘映射文件转储到 Core 文件中。因为调试工具（GDB）在分析时，可以直接从磁盘上的可执行文件和 `.so` 库文件中读取这些只读指令数据，没必要重复存入 Core 文件。

:::

## 3. 如何修改与配置

`coredump_filter` 支持显式写入。你可以通过 `echo` 动态修改某个正在运行的进程，也可以让程序在启动时继承父进程的掩码（子进程会继承父进程的 `coredump_filter` 设置）。

**① 临时增大 Core 文件信息量（包含所有文件映射）**

如果你在调试某些特殊的 `mmap` 文件共享问题，需要将「共享文件映射」也写入 Core 文件：

```shell
# 将 Bit 3 (0x08) 加入默认的 0x33，变为 0x3b
echo 0x3b > /proc/[PID]/coredump_filter
```

**② 极简 Core Dump（仅保留关键堆栈，节省空间）**

如果你的应用（如大型 Java 服务或数据库）占用巨大的内存，Core 文件动辄数十 GB 导致磁盘瞬间爆满，可以只保留私有匿名内存和 ELF 头（`0x01` | `0x10` = `0x11`）：

```shell
echo 0x11 > /proc/[PID]/coredump_filter
```

**③ 彻底禁用该进程生成任何 Core 内容**

```bash
echo 0x0 > /proc/[PID]/coredump_filter

```

## 4. 常见应用场景与优化建议

1. **避免 JVM / 数据库崩溃导致磁盘撑爆**：

    大型内存服务（如 MySQL、Redis、Java JVM）崩溃时，如果开启了共享内存或大页内存转储，可能会生成与物理内存一样大的 Core 文件。通过设置合理的 `coredump_filter`（如排除 Shared Memory 或 HugeTLB），可以将几万兆的 Core 文件压缩到几兆至数百兆。

2. **CRIU / 快照与离线调试**：

    在自动化测试或分布式追溯系统中，可以通过将 `coredump_filter` 设置为包含尽可能多的上下文（如 `0x3f`），保证把崩溃时的完整内存现场无死角记录下来。

3. **全局默认设置**：

    如果不希望逐个进程修改，可以通过设置内核启动参数（通过 sysctl 或 systemd 配置）或者在启动脚本中修改父进程（如 Shell 界面）的 `coredump_filter`，这样后续派生的所有子进程都会默认使用该掩码。

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
