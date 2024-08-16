---
# 文章标题
title: 【FAQ】PostgreSQL 修改数据目录方法记录
# 当前页面的短标题，会在导航栏、侧边栏和路径导航中作为首选。
shortTitle: PgSQL 修改数据目录的方法
# 当前页面内容描述。
description: 记录修改 PostgreSQL 数据库的数据目录位置的一种方法
# 当前页面的图标，建议填写
icon: fas fa-database
# 作者
author: 昌霖学长
# 当前文章是否为原创
isOriginal: true
# 设置写作时间
date: 2020-05-19
# 分类，一个页面可以有多个分类
categories: 
  - 数据库
  - PostgreSQL
# 标签，一个页面可以有多个标签
tags: 
  - PostgreSQL
  - FAQ
  - SQL
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

## 查看当前数据库的 data 目录

进入 psql 查看当前数据库的 data 目录

```bash
[root@localhost ~]# su - postgres
-bash-4.1$ psql
```

```sql
psql (8.4.18)
Type "help" for help.

postgres=# show data_directory ;
         data_directory          
---------------------------------
 /postgres_5432
(1 row)

```

## 关闭数据库

```bash

# 如果是编译安装的
/bin/su -l postgres -c "/usr/bin/pg_ctl -D /postgres_5432/ stop"
# /postgres_5432/ 是数据库的数据文件所在目录

# CentOS 6.x yum 方式安装的
service postgresql stop

# CentOS 7.x 以后版本 yum 方式安装的
systemctl stop postgresql

```

## 把当前数据库拷贝到新位置

用 rsync 方式把数据库内容拷贝到新位置

```bash
rsync -av /postgres_5432 /data/pgdata_5432

# -a 保留的权限和其他目录属性, 能避免未来的权限问题
# -v 提供详细输出，以便能够看到进度
# /postgres_5432  原数据库的数据目录
# /data/pgdata_5432 新的数据库数据目录
```

::: warning
这样拷贝过去之后，新的数据库数据目录为 `/data/pgdata_5432/postgres_5432`，如果是想把数据文件直接拷贝到 `/data/pgdata_5432` 目录下的话，可以这样写 `rsync -av /postgres_5432/ /data/pgdata_5432`
:::

## 修改 postgresql.conf 配置文件

编辑 `postgresql.conf` 文件，找到 `data_directory` 字段，修改该字段，保存退出

如果配置文件中没有该字段则直接加在文件末尾即可

```conf title="postgresql.conf"
data_directory = '/data/pgdata_5432/postgres_5432/'
```

## 启动数据库

```bash
# 如果是编译安装的
/bin/su -l postgres -c "/usr/bin/pg_ctl -D /postgres_5432/  start"

# CentOS 6.x yum 方式安装的
service postgresql start

# CentOS 7.x 以后版本 yum 方式安装的
systemctl start postgresql
```

## 查看数据库 data 目录

```bash
[root@localhost ~]# su - postgres
-bash-4.1$ psql
```

```sql
psql (8.4.18)
Type "help" for help.

postgres=# show data_directory ;
         data_directory          
---------------------------------
 /data/pgdata_5432/postgres_5432
(1 row)
```

## 删除备份

因为我这个数据库特殊，数据文件和配置文件都放在同一个目录下了，如果是标准安装的话，上一步数据库启动没问题以后可以将原数据库的数据文件删除了，我这里没有删除

## 重启

```bash
# 如果是编译安装的
/bin/su -l postgres -c "/usr/bin/pg_ctl -D /postgres_5432/  stop"
/bin/su -l postgres -c "/usr/bin/pg_ctl -D /postgres_5432/  start"

# CentOS 6.x yum 方式安装的
service postgresql restart

# CentOS 7.x 以后版本 yum 方式安装的
systemctl restart postgresql
```
