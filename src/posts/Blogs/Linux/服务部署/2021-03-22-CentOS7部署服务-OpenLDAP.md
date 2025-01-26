---
# 文章标题
title: CentOS 7 部署服务 - OpenLDAP 并使用 Windows AD 做认证源
# 当前页面的短标题，会在导航栏、侧边栏和路径导航中作为首选。
shortTitle: CentOS 7 部署服务 - OpenLDAP
# 当前页面内容描述。
description: 部署 OpenLDAP 服务使用 Windows AD 的认证，只在 AD 上维护一套用户密码，OpenLDAP 将认证转发到微软 AD 上进行。
# 当前页面的图标，建议填写
icon: OpenLDAP
# 作者
author: 昌霖学长
# 当前文章是否为原创
isOriginal: true
# 设置写作时间
date: 2021-03-22
# 分类，一个页面可以有多个分类
categories: 
  - Linux
  - 服务部署
# 标签，一个页面可以有多个标签
tags: 
  - OpenLDAP
  - Windows AD
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
# 是否开启评论
comment: false
# 预览图。请填入绝对路径。图片路径位于 .vuepress/public 下
# cover: /assets/images/cover1.jpg
# 设置横幅图片 (宽屏分享图)，请填入绝对路径。
# banner: /assets/images/cover1.jpg
---

::: important
由于作者水平有限，以下内容仅在我的环境中配置成功，这里提供思路供您参考。

因为每个环境各有差异，如果有些配置在您的环境中出现了一些异常错误，请您自行排查解决。
:::

## 1. 背景

OpenLDAP 是开源的目录服务实现，AD 是微软的目录服务实现。在我们的业务环境中可能会出现有的应用场景（应用、客户端）跟 OpenLDAP 结合比较容易；有的应用场景又必须要使用 AD。几乎不可能弃用其中的任意一种。但同时维护两套系统意味着维护工作大量增加（不仅仅只是增加一倍，要考虑信息分别维护、同步等）、出错几率大大增加。

其中的一种较成熟、使用比较多的解决方案是：OpenLDAP 使用 AD 的认证，即只在 AD 上维护一套用户密码，OpenLDAP 将认证转发到微软 AD 上进行。

## 2. 相关组件

1. **LDAP Client**：这个是实际调用 ldap 服务的系统，也可以是类似 ldapsearch 之类的 client 程序
2. **OpenLDAP 服务器**：开源服务端，实际进程为 slapd
3. **saslauthd**：简单认证服务层的守护进程，该进程要安装在 openldap 服务器上
4. **AD**：微软AD

## 3. 部署

### 3.1. 安装 OpenLdap

#### 3.1.1. 安装 OpenLDAP 服务

::: warning
本文仅以 OpenLDAP 2.4.44 版本为例进行安装和配置说明，其他版本如有差异请以实际为准。
:::

```bash
[root@localhost ~]# yum install -y openldap openldap-clients openldap-servers-sql compat-openldap openldap-devel openldap-servers
[root@localhost ~]# systemctl restart slapd.service
[root@localhost ~]# systemctl enable slapd.service
```

#### 3.1.2. 配置 OpenLDAP 管理密码，并修改 OpenLDAP 配置

```bash
[root@localhost ~]# slappasswd
New password: 
Re-enter new password: 
{SSHA}zBfhcYEI5u6mUJUAk6f46rSxLPksOLQo
```

::: tip
把上面生成的 {SSHA} 开头的字符串记下来，后面修改配置文件要用
:::

创建一个 ldif 文件用于修改 OpenLDAP 配置，旧版本的 OpenLDAP 修改配置是可以直接修改 slapd.conf 文件的，但是新版本的 OpenLDAP 的配置文件全部在 `/etc/openldap/slapd.d/` 目录下，不能随意使用 `vim` 修改，如果手动使用 `vim` 方式修改了配置文件，则会导致配置文件校验和不一致，可能会出现一些未知的问题。

新建一个 `change_ldap_cfg.ldif` 文件用于修改 OpenLDAP 配置，将以下内容写入

