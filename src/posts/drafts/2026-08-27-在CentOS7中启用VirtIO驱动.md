---
# 文章标题
title: 在 CentOS 7 中启用 VirtIO 驱动
# 当前页面的短标题，会在导航栏、侧边栏和路径导航中作为首选。
shortTitle: CentOS 7 启用 VirtIO 驱动
# 当前页面内容描述。
description: 在 CentOS 中启用 VirtIO 驱动，通常只需要检查当前内核支持并将其加入临时文件系统（initramfs）即可，现代 CentOS 内核已自带该驱动模块。
# 当前页面的图标，建议填写
icon: "/assets/blogicons/CentOS.png"
# 作者
author: 昌霖学长
# 当前文章是否为原创
isOriginal: true
# 设置写作时间
date: 2026-08-27
# 分类，一个页面可以有多个分类
categories: 
  - CentOS
  - VirtIO
# 标签，一个页面可以有多个标签
tags: 
  - VirtIO
# 页面的协议信息
license: MIT 
# 置顶标记（true/false/数字），当填入数字时，数字越大，排名越靠前。
sticky: false
# 星标（true/false/数字），当填入数字时，数字越大，排名越靠前。
star: true
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

在 CentOS 中启用 VirtIO 驱动，通常只需要检查当前内核支持并将其加入临时文件系统（initramfs）即可，现代 CentOS 内核已自带该驱动模块。

## 1. 检查内核是否支持 VirtIO 驱动

运行以下命令检查当前内核配置文件，确认是否包含 VirtIO 块设备和网络驱动。

```shell
grep -E 'CONFIG_VIRTIO_BLK|CONFIG_VIRTIO_NET' /boot/config-$(uname -r)
```

根据输出信息中的参数 `CONFIG_VIRTIO_BLK` （ VirtIO 的块设备驱动）和 `CONFIG_VIRTIO_NET`（VirtIO 的网络设备驱动）的取值判断：

- **取值均为 `y`**：表示系统已正确安装 VirtIO 驱动，VirtIO 驱动已编译进内核，开机会自动加载。

- **取值均为 `m` 或一个为 `y` 一个为 `m`**：表示 VirtIO 驱动以内核模块形式存在，只需要将 VirtIO 驱动添加到临时文件系统即可。

- **没有这两个参数**：表示系统未安装 VirtIO 驱动，需要手动安装 VirtIO 驱动。

## 2. 将 VirtIO 驱动添加到临时文件系统

当内核启用了 `CONFIG_VIRTIO_BLK=m` 或 `CONFIG_VIRTIO_NET=m`，但未将这些模块添加到临时文件系统（initramfs）时，系统启动时可能无法加载 VirtIO 驱动，导致虚拟机无法识别。

1. 当 `CONFIG_VIRTIO_BLK` 和 `CONFIG_VIRTIO_NET` 参数的取值均为 `m` 或一个为 `y` 一个为 `m` 时，运行以下命令，判断 VirtIO 驱动是否已添加到临时文件系统。

    ```shell
    lsinitrd /boot/initramfs-$(uname -r).img | grep virtio
    ```

    - 如果输出中包含 `virtio_blk.ko` 和 `virtio_net.ko` 信息，表示 VirtIO 驱动已经添加到临时文件系统中。

    - 如果输出未包含 `virtio_blk.ko` 和 `virtio_net.ko` 信息或仅包含 `virtio_blk.ko` 和 `virtio_net.ko` 其中一个，则需要继续将 VirtIO 驱动添加到临时文件系统。

2. 将virtio驱动添加到临时文件系统。

    CentOS 6 / Anolis OS 7 / AlmaLinux 8 / Fedora 33 及以上版本，且内核版本高于 2.6.24（通过 `uname -r` 查询）时，执行如下操作将 VirtIO 驱动添加到临时文件系统。

    1. 编辑 `/etc/dracut.conf` 文件或者在 `/etc/dracut.conf.d/` 目录下新建一个文件（如 `virtio.conf`）。添加如下内容。

        ```text title="/etc/dracut.conf.d/virtio.conf"
        add_drivers+="virtio_blk virtio_net virtio_pci"
        ```

        ::: tip

        只需要添加取值为 `m` 的驱动。

        例如 `CONFIG_VIRTIO_NET` 参数取值为 `m` ，则只需要添加 `add_drivers+="virtio_net"` 。

        :::

    2. 执行以下命令，重新生成系统的 initramfs 镜像。

        ```shell
        dracut -f
        ```

        或者针对全部内核进行更新。

        ```shell
        dracut --regenerate-all --force
        ```

        命令执行完成后，可以执行 `echo $?` 命令查看返回是否为 `0` ，返回为 `0` 则说明已经重新生成 initramfs 镜像。

    3. 执行以下命令查看是否已将 VirtIO 驱动正确添加到临时文件系统中。

        ```shell
        lsinitrd /boot/initramfs-$(uname -r).img | grep virtio
        ```

## 3. 手动安装 VirtIO 内核

如需手动安装 VirtIO 内核，请参考 <https://help.aliyun.com/zh/ecs/user-guide/install-the-virtio-driver#0d2707c383c8y>

## 参考资料

<div class="vp-card-container" style="justify-content: flex-start;">
  <VPCard
    title="安装 virtio 驱动"
    desc="作者：阿里云"
    logo="https://img.alicdn.com/imgextra/i4/O1CN01jlcNT71YBfZJJI7qY_!!6000000003021-2-tps-128-128.png"
    link="https://help.aliyun.com/zh/ecs/user-guide/install-the-virtio-driver"
    background="rgba(253, 230, 138, 0.15)"
  />
</div>
