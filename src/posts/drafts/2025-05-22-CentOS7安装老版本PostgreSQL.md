---
# 文章标题
title: CentOS 7 安装老版本 PostgreSQL
# 当前页面的短标题，会在导航栏、侧边栏和路径导航中作为首选。
shortTitle: CentOS 7 安装老版本 PostgreSQL
# 当前页面内容描述。
description: CentOS 7 安装老版本 PostgreSQL
# 当前页面的图标，建议填写
icon: "/assets/blogicons/PostgreSQL.png"
# 作者
author: 
# 当前文章是否为原创
isOriginal: true
# 设置写作时间
date: 2025-05-21
# 分类，一个页面可以有多个分类
categories: 
  - PostgreSQL
# 标签，一个页面可以有多个标签
tags: 
  - 安装部署
  - PostgreSQL
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

``` ini line-numbers title=/etc/yum.repos.d/pgdg-96.repo
[pgdg96-archive]
name=PostgreSQL 9.6 RPMs for RHEL/CentOS 7
baseurl=https://yum-archive.postgresql.org/9.6/redhat/rhel-7-x86_64
enabled=1
gpgcheck=1
gpgkey=https://yum.postgresql.org/keys/RPM-GPG-KEY-PGDG
```

```bash
yum clean all
yum makecache
```

```bash
yum update
yum search postgresql96
yum install -y postgresql96-server postgresql96-libs postgresql96-devel postgresql96
```

``` ini line-numbers title=/etc/yum.repos.d/pgdg-94.repo
[pgdg96-archive]
name=PostgreSQL 9.4 RPMs for RHEL/CentOS 7
baseurl=https://yum-archive.postgresql.org/9.4/redhat/rhel-7-x86_64
enabled=1
gpgcheck=1
gpgkey=https://yum.postgresql.org/keys/RPM-GPG-KEY-PGDG
```

```bash
yum clean all
yum makecache
```

```bash
yum update
yum search postgresql94
yum install -y postgresql94-server postgresql94-libs postgresql94-devel postgresql94
```

查看版本
```bash
psql --version
# 或者
/usr/pgsql-9.4/bin/psql --version
```
::: note
![psql脚本的连接关系](/assets/postsimages/2025-05-22-CentOS7安装老版本PostgreSQL/01-psql脚本的连接关系.png)
:::
其他查询数据库版本的方法
```sql
SELECT version();
SHOW server_version;
SHOW server_version_num;
```

6.初始化db
/usr/pgsql-9.4/bin/postgresql94-setup initdb

7.修改配置数据库的监听IP
vim /var/lib/pgsql/9.4/data/postgresql.conf 
listen_addresses ='*'

![配置数据库监听IP](/assets/postsimages/2025-05-22-CentOS7安装老版本PostgreSQL/02-配置数据库监听IP.png)

8.修改安全配置文件、允许远程访问数据库指定网段（如果只允许指定主机，则利用32位掩码配置）
vim /var/lib/pgsql/9.4/data/pg_hba.conf 
# IPv4 local connections: host    all             all             127.0.0.1/32            trust
host    all             all             192.168.100.0/24        trust 

或者直接修改为允许所有访问：
host    all             all             0.0.0.0/0               trust

![配置数据库认证](/assets/postsimages/2025-05-22-CentOS7安装老版本PostgreSQL/03-配置数据库认证.png)

![配置数据库认证关系表](/assets/postsimages/2025-05-22-CentOS7安装老版本PostgreSQL/04-配置数据库认证关系表.png)


10.重启数据库
systemctl restart postgresql-9.4



11.修改用户密码：
```bash
su - postgres
psql
```
```bash
ALTER USER postgres WITH PASSWORD 'new_password';
\q
```

修改密码后重启数据库：
systemctl restart postgresql-9.4

测试用密码登录


## 参考

《PostgreSQL Repo RPMs》(YUM 源)https://yum.postgresql.org/repopackages/
《PostgreSQL RPM Chart》(RPM 包)https://yum.postgresql.org/rpmchart/
《PostgreSQL File Browser》(源码包)https://www.postgresql.org/ftp/source/