```ssh-config title="change_ldap_cfg.ldif"
# 实际配置的时候建议把 “#” 后面的注释内容删掉，只保留配置内容
dn: olcDatabase={2}hdb,cn=config  # 表示修改 /etc/openldap/slapd.d/cn=config/olcDatabase={2}hdb.ldif 这个文件里的内容
changetype: modify  # 表示我们需要为这个文件执行变更操作
replace: olcRootDN  # 修改 olcRootDN 这个字段的内容
olcRootDN: cn=Manager,dc=test,dc=winad,dc=com  # 把 olcRootDN 这个字段的内容修改成这样
-  # 具体含义不知道，但是大概表示上面这个 dn 的配置还没修改完，下面还是修改这个 dn 的配置
replace: olcSuffix  # 修改 olcSuffix 这个字段的内容
olcSuffix: dc=test,dc=winad,dc=com  # 把 olcSuffix 这个字段的内容修改成这样
-
add: olcRootPW   # 增加一个 olcRootPW 字段
olcRootPW: {SSHA}NKL0WdsiEPUSnjpCrz+ZbwJTuTK1inZh   # 增加的 olcRootPW 这个字段的内容是这样

dn: olcDatabase={1}monitor,cn=config  # 表示修改 /etc/openldap/slapd.d/cn=config/olcDatabase={1}monitor.ldif 这个文件里的内容
changetype: modify  # 表示我们需要为这个文件执行变更操作
replace: olcAccess  # 修改 olcAccess 这个字段的内容
olcAccess: {0}to * by dn.base="gidNumber=0+uidNumber=0,cn=peercred,cn=extern
 al,cn=auth" read by dn.base="cn=Manager,dc=test,dc=winad,dc=com" read by * none  # 把 olcAccess 这个字段的内容修改成这样
```

上面的配置文件保存好之后，执行 `ldapmodify` 命令进行修改

```bash
[root@localhost ~]# ldapmodify -Y EXTERNAL -H ldapi:/// -f change_ldap_cfg.ldif 
SASL/EXTERNAL authentication started
SASL username: gidNumber=0+uidNumber=0,cn=peercred,cn=external,cn=auth
SASL SSF: 0
modifying entry "olcDatabase={2}hdb,cn=config"

modifying entry "olcDatabase={1}monitor,cn=config"
```

执行完了以后看下下面这两个文件，看看需要修改的字段改过来没有

`/etc/openldap/slapd.d/cn=config/olcDatabase={1}monitor.ldif`
`/etc/openldap/slapd.d/cn=config/olcDatabase={2}hdb.ldif`

#### 3.1.3. 创建管理员账号

新建一个 `base.ldif` 文件用于导入管理员账号，在文件中添加如下内容

```ssh-config title="base.ldif"
dn: dc=test,dc=winad,dc=com
o: test winad com
dc: test
objectClass: top
objectClass: dcObject
objectclass: organization

dn: cn=Manager,dc=test,dc=winad,dc=com
cn: Manager
objectClass: organizationalRole
description: Directory Manager
```

上面的配置文件保存好之后，执行 `ldapadd` 命令导入

```bash
# 导入账号
[root@localhost ~]# ldapadd -x -D "cn=Manager,dc=test,dc=winad,dc=com" -W -f base.ldif 
Enter LDAP Password:  # 这里输的密码就是上面第二步的时候配置的那个密码
adding new entry "dc=test,dc=winad,dc=com"

adding new entry "cn=Manager,dc=test,dc=winad,dc=com"
```

#### 3.1.4. 配置 DB 数据库

```bash
[root@localhost ~]# cp /usr/share/openldap-servers/DB_CONFIG.example /var/lib/ldap/DB_CONFIG
[root@localhost ~]# chown ldap:ldap -R /var/lib/ldap
[root@localhost ~]# chmod 700 -R /var/lib/ldap
```

#### 3.1.5. 验证 OpenLDAP 配置文件是否正确

```bash
[root@localhost ~]# slaptest -u
config file testing succeeded   #验证成功，如果是返回其他内容则失败。
```

