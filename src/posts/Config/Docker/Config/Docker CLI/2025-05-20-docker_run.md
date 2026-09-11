---
# 文章标题
title: docker run 命令
# 当前页面的短标题，会在导航栏、侧边栏和路径导航中作为首选。
shortTitle: docker run
# 当前页面内容描述。
description: 记录一下我自己可能会比较常用的 Docker 命令
# 当前页面的图标，建议填写
icon: "/assets/blogicons/Docker.png"
# 作者
author: 
# 当前文章是否为原创
isOriginal: true
# 设置写作时间
date: 2025-05-20
# 分类，一个页面可以有多个分类
categories: 
  - Docker
# 标签，一个页面可以有多个标签
tags: 
  - 常用命令
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

<VPBanner
  title="Docker CLI 官方文档"
  content="主要的 Docker 命令行接口（CLI），包含所有 docker 命令。"
  logo="https://docs.docker.com/favicons/docs@2x.ico"
  :actions='[
    {
      text: "访问",
      link: "https://docs.docker.com/reference/cli/docker/container/run/",
    },
  ]'
/>

## 命令示例

`docker run` 命令是在 Docker 中创建和运行容器的主要命令之一。它允许根据需要配置容器的各种属性。

示例：

```shell
docker run -d \
  --name my_nginx \
  -p 80:80 \
  -v /path/to/nginx/conf:/etc/nginx/conf.d \
  -v /path/to/nginx/html:/usr/share/nginx/html \
  nginx:latest
```

或者

```shell
docker run -d --name my_nginx -p 80:80 -v /path/to/nginx/conf:/etc/nginx/conf.d -v /path/to/nginx/html:/usr/share/nginx/html nginx:latest
```

## 参数说明

### **后台运行（`-d`，`--detach`）**

在后台以守护进程模式运行容器。

```bash
docker run -d image_name:tag
```

### **交互模式（`-it`，`--interactive --tty`）**

`-it` 其实是两个参数，分别是 `-i`（`--interactive`） 和 `-t`（`--tty`）。

- `-i`（`--interactive`）代表启用容器的 `STDIN` 标准输入，并将用户输入的内容通过标准输入重定向到容器内部。

- `-t`（`--tty`）代表分配一个伪 TTY 给容器，将终端的 I/O 连接到容器中。这样就可以在宿主机中使用命令操作容器了。

```bash
docker run -it image_name:tag
```

### **指定名称（`--name`）**

为容器指定一个名称。

```bash
# 指定容器名称为 container_name
docker run --name container_name image_name:tag
```

### **端口映射（`-p`，`--expose`）**

将容器的端口映射到主机上的端口。可以逐个映射，也可以批量映射。

```bash
docker run -p 8080:80 -p 17000-18000:7000-8000 image_name:tag
# 将容器的 80 端口映射到主机的 8080 端口上，这样可以通过访问主机的 8080 端口访问到容器的 80 端口
# 也可以批量映射。将容器的 7000-8000 端口，依次映射到主机的 17000-18000 端口。
```

### **文件/目录映射（`-v`）**

挂载主机上的文件或目录到容器内部。如果宿主机上的目录不存在，Docker 会在宿主机上自动创建该目录并挂载到容器中。

```bash
docker run -v /host_path/:/container_path/ image_name:tag
# 将宿主机的 /host_path/ 目录挂载到容器中的 /container_path/ 目录中。
# 如果是具体到单个文件的话，就是只挂载一个文件。
```

### **设置环境变量（`-e`，`--env`，`--env-file`）**

为容器设置环境变量，或者覆盖容器中已有的环境变量。

```bash
docker run -e VAR1=value1 --env VAR2=value2 image_name:tag
# 将 value1 赋值给环境变量 VAR1，将 value2 赋值给环境变量 VAR2
```

::: warning
使用这个参数的时候，必须使用 `=`，如果不使用 `=` 的话，容器内就不会设置这个环境变量。
:::

也可以将环境变量编写成一个文件，在环境变量文件中使用 `<variable>=value` 来设置环境变量，然后用 `--env-list` 来将这些环境变量设置到容器中。

