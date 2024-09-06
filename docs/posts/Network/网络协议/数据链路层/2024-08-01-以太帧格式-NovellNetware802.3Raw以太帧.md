---
# 文章标题
title: 【转载】Novell Netware 802.3 RAW 以太帧
# 当前页面的短标题，会在导航栏、侧边栏和路径导航中作为首选。
shortTitle: Novell Netware 802.3 RAW 以太帧
# 当前页面内容描述。
description: Novell Netware 802.3 RAW 以太帧
# 当前页面的图标，建议填写
icon: Network-Protocol
# 作者
author: 昌霖学长
# 当前文章是否为原创
isOriginal: false
# 设置写作时间
date: 2024-08-01
# 分类，一个页面可以有多个分类
categories: 
  - 网络协议
# 标签，一个页面可以有多个标签
tags: 
  - 以太帧
  - "802.3"
  - Novell
  - Novell Netware
  - RAW
  - 帧格式
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

::: important 转载声明
以下内容转载自：<https://support.huawei.com/enterprise/zh/doc/EDOC1100174722/6d9d98bc>
:::

Novell Netware 802.3 Raw 帧是 Novel l在 1983 年公布的专用以太网标准帧格式，其对 IEEE 802.3 的数据字段进行了专门分隔，以便传输 NetWare 类型的数据。

## 帧格式

![IEEE 802.3 SNAP 以太帧](/assets/postsimages/2024-08-01-NovellNetware802.3Raw以太帧/NovellNetware802.3Raw以太帧.jpeg)

802.3 Raw 以太帧的帧格式中**数据链路层部分**各字段含义

| <div style="width:80px">字段</div> | <div style="width:120px">长度</div> | 含义                                                                                                                                                                                                                                                                                                                                                                                         |
| :--------------------------------: | :---------------------------------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                DMAC                |               6 字节                | 目的 MAC 地址，IPv4 为 6 字节，该字段标识帧的接收者。                                                                                                                                                                                                                                                                                                                                        |
|                SMAC                |               6 字节                | 源 MAC 地址，IPv4 为 6 字节，该字段标识帧的发送者。                                                                                                                                                                                                                                                                                                                                          |
|               Length               |               2 字节                | 指后续数据的字节长度，但不包括FCS字段。                                                                                                                                                                                                                                                                                                                                                      |
|                Data                |            44～1498 字节            | 数据字段，标识帧的负载（可能包含填充位）。<br> <br>数据字段的最小长度必须为 44 字节以保证帧长至少为 64 字节，这意味着传输 1 字节信息也必须使用 44 字节的数据字段。<br> <br>如果填入该字段的信息少于 44 字节，该字段的其余部分也必须进行填充。数据字段的最大长度为 1498 字节。<br> <br>以太帧的长度必须为整数字节，因此帧的负载长度不足整数字节，需插入填充字段以保证数据帧的长度为整数字节。 |
|                FCS                 |               4 字节                | 帧校验序列 FCS（Frame Check Sequence）是为接收者提供判断是否传输错误的一种方法，如果发现错误，丢弃此帧。<br> <br>FCS 只是通用叫法，具体的 FCS 还可以细分多种校验方法。在以太帧中，FCS 通常采用循环冗余码校验 CRC（Cyclical Redundancy Check）。                                                                                                                                              |

802.3 Raw 以太帧的帧格式中**物理层部分**各字段含义

| <div style="width:80px">字段</div> | <div style="width:120px">长度</div> | 含义                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 帧间隙                             | 至少 12 字节                        | 每个以太帧之间都要有帧间隙（Inter Frame Gap），即每发完一个帧后要等待一段时间才能再发另外一个帧，以便让帧接收者对接收的帧做必要的处理（如调整缓存的指针、更新计数、通知对报文进行处理等等）。<br> <br>在以太网标准中规定最小帧间隙是 12 个字节，其数据为全1。对于个别的接口，可减少到 64(GE) 或 40 比特 (10GE)，其他的接口都不应该小于 12 字节。 |
| 前同步码                           | 7 字节                              | 以太网标准中规定前导码为10101010 10101010 10101010 10101010 10101010 10101010 10101010（二进制），共7字节。                                                                                                                                                                                                                                      |
| 帧开始定界符                       | 1 字节                              | 以太网标准中规定帧开始定界符为 10101011（二进制），共1字节。                                                                                                                                                                                                                                                                                     |

## 参考标准

| <div style="width:120px">标准</div>                             | 描述                                                                                                             |
| --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| [IEEE 802.3](http://standards.ieee.org/getieee802/802.3.html)   | Carrier sense multiple access with collision detection (CSMA/CD) access method and physical layer specifications |
| [IEEE 802.3ae](http://standards.ieee.org/getieee802/802.3.html) | Media Access Control (MAC) Parameters, Physical Layers, and Management parameters for 10Gb/s Operation           |
| [RFC 894](https://tools.ietf.org/html/rfc894)                   | A Standard for the Transmission of IP Datagrams over Ethernet Networks                                           |
| [RFC 1042](https://tools.ietf.org/html/rfc1042)                 | A Standard for the Transmission of IP Datagrams over IEEE 802 Networks                                           |
