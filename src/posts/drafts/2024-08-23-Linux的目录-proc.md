---
# 文章标题
title: Linux 的目录 - /proc
# 当前页面的短标题，会在导航栏、侧边栏和路径导航中作为首选。
shortTitle: Linux 的目录 - /proc
# 当前页面内容描述。
description: Linux 的目录 - /proc
# 当前页面的图标，建议填写
icon: "/assets/blogicons/目录树.png"
# 作者
author: 昌霖学长
# 当前文章是否为原创
isOriginal: true
# 设置写作时间
date: 2024-08-23
# 分类，一个页面可以有多个分类
categories: 
  - Linux
  - 目录结构
# 标签，一个页面可以有多个标签
tags: 
  - 目录结构
  - Linux
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

`/proc` 是 Linux 系统中的一种虚拟文件系统（伪文件系统，procfs）。它并不占用实际的磁盘空间，而是作为指向内核数据结构的接口，以文件和目录的形式呈现系统的实时运行状态与内核配置。

系统启动时会自动将 procfs 挂载到根目录下的 `/proc` 中，也可以通过以下命令手动挂载：

```shell
mount -t proc none /proc
```

::: note 参数说明

- `mount`：挂载命令。用于将一个文件系统附加到 Linux 系统目录树中的指定位置。

- `-t proc`：指定文件系统类型（Type）。`-t` 参数告诉 `mount` 后面的文件系统格式。这里的 `proc` 表示要挂载的是 Linux 内核提供的 procfs（虚拟进程文件系统）。

- `none`：挂载源 / 设备（Source/Device）。通常挂载普通磁盘时这里填物理设备路径（如 `/dev/sda1`）。但 proc 是纯粹基于内存和内核数据结构的「伪文件系统」，并没有物理块设备存在，因此这里填 none 表示「无物理设备」。(注：此处填 `proc` 或 `procfs` 效果通常也相同，只是占位符)

- `/proc`：挂载点（Mount Point）。即文件系统在用户空间中的访问入口。挂载完成后，所有对 `/proc` 目录的访问都会被内核拦截并映射为对内核数据的读取。

:::

`/proc` 目录下的文件大多数是只读的（用于提供进程状态、内存利用率、硬件信息等），但 `/proc/sys/` 目录下的许多文件支持写入，允许管理员在不重启系统的前提下动态修改内核运行参数。

<br>

<br>

## `/proc/[pid]` 目录 <span id="/proc/[pid]"/>

每一个运行的进程都存在一个 PID ，在 `/proc` 下对应存在一个 `/proc/[pid]` 目录。通常情况下，`/proc/[pid]` 目录所属的 UID 和 GID 即为该进程的有效用户 ID（EUID）和有效组 ID（EGID）。

但是，如果一个进程由于安全限制（如 运行了 SUID 程序）导致其 dumpable 属性被关闭，为了安全考虑，内核会将该进程 `/proc/[pid]` 的所属用户和组重置为 `root:root`，以防止未授权的用户读取其内存或调试该进程。

在 Linux 4.11 内核之前，此处的 `root:root` 指的是宿主机的全局 UID 0 和 GID 0。而在 4.11 及之后的内核中，为了支持 User Namespace（用户命名空间），内核会将该目录的所有者映射为该 Namespace 内的 root 用户。

进程的 dumpable 属性可以通过以下方式改变：

- 调用 `prctl(PR_SET_DUMPABLE, ...)` 接口

- 修改 `/proc/sys/fs/suid_dumpable` 内核参数

将 dumpable 重新设置为 1 后，`/proc/[pid]` 目录及其下属文件的权限就会恢复为进程当前的有效 UID 和 GID。

<br>

<br>

### `/proc/[pid]/attr` 目录 <span id="/proc/[pid]/attr"/>

`/proc/[pid]/attr` 目录是 Linux 内核暴露给用户空间的一个重要接口，专门为 **Linux 安全模块（LSM，Linux Security Modules，如 SELinux、AppArmor、Smack 等）** 提供 API 支持。

通过读写这个目录下的各个文件，应用程序可以**查询**当前进程的安全属性，或者在运行过程中**动态改变**进程自身、子进程以及新创建的各种内核资源（文件、套接字、密钥等）的安全上下文（Security Context / Security Label）。

::: tip
只有在编译内核时启用了 `CONFIG_SECURITY` 选项（**大部分现代 Linux 发行版均已默认开启**），该目录才会存在。
:::

#### (1) `/proc/[pid]/attr/current` 文件 <span id="/proc/[pid]/attr/current"/>

该文件记录并展示了当前进程实时拥有的安全上下文（Security Context）。

- 读取（Read）： 读取该文件可以获取进程当前的安全标签（在 SELinux 中对应 Domain/Label，在 AppArmor 中对应 Profile 名）。

- 写入（Write）： 允许进程向该文件写入内容，以**在运行期动态更改进程自身当前的安全上下文**。

写入权限与内核演进史：

- **Linux 2.6.11 之前**： 完全禁止写入。SELinux 限制了直接修改当前进程上下文的行为，强制要求安全上下文的转换必须通过执行新程序（即调用 execve(2) 系统调用，借助 /proc/pid/attr/exec）来完成。

- **Linux 2.6.11 ～ 2.6.27**： 开始支持单线程写入，但禁止多线程写入。只要 SELinux 策略允许，单线程进程可以通过向该文件写入新的安全上下文来实现动态转换；但为了防止共享内存空间的线程间出现上下文不一致，SELinux 在此期间严格禁止多线程程序的线程执行写入操作。

- **Linux 2.6.28 及以后**： 放宽限制，支持多线程写入。SELinux 取消了对多线程的绝对限制，开始支持多线程程序写入设置。但前提是必须满足严格条件：新的安全上下文必须与旧上下文在策略中明确声明了绑定关系，且新的安全上下文必须是旧上下文的子集（即权限缩小）。

#### (2) `/proc/[pid]/attr/exec` 文件 <span id="/proc/[pid]/attr/exec"/>

该文件用于指定当前进程**下一次调用 `execve(2)` 派生/执行新程序时，新进程所要加载的目标安全上下文**。

- **背景**： 在 SELinux/LSM 中，最推荐的安全上下文转换（Domain Transition）时机就是在进程调用 `execve(2)` 启动新程序的时候，因为这能更好地实现状态隔离与标签继承控制。

- **工作机制**： 进程在执行 `execve(2)` 之前，可以先向 `/proc/self/attr/exec` 写入期望的标签。随后调用 `execve(2)` 时，新程序就会直接以该标签运行。