在环境变量文件中，`#` 开头代表注释，但如果 `#` 出现在其他位置，则会被视为变量的一部分。

```bash
cat env.list

# 这是一个注释
VAR1=value1#
VAR2=value2
USER
# 如果只写了环境变量，但是没有提供值的话（如USER），会从宿主机环境中获取该环境变量的值，然后赋到容器中。

docker run --env-file env.list ubuntu env | grep -E 'VAR|USER'
VAR1=value1#
VAR2=value2
USER=jonzeolla
```

### **设置重启策略（`--restart`）**

指定容器在退出后的重启策略。该策略能够确保容器的持续运行，并在发生故障时快速恢复。

- **`--restart=no`**：默认策略。容器退出后不会自动重启。

  ```bash
  docker run --restart=no image_name:tag
  ```

- **`--restart=on-failure:<exit_number>`**：当退出状态为非 0 时重启。

  ```bash
  docker run --restart=on-failure image_name:tag # 退出状态为非 0 时重启
  docker run --restart=on-failure:5 image_name:tag # 退出状态为 5 时重启
  ```

- **`--restart=unless-stopped`**：只有手动退出容器和 docker 服务停止或重启时不重启，其他情况均会自动重启。

  ```bash
  docker run --restart=unless-stopped image_name:tag
  ```
  
- **`--restart=always`**：始终自动重启。

  ```bash
  docker run --restart=always image_name:tag
  ```

### **连接到另一个容器（`--link`）**

将容器连接到另一个容器，在两个容器之间建立网络连接。

```bash
docker run --link another_container_name image_name:tag
```

### **设置 DNS 服务器（`--dns`）**

指定容器使用的自定义 DNS 服务器。

```bash
docker run --dns 8.8.8.8 image_name:tag
```

### **设置 DNS 搜索域（`--dns-search`）**

指定容器的 DNS 搜索域。

```bash
docker run --dns-search example.com image_name:tag
```

### **增加或删除容器的 Linux 能力（`--cap-add`** 和 **`--cap-drop`）**

增加或删除容器的 Linux 能力，用于控制容器的权限。

```bash
docker run --cap-add=SYS_ADMIN image_name:tag
```

### **挂载设备（`--device`）**

指定要访问的设备（如 `/dev/mem`，GPU 等）。需要说明的是，使用 `--device` 挂载的设备，容器内的进程通常没有权限操作，需要使用 `--cap-add` 开放相应的权限。

```bash
docker run --device /dev/mem:/dev/mem --cap-add SYS_RAWIO image_name:tag
# 宿主机中的 /dev/mem 设备挂载到容器的 /dev/mem 中
# 为容器添加 SYS_RAWIO 能力
```

### **特权模式（`--privileged`）**

给容器赋予特权，可以访问主机的设备，例如加载内核模块、直接操作硬件设备等。

具体来说，这个选项做了以下两件事情：

- 给容器添加了所有的 capabilities （`--cap-add`）
- 允许容器访问主机的所有设备 （`--device`）

```bash
docker run --privileged=true centos:7.9.2009 /usr/sbin/init
# 以特权模式启动 centos，这样就可以在容器中使用 systemctl 了。
```

### **挂载临时文件系统（`--tmpfs`）**

在容器内创建临时文件系统，用于存储临时数据。容器中的文件将存放在主机的内存中。当容器停止时，`--tmpfs` 挂载将被删除，在那里写入的文件不会被持久化。

```bash
docker run --tmpfs /tmp image_name:tag
```

::: note 举例
迅雷的一个 pcdn 分布式视频缓存系统，这个系统就有docker运行的镜像，而这个容器的启动命令为：

```bash
docker run -d --name=wxedge --restart=always --privileged --net=host --tmpfs /run --tmpfs /tmp -v /home/devil/Downloads/storage/:/storage:rw -e LISTEN_ADDR="0.0.0.0:18888"    images-cluster.xycloud.com/wxedge/wxedge:latest
```

可以看到，这个 pcdn 的应用的相关运行文件就是在 `/run` 文件夹下，同时这个文件夹是采用 `--tmpfs` 方式挂载的，因此这样就保证了这个应用的运行文件是被存储在主机内存中的。

