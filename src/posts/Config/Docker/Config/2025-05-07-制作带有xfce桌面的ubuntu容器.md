---
# 文章标题
title: 制作带有 xfce 桌面的 ubuntu 容器
# 当前页面的短标题，会在导航栏、侧边栏和路径导航中作为首选。
shortTitle: 制作带有 xfce 桌面的 ubuntu 容器
# 当前页面内容描述。
description: 制作带有 xfce 桌面的 ubuntu 容器
# 当前页面的图标，建议填写
icon: "/assets/blogicons/Docker.png"
# 作者
author: 
# 当前文章是否为原创
isOriginal: true
# 设置写作时间
date: 2025-05-07
# 分类，一个页面可以有多个分类
categories: 
  - Docker
# 标签，一个页面可以有多个标签
tags: 
  - Docker
  - ubuntu
  - xfce
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

::: tip
在本例中，宿主机操作系统使用 CentOS 7.9.2009，容器服务使用 Docker 提供。
:::

## 1. 安装 Docker 软件源

::: tip
提供容器服务的软件包括 Docker、Podman 等，这里以 Docker 为例，进行安装和配置说明。
:::

1. 更新所有软件包

    ``` bash
    yum update -y
    ```

2. 安装需要的软件包， `yum-util` 提供 `yum-config-manager` 功能，`device-mapper-persistent-data` 和 `lvm2` 是 `devicemapper` 驱动所需的依赖。

    ```bash
    yum install -y yum-utils device-mapper-persistent-data lvm2
    ```

3. 从 docker 官方下载并导入 docker-ce 的源

    ```bash
    yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
    ```

    ::: note
    如果官方源访问不了或者很慢的话，也可以使用国内的 docker 源。

    ```bash
    yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
    ```

    不过，这里你如果用了国内的源的话，我建议你上面 `CentOS-Base.repo` 那里也换成相同的国内源。

    :::

## 2. 安装 Docker 社区版

1. 安装 Docker 社区版

    ```bash
    yum install -y docker-ce
    ```

2. 配置 docker 加速域名。
    编辑 `/etc/docker/daemon.json` 文件。（如果没有就直接创建）

    ```json :line-numbers title="/etc/docker/daemon.json"
    {
      "registry-mirrors": [
        "https://proxy.1panel.live",
        "https://docker.1panel.top",
        "https://docker.m.daocloud.io",
        "https://docker.1ms.run",
        "https://docker.ketches.cn"
      ]
    }
    ```

3. 重启加载 daemon，重启 docker 服务。

    ```bash
    systemctl daemon-reload
    systemctl restart docker
    systemctl enable docker
    ```