- **自动重置**： 当 `execve(2)` 系统调用**成功执行后**，或者显式向该文件写入空值（或换行符）时，该设置会被内核自动重置，恢复为系统策略默认的转换规则。

#### (3) `/proc/[pid]/attr/fscreate` 文件 <span id="/proc/[pid]/attr/fscreate"/>

该文件用于指定当前进程**后续创建文件系统对象（文件、目录、软链接、设备节点等）时，直接赋予该对象的安全上下文**。

- **受影响的系统调用**： 包括但不限于 `open(2)`、`mkdir(2)`、`symlink(2)`、`mknod(2)` 等。

- **核心价值（消除竞态条件）**： 在没有该接口前，程序要创建一个特定标签的文件，必须「先按默认策略创建文件 → 再通过 fsetxattr 修改文件标签」。这中间存在微小的时间差（Race Condition），可能导致文件在未打上安全标签时被其他进程越权访问。通过向 fscreate 写入标签，内核能保证文件在创建的瞬间就是指定标签，做到**原子化安全创建**。

- **自动重置**： 成功调用 `execve(2)` 或向该文件写入空值后，设置会自动重置为默认策略。

#### (4) `/proc/[pid]/attr/keycreate` 文件 <span id="/proc/[pid]/attr/keycreate"/>

该文件用于指定当前进程**后续创建内核密钥（Kernel Keyring / Keys）时，赋予这些密钥对象的安全上下文**。

- **作用**： Linux 内核提供了密钥保留服务（Key Retention Service，用于存储密码学密钥、Kerberos token 等敏感凭据）。如果进程向 `/proc/self/attr/keycreate` 写入了安全上下文，那么该进程之后通过 `add_key(2)` 等系统调用创建的所有内核密钥，都会直接被绑定上该安全标签，从而受 LSM 策略管辖。

- **自动重置**： 同上，在调用 `execve(2)` 或写入空值后会自动恢复默认设置。

#### (5) `/proc/[pid]/attr/prev` 文件 <span id="/proc/[pid]/attr/prev"/>

该文件记录并展示了当前进程在**上一次成功执行 `execve(2)` 系统调用之前**所拥有的安全上下文（Security Context）。

- **主要作用（历史追溯与诊断）**：

    在 SELinux 等安全模块中，进程在调用 `execve(2)` 执行新程序时，往往会发生安全域转换（Domain Transition，例如从 `unconfined_t` 转换到 `httpd_t` ）。

    `prev` 文件就像是进程安全上下文的「上一步历史记录」。通过读取 `/proc/[pid]/attr/prev`，安全策略分析工具、审计日志服务或调试器可以得知当前进程**是从哪一个安全上下文（Domain）切换/派生过来的**。

- **只读属性**：

    该文件是**只读的**，不支持写入。其内容由内核在每次进程成功完成 `execve(2)` 时自动更新。

#### (6) `/proc/[pid]/attr/socketcreate` 文件 <span id="/proc/[pid]/attr/socketcreate"/>

该文件用于指定当前进程**后续创建网络套接字（Socket）时，直接赋予该 Socket 对象的安全上下文**。

- **受影响的系统调用**： 包括 socket(2) 以及内部隐式创建套接字的相关调用。

- **核心价值（网络安全隔离）**：

    在 SELinux 环境下，网络套接字本身也是受控的对象资源（例如属于 tcp_socket、udp_socket 等 class）。通过向 /proc/self/attr/socketcreate 写入特定的安全标签，进程可以确保后续创建的某个 Socket 拥有特定的安全策略。这常用于**高安全性网络服务**，例如让同一个进程创建出不同安全级别的网络连接，实现细粒度的网络流量与套接字隔离。

- **自动重置**：

    与 fscreate 和 keycreate 机制一致，当进程成功调用 execve(2)，或者显式向该文件写入空值（或换行符）时，设置会被内核自动重置，恢复为系统默认的套接字创建策略。

<br>

<br>

---

<br>

### `/proc/[pid]/autogroup` 文件 <span id="/proc/[pid]/autogroup"/>

`/proc/[pid]/autogroup` 是 Linux 内核中用于**进程自动分组（Autogroup）与 CPU 调度优化**的文件接口。

通过该文件，管理员或应用程序可以查看、修改指定进程所在的自动分组（Autogroup）以及该分组的 **CPU 调度权重（nice 值）**。

#### (1) 什么是 Autogroup（自动分组）？

Autogroup（自动分组功能）在 Linux 2.6.38 内核中引入，旨在解决桌面交互或多任务环境下的 **CPU 抢占与卡顿问题**。

在没有 Autogroup 之前，Linux 的 CFS（完全公平调度器）是**按线程/进程**分配 CPU 资源的。这会导致一个问题：

如果你在终端里运行了一个并发编译任务（如 `make -j64` 生成 64 个进程），同时在另一个终端运行视频播放器或浏览器（1 个进程）。CPU 资源会被这 65 个进程平分，导致编译任务抢占了 98% 的 CPU 资源，界面瞬间卡死。

**Autogroup 的解决方案：**

内核通过会话（Session，通常对应一个终端窗口）对进程进行自动分组。

- 运行 `make -j64` 的终端窗口会被归为 **Group A**；
- 运行视频播放器的终端窗口会被归为 **Group B**。
- CFS 调度器首先在 **Group A 和 Group B 之间平分 CPU 资源**（各占 50%）。然后，Group A 内部的 64 个进程再平分属于它们的那 50% CPU。
- 这样一来，无论一个终端里创建了多少个子进程，都不会导致其他终端或桌面应用失去响应。

#### (2) `/proc/[pid]/autogroup` 的文件内容与含义

查看某个进程的 `/proc/[pid]/autogroup` 文件，会输出类似以下内容：

```shell
cat /proc/12345/autogroup

/autogroup-20 nice 0
```

::: note 参数解释

- **`/autogroup-20`**：表示该进程当前所属的 Autogroup ID（这里是第 20 号自动分组）。所有从同一个终端会话（Session）派生出的进程，默认都会分配到同一个 `autogroup-ID` 中。

- **`nice 0`**：表示**整个 Autogroup 分组**的调度优先级权重（nice 值）。默认值为 `0`，取值范围与普通进程的 nice 值相同（`-20` 到 `19`）。

:::

#### (3) 如何使用与控制 `/proc/[pid]/autogroup`？

你可以通过向该文件写入值，动态调整**整个分组**的 CPU 优先级，或者将进程从 Autogroup 中移出。

