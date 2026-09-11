---
title: /proc
index: false
icon: /assets/blogicons/目录树.png
article: false
timeline: false
comment: false
dir:
  # 目录标题，默认用上面的 title 的值
  text: /proc
  # 目录图标，默认用上面的 icon 的值
  icon: "/assets/blogicons/目录树.png"
  # 目录是否可折叠，默认 true
  collapsible: true
  # 目录是否默认展开，默认 false
  expanded: false
  # 目录是否可点击，默认 false
  link: false
  # 是否索引此目录，默认 true
  index: true
---

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


<div class="catalog-display-container">
  <Catalog hideHeading />
</div>
