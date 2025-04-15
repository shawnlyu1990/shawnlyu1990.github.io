---
# 文章标题
title: CentOS 7 部署服务 - MySQL 5.5.28 (源码编译)
# 当前页面的短标题，会在导航栏、侧边栏和路径导航中作为首选。
shortTitle: CentOS 7 部署服务 - MySQL 5.5.28 (源码编译)
# 当前页面内容描述。
description: MySQL 5.5.28 其实是比较老的版本了，官方只提供了 CentOS 4、5、6 版本的 RPM 包，但因为一些原因需要在 CentOS 7 中安装部署 MySQL 5.5.28 版本，找了很多资料，最终只能使用源码编译安装的方法。这里记录一下我的安装过程，已备后续参考。
# 当前页面的图标，建议填写
icon: /assets/blogicons/数据库服务器.png
# 作者
author: 昌霖学长
# 当前文章是否为原创
isOriginal: true
# 设置写作时间
date: 2025-04-01
# 分类，一个页面可以有多个分类
categories: 
  - Linux
  - 服务部署
# 标签，一个页面可以有多个标签
tags: 
  - MySQL
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

**以下所有操作，均在 CentOS 7.4.1708 版本中，使用 root 账号执行。**
:::

## 1. 准备环境

### 1.1. 准备编译和安装环境

```shell
# 此操作位于 /root/ 目录下
yum install -y cmake make gcc gcc-c++ ncurses ncurses-devel libarchive openssl openssl-devel libtirpc libtirpc-devel bison libaio-devel

# cmake          跨平台的构建系统。
# gcc-c++        C++编译器。
# ncurses-devel  提供字符终端处理库。
# bison          用于生成语法分析器。
# libaio-devel   异步I/O库。
```

### 1.2. 创建 MySQL 用户和组

```shell
# 此操作位于 /root/ 目录下
groupadd mysql
useradd -r -g mysql mysql
```

### 1.3. 创建 MySQL 安装位置目录

```shell
# 此操作位于 /root/ 目录下
mkdir -p /usr/local/mysql-5.5.28/data/
```

## 2. 下载 MySQL 源码包

