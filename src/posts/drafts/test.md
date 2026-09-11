---
# 文章标题
title: 测试
# 当前页面的短标题，会在导航栏、侧边栏和路径导航中作为首选。
shortTitle: 测试
# 当前页面内容描述。
description: 这是我用来做本地的一些修改测试用的页面，正常来讲应该是不会被发布出去的，如果你看到了这个页面，请联系shawnlyu1990@gmail.com。我会尽快改正。
# 当前页面的图标，建议填写
icon: "/assets/blogicons/Macbook设置.png"
# 作者
author: 昌霖学长
# 当前文章是否为原创
isOriginal: true
# 设置写作时间
date: 2025-03-24
# 分类，一个页面可以有多个分类
categories: 
  - 未分离
# 标签，一个页面可以有多个标签
tags: 
  - 测试
# 页面的协议信息
license: MIT 
# 置顶标记（true/false/数字），当填入数字时，数字越大，排名越靠前。
sticky: false
# 星标（true/false/数字），当填入数字时，数字越大，排名越靠前。
star: false
# 是否将该文章添加至文章列表中。
article: false
# 是否将该文章添加至时间线中。
timeline: false
# 是否开启评论
comment: false
# 预览图。请填入绝对路径。图片路径位于 .vuepress/public 下
# cover: /assets/images/cover1.jpg
# 设置横幅图片 (宽屏分享图)，请填入绝对路径。
# banner: /assets/images/cover1.jpg
---
::: important
这是我用来做本地的一些修改测试用的页面，正常来讲应该是不会被发布出去的，如果你看到了这个页面，请联系 **shawnlyu1990@gmail.com** 。我会尽快改正。
:::

## 代码块分组测试

::: code-tabs#shell

@tab:active 代码块字体测试

```bash
MapleMono字体

常规体：
the quick brown fox jumps over the lazy dog
THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG

斜体：
*The quick brown fox jumps over the lazy dog*

粗体：
**The quick brown fox jumps over the lazy dog**

粗体+斜体：
***The quick brown fox jumps over the lazy dog***
```

@tab 分组2

```bash
yarn add -D vuepress
```

@tab 分组3

```bash
npm i -D vuepress
```

:::