**① 修改整个分组的 CPU 优先级**

直接向 `/proc/[pid]/autogroup` 写入一个新的 nice 值（必须具备相应权限，如降低 nice 值需要 root 权限）：

```shell
# 将进程 12345 所在的分组优先级降低（nice 值设为 10，让出 CPU）
echo 10 > /proc/12345/autogroup
```

::: caution
修改的是**整个分组**的 nice 值，这意味着与该进程属于同一个终端会话（同属 `/autogroup-20`）的所有进程，其分组 nice 值都会同步变为 `10`。
:::

**② 查看与开关全局 Autogroup 功能**

Autogroup 是一个内核配置项（`CONFIG_SCHED_AUTOGROUP`），可以通过 `/proc/sys/kernel/sched_autogroup_enabled` 进行全局开关：

```shell
# 查看是否开启（1 为开启，0 为关闭）
cat /proc/sys/kernel/sched_autogroup_enabled

# 临时关闭全局 autogroup
echo 0 > /proc/sys/kernel/sched_autogroup_enabled
```

#### (4) 常见应用场景与注意事项

1. **后台耗时任务降权**：如果在某个终端里运行大型编译或渲染任务，可以找到其中任意一个子进程的 PID，直接执行 `echo 15 > /proc/[pid]/autogroup`，就能瞬间将该终端下所有相关子进程的 CPU 抢占权重降下来，避免影响系统其他操作。

2. **与 cgroups（控制组）的关系**：Autogroup 实际上是内核基于 `cgroups` 的 `cpu` 子系统实现的一种轻量级自动机制。如果一个进程被显式移动到了非根节点的 cgroup（例如 Docker 容器或 systemd 服务组）中，Autogroup 对该进程的管制会自动失效，优先以 cgroup 的资源限制为准。

<br>

<br>

---

<br>

### `/proc/[pid]/auxv` 文件 <span id="/proc/[pid]/auxv"/>

它是 Linux 内核暴露给用户空间的一个关键接口，包含了内核在创建进程（通过 `execve` 系统调用）时传递给该进程的辅助向量（Auxiliary Vector，简称 auxv）数据。

#### (1) 什么是辅助向量（Auxiliary Vector）？

当内核加载并启动一个二进制可执行程序时，需要将一些与**系统硬件、内核状态、动态链接器（`ld-linux.so`）运行环境**相关的关键信息传递给新进程。

这些信息的传递位置与环境变量（`environ`）**和**命令行参数（`argv`）放在同一个内存区域（进程栈空间的最顶部）。辅助向量本质上是一个以 `AT_NULL` 结尾的 **键值对（Key-Value）数组**。

辅助向量包含的关键信息包括：

- **系统页大小（Page Size）**（如 `AT_PAGESZ`）

- **动态链接器（解释器）的加载基地址**（如 `AT_BASE`）

- **程序头表（ELF Program Headers）的位置和数量**（如 `AT_PHDR`、`AT_PHNUM`）

- **运行进程的真实与有效用户/组 ID**（如 `AT_UID`、`AT_EUID`）

- **硬件平台特性（CPU Capabilities）**（如 `AT_HWCAP`，表示 CPU 支持的指令集，如 AVX, SSE 等）

- **安全的随机数种子指针**（如 `AT_RANDOM`，用于 stack canary 等安全防护）

#### (2) `/proc/[pid]/auxv` 的文件内容格式

`/proc/[pid]/auxv` 存放的是**原始二进制数据**，格式与 C 语言结构体 `Elf32_auxv_t` 或 `Elf64_auxv_t` 一致。在 64 位系统上，每个条目占 **16 字节**（8 字节类型 `a_type` + 8 字节数值 `a_val`）。

由于是二进制文件，直接用 `cat` 命令查看会看到乱码。通常需要借助 `hexdump`、`xxd` 或 `LD_SHOW_AUXV` 环境变量来解析。

**查看解析内容的方式**

**方式一：使用 `LD_SHOW_AUXV`（查看当前终端命令的 auxv）**

```shell
LD_SHOW_AUXV=1 ls
```

输出示例如下：

```text
AT_SYSINFO_EHDR: 0x7ffd5f7de000
AT_HWCAP:        bfebfbff
AT_PAGESZ:       4096
AT_CLKTCK:       100
AT_PHDR:         0x55d21a200040
AT_PHENT:        56
AT_PHNUM:        11
AT_BASE:         0x7f035a200000
AT_FLAGS:        0x0
AT_ENTRY:        0x55d21a204cc0
AT_UID:          1000
AT_EUID:         1000
AT_GID:          1000
AT_EGID:         1000
AT_SECURE:       0
AT_RANDOM:       0x7ffd5f7de0b9
AT_EXECFN:       /usr/bin/ls
AT_PLATFORM:     x86_64
```

**方式二：直接读取指定进程的 `/proc/[pid]/auxv**`**

可以通过写一个小程序，或者结合 Linux 工具解析指定 PID 的 `auxv`：

```shell
# 读取 PID 1 的 auxv 并按 16 字节（64位系统）二进制格式排版输出
hexdump -e '2/8 "%016x " "\n"' /proc/1/auxv
```

#### (3) 主要作用与应用场景

1. **动态链接器（`ld-linux.so`）初始化**：

    程序刚启动时，动态链接器首先读取 `auxv` 中的 `AT_PHDR`（程序头）、`AT_BASE`（解释器基址）、`AT_ENTRY`（入口地址）等信息，据此重定位内存、加载共享库（`.so`）并完成初始化。

2. **C 标准库（glibc）与 CPU 优化**：

    glibc 读取 `AT_HWCAP` 和 `AT_PLATFORM` 来判断当前 CPU 支持哪些高级指令集（如 AVX-512、NEON），从而在运行 `memcpy`、`memset` 等底层函数时自动选用性能最高的汇编实现。

3. **安全与漏洞防护**：

    - `AT_RANDOM` 提供了 16 字节的随机数指针，用于初始化栈保护器（Stack Canary，防止缓冲区溢出攻击）和 ASLR 随机化。

    - `AT_SECURE` 用于标记该程序是否通过 `suid`/`sgid` 提权运行。如果是，动态链接器会禁用某些危险的环境变量（如 `LD_PRELOAD`），防止越权提权。

4. **调试器与逆向工程（GDB / Profiler）**：

    GDB 等调试工具在 Attach 到一个正在运行的进程时，可以通过读取 `/proc/[pid]/auxv` 快速获取该进程的共享库加载信息、VDSO 页地址以及架构相关配置，从而建立准确的调试符号映射。