:::

### **容器资源限制（`--ulimit`）**

类似于 Linux 中的 `ulimit` 功能，此功能用于设置容器的资源限制，如最大打开文件数、最大进程数等。

具体可用的资源类型通常包括：

| 参数 | 示例 | 含义 |
| :---: | :---: | :--- |
| `core` | `core=0` | 最大核心转储文件大小，单位是 blocks（1 block = 1 KB）。当进程被中止时（如：程序崩溃），内核会检查这个值，然后进程的当前目录下创建一个 core 文件。（`RLIMIT_CORE`）<br> <ul> <li> 0 代表不产生 core 文件；</li> <li> -1 代表不限制 core 文件大小。</li> </ul>  |
| `cpu` | `cpu=-1` | 进程占用 CPU 的最大时间，单位是秒。如果超过这个时间，内核会发送一个 `SIGXCPU` 信号，如果进程还是没有终止，再发送 `SIGKILL` 信号。（`RLIMIT_CPU`）<br> <ul> <li> -1 代表不限制 CPU 时间。</li> </ul> |
| `data` | `data=-1` | 设置数据段的最大字节长度（最大堆大小），单位是 KB。内核在扩大进程的堆空间之前，检查这个值。（`RLIMIT_DATA`）<br> <ul> <li> -1 代表不限制数据段大小。</li> </ul> |
| `fsize` | `fsize=-1` | 设置最大文件大小，单位是 blocks (1 block = 1 KB)。如果进程尝试扩大文件超过这个值，内核发送一个 `SIGXFSZ` 信号。（`RLIMIT_FSIZE`）<br> <ul> <li> -1 代表不限制文件大小。</li> </ul> |
| `locks` | `locks=-1` |设置文件锁的最大数量。（`RLIMIT_LOCKS`）<br> <ul> <li> -1 代表不限制文件锁数量。</li> </ul> |
| `memlock` | `memlock=64` | 设置非交换内存的最大值，单位是 KB。当内核调用 `mlock()` 或 `mlockall()` 系统调用尝试给一个页帧加锁时会检查该值。（`RLIMIT_MEMLOCK`） |
| `msgqueue` | `msgqueue=819200` | POSIX 消息队列的最大字节数。（`RLIMIT_MSGQUEUE`） |
| `nice` | 没用过 | 优先级的完美值。进程可通过 `setpriority()` 或 `nice()` 设置。（`RLIMIT_NICE`） |
| `nofile` | `nofile=1024` | 打开的文件描述符最大数量。当新打开一个文件或复制文件描述符时，内核都会检查这个值。（`RLIMIT_NOFILE`） |
| `nproc` | `nproc=31191` | 用户可以拥有的最大进程数量。（`RLIMIT_NPROC`） |
| `rss` | `rss=-1` | 进程可以使用的常驻内存的最大值。（`RLIMIT_RSS`） |
| `rtprio` | `rtprio=0` | 最大实时优先级。进程可通过 `sched_setscheduler` 和 `sched_setparam` 设置。（`RLIMIT_RTPRIO`） |
| `rttime` | 没用过 | 实时任务的超时时间，单位是微秒。（`RLIMIT_RTTIME`） |
| `sigpending` | `sigpending=31191` | 进程挂起信号的最大数量。（`RLIMIT_SIGPENDING`） |
| `stack` | `stack=8192` | 最大栈空间，单位是字节(Bytes)。在扩展进程的用户态栈时，内核会检查这个值。（`RLIMIT_STACK`） |
  
```bash
docker run --ulimit nofile=1024 image_name:tag
```

### **`--cpus=<CPU数量>`**

设置容器可以使用的 CPU 个数（可以是小数）。

举例：`docker run --cpus=1.5 image_name:tag`

### **`--cpu-shares <权重值>`**

设置容器的 CPU 份额，用于控制 CPU 资源的分配。用于设置容器使用 CPU 的时间片权重，决定容器在资源竞争时的优先级。默认值为 1024，值越高，容器获得 CPU 时间片的比例越大。

举例：`docker run --cpu-shares 512 image_name:tag`

### **`–cpu-quota=<CPU时间>`**