安装 VuePress:

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress
```

@tab yarn

```bash
yarn add -D vuepress
```

@tab:active npm

```bash
npm i -D vuepress
```

:::

## 代码块标题测试

```ts twoslash {7-12} title="<img src='/assets/blogicons/Macbook设置.png' class='code-title-icon' /> .vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    // 关键词 "shiki" / "prismjs"
    // 或者拥有 type 字段的对象
    highlighter: {
      type: "shiki", // or "prismjs"

      // shiki 或 prismjs 选项
      // ...
    },
  },
});
```

## 表格

| <div style="width:80px">字段</div> | <div style="width:120px">长度</div> | 含义                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| :--------------------------------: | :---------------------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                DMAC                |               6 字节                | 目的 MAC 地址，该字段标识帧的接收者。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|                SMAC                |               6 字节                | 源 MAC 地址，该字段标识帧的发送者。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
|             TPID/ETPE              |               2 字节                | TPID（Tag Protocol Identifier，标签协议标识）表示帧类型。取值为 0x8100 时表示 802.1Q Tag 帧。如果不支持 802.1Q 的设备收到这样的帧，会将其丢弃。<br> <br>对于内层的 802.1Q Tag，该值设置为 0x8100；对于外层的 802.1Q Tag，不同厂商所使用的值可能不相同：<ul> <li>0x8100：Huawei 路由器使用</li> <li>0x88A8：Extreme Networks 交换机使用 (该值在 IEEE 802.1ad 定义.)</li> <li>0x9100：Juniper 路由器使用</li> <li>0x9200：Several 路由器使用</li> </ul> 在使用 VRP®（Versatile Routing Platform）软件的华为设备上，外层 802.1Q Tag 缺省情况下值为 0x8100，可以通过命令行调整该值。                                                                                                                                                            |
|                PRI                 |               3 比特                | PRI（Priority） 表示帧的 QoS 优先级，取值范围为 0～7，值越大优先级越高，该优先级主要为 QoS 差分服务提供参考依据。当阻塞时，优先发送优先级高的数据包。如果设置用户优先级，但是没有 VID（VLAN ID），则 VLAN ID 必须设置为 0x000。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
|              CFI/DEI               |               1 比特                | CFI (Canonical Format Indicator，标准格式指示)，长度为 1 比特，表示MAC 地址是否是标准格式。CFI 为 0 说明是标准格式（以太网帧的 MAC 地址采用低字节在前），CFI 为 1 表示为非标准格式（非以太网帧的 MAC 地址采用高字节在前）。CFI 可用于区分以太网帧、FDDI（Fiber Distributed Digital Interface）帧和令牌环网帧。在以太网中，CFI 的值为 0。<br> <br>DEI（Drop Eligible Indicator，丢弃优先级指示），配合 PRI 字段使用，共同指示帧的丢弃优先级，也就是系统发生了拥塞时，这些报文会被优先丢弃。<br> <br><font color="darkred"><b>说明：<br> <br>IEEE 802.1Q 定义了 CFI 字段，而 IEEE 802.1ad 标准重新定义了 CFI 字段，规定 S-Tag 里面的是 DEI，C-Tag 里面的是 CFI。<br> <br>实际应用中，可以根据需要将此比特位用作 CFI 或者用作 DEI。</b></font> |
|                VID                 |               12 比特               | VID（VLAN ID），长度为 12 比特，表示该帧所属的 VLAN。在 VRP 中，可配置的 VLAN ID 取值范围为 1～4094。协议规定 0 和 4095 为保留的 VLAN ID。<br> <br>有三种 VID 类型：<ul><li>Untagged 帧：VID 不计</li><li>Priority-tagged 帧：VID 为 0x000</li><li>VLAN-tagged 帧：VID 范围 0～4095</li></ul>三个特殊的 VID：<ul><li>0x000：设置优先级但无 VID</li><li>0x001：缺省 VID</li><li>0xFFF：预留 VID</li></ul>                                                                                                                                                                                                                                                                                                                                    |
|            Length/Type             |               2 字节                | 该字段有两种含义：<ul><li>Length：如果该字段值小于或等于十进制 1500（或十六进制 0x05DC）时，该字段指后续数据的字节长度，但不包括 FCS 字段。</li><li>Type：如果该字段值大于或等于十进制 1536（或十六进制 0x0600）时，该字段指链路直接封装的上层协议类型。</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
|                Data                |            38～1500 字节            | 负载（可能包含填充位）。<br> <br>VLAN 帧的长度必须为整数字节，因此帧的负载长度不足整数字节，需插入填充字段以保证数据帧的长度为整数字节。<br> <br><font color="darkred"><b>说明：<br> <br>IEEE 802.1Q 和 IEEE 802.1ad 标准中并没有定义 VLAN 帧的最小长度和最大长度。各厂商可能存在实现差异导致该字段长度不同。</b></font>                                                                                                                                                                                                                                                                                                                                                                                                                    |
|                FCS                 |               4 字节                | 帧校验序列 FCS（Frame Check Sequence） 是为接收网卡提供判断是否传输错误的一种方法，如果发现错误，丢弃此帧。FCS 只是通用叫法，具体的 FCS 还可以细分多种校验方法。在以太帧中，FCS 通常采用循环冗余码校验 CRC（Cyclical Redundancy Check）。<br> <br> <pre lang="bash"><code>bash<br>code<br></code></pre>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |



| Status | Response  |
| ------ | --------- |
| 200    |以下是 json 代码<br>---<br><pre lang="json"><code>{<br>  "id": 10,<br>  "username": "alanpartridge",<br>  "email": "alan@alan.com",<br>  "password_hash": "$2a$10$uhUIUmVWVnrBWx9rrDWhS.CPCWCZsyqqa8./whhfzBZydX7yvahHS",<br>  "password_salt": "$2a$10$uhUIUmVWVnrBWx9rrDWhS.",<br>  "created_at": "2015-02-14T20:45:26.433Z",<br>  "updated_at": "2015-02-14T20:45:26.540Z"<br>}</code></pre>|
| 400    |<code>{<br>  "code": 400,<br>  "msg": balabala"<br>}</code>|

## 无序列表

**无空行**

- 第一行 `abcd` 第一行 Hello world。
- 第一行 `ijkl` 第二行 `efgh` 第二行 Hello world。
- 第三行第三行 `opq` Hello world。

**有空行**

- 第一行 `abcd` 第一行 Hello world。

- 第一行 `ijkl` 第二行 `efgh` 第二行 Hello world。

- 第三行第三行 `opq` Hello world。

## 转载声明

::: important 转载声明

**本文转载自 【Linux爱好者】 的微信公众号文章《Linux下一个重要目录“/proc”，你还不知道作用？》，非盈利目的，仅作学习交流使用。**

**阅读原文 ↓**

<VPBanner
  title="Linux下一个重要目录“/proc”，你还不知道作用？"
  content="作者：Linux爱好者"
  logo="https://res.wx.qq.com/a/wx_fed/assets/res/NTI4MWU5.ico"
  :actions='[
    {
      text: "访问",
      link: "https://mp.weixin.qq.com/s/UIZ8xnBESscPrtzYDahaUg",
      type: "default",
    },
  ]'
/>

:::

## AI 辅助声明

::: important AI 辅助说明 🤖

**本文在撰写过程中借助 AI 工具（Google Gemini）进行了资料整理与文案润色，核心观点及最终内容均由作者审阅确认。**

**但考虑到作者个人局限，再叠加 AI 偶尔「一本正经胡说八道」的习性，文中部分细节难免错漏，仅供参考。如有疑问，还请以官方文档或实际结果为准。**

:::