---
# 文章标题
title: 【代码片段】【Bash】OpenLDAP 导入 AD 组织架构
# 当前页面的短标题，会在导航栏、侧边栏和路径导航中作为首选。
shortTitle: OpenLDAP 导入 AD 组织架构
# 当前页面内容描述。
description: 将 AD 的组织结构导入 OpenLDAP，一般用于 OpenLDAP 刚刚搭建完毕，第一次向 OpenLDAP 同步 AD 的用户。
# 当前页面的图标，建议填写
icon: Terminal
# 作者
author: 昌霖学长
# 当前文章是否为原创
isOriginal: true
# 设置写作时间
date: 2021-03-16
# 分类，一个页面可以有多个分类
categories: 
  - 代码片段
  - Bash
# 标签，一个页面可以有多个标签
tags: 
  - Bash
  - OpenLDAP
  - AD
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

::: tip

需要提前部署 OpenLDAP 服务器，部署方法可以参看

```component VPCard
"title": "部署 OpenLDAP 并整合 Windows AD 认证"
"desc": "部署 OpenLDAP 服务使用 Windows AD 的认证，只在 AD 上维护一套用户密码，OpenLDAP 将认证转发到微软 AD 上进行。"
"link": "/posts/Linux/服务部署/在CentOS7中部署OpenLDAP并整合WindowsAD认证.md"
"background": "rgba(253, 230, 138, 0.15)"
```

:::

## 用途

将 Windows AD 的组织结构导入 OpenLDAP，一般用于 OpenLDAP 刚刚搭建完毕，第一次向 OpenLDAP 同步 AD 的用户

## 代码

```bash
#!/bin/bash
# 预定义参数
AD_DOMAIN="<Your AD's domain>"
AD_ADMIN_DN="CN=<Admin account name>,OU=XXX,OU=XXX,DC=XXX,DC=XXX,DC=XXX"
AD_ADMIN_PWD="<Your admin password>"
AD_BASE_DN="DC=XXX,DC=XXX,DC=XXX"
LDAP_DOMAIN="<Your OpenLDAP's domain>"
LDAP_ADMIN_DN="cn=Manager,dc=XXX,dc=XXX,dc=XXX"
LDAP_ADMIN_PWD="<Your admin password>"

# 先从AD上获取OU组织信息，并保存成ldif文件
/usr/bin/ldapsearch -x -H ldaps://${AD_DOMAIN}:636 "(&(objectClass=top)(objectClass=organizationalUnit))" dn objectClass ou -D "${AD_ADMIN_DN}" -w "${AD_ADMIN_PWD}" -b "${AD_BASE_DN}" -L > /root/OpenLdapShell/Tmp_ldapgroup.ldif

# 导入AD的组织结构
/usr/bin/ldapadd -x -c -w "${LDAP_ADMIN_PWD}" -D "${LDAP_ADMIN_DN}" -f /root/OpenLdapShell/Tmp_ldapgroup.ldif  > /dev/null 2>&1

# 把所有的OU都查出来，为一会导入用户做准备，因为现在AD的人数太多了，所以只能按OU分别导入/更新
/usr/bin/ldapsearch -x -H ldaps://${AD_DOMAIN}:636 "(&(objectClass=top)(objectClass=organizationalUnit))" dn -D "${AD_ADMIN_DN}" -w "${AD_ADMIN_PWD}" -b "${AD_BASE_DN}" -L |php /root/OpenLdapShell/utf8ldif.php > /root/OpenLdapShell/Tmp_ldapgroup_utf8.ldif

# 整理一下LDAP OU的文件，把version，注释之类的都去掉，只留OU的dn信息
/usr/bin/sed -i "/^#/d" /root/OpenLdapShell/Tmp_ldapgroup_utf8.ldif
/usr/bin/sed -i "/^version/d" /root/OpenLdapShell/Tmp_ldapgroup_utf8.ldif
/usr/bin/sed -i "/^[[:space:]]*$/d" /root/OpenLdapShell/Tmp_ldapgroup_utf8.ldif
/usr/bin/sed -i "s/^dn: //g" /root/OpenLdapShell/Tmp_ldapgroup_utf8.ldif

# 开始循环读取OU，一行就是一个OU
while read LINE
do
    # 获取这个OU下的所有用户，并保存成ldif文件
    /usr/bin/ldapsearch -x -H ldaps://${AD_DOMAIN}:636 "(&(objectClass=organizationalPerson)(!(objectClass=computer)))" dn objectClass cn description sAMAccountName uSNCreated -D "${AD_ADMIN_DN}" -w "${AD_ADMIN_PWD}" -b "${LINE}" -L > /root/OpenLdapShell/Tmp_ldapuser.ldif

    # 整理一下ldif的文件，使其适应openldap的导入格式
    /usr/bin/sed -i "/^sAMAccountName: /H;s/^sAMAccountName: /userPassword: {SASL}/;x"  /root/OpenLdapShell/Tmp_ldapuser.ldif
    /usr/bin/sed -i "/^objectClass: user/d" /root/OpenLdapShell/Tmp_ldapuser.ldif
    /usr/bin/sed -i "/^cn:/H;s/^cn:/sn:/;x"  /root/OpenLdapShell/Tmp_ldapuser.ldif
    /usr/bin/sed -i "s/^sAMAccountName:/uid:/g" /root/OpenLdapShell/Tmp_ldapuser.ldif
    /usr/bin/sed -i "/^objectClass: organizationalPerson/H;s/^objectClass: organizationalPerson/objectClass: inetOrgPerson/;x"  /root/OpenLdapShell/Tmp_ldapuser.ldif
    /usr/bin/sed -i "s/^uSNCreated:/employeeNumber:/g" /root/OpenLdapShell/Tmp_ldapuser.ldif

    # 导入用户
    /usr/bin/ldapadd -c -x -w "${LDAP_ADMIN_PWD}" -D "${LDAP_ADMIN_DN}" -f /root/OpenLdapShell/Tmp_ldapuser.ldif > /dev/null 2>&1
done</root/OpenLdapShell/Tmp_ldapgroup_utf8.ldif

# 删除临时文件
/usr/bin/rm -rf /root/OpenLdapShell/Tmp*

```
