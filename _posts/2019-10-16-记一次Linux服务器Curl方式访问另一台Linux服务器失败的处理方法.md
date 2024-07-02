---
title: 【FAQ】记一次 Linux 服务器 Curl 方式访问另一台 Linux 服务器失败的处理方法
description: Linux 问题处理
author: default
date: 2019-10-16 11:06:21 +0800
categories: [FAQ, Linux]
tags: [FAQ, Linux, CentOS, Curl]
pin: false
math: false
mermaid: false
toc: true
comments: false
---

## **问题现象**

**背景**：
内网的 Linux 服务器 A 日常需要通过 `curl` 命令连接公网的 Linux 服务器 B，传输数据并执行脚本。A 连接 B 的时候过了一个 SNAT 转换。

某日突然发现服务器 A `curl` 连接服务器 B 失败，但 `ping` 服务器 B 可通，`telnet` 443 端口也正常，检查服务器 A 和 B 的配置情况，没有修改痕迹。

执行 `curl -v https://<服务器B的域名>` 命令，发现走到 `client hello` 之后就不往下走了

苦恼了许久，最后在 Google 上找到了解决办法。特此记录

## **问题原因&解决方法**

**问题原因**：

当客户端发出的 syn 包带有时间戳的情况下，经过 NAT 转换后，如果使用的端口被之前使用过，而且时间戳大于本次 syn 包中的时间戳。系统将会直接丢弃。造成本次链接无法正常完成 TCP/IP 的3次握手。

`net.ipv4.tcp_timestamps`这个参数默认是开启的，它会复用链接，并去检查这个 IP 包里面的时间是不是比当前的时间大，如果大，那么就丢弃该包(见rfc1323，TCP相关的，网上查到的)，从而造成 SYN-SENT 发送后，没有回应。

然后检查 Linux A 服务器的时间，发现 Linux 服务器 A 的时间比 B 快了 5 分钟，基本可以确认就是这个问题了

**解决方法**：

在 Linux 服务器 A 上修改 `/etc/sysctl.conf`{: .filepath} 文件，在最后增加如下内容

```conf
# Controls the timestamps check in syn-send
# 0 --> do not check
# 1 --> check
net.ipv4.tcp_timestamps = 0
```
{: file='/etc/sysctl.conf'}

配置完成后，重载 sysctl 规则

```bash
sysctl -p
```

随后查看生效情况

```bash
sysctl -a |grep timestamp
net.ipv4.tcp_timestamps = 0
```

再在 Linux 服务器 A 上 `curl` 服务器 B，发现问题解决了。
