---
layout:     tech_post
categories: ['tech']
slug:       "setting-up-ssd-for-faster-use-and-longer-life-with-ubuntu-14-04"
title:      Setting up SSD for faster use and longer life with Ubuntu 14.04
excerpt:    instructions
date:       2014-08-04
tags:
  - ttt-linux
  - ttt-ubuntu
animation:
  url: /assets/img/tech.gif
  width: 250
  height: 176  
---

- AHCI sata operation in BIOS
- 10% of SSD unallocated
- noatime in /etc/fstab
- TRIM command to /etc/rc.local (fstrim -v /)
- disable weekly cron job for trim: sudo mv -v /etc/cron.weekly/fstrim /fstrim
- change swapiness in /etc/sysctl.conf :

<pre>#
# Sharply reduce swap inclination
vm.swappiness=1
# Improve cache management
vm.vfs_cache_pressure=50</pre>

- limit the write actions of Firefox:

overrirde cache management and set to 0

If you have <a href="https://sites.google.com/site/easylinuxtipsproject/java">installed Oracle Java</a>, limit the write actions of the Java plugin:

launch the Java Control Panel - Tab General:

Temporary Internet Files - Settings...

Remove the tick for: Keep temporary files on my computer.

- limit the write actions of Chrome and Chromium:

open settings in developer console and disable cache

- prevent fragmentation, and DO NOT defrag )preserver 20% free space on each partition)

Monitoring the ssd wearout: sudo smartctl -data -A /dev/sda

**Resources**:

- <a href="https://sites.google.com/site/easylinuxtipsproject/ssd">https://sites.google.com/site/easylinuxtipsproject/ssd</a>

