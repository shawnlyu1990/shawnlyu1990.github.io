---
# 文章标题
title: Linux 的目录 - /Proc
# 当前页面的短标题，会在导航栏、侧边栏和路径导航中作为首选。
shortTitle: Linux 的目录 - /Proc
# 当前页面内容描述。
description: Linux 的目录 - /Proc
# 当前页面的图标，建议填写
icon: fab fa-centos
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
# 预览图。请填入绝对路径。图片路径位于 .vuepress/public 下
# cover: /assets/images/cover1.jpg
# 设置横幅图片 (宽屏分享图)，请填入绝对路径。
# banner: /assets/images/cover1.jpg
---

::: important 转载声明
本文转载自<https://mp.weixin.qq.com/s/UIZ8xnBESscPrtzYDahaUg>
:::

## proc简介

在 Linux 的根目录下存在一个 `/proc` 目录，`/proc` 文件系统是一种虚拟文件系统,以文件系统目录和文件形式,提供一个指向内核数据结构的接口，通过它能够查看和改变各种系统属性。`proc` 目录通常情况下是由系统自动挂载在 `/proc` 目录下，但是我们也可以自行手动挂载。

```shell
mount -t proc proc /proc
```

`/proc` 目录下的大部分文件都是只读的，部分文件是可写的，我们通过这些可写的文件来修改内核的一些配置;

## 目录内容说明

在/proc目录下，一般会存在如下文件和目录。

### /proc/pid

每一个 `/proc/pid` 目录中还存在一系列目录和文件，这些文件和目录记录的都是关于 pid 对应进程的信息。

例如，在 `/proc/pid` 的目录下存在一个 `task` 目录，在 `task` 目录下又存在 `task/tid` 这样的目录，这个目录就是包含此进程中的每个线程的信息，其中的 tid 是内核线程的 tid ；通过　GETDENTS(2)　遍历 `/proc` 就能够看到所有的 `/proc/pid` 的目录，当然通过 `ls -al /proc` 的方式也可以看到所有的信息。

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

## 文件和目录

在第一节主要是对 `/proc` 目录进行了一个简单的介绍，本章节则主要是关注 `/proc/pid` 中记录的进程的具体的信息。

### /proc/pid

每一个运行的进程都存在pid，对应的在 `/proc` 就存在一个 `/proc/pid` 的目录，这个 `/proc/pid` 目录也是一个伪文件系统。通常情况下每个 `/proc/pid` 是属于运行进程的有效用户的UID和GID。但是如果一个进程的 dumpable 属性的值大于 １ ，从安全角度考虑，`/proc/pid` 的属性就是 `root:root`。

在 4.11 的内核版本之前，`root:root` 表示的是全局 UID 和 GID （在初始化的用户空间中的 UID 和 GID 都是 0)。

但是在 4.11 之后的内核版本，如果这个进程不是在初始化的用户空间中，它的 UID 却是 0，那么对应的 `/proc/pid` 的权限也是 `root:root`。这就意味着在 docker 容器内，如果将进程的 PID 设置为 0，那么这个进程在容器内就是以 root 权限运行的。

进程的 dumpable 的属性可能因为如下的原因发生改变：

- 通过 prctl 设置了 `PR_SET_DUMPABLE` 属性
- 通过 `/proc/sys/fs/suid_dumpable` 文件修改

将 dumpable 重置为 １，就可以恢复 `/proc/[pid]/*` 文件到进程有效的 UID 和 GID。

### /proc/pid/attr

`/proc/pid/attr` 是一个目录，这个目录下的文件的作用是为安全模块提供了 API。通过这些文件我们可以读取或者设置一些安全相关的选项。这个目录目前能够支持 SELinux，但是本意是为了能够支持更多的其他的安全模块。以下将会演示 SELinux 如何使用这些文件。

::: tip
只有内核开启了 CONFIG_SECURITY 选项，才能够看到这个目录。
:::

#### /proc/pid/attr/current

这个文件的内容记录了当前进程的安全属性。

在 SELinux 中，这个文件主要是用于得到当前进程的安全上下文。