<br>

<br>

---

<br>

### `/proc/[pid]/cgroup` 文件 <span id="/proc/[pid]/cgroup"/>

它是 Linux 内核暴露给用户空间的一个重要接口，用来显示指定进程（PID）当前所属的 **cgroup（Control Groups，控制组）** 层次结构与分组路径。

cgroup 是 Linux 内核提供的一种机制，用于对进程进行**资源限制（CPU、内存、磁盘 I/O、网络等）、优先权分配、计费和隔离**。容器技术（如 Docker、Containerd、Kubernetes）高度依赖 cgroup 来实现容器的资源隔离与配额控制。

#### (1) `/proc/[pid]/cgroup` 的文件内容格式

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

#### (2) 主要应用场景与作用

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

<br>

<br>

---

<br>

### `/proc/[pid]/clear_refs` 文件 <span id="/proc/[pid]/clear_refs"/>

`/proc/[pid]/clear_refs` **是一个只写文件**，读取该文件永远返回 0 或无内容。

它是 Linux 内核暴露给管理员和分析工具的一个特殊接口，用于**重置（清空）指定进程的页表（Page Table）引用标志位或脏页（Dirty）标记**。该功能在内存性能分析、泄漏排查以及统计进程实际内存占用（如 PSS/RSS）时非常有用。

#### (1) 核心作用与工作原理

Linux 内核在管理内存页（Page）时，会通过页表项（PTE）中的某些 **Bit 位**（如 Referenced bit / Accessed bit / Dirty bit）来记录这个内存页最近是否被访问过或修改过。

当你向 `/proc/[pid]/clear_refs` 写入不同的数字指令时，内核会遍历该进程的所有内存映射区（VMA），将其页表项中的对应标记位复位（置 0）。

**常见的写入值及其作用如下：**

| <div style="width:70px; margin: 0 auto;">写入的值</div> | <div style="width:120px; margin: 0 auto;">含义与作用</div> | 典型应用场景 |
| :---: | --- | --- |
| **`1`** | **清空所有页的引用标记（Referenced bits）** | 重置内存页的访问状态。写入后结合读取 `/proc/[pid]/smaps`，可以精准测量在写入该指令**之后**，进程又实际访问/调用了哪些内存页（用于分析热点内存与 Working Set 内存大小）。 |
| **`2`** | **清空匿名页（Anonymous pages）的引用标记** | 仅针对进程堆、栈、`malloc` 分配的内存等匿名页，忽略文件映射页。 |
| **`3`** | **清空文件映射页（File-backed pages）的引用标记** | 仅针对代码段、共享库（`.so`）、`mmap` 映射的文件等页。 |
| **`4`** | **清空 Soft-Dirty 标记** | 用于**内存追踪（Memory Tracking）**。写入 `4` 会清除进程所有页的 Soft-Dirty 标记；在此之后，只要进程修改了某个页，内核就会将该页重新标记为 Dirty。这常用于**容器无缝迁移（CRIU，Checkpoint/Restore in Userspace）**或内存快照技术，以找出自上次清空以来有哪些「脏页」需要增量备份。 |
| **`5`** | **重置进程的 PSS 挂起访问（Reset Peak/Pinned PSS）** | 在某些内核版本中，用于重置与进程内存占用统计相关的状态。 |

::: caution
清空这些标记**不会释放或销毁**进程占用的内存，也不会影响进程的正常运行，它只是清除了内核用于统计和追踪的「标记位」。
:::

#### (2) 经典应用场景示例

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

<br>

<br>

---

<br>

### `/proc/[pid]/cmdline` 文件 <span id="/proc/[pid]/cmdline"/>

`/proc/[pid]/cmdline` **是一个只读的伪文件**。

它是 Linux 内核暴露给用户空间的一个重要接口，记录了指定进程在启动时传递给它的**完整命令行参数（Command-Line Arguments）**。我们平时使用的 `ps`、`top`、`htop` 等系统监控工具，就是通过读取这个文件来展示进程的名称和启动命令的。

#### (1) 文件内容格式与特殊之处

`/proc/[pid]/cmdline` 的内容在表面上看似乎是一串连续的字符串，但其内部格式有一个**非常关键的细节**：

- **分隔符是 NUL 字符（`\0`）**：内核在存储命令行参数时，使用空字符（NUL byte, ASCII 码 `0`）来分隔各个参数，**而不是空格**。文件的末尾通常也是以 `\0` 结尾。

- **空进程/僵尸进程**：

- 如果进程已经变成了**僵尸进程（Zombie Process）**，读取该文件会返回**空内容**（0 字节）。

- 对于**内核线程（Kernel Threads）**（例如 `kthreadd`、`kworker` 等），该文件内容同样为空。

#### (2) 如何正确查看与解析

::: tip

如果直接在终端中执行：

```shell
cat /proc/1/cmdline
```

由于终端无法直观打印 `\0` 字符，输出结果可能会把所有参数粘连在一起（如 `/sbin/initlsb_option...`），或者不换行。
:::

在命令行中，我们可以利用 `tr` 或 `xxd` 工具将 `\0` 替换为常规的空格或换行符，以便阅读：

**方法一：将 `\0` 替换为空格**

```shell
tr '\0' ' ' < /proc/1/cmdline; echo
```

**输出示例：**

```text
/sbin/init splash
```

**方法二：逐行打印各个参数（非常适合查看长参数命令）**

```shell
strings /proc/1/cmdline
# 或者
tr '\0' '\n' < /proc/1/cmdline
```

**输出示例（以 Java 服务为例）：**

```text
java
-jar
-Xms512m
-Xmx2048m
/app/server.jar
--spring.profiles.active=prod
```

#### (3) 主要作用与应用场景

1. **监控与故障排查**：

    - **查看服务的真实启动参数**：在确认某个后台进程（如 MySQL、Java、Nginx）启动时到底加载了哪些配置文件或 JVM 参数时，读取 `/proc/[pid]/cmdline` 是最直接、最权威的方式。

2. **自动化脚本与工具开发**：

    - **判断进程身份**：运维脚本可以通过检查 `/proc/self/cmdline` 或任意 PID 的 `cmdline` 来确认目标进程是否是期望运行的程序。

    - **提取容器/进程 ID**：许多 Agent 监控程序通过正则表达式解析 `cmdline` 中的某些特定启动标记。

