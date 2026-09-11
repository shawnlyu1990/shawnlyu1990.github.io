---
# 文章标题
title: /proc/[pid]/attr 目录
# 当前页面的短标题，会在导航栏、侧边栏和路径导航中作为首选。
shortTitle: /proc/[pid]/attr 目录
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

`/proc/[pid]/attr` 目录是 Linux 内核暴露给用户空间的一个重要接口，专门为 **Linux 安全模块（LSM，Linux Security Modules，如 SELinux、AppArmor、Smack 等）** 提供 API 支持。

通过读写这个目录下的各个文件，应用程序可以**查询**当前进程的安全属性，或者在运行过程中**动态改变**进程自身、子进程以及新创建的各种内核资源（文件、套接字、密钥等）的安全上下文（Security Context / Security Label）。

::: tip
只有在编译内核时启用了 `CONFIG_SECURITY` 选项（**大部分现代 Linux 发行版均已默认开启**），该目录才会存在。
:::

## 1. `/proc/[pid]/attr/current` 文件 <span id="/proc/[pid]/attr/current"/>

该文件记录并展示了当前进程实时拥有的安全上下文（Security Context）。

- 读取（Read）： 读取该文件可以获取进程当前的安全标签（在 SELinux 中对应 Domain/Label，在 AppArmor 中对应 Profile 名）。

- 写入（Write）： 允许进程向该文件写入内容，以**在运行期动态更改进程自身当前的安全上下文**。

写入权限与内核演进史：

- **Linux 2.6.11 之前**： 完全禁止写入。SELinux 限制了直接修改当前进程上下文的行为，强制要求安全上下文的转换必须通过执行新程序（即调用 execve(2) 系统调用，借助 /proc/pid/attr/exec）来完成。

- **Linux 2.6.11 ～ 2.6.27**： 开始支持单线程写入，但禁止多线程写入。只要 SELinux 策略允许，单线程进程可以通过向该文件写入新的安全上下文来实现动态转换；但为了防止共享内存空间的线程间出现上下文不一致，SELinux 在此期间严格禁止多线程程序的线程执行写入操作。

- **Linux 2.6.28 及以后**： 放宽限制，支持多线程写入。SELinux 取消了对多线程的绝对限制，开始支持多线程程序写入设置。但前提是必须满足严格条件：新的安全上下文必须与旧上下文在策略中明确声明了绑定关系，且新的安全上下文必须是旧上下文的子集（即权限缩小）。

## 2. `/proc/[pid]/attr/exec` 文件 <span id="/proc/[pid]/attr/exec"/>

该文件用于指定当前进程**下一次调用 `execve(2)` 派生/执行新程序时，新进程所要加载的目标安全上下文**。

- **背景**： 在 SELinux/LSM 中，最推荐的安全上下文转换（Domain Transition）时机就是在进程调用 `execve(2)` 启动新程序的时候，因为这能更好地实现状态隔离与标签继承控制。

- **工作机制**： 进程在执行 `execve(2)` 之前，可以先向 `/proc/self/attr/exec` 写入期望的标签。随后调用 `execve(2)` 时，新程序就会直接以该标签运行。

- **自动重置**： 当 `execve(2)` 系统调用**成功执行后**，或者显式向该文件写入空值（或换行符）时，该设置会被内核自动重置，恢复为系统策略默认的转换规则。

## 3. `/proc/[pid]/attr/fscreate` 文件 <span id="/proc/[pid]/attr/fscreate"/>

该文件用于指定当前进程**后续创建文件系统对象（文件、目录、软链接、设备节点等）时，直接赋予该对象的安全上下文**。

- **受影响的系统调用**： 包括但不限于 `open(2)`、`mkdir(2)`、`symlink(2)`、`mknod(2)` 等。

- **核心价值（消除竞态条件）**： 在没有该接口前，程序要创建一个特定标签的文件，必须「先按默认策略创建文件 → 再通过 fsetxattr 修改文件标签」。这中间存在微小的时间差（Race Condition），可能导致文件在未打上安全标签时被其他进程越权访问。通过向 fscreate 写入标签，内核能保证文件在创建的瞬间就是指定标签，做到**原子化安全创建**。

- **自动重置**： 成功调用 `execve(2)` 或向该文件写入空值后，设置会自动重置为默认策略。

## 4. `/proc/[pid]/attr/keycreate` 文件 <span id="/proc/[pid]/attr/keycreate"/>

该文件用于指定当前进程**后续创建内核密钥（Kernel Keyring / Keys）时，赋予这些密钥对象的安全上下文**。

- **作用**： Linux 内核提供了密钥保留服务（Key Retention Service，用于存储密码学密钥、Kerberos token 等敏感凭据）。如果进程向 `/proc/self/attr/keycreate` 写入了安全上下文，那么该进程之后通过 `add_key(2)` 等系统调用创建的所有内核密钥，都会直接被绑定上该安全标签，从而受 LSM 策略管辖。

- **自动重置**： 同上，在调用 `execve(2)` 或写入空值后会自动恢复默认设置。

## 5. `/proc/[pid]/attr/prev` 文件 <span id="/proc/[pid]/attr/prev"/>

该文件记录并展示了当前进程在**上一次成功执行 `execve(2)` 系统调用之前**所拥有的安全上下文（Security Context）。

- **主要作用（历史追溯与诊断）**：

    在 SELinux 等安全模块中，进程在调用 `execve(2)` 执行新程序时，往往会发生安全域转换（Domain Transition，例如从 `unconfined_t` 转换到 `httpd_t` ）。

    `prev` 文件就像是进程安全上下文的「上一步历史记录」。通过读取 `/proc/[pid]/attr/prev`，安全策略分析工具、审计日志服务或调试器可以得知当前进程**是从哪一个安全上下文（Domain）切换/派生过来的**。

- **只读属性**：

    该文件是**只读的**，不支持写入。其内容由内核在每次进程成功完成 `execve(2)` 时自动更新。

## 6. `/proc/[pid]/attr/socketcreate` 文件 <span id="/proc/[pid]/attr/socketcreate"/>

该文件用于指定当前进程**后续创建网络套接字（Socket）时，直接赋予该 Socket 对象的安全上下文**。

- **受影响的系统调用**： 包括 socket(2) 以及内部隐式创建套接字的相关调用。

- **核心价值（网络安全隔离）**：

    在 SELinux 环境下，网络套接字本身也是受控的对象资源（例如属于 tcp_socket、udp_socket 等 class）。通过向 /proc/self/attr/socketcreate 写入特定的安全标签，进程可以确保后续创建的某个 Socket 拥有特定的安全策略。这常用于**高安全性网络服务**，例如让同一个进程创建出不同安全级别的网络连接，实现细粒度的网络流量与套接字隔离。

- **自动重置**：

    与 fscreate 和 keycreate 机制一致，当进程成功调用 execve(2)，或者显式向该文件写入空值（或换行符）时，设置会被内核自动重置，恢复为系统默认的套接字创建策略。

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
