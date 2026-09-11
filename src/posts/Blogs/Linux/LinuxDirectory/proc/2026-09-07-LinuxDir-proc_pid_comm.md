---
# 文章标题
title: /proc/[pid]/comm 文件
# 当前页面的短标题，会在导航栏、侧边栏和路径导航中作为首选。
shortTitle: /proc/[pid]/comm 文件
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

`/proc/[pid]/comm` **是一个可读可写的伪文件**。

它是 Linux 内核（自 2.6.33 内核版本起引入）暴露给用户空间的一个接口，专门用来记录和展示进程或线程的**命令名称（Command Name / Executive Name）**。

与前面介绍的 `/proc/[pid]/cmdline`（展示完整的命令行参数）不同，`comm` 文件只存储进程或线程本身的**简短名称**（默认通常是可执行文件的主文件名）。

## 1. 文件特点与限制

- **字符长度限制（最多 15 个字符）**：

    内核为 `comm` 分配的缓冲区大小为 `TASK_COMM_LEN`（固定为 16 字节，包含结尾的 `\0` NUL 字符）。因此，`comm` 中存储的进程名**最多只能包含 15 个 ASCII 字符**。如果原始程序文件名超过 15 个字符，会被内核自动截断。

- **按换行符结尾**：

    与 `/proc/[pid]/cmdline` 使用 `\0` 分隔不同，直接使用 `cat /proc/[pid]/comm` 输出的内容是以普通的换行符（`\n`）结尾的，可读性非常好，无需额外转码。

- **针对线程粒度（Thread-specific）**：

    Linux 中的每个线程（LWP）在 `/proc/[pid]/task/[tid]/` 下都有自己的 `comm` 文件。主线程与子线程可以拥有不同的 `comm` 名称。

**示例**

```shell
$ cat /proc/1/comm
systemd

$ cat /proc/self/comm
cat
```

## 2. 读与写：如何修改 `comm` 内容

与大部分只读的 `/proc` 诊断文件不同，`/proc/[pid]/comm` **支持写入**（前提是具备修改该进程的权限，一般为进程所有者或 root）。

**① 通过 `/proc/[pid]/comm` 显式写入修改：**

你可以直接向该文件写入一个新的字符串来动态改变进程在系统中的名称：

```shell
# 将当前 shell 或指定 PID 的 comm 修改为 my_worker
echo "my_worker" > /proc/12345/comm

```

**② 通过 C 代码/程序内部修改：**

程序在运行期间可以通过系统调用 `prctl` 的 `PR_SET_NAME` 选项，或者通过 `pthread_setname_np` 函数来修改自身的 `comm` 名称。这在多线程编程中非常常见（例如 给负责网络接收的线程命名为 `net_rx`，给负责磁盘写入的线程命名为 `disk_writer`）。

## 3. 主要应用场景与区别

1. **轻量级进程识别与快速过滤**：

    许多 Linux 工具（如 `killall`、`pgrep`、`pkill`、`top`、`htop`）以及 eBPF/perf 等性能追踪工具，在通过名称匹配进程时，优先读取的就是 `/proc/[pid]/comm`。因为它体积小（固定 16 字节），读取解析的速度比分析几 KB 长的 `/proc/[pid]/cmdline` 快得多。

2. **多线程程序的线程追踪**：

    在调试大型多线程应用（如 Java JVM、MySQL、Nginx）时，各个线程往往共享同一个 `cmdline`，但通过查看 `/proc/[pid]/task/[tid]/comm`，可以清晰辨别出每一个线程的实际职责。

3. **日志与审计（AuditLog / eBPF）**：

    Linux 内核审计子系统（Audit）和 eBPF 程序在记录系统调用日志时，通常会提取当前进程的 `comm` 字段作为上下文标识。

## 4. 与 `/proc/[pid]/cmdline` 及 `/proc/[pid]/exe` 的对比

| <div style="width:70px; margin: 0 auto;">对比项</div> | `/proc/[pid]/comm` | `/proc/[pid]/cmdline` | `/proc/[pid]/exe` |
| :---: | --- | --- | --- |
| **文件类型** | 普通伪文件（可读写） | 普通伪文件（只读） | **符号链接（Symlink）** |
| **代表含义** | 进程/线程的短名称（进程名） | 启动时传递的完整命令行参数 | 实际可执行二进制文件的绝对路径 |
| **长度限制** | 最长 15 个字符（超长截断） | 无硬性短限制（以 `\0` 分隔） | 路径完整长度 |
| **修改方式** | 可直接 `echo` 写入或通过 `prctl` 修改 | 只能由程序内部覆盖 `argv` 内存区域 | **不可修改**（指向真实文件物理路径） |
| **主要应用** | `pgrep` 过滤、`top` 列表、线程命名 | 查看 JVM/服务真实配置参数 | 安全审查、定位二进制程序位置 |

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
