---
# 文章标题
title: 在 VMware vCenter 中使用企业 CA 或第三方 CA 替换 VMCA
# 当前页面的短标题，会在导航栏、侧边栏和路径导航中作为首选。
shortTitle: 在 VMware vCenter 中使用企业 CA 或第三方 CA 替换 VMCA
# 当前页面内容描述。
description: VMware vCenter支持根据公司策略和正配置的系统的要求来执行不同类型的证书替换。可以使用 vSphere Certificate Manager 实用程序从 Platform Services Controller 执行证书替换，也可以通过使用安装中包含的 CLI 手动执行证书替换。
# 当前页面的图标，建议填写
icon: VMwarevSphere
# 作者
author: 昌霖学长
# 当前文章是否为原创
isOriginal: true
# 设置写作时间
date: 2020-07-27
# 分类，一个页面可以有多个分类
categories: 
  - VMware
  - vCenter
# 标签，一个页面可以有多个标签
tags: 
  - VMware
  - vCenter
  - VMCA
  - CA
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
以下内容是我自己的生产环境的情况结合 VMware 官方文档的操作步骤，在此仅做记录，不保证适用其他场景需求，请以 VMware 官方文档为准。

VMware 官方文档：<https://docs.vmware.com/cn/VMware-vSphere/6.7/com.vmware.psc.doc/GUID-DC693417-78CF-477F-9A4F-AFC9AA1D74E7.html>
:::

## 1. 环境准备

- **CA**：Windows Server 2016（已提前部署了CA）
- **vSphere**： ESXi 6.7 update 3
- **vCetner**：VMware vCenter 6.7（Windows Server 2012 R2）

## 2. 证书替换概述

VMware vCenter 支持根据公司策略和正配置的系统的要求来执行不同类型的证书替换。可以使用 vSphere Certificate Manager 实用程序从 Platform Services Controller 执行证书替换，也可以通过使用安装中包含的 CLI 手动执行证书替换。

VMCA 包含在每个 Platform Services Controller 和每个嵌入式部署中。VMCA 可置备每个节点、每个 vCenter Server 解决方案用户，以及每个使用由 VMCA 签名的证书作为证书颁发机构的 ESXi 主机。vCenter Server 解决方案用户是 vCenter Server 服务组。

可以替换默认证书。对于 vCenter Server 组件，可以使用安装中包含的一组命令行工具。您具有多个选择。

- 替换为 VMCA 签名的证书
- 使 VMCA 成为中间 CA
- 由第三方或企业 CA 签名的证书使用 VMCA 作为中间 CA

此处仅对第二种替换方式（使 VMCA 成为中间 CA）进行记录

## 3. 在 CA 服务器（Windows Server 2016）中创建所需的证书颁发机构模板

### 3.1. 为 vSphere 6.7 创建新的证书模板，以用于计算机 SSL 和解决方案用户证书

1. 通过远程桌面连接到 CA 服务器
2. 在开始菜单中找到「证书颁发机构」，并打开

    ![打开CA服务器的证书颁发机构应用程序](/assets/postsimages/2020-07-27-在VMwarevCenter中使用企业CA或第三方CA替换VMCA/01-打开CA服务器的证书颁发机构应用程序.png)

3. 找到证书模板，右键，单击「管理」，打开「证书模板控制台」

    ![打开证书模板控制台](/assets/postsimages/2020-07-27-在VMwarevCenter中使用企业CA或第三方CA替换VMCA/02-打开证书模板控制台.png)

4. 在「证书模板控制台」中的「模板显示名称」下，右键单击 「Web 服务器 V2」，然后单击复制模板。

    ![复制Web服务器V2模板](/assets/postsimages/2020-07-27-在VMwarevCenter中使用企业CA或第三方CA替换VMCA/03-复制Web服务器V2模板.png)

5. 在「复制模板」窗口中，在兼容性选项卡下，选择「Windows Server 2008 R2」以实现向后兼容。（默认是Windows Server 2003，当然也可以直接用这个）

    ![对复制的模板修改兼容性选项](/assets/postsimages/2020-07-27-在VMwarevCenter中使用企业CA或第三方CA替换VMCA/04-对复制的模板修改兼容性选项.png)

