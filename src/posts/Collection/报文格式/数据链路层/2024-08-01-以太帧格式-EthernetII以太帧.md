---
# 文章标题
title: 【转载】Ethernet II 以太帧
# 当前页面的短标题，会在导航栏、侧边栏和路径导航中作为首选。
shortTitle: Ethernet II 以太帧
# 当前页面内容描述。
description: Ethernet II 以太帧
# 当前页面的图标，建议填写
icon: "/assets/blogicons/协议.png"
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
  - Ethernet II
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
以下内容转载自：<https://support.huawei.com/enterprise/zh/doc/EDOC1100174722/ea0a043c>
:::

Ethernet Ⅱ帧，也称为Ethernet V2帧，是如今局域网里最常见的以太帧，是以太网事实标准。如今大多数的TCP/IP应用（如HTTP、FTP、SMTP、POP3等）都是采用Ethernet II帧承载。

## 帧格式

![Ethernet II 以太帧](/assets/postsimages/2024-08-01-EthernetII以太帧/EthernetII以太帧.jpeg)

Ethernet II 以太帧的帧格式中**数据链路层部分**各字段含义

| <div style="width:80px">字段</div> | <div style="width:120px">长度</div> | 含义                                                                                                                                                                                                                                                                                                                                                                                         |
| :--------------------------------: | :---------------------------------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                DMAC                |               6 字节                | 目的 MAC 地址，IPv4 为 6 字节，该字段标识帧的接收者。                                                                                                                                                                                                                                                                                                                                        |
|                SMAC                |               6 字节                | 源 MAC 地址，IPv4 为 6 字节，该字段标识帧的发送者。                                                                                                                                                                                                                                                                                                                                          |
|                Type                |               2 字节                | 协议类型。下方列出了链路直接封装的协议类型。                                                                                                                                                                                                                                                                                                                                                 |
|                Data                |            46～1500 字节            | 数据字段，标识帧的负载（可能包含填充位）。<br> <br>数据字段的最小长度必须为 46 字节以保证帧长至少为 64 字节，这意味着传输 1 字节信息也必须使用 46 字节的数据字段。<br> <br>如果填入该字段的信息少于 46 字节，该字段的其余部分也必须进行填充。数据字段的最大长度为 1500 字节。<br> <br>以太帧的长度必须为整数字节，因此帧的负载长度不足整数字节，需插入填充字段以保证数据帧的长度为整数字节。 |
|                FCS                 |               4 字节                | 帧校验序列 FCS（Frame Check Sequence）是为接收者提供判断是否传输错误的一种方法，如果发现错误，丢弃此帧。<br> <br>FCS 只是通用叫法，具体的 FCS 还可以细分多种校验方法。在以太帧中，FCS 通常采用循环冗余码校验 CRC（Cyclical Redundancy Check）。                                                                                                                                              |

Ethernet II 以太帧的帧格式中**物理层部分**各字段含义

| <div style="width:80px">字段</div> | <div style="width:120px">长度</div> | 含义                                                                                                                                                                                                                                                                                                                                             |
| :--------------------------------: | :---------------------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|               帧间隙               |            至少 12 字节             | 每个以太帧之间都要有帧间隙（Inter Frame Gap），即每发完一个帧后要等待一段时间才能再发另外一个帧，以便让帧接收者对接收的帧做必要的处理（如调整缓存的指针、更新计数、通知对报文进行处理等等）。<br> <br>在以太网标准中规定最小帧间隙是 12 个字节，其数据为全1。对于个别的接口，可减少到 64(GE) 或 40 比特 (10GE)，其他的接口都不应该小于 12 字节。 |
|              前同步码              |               7 字节                | 以太网标准中规定前导码为10101010 10101010 10101010 10101010 10101010 10101010 10101010（二进制），共7字节。                                                                                                                                                                                                                                      |
|            帧开始定界符            |               1 字节                | 以太网标准中规定帧开始定界符为 10101011（二进制），共1字节。                                                                                                                                                                                                                                                                                     |

