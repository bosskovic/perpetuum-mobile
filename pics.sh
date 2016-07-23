#!/bin/bash


# note: if this is set to -gt 0 the /etc/hosts part is not recognized ( may be a bug )
while [[ $# -gt 1 ]]
do
key="$1"

case $key in
    -c|--category)
    CATEGORY="$2"
    shift # past argument
    ;;
    -s|--slug)
    SLUG="$2"
    shift # past argument
    ;;
    *)
            # unknown option
    ;;
esac
shift # past argument or value
done

if [[ -n $1 ]]; then
    echo "Last line of file specified as non-opt/last argument:"
    tail -1 $1
fi

POST_DIR="./$CATEGORY/$SLUG"
IMG_SRC_DIR="$POST_DIR/img_src"
IMG_DIR="$POST_DIR/img"
THUMBS_DIR="$POST_DIR/thumbs"

if [ -z "$CATEGORY" ]; then
  echo "category is missing; correct syntax:"
  echo "thumbs.sh -c 2007-cg-biciklom -s vranes"
  exit 1
elif [ -z "$SLUG" ]; then
  echo "slug is missing; correct syntax:"
  echo "thumbs.sh -c 2007-cg-biciklom -s vranes"
  exit 1
elif [ ! -d $IMG_SRC_DIR ]; then
  echo "directory $POST_DIR/img_src not found; correct syntax:"
  echo "thumbs.sh -c 2007-cg-biciklom -s vranes"
  exit 1
fi;


if [ ! -d $IMG_DIR ]; then mkdir $IMG_DIR; fi;
if [ ! -d $THUMBS_DIR ]; then mkdir $THUMBS_DIR; fi;

cd $IMG_SRC_DIR
# creates the screen image
for f in *.jpg;
do
    echo "Processing $f"
    convert $f -strip -resize "1900x1900>" -quality 85 ../img/$f
    convert $f -strip -resize "800x800>" -quality 85 ../thumbs/$f
done