---
# 文章标题
title: CentOS 7.3 部署服务 - Zabbix 3.2
# 当前页面的短标题，会在导航栏、侧边栏和路径导航中作为首选。
shortTitle: CentOS 7 部署服务 - Zabbix
# 当前页面内容描述。
description: Zabbix是一款能够监控各种网络参数以及服务器健康性和完整性的软件。Zabbix使用灵活的通知机制，允许用户为几乎任何事件配置基于邮件的告警。这样可以快速反馈服务器的问题。基于已存储的数据，Zabbix提供了出色的报告和数据可视化功能。
# 当前页面的图标，建议填写
icon: fab fa-centos
# 作者
author: 昌霖学长
# 当前文章是否为原创
isOriginal: true
# 设置写作时间
date: 2017-09-04
# 分类，一个页面可以有多个分类
categories: 
  - Linux
  - 服务部署
# 标签，一个页面可以有多个标签
tags: 
  - Zabbix
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
由于作者水平有限，以下内容仅在我的环境中配置成功，这里提供思路供您参考。

因为每个环境各有差异，如果有些配置在您的环境中出现了一些异常错误，请您自行排查解决。
:::

::: tip
**我觉得官方写的非常好，这里还是推荐大家去看官方的文档。**

Zabbix 官方的下载链接和安装教程：<https://www.zabbix.com/download>

Zabbix 官方使用手册：<https://www.zabbix.com/documentation/current/zh/manual/installation/getting_zabbix>
:::

## 1. 安装虚拟机

此处不做赘述

## 2. 配置 yum 源

安装 epel 源

```shell
[root@localhost ~]# yum -y install epel-release
```

安装 webtatic 源

```shell
[root@localhost ~]# rpm -Uvh http://mirror.webtatic.com/yum/el7/webtatic-release.rpm
```

配置 zabbix 源

```ssh-config title="/etc/yum.repos.d/zabbix.repo"
[zabbix]
name=zabbix
baseurl=http://repo.zabbix.com/zabbix/3.2/rhel/7/x86_64/
enabled=1
gpgcheck=0
```

清空 yum cache，重建 yum 缓存

```shell
[root@localhost ~]# yum clean all
[root@localhost ~]# yum repolist
[root@localhost ~]# yum makecache
```

## 3. 升级PHP版本

由于 zabbix 3.2 版本需要 PHP 5.6 以上版本才能支持，默认 centos 安装的 php 版本为 5.3.3，因此需要升级 php 版本。

查看当前 php 版本

```shell
[root@localhost ~]# php -v
```

移除当前已经安装的 php 版本

```shell
[root@localhost ~]# yum remove php*
```

安装 php 5.6 版本

```shell
[root@localhost ~]# yum install -y php56w php56w-devel php56w-common php56w-mysql php56w-pdo php56w-opacache php56w-xml php56w-gd php56w-bcmath php56w-mbstring

[root@localhost ~]# php -v
PHP 5.6.30 (cli) (built: Jan 19 2017 22:50:24) 
Copyright (c) 1997-2016 The PHP Group
Zend Engine v2.6.0, Copyright (c) 1998-2016 Zend Technologies
```

## 4. 安装 mariadb 并编辑 mariadb 配置文件

安装 mariadb

```shell
[root@localhost ~]# yum install -y mariadb-server mariadb-libs mariadb-devel
```

编辑 `/etc/my.cnf.d/server.cnf`，添加以下内容，防止中文乱码

```ssh-config title="/etc/my.cnf.d/server.cnf"
[mysqld]
# 设置字符集为 utf8
character-set-server = utf8
collation-server = utf8_bin
skip-character-set-client-handshake
skip-external-locking
symbolic-links=0
innodb_buffer_pool_size = 2048M
innodb_log_file_size = 512M
sort_buffer_size = 2M
innodb_additional_mem_pool_size = 30M
innodb_log_buffer_size = 8M
key_buffer_size = 16M
log-bin=mysql-bin
expire_logs_days = 7
server-id=1001
innodb_data_file_path = ibdata1:1G
# 让 innodb 的每个表文件单独存储
innodb_file_per_table
```