类型字段的常见值及其对应的协议

|   值   | 协议                                                                                              |
| :----: | ------------------------------------------------------------------------------------------------- |
| 0x0800 | Internet Protocol Version 4 (IPv4)                                                                |
| 0x0801 | X.75 Internet                                                                                     |
| 0x0805 | X.25 Level 3                                                                                      |
| 0x0806 | Address Resolution Protocol (ARP)                                                                 |
| 0x0808 | Frame Relay ARP                                                                                   |
| 0x22F3 | TRILL                                                                                             |
| 0x22F4 | L2-IS-IS                                                                                          |
| 0x6558 | Trans Ether Bridging                                                                              |
| 0x6559 | Raw Frame Relay                                                                                   |
| 0x8035 | Reverse Address Resolution Protocol (RARP)                                                        |
| 0x809b | Appletalk                                                                                         |
| 0x8100 | IEEE Std 802.1Q - Customer VLAN Tag Type (C-Tag, formerly called the Q-Tag) (initially Wellfleet) |
| 0x8137 | Novell NetWare IPX/SPX (old)                                                                      |
| 0x8138 | Novell, Inc.                                                                                      |
| 0x814C | SNMP over Ethernet                                                                                |
| 0x86DD | IP Protocol version 6 (IPv6)                                                                      |
| 0x876B | TCP/IP Compression                                                                                |
| 0x876C | IP Autonomous Systems                                                                             |
| 0x876D | Secure Data                                                                                       |
| 0x8808 | IEEE Std 802.3 - Ethernet Passive Optical Network (EPON)                                          |
| 0x880B | Point-to-Point Protocol (PPP)                                                                     |
| 0x880C | General Switch Management Protocol (GSMP)                                                         |
| 0x8847 | MPLS (multiprotocol label switching)                                                              |
| 0x8848 | MPLS with upstream-assigned label                                                                 |
| 0x8863 | PPP over Ethernet (PPPoE) Discovery Stage                                                         |
| 0x8864 | PPP over Ethernet (PPPoE) Session Stage                                                           |
| 0x888E | IEEE Std 802.1X - Port-based network access control                                               |
| 0x88A8 | IEEE Std 802.1Q - Service VLAN tag identifier (S-Tag)                                             |
| 0x88B7 | IEEE Std 802 - OUI Extended Ethertype                                                             |
| 0x88C7 | IEEE Std 802.11 - Pre-Authentication (802.11i)                                                    |
| 0x88CC | IEEE Std 802.1AB - Link Layer Discovery Protocol (LLDP)                                           |
| 0x88E5 | IEEE Std 802.1AE - Media Access Control Security                                                  |
| 0x88F5 | IEEE Std 802.1Q - Multiple VLAN Registration Protocol (MVRP)                                      |
| 0x88F6 | IEEE Std 802.1Q - Multiple Multicast Registration Protocol (MMRP)                                 |
| 0x893B | TRILL Fine Grained Labeling (FGL)                                                                 |
| 0x8946 | TRILL RBridge Channel                                                                             |

::: tip
更详细信息请参见 <http://www.iana.org/assignments/ieee-802-numbers/ieee-802-numbers.xhtml#ieee-802-numbers-1>。
:::

## 帧示例