#### 3.1.6. 给相关目录授权，否则启动服务时可能会报错，权限不足

```bash
[root@localhost ~]# chown ldap:ldap -R /var/run/openldap
[root@localhost ~]# chown ldap:ldap -R /etc/openldap/
```

#### 3.1.7. 导入 schema

```bash
[root@localhost ~]# ldapadd -Y EXTERNAL -H ldapi:/// -f /etc/openldap/schema/collective.ldif
[root@localhost ~]# ldapadd -Y EXTERNAL -H ldapi:/// -f /etc/openldap/schema/corba.ldif
[root@localhost ~]# ldapadd -Y EXTERNAL -H ldapi:/// -f /etc/openldap/schema/core.ldif
[root@localhost ~]# ldapadd -Y EXTERNAL -H ldapi:/// -f /etc/openldap/schema/cosine.ldif
[root@localhost ~]# ldapadd -Y EXTERNAL -H ldapi:/// -f /etc/openldap/schema/duaconf.ldif
[root@localhost ~]# ldapadd -Y EXTERNAL -H ldapi:/// -f /etc/openldap/schema/dyngroup.ldif
[root@localhost ~]# ldapadd -Y EXTERNAL -H ldapi:/// -f /etc/openldap/schema/inetorgperson.ldif
[root@localhost ~]# ldapadd -Y EXTERNAL -H ldapi:/// -f /etc/openldap/schema/java.ldif
[root@localhost ~]# ldapadd -Y EXTERNAL -H ldapi:/// -f /etc/openldap/schema/misc.ldif
[root@localhost ~]# ldapadd -Y EXTERNAL -H ldapi:/// -f /etc/openldap/schema/nis.ldif
[root@localhost ~]# ldapadd -Y EXTERNAL -H ldapi:/// -f /etc/openldap/schema/openldap.ldif
[root@localhost ~]# ldapadd -Y EXTERNAL -H ldapi:/// -f /etc/openldap/schema/pmi.ldif
[root@localhost ~]# ldapadd -Y EXTERNAL -H ldapi:/// -f /etc/openldap/schema/ppolicy.ldif
```

#### 3.1.8. 添加 memberOf 模块

因为我们是要和 Windows AD 联动，所以需要将权限组这个模块提前准备好。如果提前没有准备好，后面再加的话，还得把建好的组全删掉再重建。这个模块的作用是当你建一个组的时候，把一些用户添加到这个组里去，它会自动给这些用户添加一个 memberOf 属性，有很多应用需要检查这个属性。

添加的时候比较麻烦，需要建 3 个 ldif 文件，然后 1 个执行 `ldapmodify`，2 个执行 `ldapadd`，注意顺序，不能出错

新建一个 `memberof_config.ldif` 文件，在文件中写入以下内容

```ssh-config title="memberof_config.ldif"
dn: cn=module,cn=config
cn: module
objectClass: olcModuleList
olcModuleLoad: memberof
olcModulePath: /usr/lib64/openldap # 这里请注意，请确认 /usr/lib64/ 目录下是否有 openldap 目录

dn: olcOverlay={0}memberof,olcDatabase={2}hdb,cn=config  # 这个意思是说在 /etc/openldap/slapd.d/cn=config/ 目录下创建一个 olcDatabase={2}hdb 目录，然后在里面再创建一个 olcOverlay={0}memberof.ldif 文件
objectClass: olcConfig
objectClass: olcMemberOf
objectClass: olcOverlayConfig
objectClass: top
olcOverlay: memberof
olcMemberOfDangling: ignore
olcMemberOfRefInt: TRUE
olcMemberOfGroupOC: groupOfNames
olcMemberOfMemberAD: member
olcMemberOfMemberOfAD: memberOf
```

文件保存好之后，执行 `ldapadd` 命令

```bash
[root@localhost ~]# ldapadd -Y EXTERNAL -H ldapi:/// -f memberof_config.ldif
```