3. **安全审计与进程隐藏检测**：

    - **识别恶意进程伪装**：有些进程在 `ps` 中显示的名字可以被程序修改（通过修改 `argv[0]` 或 `prctl(PR_SET_NAME)`），但 `/proc/[pid]/cmdline` 在进程启动之初就记录了真实的内存区域。安全工具常通过对比 `cmdline` 和 `/proc/[pid]/exe`（指向实际二进制文件的软链接）来检测进程是否伪装了名称。

::: caution 注意事项与安全风险

1. **写操作说明**：

    - 虽然有些 C 语言程序在运行过程中可以通过直接修改 `argv[0]` 的内存区域来改变 `/proc/[pid]/cmdline` 的展示内容（许多 Linux 服务如 Nginx、PostgreSQL 用此技术来更新进程在 `ps` 中的状态，如 `nginx: worker process`），但这属于进程内部对自己栈内存的修改，**用户无法通过向 `/proc/[pid]/cmdline` 文件执行 `write` 或 `echo` 来改变它**。

2. **敏感信息泄露风险**：

    - 如果在启动程序时直接将数据库密码、Token 等敏感信息作为命令行参数传递（例如 `mysql -u root -p123456`），任何有权限读取该进程 `/proc/[pid]/cmdline` 的普通用户或恶意程序都可以直接获取这些明文密码。

    - **最佳实践**：敏感配置应通过环境变量（`/proc/[pid]/environ`）或配置文件传递，避免直接写在命令行参数中。

:::

<br>

<br>

---

<br>

### `/proc/[pid]/comm` 文件 <span id="/proc/[pid]/comm"/>

`/proc/[pid]/comm` **是一个可读可写的伪文件**。

它是 Linux 内核（自 2.6.33 内核版本起引入）暴露给用户空间的一个接口，专门用来记录和展示进程或线程的**命令名称（Command Name / Executive Name）**。

与前面介绍的 `/proc/[pid]/cmdline`（展示完整的命令行参数）不同，`comm` 文件只存储进程或线程本身的**简短名称**（默认通常是可执行文件的主文件名）。

#### (1) 文件特点与限制

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

#### (2) 读与写：如何修改 `comm` 内容

与大部分只读的 `/proc` 诊断文件不同，`/proc/[pid]/comm` **支持写入**（前提是具备修改该进程的权限，一般为进程所有者或 root）。

**① 通过 `/proc/[pid]/comm` 显式写入修改：**

你可以直接向该文件写入一个新的字符串来动态改变进程在系统中的名称：

```shell
# 将当前 shell 或指定 PID 的 comm 修改为 my_worker
echo "my_worker" > /proc/12345/comm

```

**② 通过 C 代码/程序内部修改：**

程序在运行期间可以通过系统调用 `prctl` 的 `PR_SET_NAME` 选项，或者通过 `pthread_setname_np` 函数来修改自身的 `comm` 名称。这在多线程编程中非常常见（例如 给负责网络接收的线程命名为 `net_rx`，给负责磁盘写入的线程命名为 `disk_writer`）。

#### (3) 主要应用场景与区别

1. **轻量级进程识别与快速过滤**：

    许多 Linux 工具（如 `killall`、`pgrep`、`pkill`、`top`、`htop`）以及 eBPF/perf 等性能追踪工具，在通过名称匹配进程时，优先读取的就是 `/proc/[pid]/comm`。因为它体积小（固定 16 字节），读取解析的速度比分析几 KB 长的 `/proc/[pid]/cmdline` 快得多。

2. **多线程程序的线程追踪**：

    在调试大型多线程应用（如 Java JVM、MySQL、Nginx）时，各个线程往往共享同一个 `cmdline`，但通过查看 `/proc/[pid]/task/[tid]/comm`，可以清晰辨别出每一个线程的实际职责。

3. **日志与审计（AuditLog / eBPF）**：

    Linux 内核审计子系统（Audit）和 eBPF 程序在记录系统调用日志时，通常会提取当前进程的 `comm` 字段作为上下文标识。

#### (4) 与 `/proc/[pid]/cmdline` 及 `/proc/[pid]/exe` 的对比

| <div style="width:70px; margin: 0 auto;">对比项</div> | `/proc/[pid]/comm` | `/proc/[pid]/cmdline` | `/proc/[pid]/exe` |
| :---: | --- | --- | --- |
| **文件类型** | 普通伪文件（可读写） | 普通伪文件（只读） | **符号链接（Symlink）** |
| **代表含义** | 进程/线程的短名称（进程名） | 启动时传递的完整命令行参数 | 实际可执行二进制文件的绝对路径 |
| **长度限制** | 最长 15 个字符（超长截断） | 无硬性短限制（以 `\0` 分隔） | 路径完整长度 |
| **修改方式** | 可直接 `echo` 写入或通过 `prctl` 修改 | 只能由程序内部覆盖 `argv` 内存区域 | **不可修改**（指向真实文件物理路径） |
| **主要应用** | `pgrep` 过滤、`top` 列表、线程命名 | 查看 JVM/服务真实配置参数 | 安全审查、定位二进制程序位置 |

<br>

<br>

---

<br>

### `/proc/[pid]/coredump_filter` 文件 <span id="/proc/[pid]/coredump_filter"/>

`/proc/[pid]/coredump_filter` **是一个可读可写的伪文件**。

它是 Linux 内核（自 2.6.23 版本引入）暴露给用户空间的一个重要控制接口，专门用于**定义指定进程在发生崩溃（Crash / Fatal Signal）并触发 Core Dump（核心转储）时，应该将哪些类型的内存映射区（Memory Mappings）写入转储文件中**。

合理配置该文件可以有效降低 Core Dump 生成的文件体积，节省磁盘 space，同时缩短崩溃时的转储时间。

#### (1) 位掩码（Bitmask）工作原理

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

#### (2) 默认值与解读

在大部分 Linux 发行版中，查看一个新启动进程的 `coredump_filter`，通常会看到如下默认值：

```shell
$ cat /proc/self/coredump_filter
00000033
```

::: note 解析 `0x33`（二进制为 `0011 0011`）：**

- Bit 0 (`0x01`) = 1：包含 **私有匿名内存**（堆、栈等关键数据）

- Bit 1 (`0x02`) = 1：包含 **共享匿名内存**

- Bit 4 (`0x10`) = 1：包含 **ELF Header**

- Bit 5 (`0x20`) = 1：包含 **私有巨页** <font color="red"><b>(注：部分内核版本的默认值为 0x33，包含了 Bit 0, 1, 4, 5)</b></font>