启动 mariadb 服务，并设置开机自动启动

```shell
[root@localhost ~]# systemctl start mariadb
[root@localhost ~]# systemctl status mariadb
[root@localhost ~]# systemctl enable mariadb
```

设置 mysql 服务 root 密码

```shell
[root@localhost ~]# mysqladmin -uroot password root
```

创建数据库和用户授权

```shell
[root@localhost ~]# mysql -uroot -proot
```

```sql
MariaDB [(none)]> create database zabbix character set utf8;
Query OK, 1 row affected (0.00 sec)

MariaDB [(none)]> grant all privileges on zabbix.* to zabbix@'localhost' identified by 'zabbix';
Query OK, 0 rows affected (0.02 sec)

MariaDB [(none)]> grant all privileges on zabbix.* to zabbix@'192.168.159.%' identified by 'zabbix';
Query OK, 0 rows affected (0.00 sec)

MariaDB [(none)]> flush privileges;
Query OK, 0 rows affected (0.00 sec)

MariaDB [(none)]> exit
Bye
```

## 5. 安装zabbix

yum 安装 zabbix

```shell
[root@localhost ~]# yum install -y zabbix-agent zabbix-get zabbix-java-gateway zabbix-proxy zabbix-proxy-mysql zabbix-release zabbix-sender zabbix-server zabbix-server-mysql zabbix-web zabbix-web-mysql
# 由于安装zabbix的时候会默认安装一个 zabbix-server-pgsql 的插件，我们必须把这个插件删掉，后面 zabbix 才能默认连接 mariadb，否则 zabbix 默认连接 pgsql
[root@localhost ~]# yum remove -y zabbix-server-pgsql
```

解压 sql 导入文件

```shell
[root@localhost ~]# cd /usr/share/doc/zabbix-server-mysql-3.2.7/

[root@localhost zabbix-server-mysql-3.2.7]# ls
AUTHORS  ChangeLog  COPYING  create.sql.gz  NEWS  README

[root@localhost zabbix-server-mysql-3.2.7]# gunzip create.sql.gz 

[root@localhost zabbix-server-mysql-3.2.7]# ls
AUTHORS  ChangeLog  COPYING  create.sql  NEWS  README
```

将 sql 文件导入mariadb

```shell
[root@localhost zabbix-server-mysql-3.2.4]# mysql -uzabbix -pzabbix
```

```sql
mysql> use zabbix;
Database changed

mysql> source /usr/share/doc/zabbix-server-mysql-3.2.7/create.sql ;

mysql> show tables;

mysql> exit;
```

编辑`/etc/zabbix/zabbix_server.conf`{: .filepath}

```ssh-config title="/etc/zabbix/zabbix_server.conf"
DBPassword=zabbix
```

创建需要的目录

```shell
mkdir /etc/zabbix/alertscripts /etc/zabbix/externalscripts
```

启动 zabbix 服务

```shell
[root@localhost ~]# setenforce 0
[root@localhost ~]# getenforce 
Permissive
[root@localhost ~]# systemctl restart zabbix-server
[root@localhost ~]# systemctl status zabbix-server
[root@localhost ~]# systemctl enable zabbix-server
```

## 6. 配置 apache 服务，并启动

编辑 `/etc/httpd/conf/httpd.conf`，修改以下内容

```apache title="/etc/httpd/conf/httpd.conf"
ServerName localhost:80
```

启动 httpd 服务，并开机自动启动

```shell
[root@localhost ~]# systemctl start httpd
[root@localhost ~]# systemctl enable httpd
```

其他配置

```shell
# 停止iptables
[root@localhost ~]# service iptables stop
iptables: Setting chains to policy ACCEPT: filter          [  OK  ]
iptables: Flushing firewall rules:                         [  OK  ]
iptables: Unloading modules:                               [  OK  ]

# 如果有要求不能停止防火墙，则需要将 http 和 https 服务放行
[root@localhost ~]# firewall-cmd --permanent --add-service=http
success
[root@localhost ~]# firewall-cmd --permanent --add-service=https
success
[root@localhost ~]# firewall-cmd --reload
success
[root@localhost ~]# firewall-cmd --list-all
public (active)
  target: default
  icmp-block-inversion: no
  interfaces: ens33 ens37
  sources: 
  services: dhcpv6-client http https ssh
  ports: 
  protocols: 
  masquerade: no
  forward-ports: 
  sourceports: 
  icmp-blocks: 
  rich rules: 

# 将 /usr/share/ 目录下的 zabbix 目录复制到 /var/www/html/ 目录下
cp -r /usr/share/zabbix /var/www/html/
```

