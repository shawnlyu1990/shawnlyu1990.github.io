---
# 文章标题
title: 【代码片段】【Bash】OpenLDAP 同步 AD 用户（移动 OU）
# 当前页面的短标题，会在导航栏、侧边栏和路径导航中作为首选。
shortTitle: OpenLDAP 同步 AD 用户（移动 OU）
# 当前页面内容描述。
description: 当 AD 中有用户移动了组织结构（OU）时，可以使用此脚本进行同步。
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

当AD中有用户移动了组织结构时，可以使用此脚本进行同步

::: warning

此脚本未考虑 AD 上删除 OU 的情况，如果 AD 上删除了 OU，这个脚本执行可能会出问题

:::

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
LDAP_BASE_DN=${AD_BASE_DN}
DN_TAG1="^dn:.+$"
DN_TAG2="^ .*$"
SAMACCOUNTNAME_TAG="^sAMAccountName: .+$"
COMMENT_TAG="#.+$"
WHITELINE_TAG="\n\s*\r"
LINE_NUM=0
LAST_LINE_NUM=0
DN_VALUE=""
LOGFILE="/root/OpenLdapShell/OpenLdapUserChangeLog.log"

echo "" > /root/OpenLdapShell/TodayADUser.ldif
echo "" > /root/OpenLdapShell/Tmp_TodayADUser.ldif

# 获取AD上的OU并保存成ldif格式
/usr/bin/ldapsearch -x -H ldaps://${AD_DOMAIN}:636 "(&(objectClass=top)(objectClass=organizationalUnit))" dn objectClass ou -D "${AD_ADMIN_DN}" -w "${AD_ADMIN_PWD}" -b "${AD_BASE_DN}" -L > /root/OpenLdapShell/Tmp_ldapgroup.ldif

# 导入OU
/usr/bin/ldapadd -x -c -w "${LDAP_ADMIN_PWD}" -D "${LDAP_ADMIN_DN}" -f /root/OpenLdapShell/Tmp_ldapgroup.ldif  > /dev/null 2>&1

# 把所有的OU都查出来，为一会导入用户做准备
/usr/bin/ldapsearch -x -H ldaps://${AD_DOMAIN}:636 "(&(objectClass=top)(objectClass=organizationalUnit))" dn -D "${AD_ADMIN_DN}" -w "${LDAP_ADMIN_PWD}" -b "${AD_BASE_DN}" -L |php /root/OpenLdapShell/utf8ldif.php > /root/OpenLdapShell/Tmp_ldapgroup_utf8.ldif

# 整理一下LDAP OU的文件，把version，注释之类的都去掉，只留OU的路径:
/usr/bin/sed -i "/^#/d" /root/OpenLdapShell/Tmp_ldapgroup_utf8.ldif
/usr/bin/sed -i "/^version/d" /root/OpenLdapShell/Tmp_ldapgroup_utf8.ldif
/usr/bin/sed -i "/^[[:space:]]*$/d" /root/OpenLdapShell/Tmp_ldapgroup_utf8.ldif
/usr/bin/sed -i "s/^dn: //g" /root/OpenLdapShell/Tmp_ldapgroup_utf8.ldif

# 开始循环读取OU，一行就是一个OU
while read OU_LINE
do
    # 把所有用户都查出来保存在Tmp_TodayADUser.ldif里面
    /usr/bin/ldapsearch -x -H ldaps://${AD_DOMAIN} "(&(objectClass=organizationalPerson)(!(objectClass=computer)))" dn sAMAccountName -D "${AD_ADMIN_DN}" -w "${LDAP_ADMIN_PWD}" -b "${OU_LINE}" -L | php /root/OpenLdapShell/utf8ldif.php >> /root/OpenLdapShell/Tmp_TodayADUser.ldif
done</root/OpenLdapShell/Tmp_ldapgroup_utf8.ldif

/usr/bin/cp -rp /root/OpenLdapShell/Tmp_TodayADUser.ldif /root/OpenLdapShell/TodayADUser.ldif

# 和昨天查出来的ldif比对，如果DN不一样的就修改用户所在OU
while read LINE
do
    if [[ "${LINE}" =~ ${DN_TAG1} ]];then
        grep -w "${LINE}" /root/OpenLdapShell/YesterdayADUser.ldif > /dev/null 2>&1
        if [ $? -ne 0 ];then
            DN_TMP1=${LINE}
            DN_TMP2=${DN_TMP1##*:}
            DN_TMP3=${DN_TMP2/ /}
            DN_HEAD=${DN_TMP3:0:3}
            DN_VALUE=$DN_TMP3
            OU_VALUE=${DN_VALUE#*,}
            CN_VALUE=${DN_VALUE%%,*}
        fi
    fi
    if [ "${DN_VALUE}" != "" ];then
        if [[ "${LINE}" =~ ${SAMACCOUNTNAME_TAG} ]];then
            UID_TMP1=${LINE}
            UID_TMP2=${UID_TMP1##*:}
            UID_VALUE=${UID_TMP2/ /}
            /usr/bin/ldapsearch -x -H ldaps://${LDAP_DOMAIN} "(&(objectClass=inetOrgPerson)(uid=${UID_VALUE}))" dn uid -D "${LDAP_ADMIN_DN}" -w "${LDAP_ADMIN_PWD}" -b "${LDAP_BASE_DN}" -L >> /root/OpenLdapShell/Tmp_LdapModifyUser.ldif
            /usr/bin/sed -i "/^uid: ${UID_VALUE}/a\newsuperior: ${OU_VALUE}" /root/OpenLdapShell/Tmp_LdapModifyUser.ldif
            /usr/bin/sed -i "s/^uid: ${UID_VALUE}/newrdn: ${CN_VALUE}/" /root/OpenLdapShell/Tmp_LdapModifyUser.ldif
            echo "[$(date '+%Y-%m-%d %H:%M:%S')] OpenLdap Server Change User OU, UID: ${UID_VALUE}, The new DN: ${DN_VALUE}." >> ${LOGFILE}
  
            DN_VALUE=""
            OU_VALUE=""
            CN_VALUE=""
        fi
    fi
done</root/OpenLdapShell/TodayADUser.ldif

# 更新一下ldif文件的各种属性，准备导入
/usr/bin/sed -i "/^newrdn: /i\changetype: modrdn" /root/OpenLdapShell/Tmp_LdapModifyUser.ldif
/usr/bin/sed -i "/^newrdn: /a\deleteoldrdn: 0" /root/OpenLdapShell/Tmp_LdapModifyUser.ldif

# 更新OPENLDAP用户信息
/usr/bin/ldapmodify -c -x -w "${LDAP_ADMIN_PWD}" -D "${LDAP_ADMIN_DN}" -f /root/OpenLdapShell/Tmp_LdapModifyUser.ldif > /dev/null 2>&1

# 删除临时文件
/usr/bin/rm -rf /root/OpenLdapShell/YesterdayADUser.ldif
# 把今天的用户文件保存成YesterdayADUser.ldif供明天使用
/usr/bin/cp -rp /root/OpenLdapShell/TodayADUser.ldif /root/OpenLdapShell/YesterdayADUser.ldif
/usr/bin/rm -rf /root/OpenLdapShell/Tmp*
/usr/bin/rm -rf /root/OpenLdapShell/TodayADUser.ldif
[root@ldapproxy OpenLdapShell]# 

```