4. 拉取 ubuntu 镜像，这里我拉取的是 ubuntu 24.04 LTS 版本，产品代号是 noble 。

    ```bash
    docker search ubuntu
    docker pull ubuntu:noble-20250415.1
    ```

    ::: tip
    其实 docker hub 里也有做好的带 GUI 桌面的 ubuntu 镜像可以直接下载。如果不想折腾可以直接下载人家做好的。

    例如：KasmWeb，可以直接在 docker hub 中搜索他们的仓库，也可以访问他们的[官方网站](https://registry.kasmweb.com/1.0/)查看。

    ```bash
    docker search kasmweb/ubuntu
    docker pull kasmweb/ubuntu-noble-desktop:x86_64-1.17.0
    ```

    :::

## 3. 运行 ubuntu 容器，并安装 xfce 桌面环境

1. 运行 ubuntu 容器

    ```bash
    docker run -itd --name ubuntu-2404-xfce-x86_64 --shm-size=512m -p 3522:22 ubuntu:noble-20250415.1
    ```

    ::: note 参数说明

    - `-i`：以交互模式运行容器，通常与 `-t` 同时使用。
    - `-t`：为容器重新分配一个为输入终端，通常与 `-i` 同时使用。
    - `-d`：后台运行容器，返回容器 ID。
    - `--name`：为容器指定一个名称。
    - `--shm-size`：配置共享内存，默认情况下，Docker 容器的共享内存大小为 64MB，对于带有 GUI 桌面的 ubuntu 可能不够用，如果需要在    容器中运行较为消耗内存的软件的话，这个值需要设置的相对大一些。
    - `-p 宿主机端口:容器端口`：端口映射，将容器的端口映射到宿主机的端口中。

    :::

2. 查看容器运行状态。

    ```bash
    docker ps
    ```

### 3.1 安装工具和软件

1. 进入容器控制台。

    ```bash
    docker exec -it f5b1a4eadf47 /bin/bash
    ```

2. 更新软件

    ```bash
    apt update
    ```

3. 安装必要的工具和软件

    ```bash
    apt install -y vim sudo wget curl tcpdump net-tools xrdp openssh-server unzip bzip2 namp
    ```

4. 安装 xfce4

    ```bash
    apt install -y xfce4 xfce4-goodies
    ```

    ::: note
    我也尝试过 gnome 和 kde，要么是没做成功，要么是必须给特权权限，目前就只有 xfce 做出来了。
    :::

### 3.2 创建用户

1. 创建 user 用户，配置密码，并赋予 `sudo` 权限。

    ```bash
    useradd user -d /home/user/ -s /bin/bash
    usermod -aG sudo user
    passwd user
    ```

### 3.3 配置远程桌面服务

1. 编辑 xrdp 配置文件 `/etc/xrdp/startwm.sh`。

    ```bash :line-numbers title="/etc/xrdp/startwm.sh"
    #!/bin/sh
    # xrdp X session start script (c) 2015, 2017, 2021 mirabilos
    # published under The MirOS Licence
    
    # Rely on /etc/pam.d/xrdp-sesman using pam_env to load both
    # /etc/environment and /etc/default/locale to initialise the
    # locale and the user environment properly.
    
    unset DBUS_SESSION_BUS_ADDRESS # [!code ++]
    unset XDG_RUNTIME_DIR # [!code ++]
    
    if test -r /etc/profile; then
            . /etc/profile
    fi
    
    if test -r ~/.profile; then
            . ~/.profile
    fi
    
    test -x /etc/X11/Xsession && exec /etc/X11/Xsession # [!code --]
    #test -x /etc/X11/Xsession && exec /etc/X11/Xsession # [!code ++]
    exec /bin/sh /etc/X11/Xsession # [!code --]
    #exec /bin/sh /etc/X11/Xsession # [!code ++]
    startxfce4 # [!code ++]
    ```

2. 编辑 xrdp 配置文件 `/etc/xrdp/xrdp.ini`，让远程桌面更好用。

    ```ini :line-numbers title="/etc/xrdp/xrdp.ini"
    ……
    max_bpp=32 //[!code --]
    max_bpp=128 //[!code ++]
    ……
    xserverbpp=24 //[!code --]
    xserverbpp=128 //[!code ++]
    ……
    ```

    ::: tip

    这个配置可改可不改，改了似乎可以优化远程桌面的图像质量，不改也可以正常访问远程桌面，这里我建议，如果远程桌面质量没啥问题的话就不要改了。

    :::

3. 设置系统在启动 x 会话时使用 xfce4 作为默认的会话管理器。

    ```bash
    su - user
    xfce4-session > ~/.xsession
    ```

### 3.4 设置中文语言环境和中文输入法

1. 安装中文语言包

    ```bash
    apt install -y locales xfonts-intl-chinese fonts-wqy-microhei
    ```

2. 语言环境设置

    ```bash
    dpkg-reconfigure locales
    ```

3. 安装中文输入法

    ```bash
    apt install -y fcitx5 fcitx5-chinese-addons fcitx5-frontend-gtk4 fcitx5-frontend-gtk3 fcitx5-frontend-gtk2 fcitx5-frontend-qt5
    ```

4. 设置 Fcitx 5 所需的环境变量

    ``` ssh-config :line-numbers title="/etc/profile"
    # 在文件的末尾添加
    export GTK_IM_MODULE=fcitx # [!code ++]
    export QT_IM_MODULE=fcitx # [!code ++]
    export XMODIFIERS=@im=fcitx # [!code ++]
    export INPUT_METHOD=fcitx # [!code ++]
    export SDL_IM_MODULE=fcitx # [!code ++]
    ```

    ::: note

    添加到 `/etc/profile` 、`~/.profile` 里面的效果是一样的，`~/.profile` 是针对当前用户生效，`/etc/profile` 是针对所有用户生效。

    :::

5. 配置 Fcitx 5 开机自动启动

    ```bash
    mkdir -p ~/.config/autostart && cp /usr/share/applications/org.fcitx.Fcitx5.desktop ~/.config/autostart
    ```

### 3.5 安装软件

略

## 4. 使用 Dockerfile 方式配置容器运行后自动执行脚本

通过 Dockerfile，可以自动化地构建 Docker 镜像，简化应用的部署和管理。

我们这里仅通过编写 Dockerfile，构建镜像，并确保容器启动时自动启动服务。

::: note Dockerfile 的基本结构

Dockerfile 是一个文本文件，包含了一系列用于构建镜像的指令。每条指令都会构建一层镜像，指令的内容描述了该层镜像应如何构建。

Dockerfile的基本结构如下：

- **注释行**：以 `#` 开头，用于说明和注释。
- **指令行**：以专用指令开头，如 `FROM`、`RUN` 等。

Dockerfile的常用指令

- **FROM**：初始化一个新的构建阶段，并设置基础镜像。
- **MAINTAINER**：指定作者信息（注意：新版Docker中推荐使用LABEL来替代）。
- **RUN**：在当前镜像层上执行命令。
- **COPY**：将文件或目录复制到镜像中。
- **ADD**：类似于COPY，但支持从URL下载文件。
- **EXPOSE**：声明容器在运行时监听的端口。
- **CMD**：指定容器启动时要执行的命令。
- **ENTRYPOINT**：配置容器启动时的入口点。

:::

1. 在容器的宿主机中创建一个文件夹，用来存放 Dockerfile 相关的文件。

    以我这个为例，在宿主机的 `/root/` 目录下创建了一个 `dockerfile_dir` 文件夹，用来存放各种 Dockerfile 文件，之所以取 `dockerfile_dir` 名字是因为要存储的 Dockerfile 的文件名必须是「Dockerfile」，所以文件夹我就换了个名字以示区别。 `ubuntu-2404-xfce` 是我准备制作的这个容器的名字。

    ```bash
    mkdir -p /root/dockerfile_dir/ubuntu-2404-xfce
    ```

2. 接下来，进入到 `/root/dockerfile_dir/ubuntu-2404-xfce` 目录中。在目录中首先创建一个 `Dockerfile` 文件，在其中写入以下内容。

    ```dockerfile :line-numbers title="/root/dockerfile_dir/ubuntu-2404-xfce/Dockerfile"
    # 这个 Dockerfile 要对哪一个镜像（image）生效
    FROM ubuntu-2404-xfce-x86_64:v1
    
    # 设置作者信息
    LABEL maintainer="username@example.com"
    
    # 复制启动脚本到容器中
    # Dockerfile 还有很多很强大的用途，甚至上面所有的步骤都可以用 Dockerfile 来完成
    # 这里我只用来写入一个自动启动脚本
    # 将 start_service.sh 放到容器的 /root/ 目录下
    ADD start_service.sh /root/start_service.sh
    
    # 设置脚本权限
    RUN chmod 777 /root/start_service.sh
    
    # 配置容器需要暴露的端口
    EXPOSE 22 3389
    
    # 设置容器启动命令
    # 设置好后，容器启动后就会执行 bash /root/start_service.sh 这个命令
    CMD ["bash", "/root/start_service.sh"]
    ```

3. 接下来，我们需要在 Dockerfile 的同一目录下，将我们需要上传到容器中的启动脚本也写出来。

    默认情况下，服务的开机启动都是使用 `systemctl enable <服务名>` 但在容器中 `systemctl` 不能用，只能通过脚本的方式来完成。

    ```bash :line-numbers title="/root/dockerfile_dir/ubuntu-2404-xfce/start_service.sh"
    #!/bin/bash

    # 设置一个记录日志的时间
    LOGTIME=$(/usr/bin/date "+%Y-%m-%d %H:%M:%S")
    # 将日志输出到 /var/log/start_service.log 中
    /usr/bin/echo "[$LOGTIME] startup run..." >>/var/log/start_service.log
    # 启动 sshd 服务
    /usr/sbin/service ssh start >>/var/log/start_service.log
    # 启动 xrdp 服务
    /usr/sbin/service xrdp start >>/var/log/start_service.log
    # 睡眠，目的是为了保持容器在前台运行不退出
    sleep infinity
    ```

    ::: tip

    1. 容器运行必须有一个前台进程， 如果没有前台进程执行，容器认为空闲，就会自行退出。
    2. 容器运行的命令如果不是那些一直挂起的命令（ 运行top，tail、循环等），就是会自动退出。
    3. 这个是容器的机制问题。

    在上面这个脚本中，因为 Dockerfile 设置了容器启动后，自动执行 `bash /root/start_service.sh` 脚本，所以如果这个脚本执行完毕退出了，容器会跟着退出，所以我们需要让这个脚本一直跑下去，不能退出，所以才会在脚本最后添加一个 `sleep infinity` 让脚本虽然已经执行完毕了，还要挂在前台。
    :::

4. 将我们完成配置的容器生成镜像（image）

    ```bash
    docker stop f5b1a4eadf47
    docker commit f5b1a4eadf47 ubuntu-2404-xfce-x86_64:v1
    ```

    ::: note 参数说明

    - f5b1a4eadf47： 是要转为镜像的那个容器的 ID
    - ubuntu-2404-xfce-x86_64:v1：是镜像的名称和 tag，这个名称和 tag 要和前面 Dockerfile 中 `FROM` 字段中的内容保持一致。

    :::

5. 进入存有 Dockerfile 的文件夹中，执行下面的命令构建新的镜像。

    ```bash
    cd /root/dockerfile_dir/ubuntu-2404-xfce/
    docker build -t ubuntu-2404-xfce-x86_64:v1.1 .
    ```

6. 构建出来的 `ubuntu-2404-xfce-x86_64:v1.1` 镜像就是可以分发使用了。
