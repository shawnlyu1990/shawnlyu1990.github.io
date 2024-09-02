---
# 文章标题
title: 基于 CentOS 7 的 PXE 服务器安装 Ubuntu 的 ks 文件记录
# 当前页面的短标题，会在导航栏、侧边栏和路径导航中作为首选。
shortTitle: PXE 服务器安装 Ubuntu 的 ks 文件记录
# 当前页面内容描述。
description: 基于 CentOS 7 的 PXE 服务器安装 Ubuntu 的 ks 文件记录
# 当前页面的图标，建议填写
icon: PXE-Server
# 作者
author: 昌霖学长
# 当前文章是否为原创
isOriginal: true
# 设置写作时间
date: 2024-08-23
# 分类，一个页面可以有多个分类
categories: 
  - Linux
  - 服务部署
# 标签，一个页面可以有多个标签
tags: 
  - PXE
  - ks文件
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
本文还需要进一步核实更新。
:::

## 安装 Ubuntu 16.04.4 Desktop LTS 的 ks 文件（仅供参考）

```ssh-config title="ubuntu16.04.4_Desktop/ks/preseed_Desktop.cfg"
[root@pxe OS_dir]# pwd
/data/OS_dir
[root@pxe OS_dir]# cat ubuntu16.04.4_
ubuntu16.04.4_Desktop/ ubuntu16.04.4_Server/  
[root@pxe OS_dir]# cat ubuntu16.04.4_Desktop/ks/preseed_Desktop.cfg 
d-i preseed/early_command string kill-all-dhcp
# Locale sets language and country. 
d-i debian-installer/language string en
d-i debian-installer/country string US
d-i debian-installer/locale string en_US
#d-i debian-installer/locale string zh_CN

# Keyboard selection. 
d-i console-setup/ask_detect boolean false 
d-i console-setup/layoutcode string us 

# Network configuration. #注，在netboot模式下，网络设置不起作用，需要在dhcp中设定用户名密码，
#d-i netcfg/choose_interface select eth0 
#d-i netcfg/dhcp_timeout string 60 
#d-i netcfg/get_hostname string libvert 
#d-i netcfg/get_domain string libvert 
#d-i netcfg/no_default_route boolean true 

# Clock and time zone setup 
d-i clock-setup/utc boolean false 
d-i time/zone string Asia/Shanghai 


# Mirror settings  #安装文件镜像设置，使用http协议
d-i mirror/protocol string http 
d-i mirror/country string CN
d-i mirror/http/hostname string 10.0.1.1  
d-i mirror/http/directory string /ubuntu16.04.4_Desktop/isocontent  # 镜像路径 http://10.0.1.1/ubuntu16.04_LTS
#d-i mirror/http/proxy string 

# Partitioning ###自动LVM分区
d-i partman-auto/disk string /dev/sda
d-i partman-auto/choose_recipe select atomic
d-i partman-auto/method string lvm
d-i partman-auto-lvm/guided_size string 100%
d-i partman-lvm/confirm boolean true
d-i partman-lvm/confirm_nooverwrite boolean true
d-i partman-lvm/device_remove_lvm boolean true
d-i partman-md/device_remove_md boolean true
d-i partman-partitioning/confirm_write_new_label boolean true
d-i partman/choose_partition select finish
d-i partman/confirm boolean true
d-i partman/confirm_nooverwrite boolean true
d-i partman/default_filesystem string ext4
d-i partman/mount_style select uuid

# Base system installation 
d-i base-installer/kernel/image string linux-generic 

# Account setup 
d-i user-setup/encrypt-home boolean false 
d-i user-setup/allow-password-weak boolean true
d-i passwd/root-login boolean true 
d-i passwd/root-password password netentsec 
d-i passwd/root-password-again password netentsec
d-i passwd/make-user boolean true 
d-i passwd/user-fullname string user
d-i passwd/username string user
d-i passwd/user-password password user
d-i passwd/user-password-again password user
# The user account will be added to some standard initial groups. To
# override that, use this.
d-i passwd/user-default-groups string audio cdrom video

### Account setup
# Skip creation of a root account (normal user account will be able to
# use sudo). The default is false; preseed this to true if you want to set
# a root password.
#d-i passwd/root-login boolean false
# Alternatively, to skip creation of a normal user account.
#d-i passwd/make-user boolean false

# Root password, either in clear text
#d-i passwd/root-password password r00tme
#d-i passwd/root-password-again password r00tme
# or encrypted using a crypt(3)  hash.
#d-i passwd/root-password-crypted password [crypt(3) hash]

# To create a normal user account.
#d-i passwd/user-fullname string DeepctrlUser
#d-i passwd/username string deepctrl
# Normal user's password, either in clear text
#d-i passwd/user-password password deepctrl
#d-i passwd/user-password-again password deepctrl
# or encrypted using a crypt(3) hash.
#d-i passwd/user-password-crypted password [crypt(3) hash]
# Create the first user with the specified UID instead of the default.
#d-i passwd/user-uid string 1010
# The installer will warn about weak passwords. If you are sure you know
# what you're doing and want to override it, uncomment this.
#d-i user-setup/allow-password-weak boolean true

# The user account will be added to some standard initial groups. To
# override that, use this.
#d-i passwd/user-default-groups string audio cdrom video

# Set to true if you want to encrypt the first user's home directory.
#d-i user-setup/encrypt-home boolean false

# Package selection 
tasksel tasksel/first multiselect standard, ubuntu-desktop
d-i pkgsel/include string openssh-server 
d-i pkgsel/upgrade select none 
d-i pkgsel/language-packs multiselect en, zh 
d-i pkgsel/update-policy select none 

# Boot loader installation 
d-i grub-installer/only_debian boolean true 

# Finishing up the installation 
d-i finish-install/reboot_in_progress note 

#d-i live-installer/net-image string http://192.168.1.101/ubuntu/install/filesystem.squashfs

# install vmware tools
d-i preseed/late_command string /usr/bin/wget http://10.0.1.1/VMTools_for_ESXi6.7/vmtools_install_ubuntu.sh && sh vmtools_install_ubuntu.sh && rm -rf vmtools_install_ubuntu.sh
```

