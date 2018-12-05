---
layout:     tech_post
categories: ['tech']
slug:       "how-to-quickly-digitalize-a-book-from-command-line"
title:      How to quickly digitalize a book from command line
excerpt:    Creating a PDF from a batch of images 
date:       2014-09-05
tags:
  - ttt-image-manipulation
  - ttt-linux
  - ttt-ubuntu
animation:
  url: /assets/img/animated/tech.gif
  width: 250
  height: 176  
---

If you have a printed book that you want quickly turned into an e-book, you can follow these steps:

#### 1. photograph the book, two pages at a time

Take a camera, go to a bright enough place and take a snapshots of your book, two pages at a time. You can also scan them with a scanner, which will produce a better quality, but photographing may be several times quicker.

#### 2. copy the images from the memory card to a temporary directory

#### 3. check the image orientation

Manually check if the rotation of each image is horizontal (pages oriented left-right as opposed to top-bottom). Fix where needed.

#### 4. install imagemagick

<pre>sudo apt-get install imagemagick</pre>

#### 5. split the images

<pre>convert "*.JPG" -crop 50%x100% +repage "page_%d.JPG"</pre>

to split images with sharpening and normalizing (enhancing the contrast) at the same time:

<pre>convert "*.JPG" -normalize -unsharp 0x1 -crop 50%x100% +repage "page_%03d.JPG"</pre>

%03d part says that the counter will always be three digits long with trailing zeros for those smaller than 100. This is important for the proper page order when creating a pdf. If you have more than 999 pages, just increase the number of digits.

#### 6. create a PDF out of the resulting files

Investigate the created page_xxx.JPG files, and fix the order if needed. For example, if you took a snapshot of the cover, rename the page_000.JPG to page_xyz.JPG, where xyz is a number larger than the number in the filename of the last page.

<pre>convert page_*.JPG book.pdf</pre>

#### 7. clean up

Check the result and remove any unwanted files (like original images and "page" image files).
