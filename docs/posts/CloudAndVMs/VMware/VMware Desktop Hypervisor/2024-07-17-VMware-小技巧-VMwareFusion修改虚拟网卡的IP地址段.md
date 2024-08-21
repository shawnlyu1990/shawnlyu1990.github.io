---
# 文章标题
title: 【转载】【VMware】【小技巧】VMware Fusion 修改虚拟网卡的 IP 地址段
# 当前页面的短标题，会在导航栏、侧边栏和路径导航中作为首选。
shortTitle: VMware Fusion 修改虚拟网卡的 IP 地址段
# 当前页面内容描述。
description: macOS 系统中可以使用 VMware Fusion 软件部署虚拟机，但 VMware Fusion 修改虚拟网卡的 IP 地址配置的时候不像 Windows 系统中的 VMware Workstation 那么方便，需要通过命令行编辑配置文件，这里对修改方法进行一下记录。
# 当前页面的图标，建议填写
icon: fas fa-clone
# 作者
author: 昌霖学长
# 当前文章是否为原创
isOriginal: false
# 设置写作时间
date: 2024-07-17
# 分类，一个页面可以有多个分类
categories: 
  - macOS
  - VMware Fusion
# 标签，一个页面可以有多个标签
tags: 
  - macOS
  - VMware Fusion
  - 虚拟网卡
  - IP
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

::: important
**本文转载自<https://sysin.org/blog/change-vmware-fusion-networking/>**

**在此记录备忘，请访问原文链接，查看原作者内容。**
:::

::: tip
以下所有的操作步骤都是在 macOS 系统中完成的。
:::

## 了解 VMware Fusion 中的网络类型

VMware Fusion 中的网络类型有三种。

1. **桥接网络（Bridge）- vmnet0**

    如果您的 Mac 位于以太网、无线网或 FireWire 网络中，则使用桥接网络连接通常是使您的虚拟机可以访问该网络的最简单方法。使用桥接网络连接，虚拟机将显示为与 Mac 相同的物理以太网网络中的其他计算机。

    使用桥接网络连接的虚拟机可能会使用在该虚拟机桥接到的网络上提供的任何服务 (sysin)，其中包括文件服务器、打印机和网关。同样，配置有桥接网络连接的任意物理主机或其他虚拟机可以使用虚拟机上的资源，就好像该虚拟机是同一个网络中的物理计算机。

    桥接网络适配器称为 vmnet0。在 Fusion 3.x 及更高版本中，该适配器使用 vmnet-bridge 和 vmnet-netifup 服务。

2. **仅主机型网络（Host Only） - vmnet1**

    当使用此类型的网络连接时，虚拟机将连接到虚拟专用网络中的 Mac，这在 Mac 以外通常不可见。在同一个 Mac 中配置有仅主机网络的多个虚拟机将位于同一个网络中，并且互相可见。

    仅主机网络适配器称为 vmnet1。在 Fusion 3.x 及更高版本中，该适配器使用 vmnet-dhcpd 服务。

3. **网络地址转换网络 (NAT) - vmnet8**

    如果要使用 Mac 的网络连接的方法将虚拟机连接到 Internet 或其他 TCP/IP 网络，或者无法向虚拟机提供 Mac 的网络中的 IP 地址，则此类型通常是使您的虚拟机可以访问网络的最简单方法。此类型还允许虚拟机访问 Mac 已连接到的 VPN。

    虚拟机在外部网络中没有自己的 IP 地址。相反，会在 Mac 中设置单独的专用网络。虚拟机从 VMware 虚拟 DHCP 服务器中获取该网络上的地址。除非虚拟机启动连接，否则无法直接通过除 Mac 以外的任意计算机或网站连接该虚拟机。

    NAT 网络适配器称为 vmnet8。在 Fusion 3.x 及更高版本中，该适配器使用 vmnet-natd、vmnet-dhcpd 和 vmnet-netifup 服务。

## 自定义网络 IP 地址段

VMware Fusion 有三个网络配置文件：`networking`、`dhcpd.conf` 和 `nat.conf`。

