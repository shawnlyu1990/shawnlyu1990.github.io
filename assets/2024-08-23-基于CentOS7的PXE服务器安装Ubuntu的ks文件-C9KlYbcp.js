import{a as e,i as t,l as n,t as r}from"./app-pSnCdMtf.js";var i=JSON.parse(`{"path":"/posts/Config/Linux/Install/2024-08-23-%E5%9F%BA%E4%BA%8ECentOS7%E7%9A%84PXE%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%AE%89%E8%A3%85Ubuntu%E7%9A%84ks%E6%96%87%E4%BB%B6.html","title":"基于 CentOS 7 的 PXE 服务器安装 Ubuntu 的 ks 文件记录","lang":"zh-CN","frontmatter":{"title":"基于 CentOS 7 的 PXE 服务器安装 Ubuntu 的 ks 文件记录","shortTitle":"PXE 服务器安装 Ubuntu 的 ks 文件记录","description":"基于 CentOS 7 的 PXE 服务器安装 Ubuntu 的 ks 文件记录","icon":"/assets/blogicons/PXE服务器.png","author":"昌霖学长","isOriginal":true,"date":"2024-08-23T00:00:00.000Z","categories":["Linux","服务部署"],"tags":["PXE","ks文件"],"license":"MIT","sticky":false,"star":false,"article":true,"timeline":true,"comment":false,"head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"基于 CentOS 7 的 PXE 服务器安装 Ubuntu 的 ks 文件记录\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-08-23T00:00:00.000Z\\",\\"dateModified\\":\\"2026-09-11T03:13:37.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"昌霖学长\\"}]}"],["meta",{"property":"og:url","content":"https://mrcharlin.com/posts/Config/Linux/Install/2024-08-23-%E5%9F%BA%E4%BA%8ECentOS7%E7%9A%84PXE%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%AE%89%E8%A3%85Ubuntu%E7%9A%84ks%E6%96%87%E4%BB%B6.html"}],["meta",{"property":"og:site_name","content":"昌霖学长的自习室"}],["meta",{"property":"og:title","content":"基于 CentOS 7 的 PXE 服务器安装 Ubuntu 的 ks 文件记录"}],["meta",{"property":"og:description","content":"基于 CentOS 7 的 PXE 服务器安装 Ubuntu 的 ks 文件记录"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-09-11T03:13:37.000Z"}],["meta",{"property":"article:author","content":"昌霖学长"}],["meta",{"property":"article:tag","content":"ks文件"}],["meta",{"property":"article:tag","content":"PXE"}],["meta",{"property":"article:published_time","content":"2024-08-23T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2026-09-11T03:13:37.000Z"}]]},"git":{"createdTime":1724391695000,"updatedTime":1789096417000,"contributors":[{"name":"Shawn Lyu","username":"","email":"shawnlyu1990@gmail.com","commits":12}]},"readingTime":{"minutes":7.98,"words":2393},"filePathRelative":"posts/Config/Linux/Install/2024-08-23-基于CentOS7的PXE服务器安装Ubuntu的ks文件.md","excerpt":"<div class=\\"hint-container important\\">\\n<p class=\\"hint-container-title\\">重要</p>\\n<p>本文还需要进一步核实更新。</p>\\n</div>\\n<h2>安装 Ubuntu 16.04.4 Desktop LTS 的 ks 文件（仅供参考）</h2>\\n<div class=\\"code-block-with-title\\">\\n  <div class=\\"code-block-title-bar\\" data-title=\\"ubuntu16.04.4_Desktop/ks/preseed_Desktop.cfg\\">\\n    <span>ubuntu16.04.4_Desktop/ks/preseed_Desktop.cfg</span>\\n  </div>\\n  <div class=\\"language-ssh-config has-collapsed-lines collapsed\\" data-highlighter=\\"shiki\\" data-ext=\\"ssh-config\\" style=\\"--vp-collapsed-lines:15;background-color:#282c34;color:#abb2bf\\"><pre class=\\"shiki one-dark-pro vp-code\\"><code class=\\"language-ssh-config\\"><span class=\\"line\\"><span style=\\"color:#ABB2BF\\">[root@pxe OS_dir]</span><span style=\\"color:#7F848E;font-style:italic\\"># pwd</span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">/data/OS_dir</span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">[root@pxe OS_dir]</span><span style=\\"color:#7F848E;font-style:italic\\"># cat ubuntu16.04.4_</span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">ubuntu16.</span><span style=\\"color:#D19A66\\">04</span><span style=\\"color:#ABB2BF\\">.4_Desktop/ ubuntu16.</span><span style=\\"color:#D19A66\\">04</span><span style=\\"color:#ABB2BF\\">.4_Server/  </span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">[root@pxe OS_dir]</span><span style=\\"color:#7F848E;font-style:italic\\"># cat ubuntu16.04.4_Desktop/</span><span style=\\"color:#7F848E;font-style:italic\\" class=\\"highlighted-word\\">ks</span><span style=\\"color:#7F848E;font-style:italic\\">/preseed_Desktop.cfg </span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">d-i preseed/early_command string kill-all-dhcp</span></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\"># Locale sets language and country. </span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">d-i debian-installer/language string en</span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">d-i debian-installer/country string </span><span style=\\"color:#D19A66\\">US</span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">d-i debian-installer/locale string en_US</span></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\">#d-i debian-installer/locale string zh_CN</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\"># Keyboard selection. </span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">d-i console-setup/ask_detect boolean false </span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">d-i console-setup/layoutcode string us </span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\"># Network configuration. #注，在netboot模式下，网络设置不起作用，需要在dhcp中设定用户名密码，</span></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\">#d-i netcfg/choose_interface select eth0 </span></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\">#d-i netcfg/dhcp_timeout string 60 </span></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\">#d-i netcfg/get_hostname string libvert </span></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\">#d-i netcfg/get_domain string libvert </span></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\">#d-i netcfg/no_default_route boolean true </span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\"># Clock and time zone setup </span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">d-i clock-setup/utc boolean false </span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">d-i time/zone string Asia/Shanghai </span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\"># Mirror settings  #安装文件镜像设置，使用http协议</span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">d-i mirror/protocol string http </span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">d-i mirror/country string </span><span style=\\"color:#D19A66\\">CN</span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">d-i mirror/http/hostname string </span><span style=\\"color:#D19A66\\">10.0.1.1</span><span style=\\"color:#ABB2BF\\">  </span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">d-i mirror/http/directory string /ubuntu16.</span><span style=\\"color:#D19A66\\">04</span><span style=\\"color:#ABB2BF\\">.4_Desktop/isocontent  </span><span style=\\"color:#7F848E;font-style:italic\\"># 镜像路径 http://10.0.1.1/ubuntu16.04_LTS</span></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\">#d-i mirror/http/proxy string </span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\"># Partitioning ###自动LVM分区</span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">d-i partman-auto/disk string /dev/sda</span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">d-i partman-auto/choose_recipe select atomic</span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">d-i partman-auto/method string lvm</span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">d-i partman-auto-lvm/guided_size string </span><span style=\\"color:#D19A66\\">100</span><span style=\\"color:#ABB2BF\\">%</span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">d-i partman-lvm/confirm boolean true</span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">d-i partman-lvm/confirm_nooverwrite boolean true</span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">d-i partman-lvm/device_remove_lvm boolean true</span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">d-i partman-md/device_remove_md boolean true</span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">d-i partman-partitioning/confirm_write_new_label boolean true</span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">d-i partman/choose_partition select finish</span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">d-i partman/confirm boolean true</span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">d-i partman/confirm_nooverwrite boolean true</span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">d-i partman/default_filesystem string ext4</span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">d-i partman/mount_style select uuid</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\"># Base system installation </span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">d-i base-installer/kernel/image string linux-generic </span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\"># Account setup </span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">d-i user-setup/encrypt-home boolean false </span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">d-i user-setup/allow-password-weak boolean true</span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">d-i passwd/root-login boolean true </span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">d-i passwd/root-password password netentsec </span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">d-i passwd/root-password-again password netentsec</span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">d-i passwd/make-user boolean true </span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">d-i passwd/user-fullname string user</span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">d-i passwd/username string user</span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">d-i passwd/user-password password user</span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">d-i passwd/user-password-again password user</span></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\"># The user account will be added to some standard initial groups. To</span></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\"># override that, use this.</span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">d-i passwd/user-default-groups string audio cdrom video</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\">### Account setup</span></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\"># Skip creation of a root account (normal user account will be able to</span></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\"># use sudo). The default is false; preseed this to true if you want to set</span></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\"># a root password.</span></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\">#d-i passwd/root-login boolean false</span></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\"># Alternatively, to skip creation of a normal user account.</span></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\">#d-i passwd/make-user boolean false</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\"># Root password, either in clear text</span></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\">#d-i passwd/root-password password r00tme</span></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\">#d-i passwd/root-password-again password r00tme</span></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\"># or encrypted using a crypt(3)  hash.</span></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\">#d-i passwd/root-password-crypted password [crypt(3) hash]</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\"># To create a normal user account.</span></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\">#d-i passwd/user-fullname string DeepctrlUser</span></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\">#d-i passwd/username string deepctrl</span></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\"># Normal user's password, either in clear text</span></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\">#d-i passwd/user-password password deepctrl</span></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\">#d-i passwd/user-password-again password deepctrl</span></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\"># or encrypted using a crypt(3) hash.</span></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\">#d-i passwd/user-password-crypted password [crypt(3) hash]</span></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\"># Create the first user with the specified UID instead of the default.</span></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\">#d-i passwd/user-uid string 1010</span></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\"># The installer will warn about weak passwords. If you are sure you know</span></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\"># what you're doing and want to override it, uncomment this.</span></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\">#d-i user-setup/allow-password-weak boolean true</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\"># The user account will be added to some standard initial groups. To</span></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\"># override that, use this.</span></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\">#d-i passwd/user-default-groups string audio cdrom video</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\"># Set to true if you want to encrypt the first user's home directory.</span></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\">#d-i user-setup/encrypt-home boolean false</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\"># Package selection </span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">tas</span><span style=\\"color:#ABB2BF\\" class=\\"highlighted-word\\">ks</span><span style=\\"color:#ABB2BF\\">el tas</span><span style=\\"color:#ABB2BF\\" class=\\"highlighted-word\\">ks</span><span style=\\"color:#ABB2BF\\">el/first multiselect standard, ubuntu-desktop</span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">d-i pkgsel/include string openssh-server </span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">d-i pkgsel/upgrade select none </span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">d-i pkgsel/language-pac</span><span style=\\"color:#ABB2BF\\" class=\\"highlighted-word\\">ks</span><span style=\\"color:#ABB2BF\\"> multiselect en, zh </span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">d-i pkgsel/update-policy select none </span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\"># Boot loader installation </span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">d-i grub-installer/only_debian boolean true </span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\"># Finishing up the installation </span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">d-i finish-install/reboot_in_progress note </span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\">#d-i live-installer/net-image string http://192.168.1.101/ubuntu/install/filesystem.squashfs</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"color:#7F848E;font-style:italic\\"># install vmware tools</span></span>\\n<span class=\\"line\\"><span style=\\"color:#ABB2BF\\">d-i preseed/late_command string /usr/bin/wget http:</span><span style=\\"color:#7F848E;font-style:italic\\">//10.0.1.1/VMTools_for_ESXi6.7/vmtools_install_ubuntu.sh &#x26;&#x26; sh vmtools_install_ubuntu.sh &#x26;&#x26; rm -rf vmtools_install_ubuntu.sh</span></span></code></pre>\\n<div class=\\"collapsed-lines\\"></div></div>\\n</div>"}`),a={name:`2024-08-23-基于CentOS7的PXE服务器安装Ubuntu的ks文件.md`};function o(r,i,a,o,s,c){return n(),t(`div`,null,[...i[0]||=[e(`<div class="hint-container important"><p class="hint-container-title">重要</p><p>本文还需要进一步核实更新。</p></div><h2 id="安装-ubuntu-16-04-4-desktop-lts-的-ks-文件-仅供参考" tabindex="-1"><a class="header-anchor" href="#安装-ubuntu-16-04-4-desktop-lts-的-ks-文件-仅供参考"><span>安装 Ubuntu 16.04.4 Desktop LTS 的 ks 文件（仅供参考）</span></a></h2><div class="code-block-with-title"><div class="code-block-title-bar" data-title="ubuntu16.04.4_Desktop/ks/preseed_Desktop.cfg"><span>ubuntu16.04.4_Desktop/ks/preseed_Desktop.cfg</span></div><div class="language-ssh-config has-collapsed-lines collapsed" data-highlighter="shiki" data-ext="ssh-config" style="--vp-collapsed-lines:15;background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-ssh-config"><span class="line"><span style="color:#ABB2BF;">[root@pxe OS_dir]</span><span style="color:#7F848E;font-style:italic;"># pwd</span></span>
<span class="line"><span style="color:#ABB2BF;">/data/OS_dir</span></span>
<span class="line"><span style="color:#ABB2BF;">[root@pxe OS_dir]</span><span style="color:#7F848E;font-style:italic;"># cat ubuntu16.04.4_</span></span>
<span class="line"><span style="color:#ABB2BF;">ubuntu16.</span><span style="color:#D19A66;">04</span><span style="color:#ABB2BF;">.4_Desktop/ ubuntu16.</span><span style="color:#D19A66;">04</span><span style="color:#ABB2BF;">.4_Server/  </span></span>
<span class="line"><span style="color:#ABB2BF;">[root@pxe OS_dir]</span><span style="color:#7F848E;font-style:italic;"># cat ubuntu16.04.4_Desktop/</span><span style="color:#7F848E;font-style:italic;" class="highlighted-word">ks</span><span style="color:#7F848E;font-style:italic;">/preseed_Desktop.cfg </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i preseed/early_command string kill-all-dhcp</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Locale sets language and country. </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i debian-installer/language string en</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i debian-installer/country string </span><span style="color:#D19A66;">US</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i debian-installer/locale string en_US</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i debian-installer/locale string zh_CN</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Keyboard selection. </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i console-setup/ask_detect boolean false </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i console-setup/layoutcode string us </span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Network configuration. #注，在netboot模式下，网络设置不起作用，需要在dhcp中设定用户名密码，</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i netcfg/choose_interface select eth0 </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i netcfg/dhcp_timeout string 60 </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i netcfg/get_hostname string libvert </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i netcfg/get_domain string libvert </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i netcfg/no_default_route boolean true </span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Clock and time zone setup </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i clock-setup/utc boolean false </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i time/zone string Asia/Shanghai </span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Mirror settings  #安装文件镜像设置，使用http协议</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i mirror/protocol string http </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i mirror/country string </span><span style="color:#D19A66;">CN</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i mirror/http/hostname string </span><span style="color:#D19A66;">10.0.1.1</span><span style="color:#ABB2BF;">  </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i mirror/http/directory string /ubuntu16.</span><span style="color:#D19A66;">04</span><span style="color:#ABB2BF;">.4_Desktop/isocontent  </span><span style="color:#7F848E;font-style:italic;"># 镜像路径 http://10.0.1.1/ubuntu16.04_LTS</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i mirror/http/proxy string </span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Partitioning ###自动LVM分区</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i partman-auto/disk string /dev/sda</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i partman-auto/choose_recipe select atomic</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i partman-auto/method string lvm</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i partman-auto-lvm/guided_size string </span><span style="color:#D19A66;">100</span><span style="color:#ABB2BF;">%</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i partman-lvm/confirm boolean true</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i partman-lvm/confirm_nooverwrite boolean true</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i partman-lvm/device_remove_lvm boolean true</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i partman-md/device_remove_md boolean true</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i partman-partitioning/confirm_write_new_label boolean true</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i partman/choose_partition select finish</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i partman/confirm boolean true</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i partman/confirm_nooverwrite boolean true</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i partman/default_filesystem string ext4</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i partman/mount_style select uuid</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Base system installation </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i base-installer/kernel/image string linux-generic </span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Account setup </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i user-setup/encrypt-home boolean false </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i user-setup/allow-password-weak boolean true</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i passwd/root-login boolean true </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i passwd/root-password password netentsec </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i passwd/root-password-again password netentsec</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i passwd/make-user boolean true </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i passwd/user-fullname string user</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i passwd/username string user</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i passwd/user-password password user</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i passwd/user-password-again password user</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># The user account will be added to some standard initial groups. To</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># override that, use this.</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i passwd/user-default-groups string audio cdrom video</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">### Account setup</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Skip creation of a root account (normal user account will be able to</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># use sudo). The default is false; preseed this to true if you want to set</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># a root password.</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i passwd/root-login boolean false</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Alternatively, to skip creation of a normal user account.</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i passwd/make-user boolean false</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Root password, either in clear text</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i passwd/root-password password r00tme</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i passwd/root-password-again password r00tme</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># or encrypted using a crypt(3)  hash.</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i passwd/root-password-crypted password [crypt(3) hash]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># To create a normal user account.</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i passwd/user-fullname string DeepctrlUser</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i passwd/username string deepctrl</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Normal user&#39;s password, either in clear text</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i passwd/user-password password deepctrl</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i passwd/user-password-again password deepctrl</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># or encrypted using a crypt(3) hash.</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i passwd/user-password-crypted password [crypt(3) hash]</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Create the first user with the specified UID instead of the default.</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i passwd/user-uid string 1010</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># The installer will warn about weak passwords. If you are sure you know</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># what you&#39;re doing and want to override it, uncomment this.</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i user-setup/allow-password-weak boolean true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># The user account will be added to some standard initial groups. To</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># override that, use this.</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i passwd/user-default-groups string audio cdrom video</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Set to true if you want to encrypt the first user&#39;s home directory.</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i user-setup/encrypt-home boolean false</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Package selection </span></span>
<span class="line"><span style="color:#ABB2BF;">tas</span><span style="color:#ABB2BF;" class="highlighted-word">ks</span><span style="color:#ABB2BF;">el tas</span><span style="color:#ABB2BF;" class="highlighted-word">ks</span><span style="color:#ABB2BF;">el/first multiselect standard, ubuntu-desktop</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i pkgsel/include string openssh-server </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i pkgsel/upgrade select none </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i pkgsel/language-pac</span><span style="color:#ABB2BF;" class="highlighted-word">ks</span><span style="color:#ABB2BF;"> multiselect en, zh </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i pkgsel/update-policy select none </span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Boot loader installation </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i grub-installer/only_debian boolean true </span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Finishing up the installation </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i finish-install/reboot_in_progress note </span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i live-installer/net-image string http://192.168.1.101/ubuntu/install/filesystem.squashfs</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># install vmware tools</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i preseed/late_command string /usr/bin/wget http:</span><span style="color:#7F848E;font-style:italic;">//10.0.1.1/VMTools_for_ESXi6.7/vmtools_install_ubuntu.sh &amp;&amp; sh vmtools_install_ubuntu.sh &amp;&amp; rm -rf vmtools_install_ubuntu.sh</span></span></code></pre><div class="collapsed-lines"></div></div></div><h2 id="安装-ubuntu-16-04-4-server-lts-的-ks-文件-仅供参考" tabindex="-1"><a class="header-anchor" href="#安装-ubuntu-16-04-4-server-lts-的-ks-文件-仅供参考"><span>安装 Ubuntu 16.04.4 Server LTS 的 ks 文件（仅供参考）</span></a></h2><div class="code-block-with-title"><div class="code-block-title-bar" data-title="ubuntu16.04.4_Desktop/ks/preseed_Desktop.cfg"><span>ubuntu16.04.4_Desktop/ks/preseed_Desktop.cfg</span></div><div class="language-ssh-config has-collapsed-lines collapsed" data-highlighter="shiki" data-ext="ssh-config" style="--vp-collapsed-lines:15;background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-ssh-config"><span class="line"><span style="color:#ABB2BF;">[root@pxe OS_dir]</span><span style="color:#7F848E;font-style:italic;"># cat ubuntu16.04.4_Server/</span></span>
<span class="line"><span style="color:#ABB2BF;">isocontent/ </span><span style="color:#ABB2BF;" class="highlighted-word">ks</span><span style="color:#ABB2BF;">/         </span></span>
<span class="line"><span style="color:#ABB2BF;">[root@pxe OS_dir]</span><span style="color:#7F848E;font-style:italic;"># cat ubuntu16.04.4_Server/</span><span style="color:#7F848E;font-style:italic;" class="highlighted-word">ks</span><span style="color:#7F848E;font-style:italic;">/preseed_Server.cfg </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i preseed/early_command string kill-all-dhcp</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Locale sets language and country. </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i debian-installer/language string en</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i debian-installer/country string </span><span style="color:#D19A66;">US</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i debian-installer/locale string en_US</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i debian-installer/locale string zh_CN</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Keyboard selection. </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i console-setup/ask_detect boolean false </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i console-setup/layoutcode string us </span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Network configuration. #注，在netboot模式下，网络设置不起作用，需要在dhcp中设定用户名密码，</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i netcfg/choose_interface select eth0 </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i netcfg/dhcp_timeout string 60 </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i netcfg/get_hostname string libvert </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i netcfg/get_domain string libvert </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i netcfg/no_default_route boolean true </span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Clock and time zone setup </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i clock-setup/utc boolean false </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i time/zone string Asia/Shanghai </span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Mirror settings  #安装文件镜像设置，使用http协议</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i mirror/protocol string http </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i mirror/country string </span><span style="color:#D19A66;">CN</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i mirror/http/hostname string </span><span style="color:#D19A66;">10.0.1.1</span><span style="color:#ABB2BF;">  </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i mirror/http/directory string /ubuntu16.</span><span style="color:#D19A66;">04</span><span style="color:#ABB2BF;">.4_Server/isocontent  </span><span style="color:#7F848E;font-style:italic;"># 镜像路径 http://10.0.1.1/ubuntu16.04_LTS</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i mirror/http/proxy string </span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Partitioning ###自动LVM分区</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i partman-auto/disk string /dev/sda</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i partman-auto/choose_recipe select atomic</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i partman-auto/method string lvm</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i partman-auto-lvm/guided_size string </span><span style="color:#D19A66;">100</span><span style="color:#ABB2BF;">%</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i partman-lvm/confirm boolean true</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i partman-lvm/confirm_nooverwrite boolean true</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i partman-lvm/device_remove_lvm boolean true</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i partman-md/device_remove_md boolean true</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i partman-partitioning/confirm_write_new_label boolean true</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i partman/choose_partition select finish</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i partman/confirm boolean true</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i partman/confirm_nooverwrite boolean true</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i partman/default_filesystem string ext4</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i partman/mount_style select uuid</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Base system installation </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i base-installer/kernel/image string linux-generic </span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Account setup </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i user-setup/encrypt-home boolean false </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i user-setup/allow-password-weak boolean true</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i passwd/root-login boolean true </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i passwd/root-password password netentsec </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i passwd/root-password-again password netentsec</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i passwd/make-user boolean true </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i passwd/user-fullname string user</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i passwd/username string user</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i passwd/user-password password user</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i passwd/user-password-again password user</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># The user account will be added to some standard initial groups. To</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># override that, use this.</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i passwd/user-default-groups string audio cdrom video</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">### Account setup</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Skip creation of a root account (normal user account will be able to</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># use sudo). The default is false; preseed this to true if you want to set</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># a root password.</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i passwd/root-login boolean false</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Alternatively, to skip creation of a normal user account.</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i passwd/make-user boolean false</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Root password, either in clear text</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i passwd/root-password password r00tme</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i passwd/root-password-again password r00tme</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># or encrypted using a crypt(3)  hash.</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i passwd/root-password-crypted password [crypt(3) hash]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># To create a normal user account.</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i passwd/user-fullname string DeepctrlUser</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i passwd/username string deepctrl</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Normal user&#39;s password, either in clear text</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i passwd/user-password password deepctrl</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i passwd/user-password-again password deepctrl</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># or encrypted using a crypt(3) hash.</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i passwd/user-password-crypted password [crypt(3) hash]</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Create the first user with the specified UID instead of the default.</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i passwd/user-uid string 1010</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># The installer will warn about weak passwords. If you are sure you know</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># what you&#39;re doing and want to override it, uncomment this.</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i user-setup/allow-password-weak boolean true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># The user account will be added to some standard initial groups. To</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># override that, use this.</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i passwd/user-default-groups string audio cdrom video</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Set to true if you want to encrypt the first user&#39;s home directory.</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i user-setup/encrypt-home boolean false</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Package selection </span></span>
<span class="line"><span style="color:#ABB2BF;">tas</span><span style="color:#ABB2BF;" class="highlighted-word">ks</span><span style="color:#ABB2BF;">el tas</span><span style="color:#ABB2BF;" class="highlighted-word">ks</span><span style="color:#ABB2BF;">el/force-tas</span><span style="color:#ABB2BF;" class="highlighted-word">ks</span><span style="color:#ABB2BF;">     string server</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># No language support packages.</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i pkgsel/install-language-support     boolean false</span></span>
<span class="line"><span style="color:#ABB2BF;">d-i pkgsel/include string openssh-server </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i pkgsel/upgrade select none </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i pkgsel/language-pac</span><span style="color:#ABB2BF;" class="highlighted-word">ks</span><span style="color:#ABB2BF;"> multiselect en, zh </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i pkgsel/update-policy select none </span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Boot loader installation </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i grub-installer/only_debian boolean true </span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Finishing up the installation </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i finish-install/reboot_in_progress note </span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i live-installer/net-image string http://192.168.1.101/ubuntu/install/filesystem.squashfs</span></span></code></pre><div class="collapsed-lines"></div></div></div><h2 id="网络安装-ubuntu-20-04-desktop-的-ks-文件-仅供参考" tabindex="-1"><a class="header-anchor" href="#网络安装-ubuntu-20-04-desktop-的-ks-文件-仅供参考"><span>网络安装 Ubuntu 20.04 Desktop 的 ks 文件（仅供参考）</span></a></h2><div class="code-block-with-title"><div class="code-block-title-bar" data-title="ubuntu20.04_Desktop/ks/preseed_Desktop.cfg"><span>ubuntu20.04_Desktop/ks/preseed_Desktop.cfg</span></div><div class="language-ssh-config has-collapsed-lines collapsed" data-highlighter="shiki" data-ext="ssh-config" style="--vp-collapsed-lines:15;background-color:#282c34;color:#abb2bf;"><pre class="shiki one-dark-pro vp-code"><code class="language-ssh-config"><span class="line"><span style="color:#ABB2BF;">[root@pxe OS_dir]</span><span style="color:#7F848E;font-style:italic;"># pwd </span></span>
<span class="line"><span style="color:#ABB2BF;">/data/OS_dir </span></span>
<span class="line"><span style="color:#ABB2BF;">[root@pxe OS_dir]</span><span style="color:#7F848E;font-style:italic;"># cat ubuntu20.04_Desktop/</span><span style="color:#7F848E;font-style:italic;" class="highlighted-word">ks</span><span style="color:#7F848E;font-style:italic;">/preseed_Desktop.cfg </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i preseed/early_command string kill-all-dhcp </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Locale sets language and country. </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i debian-installer/language string en </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i debian-installer/country string </span><span style="color:#D19A66;">US</span><span style="color:#ABB2BF;"> </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i debian-installer/locale string en_US </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i debian-installer/locale string zh_CN </span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Keyboard selection. </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i console-setup/ask_detect boolean false </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i console-setup/layoutcode string us </span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Network configuration. #注，在netboot模式下，网络设置不起作用，需要在dhcp中设定用户名密码， </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i netcfg/choose_interface select eth0 </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i netcfg/dhcp_timeout string 60 </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i netcfg/get_hostname string libvert </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i netcfg/get_domain string libvert </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i netcfg/no_default_route boolean true </span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Clock and time zone setup </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i clock-setup/utc boolean false </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i time/zone string Asia/Shanghai </span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Mirror settings #安装文件镜像设置，使用http协议 </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i mirror/protocol string http </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i mirror/country string </span><span style="color:#D19A66;">CN</span><span style="color:#ABB2BF;"> </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i mirror/http/hostname string </span><span style="color:#D19A66;">10.0.1.1</span><span style="color:#ABB2BF;"> </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i mirror/http/directory string /ubuntu20.04_Desktop/isocontent </span><span style="color:#7F848E;font-style:italic;"># 镜像路径 http://10.0.1.1/ubuntu16.04_LTS </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i mirror/http/proxy string </span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Partitioning ###自动LVM分区 </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i partman-auto/disk string /dev/sda </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i partman-auto/choose_recipe select atomic </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i partman-auto/method string lvm </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i partman-auto-lvm/guided_size string </span><span style="color:#D19A66;">100</span><span style="color:#ABB2BF;">% </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i partman-lvm/confirm boolean true </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i partman-lvm/confirm_nooverwrite boolean true </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i partman-lvm/device_remove_lvm boolean true </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i partman-md/device_remove_md boolean true </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i partman-partitioning/confirm_write_new_label boolean true </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i partman/choose_partition select finish </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i partman/confirm boolean true </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i partman/confirm_nooverwrite boolean true </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i partman/default_filesystem string ext4 </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i partman/mount_style select uuid </span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Base system installation </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i base-installer/kernel/image string linux-generic </span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Account setup </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i user-setup/encrypt-home boolean false </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i user-setup/allow-password-weak boolean true </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i passwd/root-login boolean true </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i passwd/root-password password netentsec </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i passwd/root-password-again password netentsec </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i passwd/make-user boolean true </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i passwd/user-fullname string user </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i passwd/username string user </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i passwd/user-password password user </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i passwd/user-password-again password user </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># The user account will be added to some standard initial groups. To </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># override that, use this. </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i passwd/user-default-groups string audio cdrom video </span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">### Account setup </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Skip creation of a root account (normal user account will be able to </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># use sudo). The default is false; preseed this to true if you want to set </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># a root password. </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i passwd/root-login boolean false </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Alternatively, to skip creation of a normal user account. </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i passwd/make-user boolean false </span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Root password, either in clear text </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i passwd/root-password password r00tme </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i passwd/root-password-again password r00tme </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># or encrypted using a crypt(3) hash. </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i passwd/root-password-crypted password [crypt(3) hash] </span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># To create a normal user account. </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i passwd/user-fullname string DeepctrlUser </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i passwd/username string deepctrl </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Normal user&#39;s password, either in clear text </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i passwd/user-password password deepctrl </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i passwd/user-password-again password deepctrl </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># or encrypted using a crypt(3) hash. </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i passwd/user-password-crypted password [crypt(3) hash] </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Create the first user with the specified UID instead of the default. </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i passwd/user-uid string 1010 </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># The installer will warn about weak passwords. If you are sure you know </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># what you&#39;re doing and want to override it, uncomment this. </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i user-setup/allow-password-weak boolean true </span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># The user account will be added to some standard initial groups. To </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># override that, use this. </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i passwd/user-default-groups string audio cdrom video </span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Set to true if you want to encrypt the first user&#39;s home directory. </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i user-setup/encrypt-home boolean false </span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Package selection </span></span>
<span class="line"><span style="color:#ABB2BF;">tas</span><span style="color:#ABB2BF;" class="highlighted-word">ks</span><span style="color:#ABB2BF;">el tas</span><span style="color:#ABB2BF;" class="highlighted-word">ks</span><span style="color:#ABB2BF;">el/first multiselect standard, ubuntu-desktop </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i pkgsel/include string openssh-server </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i pkgsel/upgrade select none </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i pkgsel/language-pac</span><span style="color:#ABB2BF;" class="highlighted-word">ks</span><span style="color:#ABB2BF;"> multiselect en, zh </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i pkgsel/update-policy select none </span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Boot loader installation </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i grub-installer/only_debian boolean true </span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># Finishing up the installation </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i finish-install/reboot_in_progress note </span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">#d-i live-installer/net-image string http://192.168.1.101/ubuntu/install/filesystem.squashfs </span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># install vmware tools </span></span>
<span class="line"><span style="color:#ABB2BF;">d-i preseed/late_command string /usr/bin/wget http:</span><span style="color:#7F848E;font-style:italic;">//10.0.1.1/VMTools_for_ESXi6.7/vmtools_install_ubuntu.sh &amp;&amp; sh vmtools_install_ubuntu.sh &amp;&amp; rm -rf vmtools_install_ubuntu.sh</span></span></code></pre><div class="collapsed-lines"></div></div></div>`,7)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};