6. 单击常规选项卡。
7. 在「模板显示名称」字段中，输入「VMware vSphere 6.7」作为新模板的名称。修改有效期为 5 年，续订期为 6 周，勾选「在Active Directory中发布证书」和「如果Active Directory中有一个重复证书，不要自动重新注册」

    ![修改新模板的常规选项](/assets/postsimages/2020-07-27-在VMwarevCenter中使用企业CA或第三方CA替换VMCA/05-修改新模板的常规选项.png)

8. 单击「扩展」选项卡。
9. 选择「应用程序策略」，然后单击「编辑」。

    ![编辑应用程序策略](/assets/postsimages/2020-07-27-在VMwarevCenter中使用企业CA或第三方CA替换VMCA/06-编辑应用程序策略.png)

10. 选择「服务器身份验证」，然后依次单击「移除」和「确定」。

    ![移除服务器身份验证](/assets/postsimages/2020-07-27-在VMwarevCenter中使用企业CA或第三方CA替换VMCA/07-移除服务器身份验证.png)

11. 选择「密钥用法」，然后单击「编辑」。

    ![编辑密钥用法](/assets/postsimages/2020-07-27-在VMwarevCenter中使用企业CA或第三方CA替换VMCA/08-编辑密钥用法.png)

12. 选择「签名证明原件 (认可) 」选项。 将所有其他选项保留为默认值。单击确定。

    ![编辑签名选项](/assets/postsimages/2020-07-27-在VMwarevCenter中使用企业CA或第三方CA替换VMCA/09-编辑签名选项.png)

13. 单击「使用者名称」选项卡。
14. 确保选择了「在请求中提供」选项。

    ![编辑使用者名称选项](/assets/postsimages/2020-07-27-在VMwarevCenter中使用企业CA或第三方CA替换VMCA/10-编辑使用者名称选项.png)

15. 单击「确定」保存模板。

    ![保存新模板](/assets/postsimages/2020-07-27-在VMwarevCenter中使用企业CA或第三方CA替换VMCA/11-保存新模板.png)

16. 继续查阅本文中的在证书模板中添加新模板部分，使新创建的证书模板可用。

    ![查看新模板](/assets/postsimages/2020-07-27-在VMwarevCenter中使用企业CA或第三方CA替换VMCA/12-查看新模板.png)

### 3.2. 为 vSphere 6.7 创建新的证书模板，以作为从属 CA 用于 VMCA

1. 通过远程桌面连接到 CA 服务器
2. 在开始菜单中找到「证书颁发机构」，并打开

    ![打开证书颁发机构应用程序](/assets/postsimages/2020-07-27-在VMwarevCenter中使用企业CA或第三方CA替换VMCA/13-打开证书颁发机构应用程序.png)

3. 找到证书模板，右键，单击「管理」，打开「证书模板控制台」

    ![打开证书模板控制台](/assets/postsimages/2020-07-27-在VMwarevCenter中使用企业CA或第三方CA替换VMCA/14-打开证书模板控制台.png)

4. 在「证书模板控制台」中的「模板显示名称」下，右键单击「从属证书颁发机构」，然后单击「复制模板」。

    ![复制从属证书颁发机构模板](/assets/postsimages/2020-07-27-在VMwarevCenter中使用企业CA或第三方CA替换VMCA/15-复制从属证书颁发机构模板.png)

5. 在「复制模板」窗口中，选择「Windows Server 2008 R2」以实现向后兼容。

    ![对复制的模板修改兼容性选项](/assets/postsimages/2020-07-27-在VMwarevCenter中使用企业CA或第三方CA替换VMCA/16-对复制的模板修改兼容性选项.png)

6. 单击「常规」选项卡。
7. 在「模板显示名称」字段中，输入「VMware vCenter 6.7 VMCA」作为新模板的名称。
8. 有效期为 5 年，续订期为 6 周，确保选择了「在 Active Directory 中发布证书」和「如果Active Directory中有一个重复证书，不要自动重新注册」。

    ![修改新模板的常规选项](/assets/postsimages/2020-07-27-在VMwarevCenter中使用企业CA或第三方CA替换VMCA/17-修改新模板的常规选项.png)

9. 单击「扩展」选项卡。
10. 选择「密钥用法」，然后单击「编辑」。

    ![编辑新模板的密钥用法](/assets/postsimages/2020-07-27-在VMwarevCenter中使用企业CA或第三方CA替换VMCA/18-编辑新模板的密钥用法.png)