执行完之后，检查你的 `/etc/openldap/slapd.d/cn=config/olcDatabase={2}hdb/` 目录下，看是不是多了一个 `olcOverlay={0}memberof.ldif` 模块

然后检查你的 `/etc/openldap/slapd.d/cn=config/` 目录下，看是不是多了一个 `cn=module{0}.ldif` 模块，这个模块的数字编号直接影响下一步操作。

新建一个 `refint1.ldif` 文件，在文件中写入以下内容

```ssh-config title="refint1.ldif"
dn: cn=module{0},cn=config # 这里的意思就是我们上面说的那个 /etc/openldap/slapd.d/cn=config/ 目录下的 cn=module{0}.ldif，我们这一次要修改这个文件
add: olcmoduleload
olcmoduleload: refint
```

如果你那边不是 `module{0}` 的话，那就看是几，是几就写几就行了，对于这个文件，我们要执行 `ldapmodify` 操作：

```bash
[root@localhost ~]# ldapmodify -Y EXTERNAL -H ldapi:/// -f refint1.ldif
```

接下来新建一个 `refint2.ldif` 文件，在文件中写入以下内容

```ssh-config title="refint2.ldif"
dn: olcOverlay={1}refint,olcDatabase={2}hdb,cn=config # 在 /etc/openldap/slapd.d/cn=config/olcDatabase={2}hdb 目录下，再创建一个 olcOverlay={1}refint.ldif 文件
objectClass: olcConfig
objectClass: olcOverlayConfig
objectClass: olcRefintConfig
objectClass: top
olcOverlay: {1}refint
olcRefintAttribute: memberof member manager owner
```

对这个文件执行 `ldapadd` 操作：

```bash
[root@localhost ~]# ldapadd -Y EXTERNAL -H ldapi:/// -f refint2.ldif
```

重启`slapd`服务

```bash
[root@localhost ~]# systemctl restart slapd.service 
[root@localhost ~]# systemctl status slapd.service 
● slapd.service - OpenLDAP Server Daemon
   Loaded: loaded (/usr/lib/systemd/system/slapd.service; enabled; vendor preset: disabled)
   Active: active (running) since Wed 2021-03-17 18:11:37 CST; 8s ago
     Docs: man:slapd
           man:slapd-config
           man:slapd-hdb
           man:slapd-mdb
           file:///usr/share/doc/openldap-servers/guide.html
  Process: 1144 ExecStart=/usr/sbin/slapd -u ldap -h ${SLAPD_URLS} $SLAPD_OPTIONS (code=exited, status=0/SUCCESS)
  Process: 1113 ExecStartPre=/usr/libexec/openldap/check-config.sh (code=exited, status=0/SUCCESS)
 Main PID: 1147 (slapd)
   CGroup: /system.slice/slapd.service
           └─1147 /usr/sbin/slapd -u ldap -h ldapi:/// ldap:///

Mar 17 18:11:36 localhost.localdomain runuser[1137]: pam_unix(runuser:session): ses...p
Mar 17 18:11:36 localhost.localdomain runuser[1139]: pam_unix(runuser:session): ses...)
Mar 17 18:11:36 localhost.localdomain runuser[1139]: pam_unix(runuser:session): ses...p
Mar 17 18:11:36 localhost.localdomain runuser[1141]: pam_unix(runuser:session): ses...)
Mar 17 18:11:36 localhost.localdomain runuser[1141]: pam_unix(runuser:session): ses...p
Mar 17 18:11:36 localhost.localdomain slapd[1144]: @(#) $OpenLDAP: slapd 2.4.44 (Se...$
                                                           mockbuild@x86-02.bsys.ce...d
Mar 17 18:11:36 localhost.localdomain slapd[1144]: ldif_read_file: checksum error o..."
Mar 17 18:11:36 localhost.localdomain slapd[1144]: ldif_read_file: checksum error o..."
Mar 17 18:11:37 localhost.localdomain slapd[1147]: slapd starting
Mar 17 18:11:37 localhost.localdomain systemd[1]: Started OpenLDAP Server Daemon.
Hint: Some lines were ellipsized, use -l to show in full.
```