这意味着：默认情况下，Linux **不会**将代码段、共享动态链接库（`.so` 文件）、普通的磁盘映射文件转储到 Core 文件中。因为调试工具（GDB）在分析时，可以直接从磁盘上的可执行文件和 `.so` 库文件中读取这些只读指令数据，没必要重复存入 Core 文件。

:::

#### (3) 如何修改与配置

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

#### (4) 常见应用场景与优化建议

1. **避免 JVM / 数据库崩溃导致磁盘撑爆**：

    大型内存服务（如 MySQL、Redis、Java JVM）崩溃时，如果开启了共享内存或大页内存转储，可能会生成与物理内存一样大的 Core 文件。通过设置合理的 `coredump_filter`（如排除 Shared Memory 或 HugeTLB），可以将几万兆的 Core 文件压缩到几兆至数百兆。

2. **CRIU / 快照与离线调试**：

    在自动化测试或分布式追溯系统中，可以通过将 `coredump_filter` 设置为包含尽可能多的上下文（如 `0x3f`），保证把崩溃时的完整内存现场无死角记录下来。

3. **全局默认设置**：

    如果不希望逐个进程修改，可以通过设置内核启动参数（通过 sysctl 或 systemd 配置）或者在启动脚本中修改父进程（如 Shell 界面）的 `coredump_filter`，这样后续派生的所有子进程都会默认使用该掩码。

<br>

<br>

---

<br>

### /proc/pid/cpuset

参考cpuset(7)

### /proc/pid/cwd

这是一个当前的进程的工作目录。比如如果想要知道pid为4451的进程的工作目录，可以通过如下的命令查看：

```shell
cd /proc/4451/cwd; /bin/pwd
```

在bash环境下，可能会出现`/bin/pwd: couldn’t find directory entry in ‘..’ with matching i-node`的错误，这是因为pwd通常是shell内置的，需要使用这样的命令：

```shell
/proc/4451/cwd; pwd -P
```

在多线程的程序中，如果主线程已经退出了，那么cwd的结果就是空。

取消或者是读取(readlink(2))这个链接的内容的权限是由ptrace的访问模式`PTRACE_MODE_READ_FSCREDS`来控制的，参考ptrace(2)。

### /proc/pid/environ

这个文件包含的是当程序使用execve启动程序时的环境变量的值，其中的entries是通过0x0分割的，结尾是可能是null。如果我们需要查询一个指定的进程的环境变量，我们可以采用如下的方法：

```shell
＃cat /proc/4451/environ | tr '\000' '\n'  
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin  
HOSTNAME=commoncollection  
LANG=C.UTF-8  
JAVA_HOME=/docker-java-home/jre  
JAVA_VERSION=8u212  
JAVA_DEBIAN_VERSION=8u212-b01-1~deb9u1  
HOME=/root
```

如果执行了execve(2)之后，进程调用了putenv(3)或者是直接修改environ(7) ，那么environ变量的值是无法随之改变的。

更进一步，进程能够通过prctl(2)修改`PR_SET_MM_ENV_START`的值来修改这个文件所引用的内存位置。

读取这个文件的权限是由ptrace(2)的`PTRACE_MODE_READ_FSCREDS`来控制。

### /proc/pid/exe

在Linux2.2的内核及其之后，`/proc/pid/exe`是直接执行的二进制文件的符号链接。这个符号链接能够被取消。尝试打开这个文件就相当与打开了二进制文件，甚至可以通过重新输入`/proc/pid/exe`重新运行一个对应于pid的二进制文件。在一个多线程的程序中，如果主线程已经退出了，就无法访问这个符号链接。

在Linux2.0及其之前`，/proc/pid/exe`是指向当前进程执行的二进制文件。采用readlink()读取返回如下的结果: `[device]:inode`。

### /proc/pid/fd

这是一个子目录，包含了当前进程打开的每一个文件。每一个条目都是一个文件描述符，是一个符号链接，指向的是实际打开的地址。0表示标准输入，1表示标准输出，2表示标准错误。在多线程程序中，如果主程序退出了，那么这个文件夹将不能被访问。

程序能够使用文件名作为命令行参数，如果没有提供这样的参数，就不会从标准输入中读取信息也不会将标准输出发送到文件中。但是即使没有提供与文件相关的命令行参数，我们仍然可以使用标准的输出输入。例如我们可以通过`-i`和`-o`分别指向输入和输出文件。如下所示:

```shell
$ foobar -i /proc/self/fd/0 -o /proc/self/fd/1 ...
```

在某些UNIX或者类似UNIX的系统中，`/proc/self/fd/N`与`/dev/fd/N`大致相同。大部分系统提供`/dev/stdin`，`/dev/stdout`，`/dev/stderr`的符号链接，分别只想的是`/proc/self/fd`中的0，1，2。所以上述的命令也可以写为：

```shell
$ foobar -i /dev/stdin -o /dev/stdout ...
```

### /proc/pid/fdinfo/

这是一个子目录，包括了当前进程打开的所有的文件的文件描述符。可以读取每一个文件描述符的内容一获取inode信息。如下所示：

```shell
$ cat  /proc/5040/fdinfo/99  
pos:    21718  
flags:  0100000  
mnt_id: 27
    
# pos 是十进制,显示当前文件的偏移量
# flag是八进制,显示文件的访问模式和文件状态标志.
```

该目录中的文件只有进程的所有者才可以读.

### /proc/pid/limits

该文件显示了每个进程的软中断，硬中断和度量单位。在Linux2.6.35之前，这个文件仅仅只能被进程实际的UID访问。在2.6.36之后，该文件可以被系统中所有的用户读取。

### /proc/pid/maps

包含了当前进程映射的内存区域以及他们的访问权限。文件格式如下:

```shell
address           perms offset  dev   inode   pathname  
08048000-08056000 r-xp 00000000 03:0c 64593   /usr/sbin/gpm  
08056000-08058000 rw-p 0000d000 03:0c 64593   /usr/sbin/gpm  
08058000-0805b000 rwxp 00000000 00:00 0  
40000000-40013000 r-xp 00000000 03:0c 4165    /lib/ld-2.2.4.so  
40013000-40015000 rw-p 00012000 03:0c 4165    /lib/ld-2.2.4.so  
4001f000-40135000 r-xp 00000000 03:0c 45494   /lib/libc-2.2.4.so  
40135000-4013e000 rw-p 00115000 03:0c 45494   /lib/libc-2.2.4.so  
4013e000-40142000 rw-p 00000000 00:00 0  
bffff000-c0000000 rwxp 00000000 00:00 0

# address,表示进程占用的地址.
# perms, 表示一系列权限.r=read,w=write,x=execute,s=shared,p=private(copy on write)
# offset, 表示文件偏移量
# dev:表示设备 (主要设备,次要设备)
# inode: 表示设备上面的inode编号.如果是0,表示没有索引节点与内存区域关联,就如同BSS段一样.
# pathname,在Linux2.0之前,没有pathname字段.
```