11. 确保已启用「数字签名」、「证书签名」和 「CRL 签名」。
12. 确保已启用「使这个扩展成为关键扩展」。
13. 单击「确定」。

    ![编辑新模板的签名选项](/assets/postsimages/2020-07-27-在VMwarevCenter中使用企业CA或第三方CA替换VMCA/19-编辑新模板的签名选项.png)

14. 单击「确定」保存模板。

    ![保存新模板](/assets/postsimages/2020-07-27-在VMwarevCenter中使用企业CA或第三方CA替换VMCA/20-保存新模板.png)

15. 继续查阅本文中的在证书模板中添加新模板部分，使新创建的证书模板可用。

    ![查看新模板](/assets/postsimages/2020-07-27-在VMwarevCenter中使用企业CA或第三方CA替换VMCA/21-查看新模板.png)

### 3.3. 新建证书模板

1. 在证书模板的空白处，点击右键，选择“新建” > “要颁发的证书模板”，在弹出窗口中选择刚刚新建的证书模板，点击确定即可

    ![新建证书模板](/assets/postsimages/2020-07-27-在VMwarevCenter中使用企业CA或第三方CA替换VMCA/22-新建证书模板.png)

## 4. 将 VMCA 设置为中间证书颁发机构

### 4.1. 使用 vSphere 证书管理器生成 CSR 并准备根证书

1. 登录 vCenter 所在的物理服务器
2. 进入以下目录 `C:\Program Files\VMware\vCenter Server\vmcad\`
3. 右键单击「certificate-manager.bat」，选择「以管理员身份运行」

    ![在vCenter中运行证书管理脚本](/assets/postsimages/2020-07-27-在VMwarevCenter中使用企业CA或第三方CA替换VMCA/23-在vCenter中运行证书管理脚本.png)

4. 选择选项「2」。
5. 首先，使用此选项生成 CSR，而不是替换证书。
6. 按照提示提供密码和 Platform Services Controller 的 IP 地址或主机名。

    ![提供IP或主机名](/assets/postsimages/2020-07-27-在VMwarevCenter中使用企业CA或第三方CA替换VMCA/24-提供IP或主机名.png)

7. 选择选项「1」，生成 CSR（证书请求文件）并按提示提供信息。

   ::: tip
   > 在此流程中，您必须提供一个目录。证书管理器会将要签名的证书（`*.csr` 文件）和相应密钥文件（`*.key` 文件）放入该目录中。如果没有目录则需要先创建好。
   >
   > 例如：我这边是在 D 盘创建了一个 `D:\SSL\CSRS` 目录。
   :::

    ![生成证书请求文件](/assets/postsimages/2020-07-27-在VMwarevCenter中使用企业CA或第三方CA替换VMCA/25-生成证书请求文件.png)

8. 使用记事本打开 `vmca_issued_csr.csr` 文件

    ![打开证书请求文件](/assets/postsimages/2020-07-27-在VMwarevCenter中使用企业CA或第三方CA替换VMCA/26-打开证书请求文件.png)

9. 使用浏览器打开 CA 服务器的证书申请页面 `http://{Your CA IP}/certsrv`
10. 点击「申请证书」

    ![打开CA服务器证书申请页面](/assets/postsimages/2020-07-27-在VMwarevCenter中使用企业CA或第三方CA替换VMCA/27-打开CA服务器证书申请页面.png)

11. 选择「高级证书申请」

    ![高级证书申请-1](/assets/postsimages/2020-07-27-在VMwarevCenter中使用企业CA或第三方CA替换VMCA/28-高级证书申请-1.png)

12. 选择「使用base64编码的CMC或PKCS #10文件提交一个证书申请，或使用base64编码的PKCS #7文件续订证书申请」

    ![高级证书申请-2](/assets/postsimages/2020-07-27-在VMwarevCenter中使用企业CA或第三方CA替换VMCA/29-高级证书申请-2.png)

13. 将刚刚使用记事本打开的 `vmca_issued_csr.csr` 文件内容复制粘贴到「Base-64编码的证书申请（CMC或PKCS #10或PKCS #7）」
14. 证书模板选择「VMware vCenter 6.7 VMCA」
15. 点击「提交」

    ![提交高级证书申请](/assets/postsimages/2020-07-27-在VMwarevCenter中使用企业CA或第三方CA替换VMCA/30-提交高级证书申请.png)

16. 选择「Base64编码」，下载证书文件

    ![下载证书文件](/assets/postsimages/2020-07-27-在VMwarevCenter中使用企业CA或第三方CA替换VMCA/31-下载证书文件.png)