#### 3.1.9. 检查 OpenLDAP 状态

执行 `ldapsearch -x` 检查是否有如下输出

```bash
[root@localhost ~]# ldapsearch -x -b '' -s base'(objectclass=*)'
# extended LDIF
#
# LDAPv3
# base <> with scope baseObject
# filter: (objectclass=*)
# requesting: ALL
#

#
dn:
objectClass: top
objectClass: OpenLDAProotDSE

# search result
search: 2
result: 0 Success

# numResponses: 2
# numEntries: 1
```

### 3.2. 部署 Saslauthd

#### 3.2.1. 安装 saslauthd 服务

```bash
[root@localhost ~]# yum install -y cyrus-sasl
[root@localhost ~]# systemctl restart saslauthd.service
[root@localhost ~]# systemctl enable saslauthd.service
```

#### 3.2.2. 测试一下 ldapsearch 搜索 Windows AD 是否正常

```bash
[root@localhost ~]# /usr/bin/ldapsearch -x -H ldap://test.winad.com "(&(objectClass=organizationalPerson)(!(objectClass=computer)))" dn objectClass cn description sAMAccountName email uSNCreated -D "CN=Administrator,CN=Users,DC=test,DC=winad,DC=com" -w "testtest" -b "OU=Test Users,DC=test,DC=winad,DC=com" -L
```

如果能搜索到用户，说明 OpenLDAP 访问 Windows AD 正常

#### 3.2.3. 配置 sasl 访问 AD

编辑 `/etc/sysconfig/saslauthd`，修改下面两行

```ssh-config title="/etc/sysconfig/saslauthd"
MECH=ldap
FLAGS="-O /etc/saslauthd2ad.conf"
```

然后新建一个 `/etc/saslauthd2ad.conf`，写入下面内容

```ssh-config title="/etc/saslauthd2ad.conf"
ldap_servers: ldap://test.winad.com
ldap_search_base: DC=test,DC=winad,DC=com
ldap_timeout: 60
ldap_filter: sAMAccountName=%U
ldap_bind_dn: CN=Administrator,CN=Users,DC=test,DC=winad,DC=com
ldap_password: testAD
ldap_deref: never
ldap_restart: yes
ldap_scope: sub
ldap_use_sasl: no
ldap_start_tls: no
ldap_version: 3
ldap_auth_method: bind
```

重启 `saslauthd` 服务

```bash
[root@localhost ~]# systemctl restart saslauthd.service
```

使用 `testsaslauthd` 命令测试 Windows AD 上的用户是否认证成功

```bash
[root@localhost ~]# testsaslauthd -u Administrator -p testAD
0: OK "Success."
```

可进一步在 AD 里面加用户、或改密码测试。

::: warning
需注意 AD 修改密码，老密码依然可用5分钟。如验证不通过检查 sasl 的配置。
:::

#### 3.2.4. 配置 OpenLDAP 使用 Saslauthd

编辑`/etc/openldap/ldap.conf`，增加以下内容

```ssh-config title="/etc/openldap/ldap.conf"
TLS_REQCERT never
```

编辑`/etc/sasl2/slapd.conf`，增加以下内容

```ssh-config title="/etc/sasl2/slapd.conf"
mech_list: plain
pwcheck_method: saslauthd
saslauthd_path: /var/run/saslauthd/mux
```

重启 `saslauthd` 服务

```bash
[root@localhost ~]# systemctl restart saslauthd.service
```

验证 OpenLDAP 是否支持 SASL

```bash
[root@localhost ~]# ldapsearch -x -H ldap://127.0.0.1 -ZZ -b "" -LLL -s base supportedSASLMechanisms
dn:
supportedSASLMechanisms: LOGIN
supportedSASLMechanisms: PLAIN
```

::: info
出现如上结果说明openldap已支持SASL认证
:::

### 3.3. 安装 phpldapadmin

phpldapadmin 提供了使用 Web 页面管理 OpenLDAP 的方式

#### 3.3.1. 安装 php 基础包和 phpldapadmin