## 7. 在浏览器中打开并继续配置 zabbix

1. 在浏览器中打开`http://192.168.159.253/zabbix`

    ![zabbix welcome](/assets/postsimages/2017-09-04-CentOS7部署服务-Zabbix3.2/01-welcome_to_zabbix.png)

2. 点击 <kbd class="button">Next step</kbd>，此页为 php 的参数检测，如果不通过，就修改到通过为止，在 `/etc/php.ini` 那里修改，记得改完要重启 http 服务

    ![check of pre-requisites](/assets/postsimages/2017-09-04-CentOS7部署服务-Zabbix3.2/02-check_for_pre_requisites.png)

3. 修改 php 配置文件 `/etc/php.ini`

    ```php title="/etc/php.ini"
    post_max_size = 16M
    max_execution_time = 300
    max_input_time = 300
    date.timezone = Asia/Shanghai
    bcmath.scale = 1
    always_populate_raw_post_data = -1
    #修改以上参数后保存退出
    ```

    ```bash
    # 重启httpd服务
    [root@localhost ~]# systemctl restart httpd
    ```

4. 点击 <kbd class="button">Back</kbd> ，重新点击下一步检查

    ![检查成功](/assets/postsimages/2017-09-04-CentOS7部署服务-Zabbix3.2/03-check_pass.png)

5. 点击 <kbd class="button">Next step</kbd>，mysql 数据库检测，用户名和密码填写刚才创建的 `zabbix`

    ![数据库连通性检查](/assets/postsimages/2017-09-04-CentOS7部署服务-Zabbix3.2/04-configure_db_connection.png)

6. 点击 <kbd class="button">Next step</kbd>，此页保持默认

    ![Zabbix服务器配置](/assets/postsimages/2017-09-04-CentOS7部署服务-Zabbix3.2/05-zabbix_server_detail.png)

7. 信息总览

    ![信息总览](/assets/postsimages/2017-09-04-CentOS7部署服务-Zabbix3.2/06-pre_installation_summary.png)

8. 安装完毕，点击 <kbd class="button">Finish</kbd> 即可完成安装。

    ![安装完毕](/assets/postsimages/2017-09-04-CentOS7部署服务-Zabbix3.2/07-install_finish.png)

9. 登录，默认用户名密码为`admin`/`zabbix`

    ![登录Zabbix](/assets/postsimages/2017-09-04-CentOS7部署服务-Zabbix3.2/08-sign_in.png)

    ![Zabbix仪表板](/assets/postsimages/2017-09-04-CentOS7部署服务-Zabbix3.2/09-zabbix_dashboard.png)

## 8. **安装 Grafana 软件**

访问 Grafana 官网，官网上提供有下载连接
<https://grafana.com/grafana/download>

下载并安装 Grafana

```shell
[root@localhost ~]# wget https://s3-us-west-2.amazonaws.com/grafana-releases/release/grafana-4.4.3-1.x86_64.rpm 
[root@localhost ~]# yum -y localinstall grafana-4.4.3-1.x86_64.rpm 
```

启动 Grafana-server 服务，并将 grafana-server 加入开机启动

```shell
# 重新加载systemd发现新的项目
[root@localhost ~]# systemctl daemon-reload
[root@localhost ~]# systemctl enable grafana-server.service 
Created symlink from /etc/systemd/system/multi-user.target.wants/grafana-server.service to /usr/lib/systemd/system/grafana-server.service.
[root@localhost ~]# systemctl start grafana-server.service 
```

打开浏览器输入 `http://<zabbix 服务器的IP>:3000` 可以打开。用户名密码默认都是`admin`
