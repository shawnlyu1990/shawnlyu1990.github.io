---
# 文章标题
title: 【FAQ】在 Windows 10 和 11 中允许 PowerShell 脚本执行
# 当前页面的短标题，会在导航栏、侧边栏和路径导航中作为首选。
shortTitle: Win10/11 中允许 PowerShell 脚本执行
# 当前页面内容描述。
description: 默认情况下 Windows 中禁止执行任何 PowerShell 脚本（.ps1 文件），如果需要运行 PowerShell 脚本需要提前修改 PowerShell 策略，在此记录修改方法。
# 当前页面的图标，建议填写
icon: "/assets/blogicons/Windows客户端.png"
# 作者
author: 昌霖学长
# 当前文章是否为原创
isOriginal: false
# 设置写作时间
date: 2025-10-13
# 分类，一个页面可以有多个分类
categories: 
  - Windows
  - PowerShell
# 标签，一个页面可以有多个标签
tags: 
  - PowerShell
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
## 问题现象

在 Windows 10 和 11 系统中，运行 PowerShell 脚本时（.ps1 文件）会提示如下错误。

```powershell
PS E:\code> hexo server
hexo : 无法加载文件 C:\Users\Administrator\XXX\XXX.ps1，
因为在此系统上禁止运行脚本。有关详细信息，请参阅 
https:/go.microsoft.com/fwlink/?LinkID=135170 中的about_Execution_Policies。
所在位置 行:1 字符: 1
+ hexo new "PowerShell：因为在此系统上禁止运行脚本，解决方法"
+
    + CategoryInfo          : SecurityError: (:) []，PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess
```

## 问题原因

主要原因是 Windows 启动 PowerShell 时，其处于默认执行策略 `Restricted` 中，默认策略 `Restricted` 会完全禁止所有脚本运行，包括本地脚本和配置文件。

PowerShell 执行策略是 Windows 系统内置的安全防护机制，通过限制脚本运行条件防止恶意代码执行。

|策略|描述|
|:---:|:---|
|Restricted|禁止运行任何脚本，包括本地脚本和配置文件。|
|RemoteSigned|允许本地脚本运行，但要求网络下载的脚本必须具有数字签名。|
|AllSigned|所有脚本（包括本地脚本）必须具有数字签名。|
|Unrestricted|允许运行所有脚本，存在安全风险。|
|Bypass|无任何限制，适用于嵌入式脚本场景。|

## 解决方法

::: important
策略选择建议：

- 开发环境推荐使用 `RemoteSigned`，平衡安全性与便利性。
- 生产环境建议使用 `AllSigned`，确保所有脚本来源可信。
- 避免使用 `Unrestricted` 策略，防止恶意代码执行。
:::

1. 查看当前计算机上的现用执行策略，使用管理员身份打开 PowerShell 然后输入：`get-executionpolicy` 命令，通过回显可以看到当前的执行策略。

    ```powershell
    get-executionpolicy
    ```

    ::: note
    返回值含义参考上表，根据实际需求修改执行策略。
    :::

2. 修改当前用户的执行策略。

    ```powershell
    Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

    执行策略更改
    执行策略可帮助你防止执行不信任的脚本。更改执行策略可能会产生安全风险，如 https:/go.microsoft.com/fwlink/?LinkID=135170
    中的 about_Execution_Policies 帮助主题所述。是否要更改执行策略?
    [Y] 是(Y)  [A] 全是(A)  [N] 否(N)  [L] 全否(L)  [S] 暂停(S)  [?] 帮助 (默认值为“N”): y
    ```

    ::: note
    `-Scope CurrentUser` 表示仅对当前用户生效。
    :::

3. 修改本地计算机中所有用户（全局）的执行策略。

    ```powershell
    Set-ExecutionPolicy RemoteSigned -Scope LocalMachine
    
    执行策略更改
    执行策略可帮助你防止执行不信任的脚本。更改执行策略可能会产生安全风险，如 https:/go.microsoft.com/fwlink/?LinkID=135170
    中的 about_Execution_Policies 帮助主题所述。是否要更改执行策略?
    [Y] 是(Y)  [A] 全是(A)  [N] 否(N)  [L] 全否(L)  [S] 暂停(S)  [?] 帮助 (默认值为“N”): y
    ```

    ::: note
    `-Scope LocalMachine` 需要管理员权限。
    :::

4. 临时绕过策略（单次会话有效）

    在 PowerShell 中运行脚本时添加 `-ExecutionPolicy Bypass` 参数。

    ```powershell
    "D:\PycharmProjects\AutogenTest\autogen_env\Scripts\Activate.ps1" -ExecutionPolicy Bypass
    ```

    ::: note
    此方法仅对当前会话有效，关闭后需重新设置。
    :::
