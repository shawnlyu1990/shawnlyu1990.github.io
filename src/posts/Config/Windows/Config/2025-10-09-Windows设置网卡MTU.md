---
# 文章标题
title: 【功能配置】Windows 设置网卡 MTU
# 当前页面的短标题，会在导航栏、侧边栏和路径导航中作为首选。
shortTitle: Windows 设置网卡 MTU
# 当前页面内容描述。
description: Windows 设置网卡 MTU
# 当前页面的图标，建议填写
icon: "/assets/blogicons/Windows客户端.png"
# 作者
author: 
# 当前文章是否为原创
isOriginal: true
# 设置写作时间
date: 2025-10-09
# 分类，一个页面可以有多个分类
categories: 
  - Windows
# 标签，一个页面可以有多个标签
tags: 
  - MTU
  - MSS
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

## 查看 Windows 网卡 MTU 值

以 ==**管理员身份**== 在 ==**CMD**== 中运行以下命令。

``` cmd
netsh interface ipv4 show subinterfaces
```

在回显中查看对应网卡的 MTU 值。

![查看 Windows 网卡 MTU](/assets/postsimages/2025-10-09-Windows设置网卡MTU/查看Windows网卡MTU.png)

## 修改 Windows 网卡 MTU 值

以 ==**管理员身份**== 在 ==**CMD**== 中运行以下命令。

修改「以太网」网卡的 MTU 值为 1450。

``` cmd
netsh interface ipv4 set subinterface "以太网" mtu=1450 store=persistent
```

再次使用上面的命令查看对应网卡的 MTU 值。

![修改 Windows 网卡 MTU](/assets/postsimages/2025-10-09-Windows设置网卡MTU/修改Windows网卡MTU.png)
