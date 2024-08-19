---
# 文章标题
title: 【转载】VTY 线路和 Console 线路
# 当前页面的短标题，会在导航栏、侧边栏和路径导航中作为首选。
shortTitle: VTY 线路和 Console 线路
# 当前页面内容描述。
description: 在网络设备的管理和维护中，VTY（Virtual Teletype） 线路和 Console（控制台） 线路是两种重要的访问方式。它们在功能、用途、安全性等方面有显著的不同。本文将深入探讨这两种线路的特点、工作原理、配置方法、应用场景以及它们在网络管理中的具体作用。
# 当前页面的图标，建议填写
icon: fas fa-ethernet
# 作者
author: 昌霖学长
# 当前文章是否为原创
isOriginal: false
# 设置写作时间
date: 2024-08-01
# 分类，一个页面可以有多个分类
categories: 
  - 网络
  - 路由交换
# 标签，一个页面可以有多个标签
tags: 
  - VTY
  - Console
# 页面的协议信息
license: MIT 
# 置顶标记（true/false/数字），当填入数字时，数字越大，排名越靠前。
sticky: false
# 星标（true/false/数字），当填入数字时，数字越大，排名越靠前。
star: false
# 是否将该文章添加至文章列表中。
artical: true
# 是否将该文章添加至时间线中。
timeline: true
# 预览图。请填入绝对路径。图片路径位于 .vuepress/public 下
# cover: /assets/images/cover1.jpg
# 设置横幅图片 (宽屏分享图)，请填入绝对路径。
# banner: /assets/images/cover1.jpg
---

::: important
**本文转载自** https://mp.weixin.qq.com/s?__biz=MzUyNTExOTY1Nw==&mid=2247525321&idx=1&sn=f638ab76241b6b8cfa6bff2634fc3650

**来源**：公众号【网络技术干货圈】

**作者**：圈圈

**ID**：wljsghq

**在此记录备忘**

:::

## 基本概念

### VTY 线路

VTY 线路是指虚拟终端线路，主要用于远程管理网络设备。通过 VTY 线路，管理员可以使用 Telnet 或 SSH 协议远程登录到设备进行配置和维护。VTY 线路的存在使得网络管理员无需物理接触设备即可进行远程管理，大大提高了管理效率。

### Console 线路

Console 线路是通过物理接口（如 RJ-45 或 DB-9 接口）连接的管理线路。管理员使用控制台电缆将计算机直接连接到网络设备的 Console 端口，从而进行设备的配置和管理。Console 线路主要用于本地访问，尤其是在设备初次配置或出现重大故障时，Console 线路是唯一的访问途径。

## 工作原理

### VTY 线路的工作原理

VTY 线路通过网络协议（ Telnet 或 SSH ）建立连接。

![VTY线路](/assets/postsimages/2024-08-01-VTY线路和Console线路/01-VTY线路.png)

以下是 VTY 线路的工作流程：

- **远程连接**：管理员通过 Telnet 或 SSH 客户端输入设备的 IP 地址和端口号，发起连接请求。
- **认证**：设备收到连接请求后，提示管理员输入用户名和密码进行身份认证。对于更高级的安全配置，可以启用基于 AAA（Authentication、Authorization and Accounting）框架的多重认证机制。
- **访问控制**：设备可以配置访问控制列表（ACL）来限制特定 IP 地址或网段的访问权限，确保只有授权的用户才能通过 VTY 线路登录。
- **会话管理**：一旦认证通过，设备会为每个成功连接的用户创建一个虚拟终端会话，用户可以在该会话中执行各种配置命令。

### Console 线路的工作原理

Console 线路通过物理连接实现访问，工作流程如下：

