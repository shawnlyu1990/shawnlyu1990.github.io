import{w as t,G as p,z as d,C as r,D as n,N as s,J as e,M as i,K as l}from"./app-DdAVEwod.js";const c="/assets/postsimages/2024-08-01-QinQ%E5%B8%A7%E6%A0%BC%E5%BC%8F/QinQ%E5%B8%A7%E6%A0%BC%E5%BC%8F.jpeg",o={},v=l('<div class="hint-container important"><p class="hint-container-title">转载声明</p><p>以下内容转载自：<a href="https://support.huawei.com/enterprise/zh/doc/EDOC1100174722/e4e9d43e" target="_blank" rel="noopener noreferrer">https://support.huawei.com/enterprise/zh/doc/EDOC1100174722/e4e9d43e</a></p></div><p>QinQ 是对 802.1Q（VLAN） 的扩展，其核心思想是将用户私网 VLAN tag 封装到公网 VLAN tag 中，报文带着两层 tag 穿越服务商的骨干网络，从而为用户提供一种较为简单的二层 VPN 隧道。QinQ 报文有固定的格式，就是在 802.1Q 的标签之上再打一层 802.1Q 标签，QinQ 报文比 802.1Q（VLAN） 报文多 4 字节。</p><h2 id="帧格式" tabindex="-1"><a class="header-anchor" href="#帧格式"><span>帧格式</span></a></h2><figure><img src="'+c+'" alt="QinQ 帧格式" tabindex="0" loading="lazy"><figcaption>QinQ 帧格式</figcaption></figure><p>QinQ帧的链路层各字段含义</p>',5),u=n("thead",null,[n("tr",null,[n("th",{style:{"text-align":"center"}},[n("div",{style:{width:"80px"}},"字段")]),n("th",{style:{"text-align":"center"}},[n("div",{style:{width:"120px"}},"长度")]),n("th",null,"含义")])],-1),m=n("tr",null,[n("td",{style:{"text-align":"center"}},"DMAC"),n("td",{style:{"text-align":"center"}},"6 字节"),n("td",null,"目的 MAC 地址，该字段标识帧的接收者。")],-1),b=n("tr",null,[n("td",{style:{"text-align":"center"}},"SMAC"),n("td",{style:{"text-align":"center"}},"6 字节"),n("td",null,"源 MAC 地址，该字段标识帧的发送者。")],-1),h=n("tr",null,[n("td",{style:{"text-align":"center"}},"TPID/ETPE"),n("td",{style:{"text-align":"center"}},"2 字节"),n("td",null,[s("TPID（Tag Protocol Identifier，标签协议标识）表示帧类型。取值为 0x8100时表示 802.1Q Tag 帧。如果不支持 802.1Q 的设备收到这样的帧，会将其丢弃。"),n("br"),s(),n("br"),s("对于内层的 802.1Q Tag，该值设置为 0x8100 ；对于外层的 802.1Q Tag，不同厂商所使用的值可能不相同："),n("li",null,"0x8100：Huawei路由器使用"),n("li",null,"0x88A8：Extreme Networks 交换机使用 (该值在IEEE 802.1ad定义.)"),n("li",null,"0x9100：Juniper路由器使用"),n("li",null,"0x9200：Several路由器使用"),n("br"),s(),n("br"),s("在使用VRP®（Versatile Routing Platform）软件的华为设备上，外层802.1Q Tag 缺省情况下值为 0x8100，可以通过命令行调整该值。")])],-1),g=n("tr",null,[n("td",{style:{"text-align":"center"}},"PRI"),n("td",{style:{"text-align":"center"}},"3 比特"),n("td",null,"PRI（Priority） 表示帧的 QoS 优先级，取值范围为 0～7，值越大优先级越高，该优先级主要为 QoS 差分服务提供参考依据。当阻塞时，优先发送优先级高的数据包。如果设置用户优先级，但是没有 VID（VLAN ID），则 VLAN ID 必须设置为 0x000。")],-1),C=n("td",{style:{"text-align":"center"}},"CFI/DEI",-1),f=n("td",{style:{"text-align":"center"}},"1 比特",-1),y=n("br",null,null,-1),E=n("br",null,null,-1),I=n("br",null,null,-1),_=n("br",null,null,-1),x=n("b",null,[s("说明："),n("br"),s(),n("br"),s("IEEE 802.1Q 定义了 CFI 字段，而 IEEE 802.1ad 标准重新定义了 CFI 字段，规定 S-Tag 里面的是 DEI，C-Tag 里面的是 CFI。"),n("br"),s(),n("br"),s("实际应用中，可以根据需要将此比特位用作 CFI 或者用作 DEI。")],-1),A=n("tr",null,[n("td",{style:{"text-align":"center"}},"VID"),n("td",{style:{"text-align":"center"}},"12 比特"),n("td",null,[s("VID（VLAN ID），长度为 12 比特，表示该帧所属的 VLAN。在 VRP 中，可配置的 VLAN ID 取值范围为 1～4094。协议规定 0 和 4095 为保留的 VLAN ID。"),n("br"),s(),n("br"),s("有三种 VID 类型："),n("li",null,"Untagged 帧：VID 不计"),n("li",null,"Priority-tagged 帧：VID 为 0x000"),n("li",null,"VLAN-tagged 帧：VID 范围 0～4095"),n("br"),s(),n("br"),s("三个特殊的 VID："),n("li",null,"0x000：设置优先级但无 VID"),n("li",null,"0x001：缺省 VID"),n("li",null,"0xFFF：预留 VID"),s(">")])],-1),N=n("tr",null,[n("td",{style:{"text-align":"center"}},"Length/Type"),n("td",{style:{"text-align":"center"}},"2 字节"),n("td",null,[s("该字段有两种含义："),n("li",null,"Length：如果该字段值小于或等于十进制 1500（或十六进制0x05DC）时，该字段指后续数据的字节长度，但不包括 FCS 字段。"),n("li",null,"Type：如果该字段值大于或等于十进制 1536（或十六进制0x0600）时，该字段指链路直接封装的上层协议类型。")])],-1),Q=n("td",{style:{"text-align":"center"}},"Data",-1),D=n("td",{style:{"text-align":"center"}},"38～1500 字节",-1),V=n("br",null,null,-1),P=n("br",null,null,-1),L=n("br",null,null,-1),F=n("br",null,null,-1),T=n("b",null,[s("说明："),n("br"),s(),n("br"),s("IEEE 802.1Q 和 IEEE 802.1ad 标准中并没有定义 VLAN 帧的最小长度和最大长度。各厂商可能存在实现差异导致该字段长度不同。")],-1),S=n("tr",null,[n("td",{style:{"text-align":"center"}},"FCS"),n("td",{style:{"text-align":"center"}},"4 字节"),n("td",null,"帧校验序列 FCS（Frame Check Sequence） 是为接收网卡提供判断是否传输错误的一种方法，如果发现错误，丢弃此帧。FCS 只是通用叫法，具体的 FCS 还可以细分多种校验方法。在以太帧中，FCS 通常采用循环冗余码校验 CRC（Cyclical Redundancy Check）。")],-1),k=l(`<p>VLAN帧的物理层各字段含义</p><table><thead><tr><th style="text-align:center;"><div style="width:80px;">字段</div></th><th style="text-align:center;"><div style="width:120px;">长度</div></th><th>含义</th></tr></thead><tbody><tr><td style="text-align:center;">帧间隙</td><td style="text-align:center;">至少 12 字节</td><td>每个以太帧之间都要有帧间隙（Inter Frame Gap），即每发完一个帧后要等待一段时间才能再发另外一个帧，以便让帧接收者对接收的帧做必要的处理（如调整缓存的指针、更新计数、通知对报文进行处理等等）。<br> <br>在以太网标准中规定最小帧间隙是 12 个字节，其数据为全1。对于个别的接口，可减少到 64(GE) 或 40 比特 (10GE)，其他的接口都不应该小于 12 字节。</td></tr><tr><td style="text-align:center;">前同步码</td><td style="text-align:center;">7 字节</td><td>以太网标准中规定前导码为10101010 10101010 10101010 10101010 10101010 10101010 10101010（二进制），共7字节。</td></tr><tr><td style="text-align:center;">帧开始定界符</td><td style="text-align:center;">1 字节</td><td>以太网标准中规定帧开始定界符为 10101011（二进制），共1字节。</td></tr></tbody></table><h2 id="帧示例" tabindex="-1"><a class="header-anchor" href="#帧示例"><span>帧示例</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="shiki" data-ext="text" data-title="text" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>Frame 1: 391 bytes on wire (3128 bits), 391 bytes captured (3128 bits)</span></span>
<span class="line"><span>    Arrival Time: Nov 17, 2011 18:52:25.161695000 </span></span>
<span class="line"><span>    Epoch Time: 1321527145.161695000 seconds</span></span>
<span class="line"><span>    [Time delta from previous captured frame: 0.000000000 seconds]</span></span>
<span class="line"><span>    [Time delta from previous displayed frame: 0.000000000 seconds]</span></span>
<span class="line"><span>    [Time since reference or first frame: 0.000000000 seconds]</span></span>
<span class="line"><span>    Frame Number: 1</span></span>
<span class="line"><span>    Frame Length: 391 bytes (3128 bits)</span></span>
<span class="line"><span>    Capture Length: 391 bytes (3128 bits)</span></span>
<span class="line"><span>    [Frame is marked: False]</span></span>
<span class="line"><span>    [Frame is ignored: False]</span></span>
<span class="line"><span>    [Protocols in frame: eth:ip:udp:bootp]</span></span>
<span class="line"><span>    [Coloring Rule Name: UDP]</span></span>
<span class="line"><span>    [Coloring Rule String: udp]</span></span>
<span class="line"><span>Ethernet II (VLAN tagged), Src: HuaweiTe_75:ad:21 (54:89:98:75:ad:21), Dst: RealtekS_88:35:39 (00:e0:4c:88:35:39)</span></span>
<span class="line"><span>    Destination: RealtekS_88:35:39 (00:e0:4c:88:35:39)</span></span>
<span class="line"><span>        Address: RealtekS_88:35:39 (00:e0:4c:88:35:39)</span></span>
<span class="line"><span>        .... ...0 .... .... .... .... = IG bit: Individual address (unicast)</span></span>
<span class="line"><span>        .... ..0. .... .... .... .... = LG bit: Globally unique address (factory default)</span></span>
<span class="line"><span>    Source: HuaweiTe_75:ad:21 (54:89:98:75:ad:21)</span></span>
<span class="line"><span>        Address: HuaweiTe_75:ad:21 (54:89:98:75:ad:21)</span></span>
<span class="line"><span>        .... ...0 .... .... .... .... = IG bit: Individual address (unicast)</span></span>
<span class="line"><span>        .... ..0. .... .... .... .... = LG bit: Globally unique address (factory default)</span></span>
<span class="line"><span>    VLAN tag: VLAN=100, Priority=Controlled Load</span></span>
<span class="line"><span>        Identifier: 802.1Q Virtual LAN (0x8100)</span></span>
<span class="line"><span>        100. .... .... .... = Priority: Controlled Load (4)</span></span>
<span class="line"><span>        ...0 .... .... .... = CFI: Canonical (0)</span></span>
<span class="line"><span>        .... 0000 0110 0100 = VLAN: 100</span></span>
<span class="line"><span>    VLAN tag: VLAN=200, Priority=Controlled Load</span></span>
<span class="line"><span>        Identifier: 802.1Q Virtual LAN (0x8100)</span></span>
<span class="line"><span>        100. .... .... .... = Priority: Controlled Load (4)</span></span>
<span class="line"><span>        ...0 .... .... .... = CFI: Canonical (0)</span></span>
<span class="line"><span>        .... 0000 1100 1000 = VLAN: 200</span></span>
<span class="line"><span>    Type: IP (0x0800)</span></span>
<span class="line"><span>Internet Protocol Version 4, Src: 192.168.112.1 (192.168.112.1), Dst: 192.168.112.100 (192.168.112.100)</span></span>
<span class="line"><span>    Version: 4</span></span>
<span class="line"><span>    Header length: 20 bytes</span></span>
<span class="line"><span>    Differentiated Services Field: 0x80 (DSCP 0x20: Class Selector 4; ECN: 0x00: Not-ECT (Not ECN-Capable Transport))</span></span>
<span class="line"><span>        1000 00.. = Differentiated Services Codepoint: Class Selector 4 (0x20)</span></span>
<span class="line"><span>        .... ..00 = Explicit Congestion Notification: Not-ECT (Not ECN-Capable Transport) (0x00)</span></span>
<span class="line"><span>    Total Length: 369</span></span>
<span class="line"><span>    Identification: 0x8ab5 (35509)</span></span>
<span class="line"><span>    Flags: 0x00</span></span>
<span class="line"><span>        0... .... = Reserved bit: Not set</span></span>
<span class="line"><span>        .0.. .... = Don&#39;t fragment: Not set</span></span>
<span class="line"><span>        ..0. .... = More fragments: Not set</span></span>
<span class="line"><span>    Fragment offset: 0</span></span>
<span class="line"><span>    Time to live: 16</span></span>
<span class="line"><span>    Protocol: UDP (17)</span></span>
<span class="line"><span>    Header checksum: 0xbc90 [correct]</span></span>
<span class="line"><span>        [Good: True]</span></span>
<span class="line"><span>        [Bad: False]</span></span>
<span class="line"><span>    Source: 192.168.112.1 (192.168.112.1)</span></span>
<span class="line"><span>    Destination: 192.168.112.100 (10.168.112.100)</span></span>
<span class="line"><span>User Datagram Protocol, Src Port: bootps (67), Dst Port: bootps (67)</span></span>
<span class="line"><span>    Source port: bootps (67)</span></span>
<span class="line"><span>    Destination port: bootps (67)</span></span>
<span class="line"><span>    Length: 349</span></span>
<span class="line"><span>    Checksum: 0x0000 (none)</span></span>
<span class="line"><span>        [Good Checksum: False]</span></span>
<span class="line"><span>        [Bad Checksum: False]</span></span>
<span class="line"><span>Bootstrap Protocol</span></span>
<span class="line"><span>    Message type: Boot Request (1)</span></span>
<span class="line"><span>    Hardware type: Ethernet</span></span>
<span class="line"><span>    Hardware address length: 6</span></span>
<span class="line"><span>    Hops: 1</span></span>
<span class="line"><span>    Transaction ID: 0x7a31a29f</span></span>
<span class="line"><span>    Seconds elapsed: 0</span></span>
<span class="line"><span>    Bootp flags: 0x0000 (Unicast)</span></span>
<span class="line"><span>        0... .... .... .... = Broadcast flag: Unicast</span></span>
<span class="line"><span>        .000 0000 0000 0000 = Reserved flags: 0x0000</span></span>
<span class="line"><span>    Client IP address: 0.0.0.0 (0.0.0.0)</span></span>
<span class="line"><span>    Your (client) IP address: 0.0.0.0 (0.0.0.0)</span></span>
<span class="line"><span>    Next server IP address: 0.0.0.0 (0.0.0.0)</span></span>
<span class="line"><span>    Relay agent IP address: 100.1.1.1 (100.1.1.1)</span></span>
<span class="line"><span>    Client MAC address: IntelCor_7b:75:58 (00:27:10:7b:75:58)</span></span>
<span class="line"><span>    Client hardware address padding: 00000000000000000000</span></span>
<span class="line"><span>    Server host name not given</span></span>
<span class="line"><span>    Boot file name not given</span></span>
<span class="line"><span>    Magic cookie: DHCP</span></span>
<span class="line"><span>    Option: (t=53,l=1) DHCP Message Type = DHCP Discover</span></span>
<span class="line"><span>        Option: (53) DHCP Message Type</span></span>
<span class="line"><span>        Length: 1</span></span>
<span class="line"><span>        Value: 01</span></span>
<span class="line"><span>    Option: (t=116,l=1) DHCP Auto-Configuration = AutoConfigure</span></span>
<span class="line"><span>        Option: (116) DHCP Auto-Configuration</span></span>
<span class="line"><span>        Length: 1</span></span>
<span class="line"><span>        Value: 01</span></span>
<span class="line"><span>    Option: (t=61,l=7) Client identifier</span></span>
<span class="line"><span>        Option: (61) Client identifier</span></span>
<span class="line"><span>        Length: 7</span></span>
<span class="line"><span>        Value: 010027107b7558</span></span>
<span class="line"><span>        Hardware type: Ethernet</span></span>
<span class="line"><span>        Client MAC address: IntelCor_7b:75:58 (00:27:10:7b:75:58)</span></span>
<span class="line"><span>    Option: (t=50,l=4) Requested IP Address = 169.254.145.113</span></span>
<span class="line"><span>        Option: (50) Requested IP Address</span></span>
<span class="line"><span>        Length: 4</span></span>
<span class="line"><span>        Value: a9fe9171</span></span>
<span class="line"><span>    Option: (t=12,l=13) Host Name = &quot;cda101059953g&quot;</span></span>
<span class="line"><span>        Option: (12) Host Name</span></span>
<span class="line"><span>        Length: 13</span></span>
<span class="line"><span>        Value: 63646131303130353939353367</span></span>
<span class="line"><span>    Option: (t=60,l=8) Vendor class identifier = &quot;MSFT 5.0&quot;</span></span>
<span class="line"><span>        Option: (60) Vendor class identifier</span></span>
<span class="line"><span>        Length: 8</span></span>
<span class="line"><span>        Value: 4d53465420352e30</span></span>
<span class="line"><span>    Option: (t=55,l=11) Parameter Request List</span></span>
<span class="line"><span>        Option: (55) Parameter Request List</span></span>
<span class="line"><span>        Length: 11</span></span>
<span class="line"><span>        Value: 010f03062c2e2f1f21f92b</span></span>
<span class="line"><span>        1 = Subnet Mask</span></span>
<span class="line"><span>        15 = Domain Name</span></span>
<span class="line"><span>        3 = Router</span></span>
<span class="line"><span>        6 = Domain Name Server</span></span>
<span class="line"><span>        44 = NetBIOS over TCP/IP Name Server</span></span>
<span class="line"><span>        46 = NetBIOS over TCP/IP Node Type</span></span>
<span class="line"><span>        47 = NetBIOS over TCP/IP Scope</span></span>
<span class="line"><span>        31 = Perform Router Discover</span></span>
<span class="line"><span>        33 = Static Route</span></span>
<span class="line"><span>        249 = Private/Classless Static Route (Microsoft)</span></span>
<span class="line"><span>        43 = Vendor-Specific Information</span></span>
<span class="line"><span>    Option: (t=43,l=2) Vendor-Specific Information</span></span>
<span class="line"><span>        Option: (43) Vendor-Specific Information</span></span>
<span class="line"><span>        Length: 2</span></span>
<span class="line"><span>        Value: dc00</span></span>
<span class="line"><span>    Option: (t=82,l=35) Agent Information Option</span></span>
<span class="line"><span>        Option: (82) Agent Information Option</span></span>
<span class="line"><span>        Length: 35</span></span>
<span class="line"><span>        Value: 010c303330422d303030302d474502134855415745492d30...</span></span>
<span class="line"><span>        Agent Circuit ID: 303330422d303030302d4745</span></span>
<span class="line"><span>        Agent Remote ID: 4855415745492d303330422d303030302d4745</span></span>
<span class="line"><span>    End Option</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考标准" tabindex="-1"><a class="header-anchor" href="#参考标准"><span>参考标准</span></a></h2><table><thead><tr><th><div style="width:120px;">标准</div></th><th>描述</th></tr></thead><tbody><tr><td><a href="https://tools.ietf.org/html/rfc3069" target="_blank" rel="noopener noreferrer">RFC 3069</a></td><td>VLAN Aggregation for Efficient IP Address Allocation</td></tr><tr><td><a href="http://standards.ieee.org/about/get/802/802.1.html" target="_blank" rel="noopener noreferrer">IEEE 802.1Q</a></td><td>IEEE Standards for Local and Metropolitan Area Networks : Virtual Bridged Local Area Networks</td></tr><tr><td><a href="http://standards.ieee.org/about/get/802/802.1.html" target="_blank" rel="noopener noreferrer">IEEE 802.1ad</a></td><td>IEEE Standards for Local and Metropolitan Area Networks : Virtual Bridged Local Area Networks- Amendment 4</td></tr></tbody></table>`,6);function B(w,O){const a=p("font");return d(),r("div",null,[v,n("table",null,[u,n("tbody",null,[m,b,h,g,n("tr",null,[C,f,n("td",null,[s("CFI (Canonical Format Indicator，标准格式指示)，长度为 1 比特，表示MAC 地址是否是标准格式。CFI 为 0 说明是标准格式（以太网帧的 MAC 地址采用低字节在前），CFI 为 1 表示为非标准格式（非以太网帧的 MAC 地址采用高字节在前）。CFI 可用于区分以太网帧、FDDI（Fiber Distributed Digital Interface）帧和令牌环网帧。在以太网中，CFI 的值为 0。"),y,s(),E,s("DEI（Drop Eligible Indicator，丢弃优先级指示），配合 PRI 字段使用，共同指示帧的丢弃优先级，也就是系统发生了拥塞时，这些报文会被优先丢弃。"),I,s(),_,e(a,{color:"darkred"},{default:i(()=>[x]),_:1})])]),A,N,n("tr",null,[Q,D,n("td",null,[s("负载（可能包含填充位）。"),V,s(),P,s("VLAN帧的长度必须为整数字节，因此帧的负载长度不足整数字节，需插入填充字段以保证数据帧的长度为整数字节。"),L,s(),F,e(a,{color:"darkred"},{default:i(()=>[T]),_:1})])]),S])]),k])}const M=t(o,[["render",B],["__file","2024-08-01-QinQ帧格式.html.vue"]]),H=JSON.parse('{"path":"/posts/Network/%E7%BD%91%E7%BB%9C%E5%8D%8F%E8%AE%AE/%E6%95%B0%E6%8D%AE%E9%93%BE%E8%B7%AF%E5%B1%82/2024-08-01-QinQ%E5%B8%A7%E6%A0%BC%E5%BC%8F.html","title":"【转载】QinQ 帧格式","lang":"zh-CN","frontmatter":{"title":"【转载】QinQ 帧格式","shortTitle":"QinQ 帧格式","description":"QinQ 帧格式","icon":"Network-Protocol","author":"昌霖学长","isOriginal":false,"date":"2024-08-01T00:00:00.000Z","categories":["网络协议"],"tags":["QinQ","VLAN","帧格式"],"license":"MIT","sticky":false,"star":false,"article":true,"timeline":true,"head":[["meta",{"property":"og:url","content":"https://shawnlyu1990.github.io/posts/Network/%E7%BD%91%E7%BB%9C%E5%8D%8F%E8%AE%AE/%E6%95%B0%E6%8D%AE%E9%93%BE%E8%B7%AF%E5%B1%82/2024-08-01-QinQ%E5%B8%A7%E6%A0%BC%E5%BC%8F.html"}],["meta",{"property":"og:site_name","content":"知识杂货铺"}],["meta",{"property":"og:title","content":"【转载】QinQ 帧格式"}],["meta",{"property":"og:description","content":"QinQ 帧格式"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://shawnlyu1990.github.io/assets/postsimages/2024-08-01-QinQ帧格式/QinQ帧格式.jpeg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-09-02T05:44:26.000Z"}],["meta",{"property":"article:author","content":"昌霖学长"}],["meta",{"property":"article:tag","content":"QinQ"}],["meta",{"property":"article:tag","content":"VLAN"}],["meta",{"property":"article:tag","content":"帧格式"}],["meta",{"property":"article:published_time","content":"2024-08-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-09-02T05:44:26.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"【转载】QinQ 帧格式\\",\\"image\\":[\\"https://shawnlyu1990.github.io/assets/postsimages/2024-08-01-QinQ帧格式/QinQ帧格式.jpeg\\"],\\"datePublished\\":\\"2024-08-01T00:00:00.000Z\\",\\"dateModified\\":\\"2024-09-02T05:44:26.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"昌霖学长\\"}]}"]]},"headers":[{"level":2,"title":"帧格式","slug":"帧格式","link":"#帧格式","children":[]},{"level":2,"title":"帧示例","slug":"帧示例","link":"#帧示例","children":[]},{"level":2,"title":"参考标准","slug":"参考标准","link":"#参考标准","children":[]}],"git":{"createdTime":1724140359000,"updatedTime":1725255866000,"contributors":[{"name":"Shawn Lyu","email":"shawnlyu1990@gmail.com","commits":3}]},"readingTime":{"minutes":8.02,"words":2406},"filePathRelative":"posts/Network/网络协议/数据链路层/2024-08-01-QinQ帧格式.md","localizedDate":"2024年8月1日","excerpt":"","copyright":{"license":"MIT"}}');export{M as comp,H as data};