### /proc/pid/mem

该文件可以通过open、read、seek访问进程的内存页。

### /proc/pid/mountinfo

这个文件主要是包含了挂载信息。文件内容结构如下：

```shell
36 35 98:0 /mnt1 /mnt2 rw,noatime master:1 - ext3 /dev/root rw,errors=continue  
(1)(2)(3)   (4)   (5)      (6)       (7)  (8) (9)     (10)            (11)

（1） mount ID,挂载点的唯一标识
（2） parent ID,当前挂载点的父挂载点的ID
（3） major:minor, files的st_dev的值
（4） root: 文件系统的根挂载点
（5） mount point: 相对于进程根目录的挂载点
（6） mount options: 预挂载选项
（7） options fields: `tag:[value]`类型的字段
（8） sparator: options fields结束标志
（9） file systemtype: 文件系统的名称,以`type[.subtype]`的方式命名
（10） mount source: 文件特定信息
（11） super options: 超级块选项
```

### /proc/pid/mounts

列出在当前进程挂载空间下所有的已经挂载过的文件。文件的格式通过 fstab 查看。在kernel 2.6.15之后，这个文件是论询式的。在读取文件之后，这个事件会导致select标记这个文件是可读的，并且pool()和epoll_wait()会将此文件标记为遇到了错误。

### /proc/pid/mountstas

该文件会列举在当前进程挂载空间下的所有挂载点的详细信息，包括统计信息，配置信息。文件格式如下:

```shell
device    /dev/sda7    mounted     on    /home with fstype ext3 [statistics]  
            （1）                         （2）             （3）     （4）

（1）挂载的设备名
（2）挂载点
（3）文件系统类型
（4）可选的统计和配置信息.在2.6.26之后,仅NFS文件系统可以到处此字段信息
```

### /proc/pid/ns/

这是一个子目录。每一个子目录可以通过 setns 操作。关于更多的操作，参见clone。

#### /proc/pid/ns/ipc

将文件挂载在其他地方可以使pid指定的进程的IPC命名空间保持活动状态，即使在当前命名空间的所有的进程全部都截止了。打开次文件就会返回文件句柄。只要文件保持打开状态，那么IPC的命名空间就可以保持活动状态。文件描述符可以通过 setns 传递。

#### /proc/pid/ns/net

将文件挂载在其他地方可以使pid指定的进程的网络命名空间保持活动状态，即使在当前命名空间的所有的进程全部都截止了。打开次文件就会返回文件句柄。只要文件保持打开状态，那么网络的命名空间就可以保持活动状态。文件描述符可以通过 setns 传递。

#### /proc/pid/ns/uts

将文件挂载在其他地方可以使pid指定的进程的UTS 命名空间保持活动状态，即使在当前命名空间的所有的进程全部都截止了。打开次文件就会返回文件句柄。只要文件保持打开状态，那么UTS命名空间就可以保持活动状态。文件描述符可以通过 setns 传递。

### /proc/pid/numa_maps

参见 numa

### /proc/pid/oom_adj

这个方法用于决定在出现OOM（Out of Memory）的情况下，哪个进程被杀掉。内核使用该值对进程的oom_score的值进行设定，oom_score的有效取值区间是-17至15。-17将会完全杀死这个进程。正数会增加进程当oom时被杀掉的可能性，负数会减小进程被oom杀掉的可能性。

该文件的默认值是0。新进程会继承其父进程的oom_adj设置。只有具有CAP_SYS_RESOURCE权限的进程才能够更新此文件。

在Linux2.6.36，推荐使用`/proc/[pid]/oom_score_adj`。

### /proc/pid/oom_score

该文件显示了如果内核出现oom情况时决定杀死该进程时的分数。分数越高意味着进程越容易被杀掉。

### /proc/pid/oom_adj_score

这个文件用于调整在内存不足时应该杀掉哪个进程的分数判断。

### /proc/pid/root

该值可以用于 chroot 预先设定进程的根文件系统。这个文件指向当前进程的根目录。作业类似于前面说过的 `exe fd/*` 等等。

在多线程的程序中，如果主线程推出了此符号链接的内容将无法访问。

### /proc/pid/smaps

这个文件显示了每个进程映射的内存消耗。每一个内存消耗都有如下的设置：

```shell
08048000-080bc000 r-xp 00000000 03:02 13130      /bin/bash  
Size:               464 kB  
Rss:                424 kB  
Shared_Clean:       424 kB  
Shared_Dirty:         0 kB  
Private_Clean:        0 kB  
Private_Dirty:        0 kB
```

第一行显示的信息与`/proc/[pid]/maps`中的映射信息相同。剩下分别表示的是，映射的大小，RAM中当前驻留的映射大小，映射中干净和脏共享页的大小以及映射中干净和脏共享私有页数。

只有在启用了CONFIG_MMU内核配置选项时，此文件才会存在。

### /proc/pid/stat

关于进程的状态信息。主要是用于 ps 展示。

### /proc/pid/statm

提供内存的使用情况。格式如下所示：
```shell
size       (1) total program size  
           (same as VmSize in /proc/[pid]/status)  
resident   (2) resident set size  
           (same as VmRSS in /proc/[pid]/status)  
share      (3) shared pages (i.e., backed by a file)  
text       (4) text (code)  
lib        (5) library (unused in Linux 2.6)  
data       (6) data + stack  
dt         (7) dirty pages (unused in Linux 2.6)
```

### /proc/pid/status