17. 拼接证书文件

    - 新建一个 `root_signing_chain.cer` 文件，并用记事本打开
    - 将刚刚下载的证书文件内容复制到 `root_signing_chain.cer` 文件
    - 下载 CA 根证书

        ![拼接证书文件-1](/assets/postsimages/2020-07-27-在VMwarevCenter中使用企业CA或第三方CA替换VMCA/32-拼接证书文件-1.png)

        ![拼接证书文件-2](/assets/postsimages/2020-07-27-在VMwarevCenter中使用企业CA或第三方CA替换VMCA/33-拼接证书文件-2.png)

    - 将 CA 证书内容复制，并追加粘贴到 `root_signing_chain.cer` 文件中

        ![拼接证书文件-3](/assets/postsimages/2020-07-27-在VMwarevCenter中使用企业CA或第三方CA替换VMCA/34-拼接证书文件-3.png)

    - 最终 `root_signing_chain.cer` 文件中的内容如下

        ```text title="root_signing_chain.cer"
        -----BEGIN CERTIFICATE-----
        {被CA签名的VMCA证书}
        -----END CERTIFICATE-----
        -----BEGIN CERTIFICATE-----
        {CA根证书}
        -----END CERTIFICATE-----
        ```

18. 继续选择「1」选项
19. 输入刚刚创建的 `root_signing_chain.cer` 文件路径和刚刚生成的 `vmca_issued_key.key` 文件路径

    ![输入证书文件路径](/assets/postsimages/2020-07-27-在VMwarevCenter中使用企业CA或第三方CA替换VMCA/35-输入证书文件路径.png)

20. 开始导入新证书，等待新证书替换完成，可能需要20分钟左右

    ![导入新证书](/assets/postsimages/2020-07-27-在VMwarevCenter中使用企业CA或第三方CA替换VMCA/36-导入新证书.png)

21. 证书替换完成后，使用 Administrator 用户登录 vCenter，在 vCenter 的 FQDN(域名) 下点击，「配置」→「高级配置」，修改一下 `vpxd.certmgmt.certs.minutesBefore` 项，把 `1440` 改成 `10`，然后保存。

    ::: warning
    如果此处不修改，后续更新 ESXi 服务器证书时会提示诸如下面的报错：`Unable to get signed certificate forhost name 'xxx.xxx.xxx' ip 'xxx.xxx.xxx.xxx': Error: Start Time Error (70034)`
    :::

    ![修改vCenter的FQDN](/assets/postsimages/2020-07-27-在VMwarevCenter中使用企业CA或第三方CA替换VMCA/37-修改vCenter的FQDN.png)

22. 证书导入成功后即可在「系统管理」→「证书」→「证书管理」中，「可信根证书列表」中查看到最新导入的根证书，根证书的签发者应该是企业CA或第三方CA

    ![在vCenter中查看新证书](/assets/postsimages/2020-07-27-在VMwarevCenter中使用企业CA或第三方CA替换VMCA/38-在vCenter中查看新证书.png)

## 5. 续订计算机 SSL 证书和解决方案证书

点击计算机 SSL 证书和解决方案证书上的「操作」，选择续订，即可更新为新 CA 证书签发的证书

![续订计算机SSL证书和解决方案证书](/assets/postsimages/2020-07-27-在VMwarevCenter中使用企业CA或第三方CA替换VMCA/39-续订计算机SSL证书和解决方案证书.png)

## 6. **更新 ESXi 主机证书**

登录一个 ESXi 主机，进入「配置」→「证书」页面，点击「更新」和「刷新CA证书」即可刷新ESXi的证书

::: warning
ESXi 主机的时间需要与 vCenter 服务器的时间一致，否则无法刷新
:::

![更新ESXi主机证书](/assets/postsimages/2020-07-27-在VMwarevCenter中使用企业CA或第三方CA替换VMCA/40-更新ESXi主机证书.png)

::: important 再次申明
以上内容是我自己的生产环境的情况结合 VMware 官方文档的操作步骤，在此仅做记录，不保证适用其他场景需求，请以 VMware 官方文档为准。

VMware 官方文档：<https://docs.vmware.com/cn/VMware-vSphere/6.7/com.vmware.psc.doc/GUID-DC693417-78CF-477F-9A4F-AFC9AA1D74E7.html>
:::