```text
Frame 1: 54 bytes on wire (432 bits), 54 bytes captured (432 bits)
    Arrival Time: May  4, 2008 18:15:17.630001000 
    Epoch Time: 1209896117.630001000 seconds
    [Time delta from previous captured frame: 0.000000000 seconds]
    [Time delta from previous displayed frame: 0.000000000 seconds]
    [Time since reference or first frame: 0.000000000 seconds]
    Frame Number: 1
    Frame Length: 54 bytes (432 bits)
    Capture Length: 54 bytes (432 bits)
    [Frame is marked: False]
    [Frame is ignored: False]
    [Protocols in frame: eth:ip:tcp]
    [Coloring Rule Name: TCP]
    [Coloring Rule String: tcp]
Ethernet II, Src: CompalEl_df:d0:05 (00:0f:b0:df:d0:05), Dst: HughesNe_a9:4f:87 (00:80:ae:a9:4f:87)
    Destination: HughesNe_a9:4f:87 (00:80:ae:a9:4f:87)
        Address: HughesNe_a9:4f:87 (00:80:ae:a9:4f:87)
        .... ...0 .... .... .... .... = IG bit: Individual address (unicast)
        .... ..0. .... .... .... .... = LG bit: Globally unique address (factory default)
    Source: CompalEl_df:d0:05 (00:0f:b0:df:d0:05)
        Address: CompalEl_df:d0:05 (00:0f:b0:df:d0:05)
        .... ...0 .... .... .... .... = IG bit: Individual address (unicast)
        .... ..0. .... .... .... .... = LG bit: Globally unique address (factory default)
    Type: IP (0x0800)
Internet Protocol Version 4, Src: 192.168.128.101 (192.168.128.101), Dst: 172.25.4.24 (172.25.4.24)
    Version: 4
    Header length: 20 bytes
    Differentiated Services Field: 0x00 (DSCP 0x00: Default; ECN: 0x00: Not-ECT (Not ECN-Capable Transport))
        0000 00.. = Differentiated Services Codepoint: Default (0x00)
        .... ..00 = Explicit Congestion Notification: Not-ECT (Not ECN-Capable Transport) (0x00)
    Total Length: 40
    Identification: 0xc17e (49534)
    Flags: 0x02 (Don't Fragment)
        0... .... = Reserved bit: Not set
        .1.. .... = Don't fragment: Set
        ..0. .... = More fragments: Not set
    Fragment offset: 0
    Time to live: 128
    Protocol: TCP (6)
    Header checksum: 0x4812 [correct]
        [Good: True]
        [Bad: False]
    Source: 192.168.128.101 (192.168.128.101)
    Destination: 172.25.4.24 (172.25.4.24)
Transmission Control Protocol, Src Port: tht-treasure (1832), Dst Port: icon-discover (2799), Seq: 1, Ack: 1, Len: 0
    Source port: tht-treasure (1832)
    Destination port: icon-discover (2799)
    [Stream index: 0]
    Sequence number: 1    (relative sequence number)
    Acknowledgement number: 1    (relative ack number)
    Header length: 20 bytes
    Flags: 0x10 (ACK)
        000. .... .... = Reserved: Not set
        ...0 .... .... = Nonce: Not set
        .... 0... .... = Congestion Window Reduced (CWR): Not set
        .... .0.. .... = ECN-Echo: Not set
        .... ..0. .... = Urgent: Not set
        .... ...1 .... = Acknowledgement: Set
        .... .... 0... = Push: Not set
        .... .... .0.. = Reset: Not set
        .... .... ..0. = Syn: Not set
        .... .... ...0 = Fin: Not set
    Window size value: 17520
    [Calculated window size: 17520]
    [Window size scaling factor: -1 (unknown)]
    Checksum: 0xf893 [validation disabled]
        [Good Checksum: False]
        [Bad Checksum: False]
```

## 参考标准

| <div style="width:120px">标准</div>                             | 描述                                                                                                             |
| --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| [IEEE 802.3](http://standards.ieee.org/getieee802/802.3.html)   | Carrier sense multiple access with collision detection (CSMA/CD) access method and physical layer specifications |
| [IEEE 802.3ae](http://standards.ieee.org/getieee802/802.3.html) | Media Access Control (MAC) Parameters, Physical Layers, and Management parameters for 10Gb/s Operation           |
| [RFC 894](https://tools.ietf.org/html/rfc894)                   | A Standard for the Transmission of IP Datagrams over Ethernet Networks                                           |
| [RFC 1042](https://tools.ietf.org/html/rfc1042)                 | A Standard for the Transmission of IP Datagrams over IEEE 802 Networks                                           |
