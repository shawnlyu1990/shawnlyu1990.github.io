import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as r,d as p,a as n,e as a,b as t,w as l,r as o,o as d}from"./app-Dh4F_fjJ.js";const g="/assets/postsimages/2024-08-01-VLAN%E5%B8%A7%E6%A0%BC%E5%BC%8F/VLAN%E5%B8%A7%E6%A0%BC%E5%BC%8F.jpeg",u={};function c(E,s){const e=o("font");return d(),r("div",null,[s[38]||(s[38]=p('<div class="hint-container important"><p class="hint-container-title">转载声明</p><p>以下内容转载自：<a href="https://support.huawei.com/enterprise/zh/doc/EDOC1100174722/75653f56" target="_blank" rel="noopener noreferrer">https://support.huawei.com/enterprise/zh/doc/EDOC1100174722/75653f56</a></p></div><p>IEEE 802.1Q 标准对以太帧格式进行了修改，在源 MAC 地址字段和协议类型字段之间加入 4 字节的 802.1Q Tag。802.1Q Tag 也称为 VLAN Tag，带有 VLAN Tag 的以太帧称为 VLAN 帧。</p><h2 id="帧格式" tabindex="-1"><a class="header-anchor" href="#帧格式"><span>帧格式</span></a></h2><figure><img src="'+g+'" alt="VLAN 帧格式" tabindex="0" loading="lazy"><figcaption>VLAN 帧格式</figcaption></figure><p>VLAN帧的链路层各字段含义</p>',5)),n("table",null,[s[37]||(s[37]=n("thead",null,[n("tr",null,[n("th",{style:{"text-align":"center"}},[n("div",{style:{width:"80px"}},"字段")]),n("th",{style:{"text-align":"center"}},[n("div",{style:{width:"120px"}},"长度")]),n("th",null,"含义")])],-1)),n("tbody",null,[s[31]||(s[31]=n("tr",null,[n("td",{style:{"text-align":"center"}},"DMAC"),n("td",{style:{"text-align":"center"}},"6 字节"),n("td",null,"目的 MAC 地址，该字段标识帧的接收者。")],-1)),s[32]||(s[32]=n("tr",null,[n("td",{style:{"text-align":"center"}},"SMAC"),n("td",{style:{"text-align":"center"}},"6 字节"),n("td",null,"源 MAC 地址，该字段标识帧的发送者。")],-1)),n("tr",null,[s[6]||(s[6]=n("td",{style:{"text-align":"center"}},"TPID/ETPE",-1)),s[7]||(s[7]=n("td",{style:{"text-align":"center"}},"2 字节",-1)),n("td",null,[s[1]||(s[1]=a("TPID（Tag Protocol Identifier，标签协议标识）表示帧类型。")),s[2]||(s[2]=n("br",null,null,-1)),s[3]||(s[3]=a()),s[4]||(s[4]=n("br",null,null,-1)),s[5]||(s[5]=a()),t(e,{color:"darkred"},{default:l(()=>s[0]||(s[0]=[n("b",null,[a("说明："),n("br"),a(),n("br"),a("根据 IEEE 802.1Q 标准的定义，取值为 0x8100 时表示 802.1Q Tag（VLAN） 帧。如果不支持 802.1Q 的设备收到这样的帧，会将其丢弃。"),n("br"),a(),n("br"),a("根据 IEEE 802.1ad 的定义，802.1Q Tag 可分为 S-Tag 和 C-Tag 两种，S-Tag 用于标识业务，C-Tag 用于标识用户。区分这两种 Tag 的是 TPID，S-Tag 的 TPID 是 0x88a8，C-Tag 的 TPID 是 0x8100。"),n("br"),a(),n("br"),a("MEF 26.1（ENNI Specification） 标准中规定出 ENNI 端口的 VLAN 帧的 Tag 可以是 S-Tag。可见，VLAN 帧的 TPID 值可以是非 0x8100。")],-1)])),_:1})])]),s[33]||(s[33]=n("tr",null,[n("td",{style:{"text-align":"center"}},"PRI"),n("td",{style:{"text-align":"center"}},"3 比特"),n("td",null,"PRI（Priority） 表示帧的 QoS 优先级，取值范围为 0～7，值越大优先级越高，该优先级主要为 QoS 差分服务提供参考依据。当阻塞时，优先发送优先级高的数据包。如果设置用户优先级，但是没有 VID（VLAN ID），则 VLAN ID 必须设置为 0x000。")],-1)),n("tr",null,[s[17]||(s[17]=n("td",{style:{"text-align":"center"}},"CFI/DEI",-1)),s[18]||(s[18]=n("td",{style:{"text-align":"center"}},"1 比特",-1)),n("td",null,[s[9]||(s[9]=a("CFI (Canonical Format Indicator，标准格式指示)，长度为 1 比特，表示MAC 地址是否是标准格式。CFI 为 0 说明是标准格式（以太网帧的 MAC 地址采用低字节在前），CFI 为 1 表示为非标准格式（非以太网帧的 MAC 地址采用高字节在前）。CFI 可用于区分以太网帧、FDDI（Fiber Distributed Digital Interface）帧和令牌环网帧。在以太网中，CFI 的值为 0。")),s[10]||(s[10]=n("br",null,null,-1)),s[11]||(s[11]=a()),s[12]||(s[12]=n("br",null,null,-1)),s[13]||(s[13]=a(" DEI（Drop Eligible Indicator，丢弃优先级指示），配合 PRI 字段使用，共同指示帧的丢弃优先级，也就是系统发生了拥塞时，这些报文会被优先丢弃。 ")),s[14]||(s[14]=n("br",null,null,-1)),s[15]||(s[15]=a()),s[16]||(s[16]=n("br",null,null,-1)),t(e,{color:"darkred"},{default:l(()=>s[8]||(s[8]=[n("b",null,[a("说明："),n("br"),a(),n("br"),a("IEEE 802.1Q 定义了 CFI 字段，而 IEEE 802.1ad 标准重新定义了 CFI 字段，规定 S-Tag 里面的是 DEI，C-Tag 里面的是 CFI。"),n("br"),a(),n("br"),a("实际应用中，可以根据需要将此比特位用作 CFI 或者用作 DEI。")],-1)])),_:1})])]),s[34]||(s[34]=n("tr",null,[n("td",{style:{"text-align":"center"}},"VID"),n("td",{style:{"text-align":"center"}},"12 比特"),n("td",null,[a("VID（VLAN ID），长度为 12 比特，表示该帧所属的 VLAN。在 VRP 中，可配置的 VLAN ID 取值范围为 1～4094。协议规定 0 和 4095 为保留的 VLAN ID。"),n("br"),a(),n("br"),a("有三种 VID 类型："),n("ul",null,[n("li",null,"Untagged 帧：VID 不计"),n("li",null,"Priority-tagged 帧：VID 为 0x000"),n("li",null,"VLAN-tagged 帧：VID 范围 0～4095")]),a("三个特殊的 VID："),n("ul",null,[n("li",null,"0x000：设置优先级但无 VID"),n("li",null,"0x001：缺省 VID"),n("li",null,"0xFFF：预留 VID")])])],-1)),s[35]||(s[35]=n("tr",null,[n("td",{style:{"text-align":"center"}},"Length/Type"),n("td",{style:{"text-align":"center"}},"2 字节"),n("td",null,[a("该字段有两种含义："),n("ul",null,[n("li",null,"Length：如果该字段值小于或等于十进制 1500（或十六进制 0x05DC）时，该字段指后续数据的字节长度，但不包括 FCS 字段。"),n("li",null,"Type：如果该字段值大于或等于十进制 1536（或十六进制 0x0600）时，该字段指链路直接封装的上层协议类型。")])])],-1)),n("tr",null,[s[29]||(s[29]=n("td",{style:{"text-align":"center"}},"Data",-1)),s[30]||(s[30]=n("td",{style:{"text-align":"center"}},"42～1500 字节",-1)),n("td",null,[s[20]||(s[20]=a("负载（可能包含填充位）。")),s[21]||(s[21]=n("br",null,null,-1)),s[22]||(s[22]=a()),s[23]||(s[23]=n("br",null,null,-1)),s[24]||(s[24]=a("VLAN 帧的长度必须为整数字节，因此帧的负载长度不足整数字节，需插入填充字段以保证数据帧的长度为整数字节。")),s[25]||(s[25]=n("br",null,null,-1)),s[26]||(s[26]=a()),s[27]||(s[27]=n("br",null,null,-1)),s[28]||(s[28]=a()),t(e,{color:"darkred"},{default:l(()=>s[19]||(s[19]=[n("b",null,[a("说明："),n("br"),a("IEEE 802.1Q 和 IEEE 802.1ad 标准中并没有定义 VLAN 帧的最小长度和最大长度。各厂商可能存在实现差异导致该字段长度不同。")],-1)])),_:1})])]),s[36]||(s[36]=n("tr",null,[n("td",{style:{"text-align":"center"}},"FCS"),n("td",{style:{"text-align":"center"}},"4 字节"),n("td",null,"帧校验序列 FCS（Frame Check Sequence） 是为接收网卡提供判断是否传输错误的一种方法，如果发现错误，丢弃此帧。FCS 只是通用叫法，具体的 FCS 还可以细分多种校验方法。在以太帧中，FCS 通常采用循环冗余码校验 CRC（Cyclical Redundancy Check）。")],-1))])]),s[39]||(s[39]=p(`<p>VLAN帧的物理层各字段含义</p><table><thead><tr><th style="text-align:center;"><div style="width:80px;">字段</div></th><th style="text-align:center;"><div style="width:120px;">长度</div></th><th>含义</th></tr></thead><tbody><tr><td style="text-align:center;">帧间隙</td><td style="text-align:center;">至少 12 字节</td><td>每个以太帧之间都要有帧间隙（Inter Frame Gap），即每发完一个帧后要等待一段时间才能再发另外一个帧，以便让帧接收者对接收的帧做必要的处理（如调整缓存的指针、更新计数、通知对报文进行处理等等）。<br> <br>在以太网标准中规定最小帧间隙是 12 个字节，其数据为全 1。对于个别的接口，可减少到 64 (GE) 或 40 比特 (10 GE)，其他的接口都不应该小于 12 字节。</td></tr><tr><td style="text-align:center;">前同步码</td><td style="text-align:center;">7 字节</td><td>以太网标准中规定前导码为 10101010 10101010 10101010 10101010 10101010 10101010 10101010（二进制），共 7 字节。</td></tr><tr><td style="text-align:center;">帧开始定界符</td><td style="text-align:center;">1 字节</td><td>以太网标准中规定帧开始定界符为 10101011（二进制），共 1 字节。</td></tr></tbody></table><h2 id="帧示例" tabindex="-1"><a class="header-anchor" href="#帧示例"><span>帧示例</span></a></h2><div class="language-text has-collapsed-lines collapsed" data-highlighter="shiki" data-ext="text" style="--vp-collapsed-lines:15;--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>Frame 1: 114 bytes on wire (912 bits), 114 bytes captured (912 bits)</span></span>
<span class="line"><span>    Arrival Time: Jan  1, 1970 08:00:00.083640000</span></span>
<span class="line"><span>    Epoch Time: 0.083640000 seconds</span></span>
<span class="line"><span>    [Time delta from previous captured frame: 0.000000000 seconds]</span></span>
<span class="line"><span>    [Time delta from previous displayed frame: 0.000000000 seconds]</span></span>
<span class="line"><span>    [Time since reference or first frame: 0.000000000 seconds]</span></span>
<span class="line"><span>    Frame Number: 1</span></span>
<span class="line"><span>    Frame Length: 114 bytes (912 bits)</span></span>
<span class="line"><span>    Capture Length: 114 bytes (912 bits)</span></span>
<span class="line"><span>    [Frame is marked: False]</span></span>
<span class="line"><span>    [Frame is ignored: False]</span></span>
<span class="line"><span>    [Protocols in frame: eth:ip:udp:ptp]</span></span>
<span class="line"><span>    [Coloring Rule Name: UDP]</span></span>
<span class="line"><span>    [Coloring Rule String: udp]</span></span>
<span class="line"><span>Ethernet II (VLAN tagged), Src: HuaweiTe_92:27:fe (28:6e:d4:92:27:fe), Dst: HuaweiTe_00:00:11 (00:18:82:00:00:11)</span></span>
<span class="line"><span>    Destination: HuaweiTe_00:00:11 (00:18:82:00:00:11)</span></span>
<span class="line"><span>        Address: HuaweiTe_00:00:11 (00:18:82:00:00:11)</span></span>
<span class="line"><span>        .... ...0 .... .... .... .... = IG bit: Individual address (unicast)</span></span>
<span class="line"><span>        .... ..0. .... .... .... .... = LG bit: Globally unique address (factory default)</span></span>
<span class="line"><span>    Source: HuaweiTe_92:27:fe (28:6e:d4:92:27:fe)</span></span>
<span class="line"><span>        Address: HuaweiTe_92:27:fe (28:6e:d4:92:27:fe)</span></span>
<span class="line"><span>        .... ...0 .... .... .... .... = IG bit: Individual address (unicast)</span></span>
<span class="line"><span>        .... ..0. .... .... .... .... = LG bit: Globally unique address (factory default)</span></span>
<span class="line"><span>    VLAN tag: VLAN=10, Priority=Best Effort (default)</span></span>
<span class="line"><span>        Identifier: 802.1Q Virtual LAN (0x8100)</span></span>
<span class="line"><span>        000. .... .... .... = Priority: Best Effort (default) (0)</span></span>
<span class="line"><span>        ...0 .... .... .... = CFI: Canonical (0)</span></span>
<span class="line"><span>        .... 0000 0000 1010 = VLAN: 10</span></span>
<span class="line"><span>    Type: IP (0x0800)</span></span>
<span class="line"><span>    Trailer: e614db8b</span></span>
<span class="line"><span>Internet Protocol Version 4, Src: 10.0.1.50 (10.0.1.50), Dst: 10.0.1.2 (10.0.1.2)</span></span>
<span class="line"><span>    Version: 4</span></span>
<span class="line"><span>    Header length: 20 bytes</span></span>
<span class="line"><span>    Differentiated Services Field: 0x10 (DSCP 0x04: Unknown DSCP; ECN: 0x00: Not-ECT (Not ECN-Capable Transport))</span></span>
<span class="line"><span>        0001 00.. = Differentiated Services Codepoint: Unknown (0x04)</span></span>
<span class="line"><span>        .... ..00 = Explicit Congestion Notification: Not-ECT (Not ECN-Capable Transport) (0x00)</span></span>
<span class="line"><span>    Total Length: 92</span></span>
<span class="line"><span>    Identification: 0x0566 (1382)</span></span>
<span class="line"><span>    Flags: 0x00</span></span>
<span class="line"><span>        0... .... = Reserved bit: Not set</span></span>
<span class="line"><span>        .0.. .... = Don&#39;t fragment: Not set</span></span>
<span class="line"><span>        ..0. .... = More fragments: Not set</span></span>
<span class="line"><span>    Fragment offset: 0</span></span>
<span class="line"><span>    Time to live: 255</span></span>
<span class="line"><span>    Protocol: UDP (17)</span></span>
<span class="line"><span>    Header checksum: 0x0fe7 [correct]</span></span>
<span class="line"><span>        [Good: True]</span></span>
<span class="line"><span>        [Bad: False]</span></span>
<span class="line"><span>    Source: 10.0.1.50 (10.0.1.50)</span></span>
<span class="line"><span>    Destination: 10.0.1.2 (10.0.1.2)</span></span>
<span class="line"><span>User Datagram Protocol, Src Port: ptp-general (320), Dst Port: ptp-general (320)</span></span>
<span class="line"><span>    Source port: ptp-general (320)</span></span>
<span class="line"><span>    Destination port: ptp-general (320)</span></span>
<span class="line"><span>    Length: 72</span></span>
<span class="line"><span>    Checksum: 0x82b8 [validation disabled]</span></span>
<span class="line"><span>        [Good Checksum: False]</span></span>
<span class="line"><span>        [Bad Checksum: False]</span></span>
<span class="line"><span>Precision Time Protocol (IEEE1588)</span></span>
<span class="line"><span>    0001 .... = transportSpecific: 0x01</span></span>
<span class="line"><span>        ...1 .... = V1 Compatibility: True</span></span>
<span class="line"><span>    .... 1011 = messageId: Announce Message (0x0b)</span></span>
<span class="line"><span>    .... 0010 = versionPTP: 2</span></span>
<span class="line"><span>    messageLength: 64</span></span>
<span class="line"><span>    subdomainNumber: 0</span></span>
<span class="line"><span>    flags: 0x040a</span></span>
<span class="line"><span>        0... .... .... .... = PTP_SECURITY: False</span></span>
<span class="line"><span>        .0.. .... .... .... = PTP profile Specific 2: False</span></span>
<span class="line"><span>        ..0. .... .... .... = PTP profile Specific 1: False</span></span>
<span class="line"><span>        .... .1.. .... .... = PTP_UNICAST: True</span></span>
<span class="line"><span>        .... ..0. .... .... = PTP_TWO_STEP: False</span></span>
<span class="line"><span>        .... ...0 .... .... = PTP_ALTERNATE_MASTER: False</span></span>
<span class="line"><span>        .... .... ..0. .... = FREQUENCY_TRACEABLE: False</span></span>
<span class="line"><span>        .... .... ...0 .... = TIME_TRACEABLE: False</span></span>
<span class="line"><span>        .... .... .... 1... = PTP_TIMESCALE: True</span></span>
<span class="line"><span>        .... .... .... .0.. = PTP_UTC_REASONABLE: False</span></span>
<span class="line"><span>        .... .... .... ..1. = PTP_LI_59: True</span></span>
<span class="line"><span>        .... .... .... ...0 = PTP_LI_61: False</span></span>
<span class="line"><span>    correction: 0.000000 nanoseconds</span></span>
<span class="line"><span>        correction: Ns: 0 nanoseconds</span></span>
<span class="line"><span>        SubNs: 0.000000 nanoseconds</span></span>
<span class="line"><span>    ClockIdentity: 0x00188200000085ba</span></span>
<span class="line"><span>    SourcePortID: 1</span></span>
<span class="line"><span>    sequenceId: 22</span></span>
<span class="line"><span>    control: Other Message (5)</span></span>
<span class="line"><span>    logMessagePeriod: 1</span></span>
<span class="line"><span>    originCurrentUTCOffset: 0</span></span>
<span class="line"><span>    priority1: 128</span></span>
<span class="line"><span>    grandmasterClockClass: 84</span></span>
<span class="line"><span>    grandmasterClockAccuracy: The time is accurate to within 250 ns (0x22)</span></span>
<span class="line"><span>    grandmasterClockVariance: 0</span></span>
<span class="line"><span>    priority2: 128</span></span>
<span class="line"><span>    grandmasterClockIdentity: 0x00188200000085ba</span></span>
<span class="line"><span>    localStepsRemoved: 0</span></span>
<span class="line"><span>    TimeSource: ATOMIC_CLOCK (0x10)</span></span></code></pre><div class="collapsed-lines"></div></div><h2 id="参考标准" tabindex="-1"><a class="header-anchor" href="#参考标准"><span>参考标准</span></a></h2><table><thead><tr><th><div style="width:120px;">标准</div></th><th>描述</th></tr></thead><tbody><tr><td><a href="https://tools.ietf.org/html/rfc3069" target="_blank" rel="noopener noreferrer">RFC 3069</a></td><td>VLAN Aggregation for Efficient IP Address Allocation</td></tr><tr><td><a href="http://standards.ieee.org/about/get/802/802.1.html" target="_blank" rel="noopener noreferrer">IEEE 802.1Q</a></td><td>IEEE Standards for Local and Metropolitan Area Networks : Virtual Bridged Local Area Networks</td></tr><tr><td><a href="http://standards.ieee.org/about/get/802/802.1.html" target="_blank" rel="noopener noreferrer">IEEE 802.1ad</a></td><td>IEEE Standards for Local and Metropolitan Area Networks: Virtual Bridged Local Area Networks- Amendment 4</td></tr></tbody></table>`,6))])}const C=i(u,[["render",c]]),b=JSON.parse('{"path":"/posts/Collection/%E6%8A%A5%E6%96%87%E6%A0%BC%E5%BC%8F/%E6%95%B0%E6%8D%AE%E9%93%BE%E8%B7%AF%E5%B1%82/2024-08-01-VLAN%E5%B8%A7%E6%A0%BC%E5%BC%8F.html","title":"【转载】VLAN 帧格式","lang":"zh-CN","frontmatter":{"title":"【转载】VLAN 帧格式","shortTitle":"VLAN 帧格式","description":"VLAN 帧格式","icon":"/assets/blogicons/协议.png","author":"昌霖学长","isOriginal":false,"date":"2024-08-01T00:00:00.000Z","categories":["网络协议"],"tags":["VLAN","802.1Q","帧格式"],"license":"MIT","sticky":false,"star":false,"article":true,"timeline":true,"comment":false,"head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"【转载】VLAN 帧格式\\",\\"image\\":[\\"https://shawnlyu1990.github.io/assets/postsimages/2024-08-01-VLAN帧格式/VLAN帧格式.jpeg\\"],\\"datePublished\\":\\"2024-08-01T00:00:00.000Z\\",\\"dateModified\\":\\"2025-10-09T09:27:17.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"昌霖学长\\"}]}"],["meta",{"property":"og:url","content":"https://shawnlyu1990.github.io/posts/Collection/%E6%8A%A5%E6%96%87%E6%A0%BC%E5%BC%8F/%E6%95%B0%E6%8D%AE%E9%93%BE%E8%B7%AF%E5%B1%82/2024-08-01-VLAN%E5%B8%A7%E6%A0%BC%E5%BC%8F.html"}],["meta",{"property":"og:site_name","content":"昌霖学长的自习室"}],["meta",{"property":"og:title","content":"【转载】VLAN 帧格式"}],["meta",{"property":"og:description","content":"VLAN 帧格式"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://shawnlyu1990.github.io/assets/postsimages/2024-08-01-VLAN帧格式/VLAN帧格式.jpeg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-10-09T09:27:17.000Z"}],["meta",{"property":"article:author","content":"昌霖学长"}],["meta",{"property":"article:tag","content":"帧格式"}],["meta",{"property":"article:tag","content":"802.1Q"}],["meta",{"property":"article:tag","content":"VLAN"}],["meta",{"property":"article:published_time","content":"2024-08-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-10-09T09:27:17.000Z"}]]},"git":{"createdTime":1724140359000,"updatedTime":1760002037000,"contributors":[{"name":"Shawn Lyu","username":"","email":"shawnlyu1990@gmail.com","commits":9}]},"readingTime":{"minutes":7.27,"words":2182},"filePathRelative":"posts/Collection/报文格式/数据链路层/2024-08-01-VLAN帧格式.md","excerpt":"","copyright":{"license":"MIT"}}');export{C as comp,b as data};