在 2.6.11 的内核之前，这个文件不能用来设置安全上下文（写操作是不允许的），因为 SELinux 限制了进程安全转换为 EXECVE(2) （参考下方的[/proc/pid/attr/exec](#1)）。

从 2.6.11 之后，SELinux 取消了这个限制。如果策略允许，SELinux 通过向这个文件写入来支持设置行为，虽然这个操作仅仅只是为了维护老的上下文和新的上下文的隔离。

在 2.6.28 之前，SELinux 不允许多线程程序的线程通过这个值来设置安全上下文，因为这样会导致共享内存空间的县城的安全上下文不一致。

从 2.6.28 之后，SELinux 取消了这个限制，开始支持多线程的设置方法。但是需要满足一定的条件，新的安全上下文需要绑定在老的上下文上，并且这个绑定关系是设置在策略当中的，同时新的安全上下文是老的安全上下文的一个子集。

#### [/proc/pid/attr/exec](#1)

这个文件代表给进程的 execve 的属性。

在 SELinux 中，有时候需要支持 role/domain 的转换，execve(2)一般都是作为这种转换的首选，因为它提供了对进程的新的安全标签和状态继承的更好的控制。在 SELinux 中，如果重置了 execve(2)，那么这个程序就会恢复到 execve(2) 所设置的状态。

#### /proc/pid/attr/fscreate

这个文件代表进程与文件有关的权限，包括open(2) mkdir(2) symlink(2) mknod(2)

SELinux通过此文件能够保证以一个安全的方式创建文件，所以这里不会存在不安全的访问的风险(在文件创建和文件属性设置)。如果重置了execve(2)，那么程序也会被重置，包括程序所创建的文件。

#### /proc/pid/attr/keycreate

如果进程将安全上下文写入此文件，那么所有创建key的行为都会被加载到此上下文中。更多的信息可以参考内核文件**Documentation/security/keys/core.rst**（在Linux3.0和Linux4.13中文件是**Documentation/security/keys.txt，**在Linux3.0之前是**Documentation/keys.txt**）

#### /proc/pid/attr/prev

这个文件包含了进程在执行最后一个execve(2)的安全上下文。换句话说，这个文件的内容是`/proc/pid/attr/current`前一个值。

#### /proc/pid/attr/socketcreate

如果一个进程向这个文件写入安全上下文，那么之后所有的sockets的创建行为都会在此进程上下文中;

### /proc/pid/autogroup

参考 sched(7)

### /proc/pid/auxv

这个文件包含了在进程执行时，传递给进程的ELF的解释器的信息。这个文件的格式是一个无符号的long类型的ID加上每个entry的一个无符号的long类型，这最后的一个entry包含了两个零。参考 getauxval(3)。

### /proc/pid/cgroup

参考 cgroups(7)

### /proc/pid/clear_refs

这是一个只写文件，只有进程的owner能够写。只有下面这些值能够被写入：

1. (Since Linux 2.6.22)对进程所有的相关的页重置所有的`PG_Referenced`和`ACCESSED/YOUNG`位（在2.6.32之前，任何的非零的值写入到此文件都是有效的）
2. (Since Linux2.6.32) 对进程所有的匿名页重置所有的`PG_Referenced`和`ACCESSED/YOUNG`位
3. (Since Linux2.6.32)对进程所有的与文件相关的页重置所有的`PG_Referenced`和`ACCESSED/YOUNG`位。清除所有的`PG_Referenced`和`ACCESSED/YOUNG`提供了一个方法用于测量一个进程是有了多少内存。第一个可以参考的是`/proc/[pid]/smaps`中的`VMAs`中的值。当清除了`PG_Referenced`和`ACCESSED/YOUNG`经过一段时间之后，再次测量这个值．
4. (Since Linux3.11) 清空掉进程所有的页的`soft-dirty`位。通过向`/proc/[pid]/clear_refs`清空，就能够知道哪些页是被污染了．
5. 将peak resident重置为进程当前的resident的大小．

如果向`/proc/pid/clear_refs`写入其他的任何值，不会有任何的效果；只有当启用了`CONFGI_PROC_PAGE_MONITOR`的内核选项时，才会出现`/proc/pid/clear_refs`文件

### /proc/pid/cmdline

这个只读文件是包含了进程执行的完整命令。如果此进程是一个僵尸进程，那么此文件没有任何的内容。

### /proc/pid/comm

此文件记录的是进程命令的comm。在同一个进程中的不同线程的comm可能不同，可以访问`/proc/[pid]/task/tid/comm`获取进程中的每个线程的comm。通过向`/proc/self/task/tid/comm`写入就能够修改自己或者其他线程的comm。如果comm超过`TASK_COMM_LEN(16)`就会被截断。

这个文件的值可以通过prctl(2)的`PR_SET_NAME`和`PR_GET_NAME`的操作来设置和获取，通过 `pthread_setname_np(3)`能够设置线程的comm。

### /proc/pid/coredump_filter

参考 core(5)

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