## 安装 Ubuntu 16.04.4 Server LTS 的 ks 文件（仅供参考）

```ssh-config title="ubuntu16.04.4_Desktop/ks/preseed_Desktop.cfg"
[root@pxe OS_dir]# cat ubuntu16.04.4_Server/
isocontent/ ks/         
[root@pxe OS_dir]# cat ubuntu16.04.4_Server/ks/preseed_Server.cfg 
d-i preseed/early_command string kill-all-dhcp
# Locale sets language and country. 
d-i debian-installer/language string en
d-i debian-installer/country string US
d-i debian-installer/locale string en_US
#d-i debian-installer/locale string zh_CN

# Keyboard selection. 
d-i console-setup/ask_detect boolean false 
d-i console-setup/layoutcode string us 

# Network configuration. #注，在netboot模式下，网络设置不起作用，需要在dhcp中设定用户名密码，
#d-i netcfg/choose_interface select eth0 
#d-i netcfg/dhcp_timeout string 60 
#d-i netcfg/get_hostname string libvert 
#d-i netcfg/get_domain string libvert 
#d-i netcfg/no_default_route boolean true 

# Clock and time zone setup 
d-i clock-setup/utc boolean false 
d-i time/zone string Asia/Shanghai 


# Mirror settings  #安装文件镜像设置，使用http协议
d-i mirror/protocol string http 
d-i mirror/country string CN
d-i mirror/http/hostname string 10.0.1.1  
d-i mirror/http/directory string /ubuntu16.04.4_Server/isocontent  # 镜像路径 http://10.0.1.1/ubuntu16.04_LTS
#d-i mirror/http/proxy string 

# Partitioning ###自动LVM分区
d-i partman-auto/disk string /dev/sda
d-i partman-auto/choose_recipe select atomic
d-i partman-auto/method string lvm
d-i partman-auto-lvm/guided_size string 100%
d-i partman-lvm/confirm boolean true
d-i partman-lvm/confirm_nooverwrite boolean true
d-i partman-lvm/device_remove_lvm boolean true
d-i partman-md/device_remove_md boolean true
d-i partman-partitioning/confirm_write_new_label boolean true
d-i partman/choose_partition select finish
d-i partman/confirm boolean true
d-i partman/confirm_nooverwrite boolean true
d-i partman/default_filesystem string ext4
d-i partman/mount_style select uuid

# Base system installation 
d-i base-installer/kernel/image string linux-generic 

# Account setup 
d-i user-setup/encrypt-home boolean false 
d-i user-setup/allow-password-weak boolean true
d-i passwd/root-login boolean true 
d-i passwd/root-password password netentsec 
d-i passwd/root-password-again password netentsec
d-i passwd/make-user boolean true 
d-i passwd/user-fullname string user
d-i passwd/username string user
d-i passwd/user-password password user
d-i passwd/user-password-again password user
# The user account will be added to some standard initial groups. To
# override that, use this.
d-i passwd/user-default-groups string audio cdrom video

### Account setup
# Skip creation of a root account (normal user account will be able to
# use sudo). The default is false; preseed this to true if you want to set
# a root password.
#d-i passwd/root-login boolean false
# Alternatively, to skip creation of a normal user account.
#d-i passwd/make-user boolean false

# Root password, either in clear text
#d-i passwd/root-password password r00tme
#d-i passwd/root-password-again password r00tme
# or encrypted using a crypt(3)  hash.
#d-i passwd/root-password-crypted password [crypt(3) hash]

# To create a normal user account.
#d-i passwd/user-fullname string DeepctrlUser
#d-i passwd/username string deepctrl
# Normal user's password, either in clear text
#d-i passwd/user-password password deepctrl
#d-i passwd/user-password-again password deepctrl
# or encrypted using a crypt(3) hash.
#d-i passwd/user-password-crypted password [crypt(3) hash]
# Create the first user with the specified UID instead of the default.
#d-i passwd/user-uid string 1010
# The installer will warn about weak passwords. If you are sure you know
# what you're doing and want to override it, uncomment this.
#d-i user-setup/allow-password-weak boolean true

# The user account will be added to some standard initial groups. To
# override that, use this.
#d-i passwd/user-default-groups string audio cdrom video

# Set to true if you want to encrypt the first user's home directory.
#d-i user-setup/encrypt-home boolean false

# Package selection 
tasksel tasksel/force-tasks     string server
# No language support packages.
d-i pkgsel/install-language-support     boolean false
d-i pkgsel/include string openssh-server 
d-i pkgsel/upgrade select none 
d-i pkgsel/language-packs multiselect en, zh 
d-i pkgsel/update-policy select none 

# Boot loader installation 
d-i grub-installer/only_debian boolean true 

# Finishing up the installation 
d-i finish-install/reboot_in_progress note 

#d-i live-installer/net-image string http://192.168.1.101/ubuntu/install/filesystem.squashfs
```