设置容器的 CPU 配额，以微秒为单位。设置容器在一个调度周期内能使用的 CPU 时间上限。

举例：`docker run --cpu-quota=50000 image_name:tag`

### **`--cpu-period=<调度周期>`**

设置容器的 CPU 调度周期，以微秒为单位。

举例：`docker run --cpu-period=100000 image_name:tag`

### **`--cpu-period=<调度周期>`**

设置容器的 CPU 调度周期，以微秒为单位。

举例：`docker run --cpu-period=100000 image_name:tag`

### **`--cpuset-cpus="<CPU ID>"`**

限制容器运行在指定的 CPU 核心； 例如宿主机有 4 个 CPU 核心，CPU 核心标识为 0 - 3，我启动一台容器，只想让这台容器运行在标识 0 和 3 的两个 CPU 核心上，可以使用 `--cpuset-cpus="0,3"` 来指定。

举例：`docker run --cpuset-cpus="0,3" image_name:tag`

### **`--memory <内存大小>`**

设置容器可使用的内存限制。单位为G、M、K

举例：`docker run --memory 1G image_name:tag`

### **`--memory-swap=<内存大小>`**

设置容器可使用的 内存 + swap 的限制（总量）。如果在启动容器时，只指定 `--memory` 而不指定 `--memory-swap`， 那么 `--memory-swap` 默认为 `--memory` 的两倍。

举例：`docker run --memory-swap 1G image_name:tag`

### **`--net=<网络模式>`**

指定容器使用的网络模式。

- **bridge 模式**：默认的网络模式。Docker安装启动后会在宿主主机上创建一个名为 docker0 的虚拟网桥，处于OSI七层模型的数据链路层，后续每当我们创建一个新的 docker 容器，在不指定容器网络模式的情况下，docker 会通过 docker0 与主机的网络连接，docker0 相当于网桥。使用 bridge 模式新创建的容器，容器内部都会有一个虚拟网卡，名为 eth0，容器之间可以通过容器内部的 IP 相互通信。
- **host 模式**：如果指定的 host 模式容器不会拥有一个独立 network namesace，而是与宿主主机共用 network namesace。也就说明容器本身不会有的网卡信息，而是使用宿主主机的网络信息。容器除了网络，其他比如文件系统、进程等依然都是隔离的。**但因为和宿主主机共享 network namespace，会有可能出现端口冲突的情况。**
- **container 模式**：container 模式和 host 模式很类似，host 模式和宿主主机共享 network namespace；container 模式和指定的容器共享，两者之间除了网络共享（网卡、主机名、IP 地址），其他方面还是隔离的。
- **none 模式**：如果 docker 容器指定的网络模式为 none，该容器没有办法联网，外界也无法访问它，可以用来做测试。

举例：`docker run --net=bridge image_name:tag`

---

--hostname：设置容器的主机名。
举例：docker run --hostname my_container image_name:tag

--user：指定容器运行时的用户名或 UID。
举例：docker run --user username image_name:tag

--volume-driver：指定容器使用的卷驱动程序。
示例：docker run --volume-driver my_driver image_name:tag

--shm-size：设置容器的共享内存大小。
举例：docker run --shm-size 2g image_name:tag

--add-host：向容器的 /etc/hosts 文件添加自定义主机名和 IP 映射。
举例：docker run --add-host myhost:192.168.0.100 image_name:tag

--read-only：将容器的文件系统设置为只读模式。
举例：docker run --read-only image_name:tag



--dns-option：为容器的 DNS 配置添加自定义选项。
举例：docker run --dns-option=timeout:5 image_name:tag

--sysctl：设置容器的内核参数。
举例：docker run --sysctl net.ipv4.ip_forward=1 image_name:tag

--label：为容器添加标签，用于识别和组织容器。
举例：docker run --label env=production image_name:tag

--workdir：设置容器的工作目录。
举例：docker run --workdir /app image_name:tag

## 参考

1. 《docker run 命令常用参数详解》https://www.cnblogs.com/mingyue5826/p/17883524.html
2. 《docker run 命令30个常用参数详解》https://blog.csdn.net/wangshuai6707/article/details/132299930
