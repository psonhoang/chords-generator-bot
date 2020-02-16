#!/bin/sh

WAVURL=$1
#MIDINAME=$2
SECRET="n0gloff@UCHI6"
SSHPROMPT="assword:"

echo $WAVURL
curl -X GET $WAVURL -o input.mp4
ffmpeg -i input.mp4 input.wav

REMOTECMD="cd ~/Documents/uh2020/uncommonhacks2020/io && ./convert-wav-local.sh input.wav test && curl -F 'file=@./test.mid' https://chords-bot.herokuapp.com/upload && echo UPLOADED OUTPUT"
echo "local says output uploaded"



scp input.wav namanh@linux.cs.uchicago.edu:~/Documents/uh2020/uncommonhacks2020/io
ssh namanh@linux.cs.uchicago.edu $REMOTECMD

#$(dirname "$0")/scpsshautologin.exp "$SECRET" input.wav ~/Documents/uh2020/uncommonhacks2020/io namanh@linux.cs.uchicago.edu "$REMOTECMD" "$SSHPROMPT"

