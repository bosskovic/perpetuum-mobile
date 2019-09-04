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

### Video stabilization

**Stabilize plugin**

Extracts relative transformations of subsequent frames (used for stabilization together with the transform filter in a second pass)
Generates a file with relative transform information (translation, rotation) about subsequent frames.

Options:  
* 'result'      path to the file used to write the transforms (def:inputfile.stab)
* 'shakiness'   how shaky is the video and how quick is the camera? 1: little (fast) 10: very strong/quick (slow) (def: 4)
* 'accuracy'    accuracy of detection process (>=shakiness) 1: low (fast) 15: high (slow) (def: 4)
* 'stepsize'    stepsize of search process, region around minimum is scanned with 1 pixel resolution (def: 6)
* 'algo'        0: brute force (translation only); 1: small measurement fields (def)
* 'mincontrast' below this contrast a field is discarded (0-1) (def: 0.3)
* 'tripod'      virtual tripod mode (if >0): motion is compared to a reference frame (frame # is the value) (def: 0) <--- NEW
* 'show'        0: draw nothing (def); 1,2: show fields and transforms in the resulting frames. Consider the 'preview' filter
* 'help'        print this help message
    

**Transform plugin**

Transforms each frame according to transformations given in an input file (e.g. translation, rotate).
Reads a file with transform information for each frame and applies them.

Options  
* 'input'     path to the file used to read the transforms (def: inputfile.stab)
* 'smoothing' number of frames*2 + 1 used for lowpass filtering used for stabilizing (def: 10)
* 'maxshift'  maximal number of pixels to translate image (def: -1 no limit)
* 'maxangle'  maximal angle in rad to rotate image (def: -1 no limit)
* 'crop'      0: keep border (def), 1: black background
* 'invert'    1: invert transforms(def: 0)
* 'relative'  consider transforms as 0: absolute, 1: relative (def)
* 'zoom'      percentage to zoom >0: zoom in, <0 zoom out (def: 0)
* 'optzoom'   0: nothing, 1: determine optimal zoom (def) i.e. no (or only little) border should be visible. Note that the value given at 'zoom' is added to the here calculated one
* 'interpol'  type of interpolation: 0: no interpolation, 1: linear (horizontal) (def), 2: bi-linear 3: quadratic
* 'sharpen'   amount of sharpening: 0: no sharpening (def: 0.8) uses filter unsharp with 5x5 matrix
* 'tripod'    virtual tripod mode (=relative=0:smoothing=0) <--- NEW
* 'help'      print this help message
    
**Example:**

    ./ffmpeg/ffmpeg -i DSCN1274.MP4 -vf vidstabdetect=stepsize=32:shakiness=10:accuracy=10:result=transform_vectors.trf -f null -
    ./ffmpeg/ffmpeg -i DSCN1274.MP4 -vf vidstabtransform=input="transform_vectors.trf":zoom=1:smoothing=30,unsharp=5:5:0.8:3:3:0.4 -vcodec libx264 -preset slow -tune film -crf 18 -acodec copy "stabilized.mp4"

**Example with no zoom and no crop:**

    ./ffmpeg/ffmpeg -i DSCN1274.MP4 -vf vidstabtransform=input="transform_vectors.trf":optzoom=1:crop=0:smoothing=30,unsharp=5:5:0.8:3:3:0.4 -vcodec libx264 -preset slow -tune film -crf 18 -acodec copy "stabilized.mp4"

**Example transforming and stabilizing only a section:**

    ./ffmpeg/ffmpeg -ss 00:00:31 -i DSCN1999.MP4 -t 00:00:05 -vf vidstabdetect=stepsize=32:shakiness=10:accuracy=10:result=transform_vectors.trf -f null -
    ./ffmpeg/ffmpeg -ss 00:00:31 -i DSCN1999.MP4 -t 00:00:05 -vf vidstabtransform=input="transform_vectors.trf":zoom=1:smoothing=30,unsharp=5:5:0.8:3:3:0.4 -vcodec libx264 -preset slow -tune film -crf 18 -acodec copy "stabilized.mp4"

**Example of a script that transforms and stabilizes all MP4 files in the current directory:**

    for vid in *.MP4 
    do
    ./ffmpeg/ffmpeg -i $vid -vf vidstabdetect=stepsize=32:shakiness=10:accuracy=10:result=$vid.trf -f null -
    ./ffmpeg/ffmpeg -i $vid -vf vidstabtransform=$vid.trf:zoom=0:smoothing=10,unsharp=5:5:0.8:3:3:0.4 -vcodec libx264 -tune film -acodec copy -preset slow $vid-stabilized.mp4
    done
    
    
**Resources**:

- <a href="https://www.johnvansickle.com/ffmpeg/">FFmpeg Static Builds</a>
- <a href="http://public.hronopik.de/vid.stab/features.php?lang=en">vid.stab - Features</a>

    