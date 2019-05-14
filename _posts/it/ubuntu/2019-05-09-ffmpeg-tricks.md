---
slug:       "ffmpeg-tricks"
title:      ffmpeg tricks
excerpt:    useful commandamd line commands for manipulating video files 
tags:
  - ttt-video-manipulation
  - ttt-linux
  - ttt-ubuntu
---

### Joining multiple videos without re-encoding

The files have to be of same resolution and bitrate. A list of all videos is created and the new text file is saved in 
the same directory where the files are, for example:

    file 'input-1.mp4'
    file 'input-2.mp4'
    file 'input-3.mp4'

The following command is run in the same directory:

    ffmpeg -f concat -i files.txt -c copy output.mp4
    
### Cutting videos without re-encoding

method 1:

    ffmpeg -ss <start> -i in1.mp4 -t <duration> -c copy out1.mp4 
    
method 2:

    ffmpeg -ss <start> -i in1.mp4 -t <duration> out1.mp4

* <start> – the beginning of the part of a video ffmpeg is to cut out. Format: 00:00:00.0000, meaning hours:minutes:seconds:milliseconds.
* <duration> – the duration of the part of a video ffmpeg is to cut out. Same format as above.

Examples:

    ffmpeg -ss 01:19:00 -i in1.avi -t 00:05:00 -c copy out1.avi
    ffmpeg -ss 01:19:00 -i in1.avi -t 00:05:00 out1.avi