- **物理连接**：管理员使用控制台电缆将计算机连接到设备的 Console 端口。通常使用的连接器有RJ-45、DB-9等。
- **终端仿真软件**：计算机上需要运行终端仿真软件（如 PuTTY、HyperTerminal ），设置正确的串行通信参数（波特率、数据位、停止位、奇偶校验等）。
- **直接访问**：无需经过网络，直接通过物理连接访问设备。管理员可以直接看到设备的控制台提示符，并进行配置操作。

![Console线](/assets/postsimages/2024-08-01-VTY线路和Console线路/02-Console线.png)

## 配置方法（以华为路由器为例）

### VTY 线路的配置

配置 VTY 线路通常包括以下步骤：

- **启用 Telnet 或 SSH 服务**：
    
    ```shellsession title="Huawei VRP Console"
    router(config)# line vty 0 4
    router(config-line)# login
    router(config-line)# password your_password
    ```
    
    如果使用SSH，还需要配置SSH相关参数：
    
    ```shellsession title="Huawei VRP Console"
    router(config)# ip domain-name example.com
    router(config)# crypto key generate rsa
    router(config)# line vty 0 4
    router(config-line)# transport input ssh
    router(config-line)# login local
    router(config)# username admin password your_password
    ```
    
- **配置访问控制列表（ACL）**：
    
    ```shellsession title="Huawei VRP Console"
    router(config)# access-list 10 permit 192.168.1.0 0.0.0.255
    router(config)# line vty 0 4
    router(config-line)# access-class 10 in
    ```
    
- **配置会话超时**：
    
    ```shellsession title="Huawei VRP Console"
    router(config-line)# exec-timeout 10 0
    ```
    

### Console 线路的配置

Console 线路的配置相对简单，主要步骤如下：

- **设置控制台密码**：
    
    ```shellsession title="Huawei VRP Console"
    router(config)# line console 0
    router(config-line)# password your_password
    router(config-line)# login
    ```
    
- **配置会话超时**：
    
    ```shellsession title="Huawei VRP Console"
    router(config-line)# exec-timeout 10 0
    ```
    
- **启用记录日志消息**：
    
    ```shellsession title="Huawei VRP Console"
    router(config-line)# logging synchronous
    ```
    

## 应用场景

### VTY 线路的应用场景

- **远程管理**：在大规模网络中，管理员可以通过 VTY 线路远程登录到设备进行配置和故障排查，极大地提高了管理效率和灵活性。
- **日常维护**：日常维护操作如软件升级、配置备份等都可以通过 VTY 线路完成，无需现场操作。
- **多用户并发访问**：VTY 线路支持多个管理员同时访问和管理同一设备，适用于需要协同工作的环境。

### Console 线路的应用场景

- **初次配置**：新设备在网络中上线前需要进行初始配置，此时只能通过 Console 线路访问。
- **故障排除**：当设备网络连接出现问题或远程访问失败时，Console 线路是唯一的管理访问途径。
- **安全保障**：在高度安全要求的环境中，Console 线路提供了额外的物理安全层，防止未经授权的远程访问。

## 优缺点对比

**VTY 线路的优点**

- **远程访问**：无需物理接触设备即可进行管理，特别适合分布式网络。
- **多用户并发**：支持多个管理员同时登录，适用于协同管理。
- **灵活性**：可以通过配置 ACL 和 SSH 等安全机制增强远程访问的安全性。

**VTY 线路的缺点**

- **依赖网络**：需要设备有可用的 IP 地址和网络连接，一旦网络故障或配置错误，可能无法访问。
- **安全风险**：尽管可以通过 SSH 等加密协议保护，但相对于物理连接，仍存在一定的网络安全风险。

**Console 线路的优点**

- **独立于网络**：不依赖网络连接，适用于初始配置和故障排除。
- **高安全性**：由于是物理连接，外部网络攻击者无法通过网络访问。

**Console 线路的缺点**

- **单用户访问**：每次只能允许一个管理员访问，不适用于需要协同管理的场景。
- **局限于本地**：需要物理接触设备，不适合远程管理。
