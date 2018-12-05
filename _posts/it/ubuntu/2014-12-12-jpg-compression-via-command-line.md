---
layout:     tech_post
categories: ['tech']
slug:       "jpg-compression-via-command-line"
title:      JPG compression (command line) with jpegoptim
excerpt:    notes
date:       2014-12-12
tags:
  - ttt-image-manipulation
  - ttt-linux
  - ttt-ubuntu
animation:
  url: /assets/img/animated/tech.gif
  width: 250
  height: 176  
---

Installation:

    $ sudo apt-get install jpegoptim
  
Optimizing a single file:

    $ jpegoptim file.jpeg
    $ jpegoptim [options] file.jpeg

Optimizing files in a batch:

    $ for i in one.jpeg two.jpeg foo.jpeg; do jpegoptim "$i"; done
    $ for i in *.jpg; do jpegoptim -m95 "$i"; done


#### Resources

* [Linux: Jpeg Image Optimization / Compress Command](http://www.cyberciti.biz/faq/linux-jpegoptim-jpeg-jfif-image-optimize-compress-tool/)