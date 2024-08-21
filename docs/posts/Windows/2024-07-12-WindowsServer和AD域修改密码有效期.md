---
# 文章标题
title: 【功能配置】在 Windows Server 服务器和 AD 服务器中修改密码有效期策略
# 当前页面的短标题，会在导航栏、侧边栏和路径导航中作为首选。
shortTitle: Windows Server 修改密码有效期策略
# 当前页面内容描述。
description: 自己用 Windows Server 搭建测试环境的时候，一般不需要每隔 N 天改一下密码，这里记录一下在 Windows Server 中和 AD 服务器中修改密码有效期策略的方法。
# 当前页面的图标，建议填写
icon: fab fa-windows
# 作者
author: 昌霖学长
# 当前文章是否为原创
isOriginal: true
# 设置写作时间
date: 2024-07-12
# 分类，一个页面可以有多个分类
categories: 
  - Windows
# 标签，一个页面可以有多个标签
tags: 
  - 密码有效期
  - Windows Server
  - AD
  - Active Directory
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
本博客系个人学习笔记，内容源自公开出版物及网络资源，如有侵权，请通过左下角 ✉️ 联系删除。
:::

## AD 域控服务器修改域密码策略

1. 打开服务器管理器，在「工具」里面找到「组策略管理」，单击打开「组策略管理」窗口。

    ![打开组策略管理器](/assets/postsimages/2024-07-12-WindowsServer和AD域修改密码有效期/01-打开组策略管理器.png)

2. 唤出「组策略管理」程序窗口，进入以下路径【组策略管理】→【林: abc.com】→【域】→【abc.com】→【Default Domain Policy】，鼠标右键单击【Default Domain Policy】，在弹出的快捷菜单中选择【编辑...】项。

    ![打开域的组策略管理编辑器](/assets/postsimages/2024-07-12-WindowsServer和AD域修改密码有效期/02-打开域的组策略管理编辑器.png)

3. 在弹出的「组策略管理编辑器」窗口中，单击【计算机配置】→【策略】→【Windows 设置】→【安全设置】→【账户策略】→【密码策略】菜单，在右侧修改编辑密码策略即可。

    ![修改AD域的密码策略](/assets/postsimages/2024-07-12-WindowsServer和AD域修改密码有效期/03-修改AD域的密码策略.png)

## Windows Server 修改本地密码策略

1. 打开服务器管理器，在【工具】里面找到【本地安全策略】，单击打开「本地安全策略」窗口。

    ![打开本地安全策略](/assets/postsimages/2024-07-12-WindowsServer和AD域修改密码有效期/04-打开本地安全策略.png)

2. 唤出「本地安全策略」程序窗口，单击【安全设置】→【账户策略】→【密码策略】菜单，在右侧修改编辑密码策略即可。

    ![修改WindowsServer本地密码策略](/assets/postsimages/2024-07-12-WindowsServer和AD域修改密码有效期/05-修改WindowsServer本地密码策略.png)