```bash
[root@localhost ~]# yum -y install httpd php php-ldap php-gd php-mbstring php-pear php-bcmath php-xml
[root@localhost ~]# yum install -y epel-release
[root@localhost ~]# yum install -y phpldapadmin
```

#### 3.3.2. 配置 phpldapadmin

编辑 `/etc/httpd/conf.d/phpldapadmin.conf`，添加以下内容

```ssh-config title="/etc/httpd/conf.d/phpldapadmin.conf"
#
#  Web-based tool for managing LDAP servers
#

Alias /phpldapadmin /usr/share/phpldapadmin/htdocs
Alias /ldapadmin /usr/share/phpldapadmin/htdocs

<Directory /usr/share/phpldapadmin/htdocs>
  <IfModule mod_authz_core.c>
    # Apache 2.4
    Require local
    Require all granted # 新增此行
  </IfModule>
  <IfModule !mod_authz_core.c> # 如果你的php是2.2版本才需要关注这里，否则不用关注。
    # Apache 2.2
    Order Deny,Allow
    Deny from all
    Allow from 127.0.0.1
    Allow from ::1
  </IfModule>
</Directory>
```

#### 3.3.3. 修改 phpldapadmin 配置文件

编辑 `/etc/phpldapadmin/config.php`.

```php title="/etc/phpldapadmin/config.php"
# 将      $servers->setValue('login','attr','uid');
# 修改为   $servers->setValue('login','attr','dn');

$servers->setValue('login','attr','dn');
```

#### 3.3.4. 启动 httpd 服务

```bash
[root@localhost ~]# systemctl start httpd
[root@localhost ~]# systemctl enable httpd
[root@localhost ~]# systemctl status httpd
```

#### 3.3.5. 登录验证

使用浏览器登录 phpldapadmin

`http://{LDAP Server IP}/phpldapadmin`

使用管理员DN `cn=Manager,dc=test,dc=winad,dc=com` 和 [3.1.2 步骤](#312-配置-openldap-管理密码并修改-openldap-配置)配置的管理员密码登录

![登录 phpldapadmin](/assets/postsimages/2021-03-22-CentOS7部署服务-OpenLDAP/01-登录phpldapadmin-1.png)

![在这里插入图片描述](/assets/postsimages/2021-03-22-CentOS7部署服务-OpenLDAP/02-登录phpldapadmin-2.png)

### 3.4. 测试 OpenLDAP 使用 AD 密码进行认证

创建一个测试用户导入文件 `testuser.ldif`，写入以下内容

```ssh-config title="testuser.ldif"
dn: cn=testuset,dc=test,dc=winad,dc=com
objectClass: top
objectClass: person
objectClass: organizationalPerson
objectClass: inetOrgPerson
cn:: testuser
sn:: testuser
description: testuser
uid: testuser
userPassword: {SASL}testuser
```

导入测试用户

```bash
[root@localhost ~]# ldapadd -x -D "cn=Manager,dc=test,dc=winad,dc=com" -W -f testuser.ldif
Enter LDAP Password: # 输入管理员密码
adding new entry "cn=testuser,dc=test,dc=winad,dc=com"
```

使用命令测试

```bash
[root@localhost ~]# ldapsearch -w testuser -H ldap://10.206.153.222 -D "cn=testuser,dc=test,dc=winad,dc=com" -b "dc=test,dc=winad,dc=com"
```

这个测试命令，`testuser` 用户在 OpenLDAP 和 Windows AD 上都存在，IP 是本机 OpenLDAP 的 IP，DN，查询 DN 也都是OpenLDAP的信息，但是密码却是在 Windows AD 上管理的。如成功，到 Windows AD 上修改用户密码，用新密码验证，再等 5 分钟，旧密码失效。到此配置完成

## 4. 参考

1. 《OpenLDAP配置坎坷路》 <https://www.cnblogs.com/linkenpark/p/10807735.html>
2. 《LDAP SDK - Available Command-Line Tools》 <https://docs.ldap.com/ldap-sdk/docs/tool-usages/>