## 网络安装 Ubuntu 20.04 Desktop 的 ks 文件（仅供参考）

```ssh-config title="ubuntu20.04_Desktop/ks/preseed_Desktop.cfg"
[root@pxe OS_dir]# pwd 
/data/OS_dir 
[root@pxe OS_dir]# cat ubuntu20.04_Desktop/ks/preseed_Desktop.cfg 
d-i preseed/early_command string kill-all-dhcp 
# Locale sets language and country. 
d-i debian-installer/language string en 
d-i debian-installer/country string US 
d-i debian-installer/locale string en_US 
#d-i debian-installer/locale string zh_CN 

# Keyboard selection. 
d-i console-setup/ask_detect boolean false 
d-i console-setup/layoutcode string us 

# Network configuration. #注，在netboot模式下，网络设置不起作用，需要在dhcp中设定用户名密码， 
#d-i netcfg/choose_interface select eth0 
#d-i netcfg/dhcp_timeout string 60 
#d-i netcfg/get_hostname string libvert 
#d-i netcfg/get_domain string libvert 
#d-i netcfg/no_default_route boolean true 

# Clock and time zone setup 
d-i clock-setup/utc boolean false 
d-i time/zone string Asia/Shanghai 

# Mirror settings #安装文件镜像设置，使用http协议 
d-i mirror/protocol string http 
d-i mirror/country string CN 
d-i mirror/http/hostname string 10.0.1.1 
d-i mirror/http/directory string /ubuntu20.04_Desktop/isocontent # 镜像路径 http://10.0.1.1/ubuntu16.04_LTS 
#d-i mirror/http/proxy string 

# Partitioning ###自动LVM分区 
d-i partman-auto/disk string /dev/sda 
d-i partman-auto/choose_recipe select atomic 
d-i partman-auto/method string lvm 
d-i partman-auto-lvm/guided_size string 100% 
d-i partman-lvm/confirm boolean true 
d-i partman-lvm/confirm_nooverwrite boolean true 
d-i partman-lvm/device_remove_lvm boolean true 
d-i partman-md/device_remove_md boolean true 
d-i partman-partitioning/confirm_write_new_label boolean true 
d-i partman/choose_partition select finish 
d-i partman/confirm boolean true 
d-i partman/confirm_nooverwrite boolean true 
d-i partman/default_filesystem string ext4 
d-i partman/mount_style select uuid 

# Base system installation 
d-i base-installer/kernel/image string linux-generic 

# Account setup 
d-i user-setup/encrypt-home boolean false 
d-i user-setup/allow-password-weak boolean true 
d-i passwd/root-login boolean true 
d-i passwd/root-password password netentsec 
d-i passwd/root-password-again password netentsec 
d-i passwd/make-user boolean true 
d-i passwd/user-fullname string user 
d-i passwd/username string user 
d-i passwd/user-password password user 
d-i passwd/user-password-again password user 
# The user account will be added to some standard initial groups. To 
# override that, use this. 
d-i passwd/user-default-groups string audio cdrom video 

### Account setup 
# Skip creation of a root account (normal user account will be able to 
# use sudo). The default is false; preseed this to true if you want to set 
# a root password. 
#d-i passwd/root-login boolean false 
# Alternatively, to skip creation of a normal user account. 
#d-i passwd/make-user boolean false 

# Root password, either in clear text 
#d-i passwd/root-password password r00tme 
#d-i passwd/root-password-again password r00tme 
# or encrypted using a crypt(3) hash. 
#d-i passwd/root-password-crypted password [crypt(3) hash] 

# To create a normal user account. 
#d-i passwd/user-fullname string DeepctrlUser 
#d-i passwd/username string deepctrl 
# Normal user's password, either in clear text 
#d-i passwd/user-password password deepctrl 
#d-i passwd/user-password-again password deepctrl 
# or encrypted using a crypt(3) hash. 
#d-i passwd/user-password-crypted password [crypt(3) hash] 
# Create the first user with the specified UID instead of the default. 
#d-i passwd/user-uid string 1010 
# The installer will warn about weak passwords. If you are sure you know 
# what you're doing and want to override it, uncomment this. 
#d-i user-setup/allow-password-weak boolean true 

# The user account will be added to some standard initial groups. To 
# override that, use this. 
#d-i passwd/user-default-groups string audio cdrom video 

# Set to true if you want to encrypt the first user's home directory. 
#d-i user-setup/encrypt-home boolean false 

# Package selection 
tasksel tasksel/first multiselect standard, ubuntu-desktop 
d-i pkgsel/include string openssh-server 
d-i pkgsel/upgrade select none 
d-i pkgsel/language-packs multiselect en, zh 
d-i pkgsel/update-policy select none 

# Boot loader installation 
d-i grub-installer/only_debian boolean true 

# Finishing up the installation 
d-i finish-install/reboot_in_progress note 

#d-i live-installer/net-image string http://192.168.1.101/ubuntu/install/filesystem.squashfs 

# install vmware tools 
d-i preseed/late_command string /usr/bin/wget http://10.0.1.1/VMTools_for_ESXi6.7/vmtools_install_ubuntu.sh && sh vmtools_install_ubuntu.sh && rm -rf vmtools_install_ubuntu.sh 
```