以更加可读的形式提供与`/proc/pid/stat`和`/proc/pid/statm`一样的信息。以下是示例。
```shell
$ cat /proc/$$/status  
Name:   bash  
State:  S (sleeping)  
Tgid:   3515  
Pid:    3515  
PPid:   3452  
TracerPid:      0  
Uid:    1000    1000    1000    1000  
Gid:    100     100     100     100  
FDSize: 256  
Groups: 16 33 100  
VmPeak:     9136 kB  
VmSize:     7896 kB  
VmLck:         0 kB  
VmHWM:      7572 kB  
VmRSS:      6316 kB  
VmData:     5224 kB  
VmStk:        88 kB  
VmExe:       572 kB  
VmLib:      1708 kB  
VmPTE:        20 kB  
Threads:        1  
SigQ:   0/3067  
SigPnd: 0000000000000000  
ShdPnd: 0000000000000000  
SigBlk: 0000000000010000  
SigIgn: 0000000000384004  
SigCgt: 000000004b813efb  
CapInh: 0000000000000000  
CapPrm: 0000000000000000  
CapEff: 0000000000000000  
CapBnd: ffffffffffffffff  
Cpus_allowed:   00000001  
Cpus_allowed_list:      0  
Mems_allowed:   1  
Mems_allowed_list:      0  
voluntary_ctxt_switches:        150  
nonvoluntary_ctxt_switches:     545
```

### /proc/pid/task

该目录包含的是进程中的每一个线程。每一个目录的名字是以线程ID命名的(tid)。在每一个tid下面的目录结构与`/proc/pid`下面的目录结构相同。对于所有线程共享的属性，`task/tid`子目录中的每个文件内容与`/proc/pid`目录中的相应文件内容相同。例如所有线程中的`task/tid/cwd`文件和父目录中的`/proc/pid/cwd`文件内容相同，因为所有的线程共享一个工作目录。对于每个线程的不同属性，`task/tid`下相应文件的值也不相同。

### /proc/cmdline

在引导时传递给内核的参数

### /proc/cpuinfo

cpu和系统结构的信息。常见信息包括CPU的数量以及常见的系统常数。

### /proc/meminfo

此文件包含了系统当前内存的使用信息。free 用来报告系统中可用内存和已使用内存(物理内存和交换内存)以及内核中共享内存和缓冲区的大小。每一行都是以 `参数名:参数值` 显示。格式如下所示:

```shell
$ cat /proc/$$/status  
Name:   bash  
State:  S (sleeping)  
Tgid:   3515  
Pid:    3515  
PPid:   3452  
TracerPid:      0  
Uid:    1000    1000    1000    1000  
Gid:    100     100     100     100  
FDSize: 256  
Groups: 16 33 100  
.......
```

### /proc/modules

显示当前加载到系统中所有的模块。

### /proc/mounts

在内核2.4.19之前，这个文件会列举当前系统中挂载的所有的节点信息。

在2.4.19之后，仅仅只会列举出当前进程在mount的命名空间下的挂载信息，即/proc/self/mounts的挂载信息，参见 fstab。

### /proc/net

此目录下面个中文虚拟的文件系统，主要是记录了系统中各种与网络有关的信息。这个文件都是普通ASCII文件，都可以通过cat的方式读取。

### /proc/net/arp

此文件主要是包含了用于地址解析的内核ARP表的信息。示例如下:

 ```shell
 IP address     HW type   Flags     HW address          Mask   Device  
 192.168.0.50   0x1       0x2       00:50:BF:25:68:F3   *      eth0  
 192.168.0.250  0x1       0xc       00:00:00:00:00:00   *      eth0
 
 # IP address 是主机的IPv4的地址
 # HW type 是来自与RFC826的硬件类型的地址
 # Flags 是ARP 结构中的内部标识 参见 /usr/include/linux/if_arp.h
 # HW address 是数据链路层的映射地址
 ```

### /proc/net/dev

dev虚拟文件系统显示网络状态的信息，包括发送和接受的数据包的数量，错误和冲突以及其他的统计信息，这些信息也可以通过ifconfig查看。示例如下：

```shell
Inter-|   Receive                                                |  Transmit  
face |bytes    packets errs drop fifo frame compressed multicast|bytes    packets errs drop fifo colls carrier compressed  
lo: 2776770   11307    0    0    0     0          0         0  2776770   11307    0    0    0     0       0          0  
eth0: 1215645    2751    0    0    0     0          0         0  1782404    4324    0    0    0   427       0          0  
ppp0: 1622270    5552    1    0    0     0          0         0   354130    5669    0    0    0     0       0          0  
tap0:    7714      81    0    0    0     0          0         0     7714      81    0    0    0     0       0
```

### /proc/net/raw

存储的是RAW套接字表的信息

### /proc/net/snmp

保存的是SNMP代理的IP，ICMP以及UDP的管理信息

### /proc/net/tcp

保存的是系统中的TCP表的信息

### /proc/net/udp

保存的是系统中的UDP表的信息

### /proc/net/unix

显示当前系统所有的UNIX domain socket以及它们的状态信息。示例如下:

```shell
Num RefCount Protocol Flags    Type St Path  
0: 00000002 00000000 00000000 0001 03  
1: 00000001 00000000 00010000 0001 01 /dev/printer

# Num 是kernle table slot number
# Refcount 是使用这个套接字的用户数
# Protocol 当前永远是0
# Flags 表示当前内部内核标志 用于表示套接字状态
# Type 当前永远是1
# St 套接字内部状态
# Path 是套接字绑定路径
```

### /proc/stat

内核/系统的信息

### /proc/sys

该目录下有很多的目录和子目录，其中主要是记录了与内核变量相关的信息。



### /proc/tid

`/proc/tid` 每一个 `/proc/tid` 目录中还存在一系列目录和文件，这些文件和目录记录的都是有关线程 tid 对应的信息，这些信息与具体的 `/proc/pid/task/tid` 的目录相同，所记录的信息也是相同的。

我们遍历 `/proc` 时并不能看到 `/proc/tid` 的信息，同样通过 `ls -al /proc` 的方式也无法看到。但是虽然无法看到，但是却可以通过 `cd /proc/tid` 进入到这个线程的内部；传统的通过 `ps | grep tid` 是无法看到信息的，通过 `ps -T -p pid` 的方式就能够看到 tid 的信息。

### /proc/self

这是一个 link，当进程访问此链接时，就会访问这个进程本身的 `/proc/pid` 目录，如下所示：

```shell
ls -al  /proc/self  
lrwxrwxrwx 1 root root 0 Jun  4 17:08 /proc/self -> 32193
```

### /proc/thread-self

这是一个 link，当访问次链接时，就会访问进程的 `/proc/self/task/tid` 目录。

```shell
ls -al /proc/thread-self  
lrwxrwxrwx 1 root root 0 Jun  4 17:08 /proc/thread-self -> 32265/task/32265
```

### /proc/[a-z]*

`/proc/[a-z]*` ， `/proc` 下面还有许多其他的文件，记录了系统中的各种信息，Linux /proc、/dev Principle　这篇文章对proc目录下的文件进行了详细的说明.



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
