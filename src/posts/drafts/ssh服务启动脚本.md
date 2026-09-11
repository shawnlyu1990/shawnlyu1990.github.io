---
# 文章标题
title: SSH 服务启动脚本
# 当前页面的短标题，会在导航栏、侧边栏和路径导航中作为首选。
shortTitle: SSH 服务启动脚本
# 当前页面内容描述。
description: SSH 服务启动脚本
# 当前页面的图标，建议填写
icon: "/assets/blogicons/Docker.png"
# 作者
author: 
# 当前文章是否为原创
isOriginal: true
# 设置写作时间
date: 2025-05-26
# 分类，一个页面可以有多个分类
categories: 
  - 服务启动脚本
# 标签，一个页面可以有多个标签
tags: 
  - SSH
  - 服务启动脚本
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

:::note
SSH 服务启动脚本，可以放在 /etc/init.d/ 目录下，可以用在 Docker 中，用来开机启动服务。
:::

```bash
#!/bin/sh

# Start/stop/restart the secure shell server:

sshd_start() {

    # Create host keys if needed.
    if [ ! -r /etc/ssh/ssh_host_key ]; then
        /usr/bin/ssh-keygen -t rsa1 -f /etc/ssh/ssh_host_key -N ''
    fi

    if [ ! -f /etc/ssh/ssh_host_dsa_key ]; then
        /usr/bin/ssh-keygen -t dsa -f /etc/ssh/ssh_host_dsa_key -N ''
    fi

    if [ ! -f /etc/ssh/ssh_host_rsa_key ]; then
        /usr/bin/ssh-keygen -t rsa -f /etc/ssh/ssh_host_rsa_key -N ''
    fi
    
    if [ ! -f /etc/ssh/ssh_host_ecdsa_key ]; then
        /usr/bin/ssh-keygen -t ecdsa -f /etc/ssh/ssh_host_ecdsa_key -N ''
    fi
    
    if [ ! -f /etc/ssh/ssh_host_ed25519_key ]; then
        /usr/bin/ssh-keygen -t ed25519 -f /etc/ssh/ssh_host_ed25519_key -N ''
    fi

    echo "Starting sshd..."

    /usr/sbin/sshd

}

sshd_stop() {

    echo "Stopping sshd..."
    killall sshd

}

sshd_restart() {

    if [ -r /var/run/sshd.pid ]; then
        echo "WARNING: killing listener process only. To kill every sshd process, you must"
        echo " use 'rc.sshd stop'. 'rc.sshd restart' kills only the parent sshd to"
        echo " allow an admin logged in through sshd to use 'rc.sshd restart' without"
        echo " being cut off. If sshd has been upgraded, new connections will now"
        echo " use the new version, which should be a safe enough approach."
        kill `cat /var/run/sshd.pid`
    else
        killall sshd
    fi

    sleep 1

    sshd_start

}

case "$1" in
    'start')
        sshd_start
        ;;
    'stop')
        sshd_stop
        ;;
    'restart')
        sshd_restart
        ;;
    *)
        echo "Usage: $0 {start|stop|restart}"
esac
```