从 [MySQL 官方网站](https://downloads.mysql.com/archives/community/) 下载 MySQL 5.5.28 的源码包。

![MySQL 5.5.28 源码包](/assets/postsimages/2025-04-01-CentOS7部署服务-MySQL-5.5/01-MySQL_Product_Archives.png)

可以使用 `wget` 命令从服务器中直接下载。

```shell
# 此操作位于 /root/ 目录下
wget https://downloads.mysql.com/archives/get/p/23/file/mysql-5.5.28.tar.gz
```

下载完成后，解压源码包

```shell
# 此操作位于 /root/ 目录下
tar -zxvf mysql-5.5.28.tar.gz
cd mysql-5.5.28
```

## 3. 编译 MySQL

### 3.1. 创建编译目录

为了保持源码目录的整洁，建议创建一个专门的编译目录。

```shell
# 此操作位于 /root/mysql-5.5.28/ 目录下
mkdir build
cd build
```

### 3.2. 运行 cmake

使用 `cmake` 命令配置编译选项。

```shell
# 此操作位于 /root/mysql-5.5.28/build 目录下
cmake .. -DCMAKE_INSTALL_PREFIX=/usr/local/mysql-5.5.28 -DMYSQL_DATADIR=/usr/local/mysql-5.5.28/data -DSYSCONFDIR=/etc -DMYSQL_USER=mysql -DDEFAULT_CHARSET=utf8 -DDEFAULT_COLLATION=utf8_general_ci -DWITH_INNOBASE_STORAGE_ENGINE=1 -DWITH_ARCHIVE_STORAGE_ENGINE=1 -DWITH_BLACKHOLE_STORAGE_ENGINE=1 -DWITH_READLINE=1 -DWITH_SSL=system -DWITH_ZLIB=system -DWITH_LIBWRAP=0

# 参数解释：
# CMAKE_INSTALL_PREFIX           指定MySQL的安装目录。
# MYSQL_DATADIR                  指定数据文件的存储目录。
# SYSCONFDIR                     指定配置文件(my.cnf)的存储目录。
# MYSQL_USER                     指定数据库运行用户。
# DEFAULT_CHARSET                指定默认字符集。
# DEFAULT_COLLATION              指定默认排序字符集。
# WITH_INNOBASE_STORAGE_ENGINE   启用 InnoDB 存储引擎。
# WITH_ARCHIVE_STORAGE_ENGINE    启用 Archive 存储引擎。
# WITH_BLACKHOLE_STORAGE_ENGINE  启用Blackhole存储引擎。
# WITH_READLINE                  启用 readline 库，提供命令行编辑功能。
# WITH_SSL                       使用系统自带的 SSL 库。
# WITH_ZLIB                      使用系统自带的 zlib 库。
# WITH_LIBWRAP                   禁用 libwrap 库。

其他参数可以参看下面这篇博客，这个博客里面介绍的比较完整。
https://www.cnblogs.com/zx-admin/p/13409441.html
```

### 3.3. 编译源码

配置完成后，开始编译源码。

```shell
# 此操作位于 /root/mysql-5.5.28/build 目录下
make
```

编译过程需要耗费一定的时间。

### 3.4. 安装 MySQL

编译完成后，使用以下命令安装 MySQL。

```shell
# 此操作位于 /root/mysql-5.5.28/build 目录下
make install
```

安装完成后，还需要对 MySQL 进行一些初始化操作。

## 4. 配置 MySQL

### 4.1. 初始化数据库

初始化数据库。

```shell
# 此操作位于 /root/ 目录下
/usr/local/mysql-5.5.28/scripts/mysql_install_db --user=mysql --basedir=/usr/local/mysql-5.5.28 --datadir=/usr/local/mysql-5.5.28/data
```

### 4.2. 配置数据库权限

为了确保MySQL能够正常启动，需要设置正确的文件权限。

```shell
# 此操作位于 /root/ 目录下
chown -R mysql:mysql /usr/local/mysql-5.5.28/
```

### 4.3. 启动 MySQL

使用以下命令启动 MySQL 服务。

```shell
# 此操作位于 /root/ 目录下
/usr/local/mysql/bin/mysqld_safe --user=mysql &
```

::: warning
如果出现类似下面的报错，则需要手动创建 MySQL 日志目录和日志文件。
`touch: cannot touch '/var/log/mariadb/mariadb.log': No such file or directory`
`chown: cannot access '/var/log/mariadb/mariadb.log': No such file or directory`

解决方法：

```shell
mkdir -p /var/log/mariadb/
touch /var/log/mariadb/mariadb.log
chown -R mysql:mysql /var/log/mariadb/
```

:::

::: warning
如果出现类似下面的报错，则需要手动创建 MySQL 运行目录。
`/usr/local/mysql-5.5.28/bin/mysqld: Can't create/write to file '/var/run/mariadb/mariadb.pid' (Errcode:2)`

临时解决方法：

```shell
mkdir -p /var/run/mariadb/
chown -R mysql:mysql /var/run/mariadb/
```

但是 `/var/run/` 是指向 `/run` 的软连接，`/run` 是挂载在临时文件的系统里的，即在系统启动后，添加在里面的数据、文件都是写入内存的，因此重启后手动写入的数据会丢失。

最好的办法是在 `/usr/lib/tmpfiles.d/` 目录中创建一个 `mysql.conf` 配置文件。因为 systemd-tmpfiles 会根据 `/etc/tmpfiles.d/*.conf`、`/run/tmpfiles.d/*.conf`、`/usr/lib/tmpfiles.d/*.conf` 三个位置的配置文件决定如何创建、删除、清理 易变文件与临时文件以及易变目录与临时目录。

彻底解决方法：

```shell
echo "d /run/mariadb 0755 mysql mysql -" > /usr/lib/tmpfiles.d/mysql.conf
```

参考资料：
https://insp.top/content/why-lost-tmpfile-after-system-reboot

:::

::: warning
如果出现类似下面的报错，则需要检查一下 `/etc/my.cnf` 的配置。
` [ERROR] Can't open the mysql.plugin table. Please run mysql_upgrade to create it.`
` [ERROR] Fatal error: Can't open and lock privilege tables: Table 'mysql.host' doesn't exist.`

因为我就是需要当前这个版本，所以不考虑升级，那么需要检查一下 `/etc/my.cnf` 的配置是不是正确的。

我打开 `/etc/my.cnf` 文件之后发现里面的内容是这样的。

```ssh-config title="/etc/my.cnf"
# 自动生成的配置文件
[mysqld]
datadir=/var/lib/mysql/
socket=/var/lib/mysql/mysql.sock
# Disabling symbolic-links is recommended to prevent assorted security risks
symbolic-links=0
# Settings user and group are ignored when systemd is used.
# If you need to run mysqld under a different user or group,
# customize your systemd unit file for mariadb according to the
# instructions in http://fedoraproject.org/wiki/Systemd

[mysqld_safe]
log-error=/var/log/mariadb/mariadb.log
pid-file=/var/run/mariadb/mariadb.pid

# 
# include all files from the config directory
# 
!includedir /etc/my.cnf.d
```

特别是 `datadir` 行、 `basedir` 行和 `socket` 行与预期不一致，因此修改如下。

```ssh-config title="/etc/my.cnf"
# 修改后的配置文件
[mysqld]
basedir=/usr/local/mysql-5.5.28/
datadir=/usr/local/mysql-5.5.28/data/
socket=/tmp/mysql.sock
# Disabling symbolic-links is recommended to prevent assorted security risks
symbolic-links=0
# Settings user and group are ignored when systemd is used.
# If you need to run mysqld under a different user or group,
# customize your systemd unit file for mariadb according to the
# instructions in http://fedoraproject.org/wiki/Systemd

[mysqld_safe]
log-error=/var/log/mariadb/mariadb.log
pid-file=/var/run/mariadb/mariadb.pid

# 
# include all files from the config directory
# 
!includedir /etc/my.cnf.d
```

:::

::: tip
我的环境中，处理完上面三个问题，就可以正常启动了，如果还是无法正常启动还可以尝试一下重新初始化数据库。

```shell
/usr/local/mysql-5.5.28/bin/mysqld --initialize --user=mysql --console
或者
/usr/local/mysql-5.5.28/scripts/mysql_install_db --user=mysql --basedir=/usr/local/mysql-5.5.28 --datadir=/usr/local/mysql-5.5.28/data
```

如果还是报错，我也没什么办法了，再查询一下其他资料，或根据报错具体问题具体分析吧。
:::

### 4.4. 设置 root 密码

启动 MySQL 后，需要设置 root 用户的密码。

首先，登录 MySQL

```shell
/usr/local/mysql-5.5.28/bin/mysql
```

然后，执行以下 SQL 命令设置密码

```sql
SET PASSWORD FOR 'root'@'localhost' = PASSWORD('your_password');

# 将 your_password 替换为你想要的密码。
```

### 4.5. 放行所有 IP 访问数据库（根据实际需求配置）

首先，登录 MySQL 数据库

```shell
/usr/local/mysql/bin/mysql
```

放行所有 IP 地址

```sql
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'your_password' WITH GRANT OPTION;

# 将 your_password 替换为你想要的密码。
# 其中 第一个 * 表示数据库名；第二个 * 表示该数据库的表名；如果像上面那样 *.* 的话表示所有到数据库下到所有表都允许访问；
# '%'：是通配符，表示允许访问到 MySQL 的 IP 地址；当然你也可以配置为具体到 IP 名称；'%' 表示所有 IP 均可以访问；
```

### 4.6. 配置 mysql 为全局命令

将 `/usr/local/mysql-5.5.28/bin/mysql` 软连接到 `/usr/bin/` 目录下。

```shell
ln -s /usr/local/mysql-5.5.28/bin/mysql /usr/bin/mysql
```

### 4.7. 配置 MySQL 服务

为了方便管理，可以将 MySQL 设置为系统服务。

创建一个服务脚本文件

```shell
vim /etc/systemd/system/mysqld.service
```

```ssh-config title="/etc/systemd/system/mysqld.service"
# 添加以下内容

[Unit]
Description=MySQL Server
After=network.target
After=syslog.target

[Install]
WantedBy=multi-user.target

[Service]
Type=simple     # 注意这里如果是 forking 的话会导致执行 systemctl start mysqld 的时候卡住。
User=mysql
Group=mysql
ExecStart=/usr/local/mysql-5.5.28/bin/mysqld_safe --user=mysql
ExecReload=/bin/kill -s HUP $MAINPID
ExecStop=/usr/local/mysql-5.5.28/bin/mysqladmin -u root -p shutdown
Restart=on-failure
```

::: tip
**之前将上面 [Service] 中的 Type 字段错误配置成了 `Type=forking`。导致出现了执行 `systemctl start mysqld` 的时候卡住，等了1分钟才报错。之后在网络上找了好多资料，发现了问题，在此记录。**

**导致此问题的原因是：**
<font color="red"><b>mysqld.service 类型(Type)选择有问题, 不应该选 forking 类型，类型改为 Type=simple（或删除 Type=forking 这句），问题便得到解决。</b></font>

关于 Type 的种类和解释如下：
- **`Type=oneshot`**：这一选项适用于只执行一项任务、随后立即退出的服务。可能需要同时设置 `RemainAfterExit=yes` 使得 systemd 在服务进程退出之后仍然认为服务处于激活状态。
- **`Type=notify`**：与 `Type=simple` 相同，但约定服务会在就绪后向 systemd 发送一个信号。这一通知的实现由 `libsystemd-daemon.so` 提供。
- **`Type=dbus`**：若以此方式启动，当指定的 `BusName` 出现在 DBus 系统总线上时，systemd 认为服务就绪。
- **`Type=idle`**：systemd 会等待所有任务处理完成后，才开始执行 `idle` 类型的单元。其他行为与 `Type=simple` 类似。
- **`Type=forking`**：systemd 认为当该服务进程 fork，且父进程退出后服务启动成功。对于常规的守护进程（daemon），除非你确定此启动方式无法满足需求，使用此类型启动即可。使用此启动类型应同时指定 `PIDFile=xxx`，以便 systemd 能够跟踪服务的主进程。
- **`Type=simple`**（默认值）：systemd 认为该服务将立即启动。服务进程不会 fork 。如果该服务要启动其他服务，不要使用此类型启动，除非该服务是 socket 激活型。

从上表可以看到，当类型为 forking 时，systemd 会认为所运行当该服务本身是守护进程即本身会 fork，且只有父进程退出后 systemd 才会退出，但由于参考例子并不是守护进程，故 systemd 一直处于阻塞等待状态，默认的 simple 无等待这一环节。

参考资料：
https://blog.csdn.net/pang_2899/article/details/105994439
https://blog.csdn.net/Sardkit/article/details/79911925

:::

重新加载服务配置文件。

```shell
systemctl daemon-reload
```

启用并启动 MySQL 服务。

```shell
systemctl enable mysqld
systemctl start mysqld
```

## 5. 验证安装

重启数据库服务器，使用以下命令登录 MySQL 数据库

```shell
mysql -u root -p
```

输入你设置的密码，如果能够成功登录，说明 MySQL 安装成功。

## 6. 配置防火墙

为了确保外部主机可以访问 MySQL 服务，需要配置防火墙。

使用以下命令开放 3306 端口

```shell
firewall-cmd --permanent --add-port=3306/tcp
firewall-cmd --reload
```

## 7. 参考

1. 《CentOS 7下从源码编译安装MySQL 5.5的详细步骤与配置指南》 <https://www.oryoy.com/news/centos-7-xia-cong-yuan-ma-bian-yi-an-zhuang-mysql-5-5-de-xiang-xi-bu-zhou-yu-pei-zhi-zhi-nan.html>
2. 《Linux CentOS7安装MySQL5.5.28》 <https://blog.csdn.net/qq_48049033/article/details/143316255>
3. 《mysql编译选项说明》 <https://www.jianshu.com/p/fe946fa0c24d>