- 全局： `/Library/Preferences/VMware\ Fusion/networking`
- vmnet1：`/Library/Preferences/VMware\ Fusion/vmnet1/dhcpd.conf`
- vmnet8：`/Library/Preferences/VMware\ Fusion/vmnet8/dhcpd.conf` 和 `/Library/Preferences/VMware\ Fusion/vmnet8/nat.conf`

::: tip
本文仅以修改默认网络为例，也可以在新建网络进行自定义：“VMware Fusion” > “偏好设置…” > “网络” > “+”，默认第一个自定义网络名称为 vmnet2 对应配置文件位于 `/Library/Preferences/VMware\ Fusion/vmnet2/` 下。
:::

修改 IP 地址段步骤如下：

1. 停止 vmnet 网络服务

    执行命令：

    ```zsh
    sudo /Applications/VMware\ Fusion.app/Contents/Library/vmnet-cli --stop
    ```

2. 只需要修改 `/Library/Preferences/VMware\ Fusion/networking` 配置文件

    执行命令：

    ```zsh
    sudo vim /Library/Preferences/VMware\ Fusion/networking
    ```

    将 vmnet1 中的 IP 段修改为 192.168.1.0，将 vmnet8 中的 IP 段修改为 10.10.1.0

    ```ssh-config title="/Library/Preferences/VMware\ Fusion/networking"
    
    VERSION=1,0
    answer VNET_1_DHCP yes
    answer VNET_1_DHCP_CFG_HASH 305D3393C78096F94C8C979DF2321B14BEE94AB1
    answer VNET_1_HOSTONLY_NETMASK 255.255.255.0
    answer VNET_1_HOSTONLY_SUBNET 172.16.178.0  # 修改为 192.168.1.0（注意：默认值有一定随机性）
    answer VNET_1_VIRTUAL_ADAPTER yes
    answer VNET_8_DHCP yes
    answer VNET_8_DHCP_CFG_HASH DE662EAB01380DE3338128A859C717A8F863F3CF
    answer VNET_8_HOSTONLY_NETMASK 255.255.255.0
    answer VNET_8_HOSTONLY_SUBNET 172.16.24.0  # 修改为 10.10.1.0（注意：默认值有一定随机性）
    answer VNET_8_NAT yes
    answer VNET_8_VIRTUAL_ADAPTER yes
    ```

    ::: tip
    默认 IP 地址段是安装时随机生成的，每个人的配置都有所不同。
    :::

3. 配置网络

    执行命令：

    ```zsh
    sudo /Applications/VMware\ Fusion.app/Contents/Library/vmnet-cli --configure
    ```

    `vmnet-cli` 将根据上述修改的地址段自动修改 `dhcpd.conf` 和 `nat.conf` 中的 IP 地址。

    查看 `dhcpd.conf` 和 `nat.conf` 配置文件：

    ```zsh
    cat /Library/Preferences/VMware\ Fusion/vmnet1/dhcpd.conf

    cat /Library/Preferences/VMware\ Fusion/vmnet8/dhcpd.conf
    cat /Library/Preferences/VMware\ Fusion/vmnet8/nat.conf
    ```

    可以看到配置已经修改成功。

    ::: tip
    NAT 网关的 IP 为 `x.x.x.2`，定义在 `/Library/Preferences/VMware\ Fusion/vmnet8/nat.conf`{: .filepath} 配置文件中。
    :::

4. 启动网络服务

    执行命令：

    ```zsh
    sudo /Applications/VMware\ Fusion.app/Contents/Library/vmnet-cli --start
    ```

5. 验证

    执行命令：

    ```zsh
    ifconfig
    ```

    可以看到 vmnet1 和 vmnet8 的 IP 地址已经更改成功。

6. 虚拟机重新获取配置

    虚机如果是手动配置的 IP，直接修改即可。

    虚机如果是 DHCP，可以直接重启 VMware Fusion 或者虚拟机系统，也可以直接在虚拟机中重新获取地址，比如 Linux 命令行中执行 `sudo dhclient -v -r eth0` ，eth0 为对应网卡。

::: important
**本文转载自<https://sysin.org/blog/change-vmware-fusion-networking/>**

**在此记录备忘，请访问原文链接，查看原作者内容。**
:::
