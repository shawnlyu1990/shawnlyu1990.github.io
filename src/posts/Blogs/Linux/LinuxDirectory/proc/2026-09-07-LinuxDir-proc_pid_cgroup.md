---
# 文章标题
title: /proc/[pid]/cgroup 文件
# 当前页面的短标题，会在导航栏、侧边栏和路径导航中作为首选。
shortTitle: /proc/[pid]/cgroup 文件
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

它是 Linux 内核暴露给用户空间的一个重要接口，用来显示指定进程（PID）当前所属的 **cgroup（Control Groups，控制组）** 层次结构与分组路径。

cgroup 是 Linux 内核提供的一种机制，用于对进程进行**资源限制（CPU、内存、磁盘 I/O、网络等）、优先权分配、计费和隔离**。容器技术（如 Docker、Containerd、Kubernetes）高度依赖 cgroup 来实现容器的资源隔离与配额控制。

## 1. `/proc/[pid]/cgroup` 的文件内容格式

直接使用 `cat /proc/[pid]/cgroup` 可以查看指定进程的资源分组情况。

由于 Linux 存在 **cgroup v1** 和 **cgroup v2** 两种版本，不同系统或混合模式下的输出格式有所不同：

**① cgroup v1 模式下的输出格式**

在传统 cgroup v1 中，每种资源（CPU、内存、磁盘等）都是独立的子系统（Subsystem/Controller），每一行代表一个子系统，格式为：

```text
hierarchy-ID:controller-list:cgroup-path
```

**输出示例：**

```text
11:memory:/docker/a1b2c3d4e5f6...
10:pids:/docker/a1b2c3d4e5f6...
9:blkio:/docker/a1b2c3d4e5f6...
8:cpu,cpuacct:/docker/a1b2c3d4e5f6...
1:name=systemd:/user.slice/user-1000.slice/session-1.scope
```

- **hierarchy-ID**：层次结构 ID。若为 `0`，通常表示该控制器属于 cgroup v2；若大于 `0`，则表示 cgroup v1 的不同控制器树。

- **controller-list**：该行对应的控制器/子系统名称（如 `memory`、`cpu`、`pids` 等）。

- **cgroup-path**：该进程在对应 cgroup 挂载点下的相对路径。例如 `/docker/a1b2c3d4e5f6...` 表示该进程位于该 Docker 容器对应的资源控制组内。

**② cgroup v2 模式下的输出格式**

在统一的 cgroup v2（Unified Hierarchy）中，所有控制器共享一棵树，因此通常只包含一行，格式固定为：

```text
0::/cgroup-path
```

**输出示例：**

```text
0::/user.slice/user-1000.slice/session-2.scope
# 或者在 Docker/Podman 容器内部：
0::/system.slice/docker-a1b2c3d4e5f6...scope
```

- `0`：固定的 hierarchy-ID。

- `::`：中间没有控制器名称，因为所有控制器统一管理。

- `/cgroup-path`：进程在统一 cgroup v2 树中的相对路径。

## 2. 主要应用场景与作用

1. **容器环境识别与诊断**：

    - **判断是否在容器内**：很多程序通过读取自身的 `/proc/self/cgroup` 来判断自己是运行在宿主机上，还是运行在 Docker/K8s 容器内部（如果路径中包含 `docker`、`kubepods`、`pod` 等关键字）。

    - **查找容器 ID**：容器运行时（Runtime）或安全监控 Agent 可以读取 `/proc/[pid]/cgroup` 中的路径后缀，快速提取出该进程对应的 Docker/Containerd Container ID。

1. **定位资源的物理控制文件**：

    - `/proc/[pid]/cgroup` 给出的是**相对路径**。结合 cgroup 的挂载点（通常在 `/sys/fs/cgroup/`），管理员或工具可以定位到具体的控制文件。

    - 例如：若 `/proc/1234/cgroup` 中 `memory` 的路径为 `/docker/abc`，那么对应的内存限制配置文件就是 `/sys/fs/cgroup/memory/docker/abc/memory.limit_in_bytes`（cgroup v1）。

1. **辅助监视与诊断工具（如 `ps`、`top`、`systemd-cgtop`）**：

    - `systemd` 使用 cgroup 来跟踪服务进程。通过读取进程的 cgroup 路径，`systemd` 或 `ps -o cgroup` 可以明确区分某个进程属于哪一个 systemd 服务（`*.service`）、用户会话（`session-*.scope`）或切片（`*.slice`）。

1. **进程资源监控**：

    - 监控 Agent（如 Prometheus Node Exporter、Datadog Agent）通过扫描 `/proc/[pid]/cgroup` 将系统中的所有进程按 Cgroup/容器分组，从而统计出每个容器或服务消耗的实际 CPU 和内存资源。

::: caution 注意事项

- **`/proc/[pid]/cgroup` 是只读的**。要修改进程的 cgroup 归属，不能直接写这个文件，而是需要向 `/sys/fs/cgroup/.../cgroup.procs` 文件写入该进程的 PID。

- **`/proc/self/cgroup` 是 `/proc/[pid]/cgroup` 的软链接**：任何进程都可以通过读取 `/proc/self/cgroup` 来获取**当前进程自身（ `self` 会被自动替换为当前进程的 pid 值）**的 cgroup 分组信息。

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
