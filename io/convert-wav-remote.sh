#!/bin/sh

WAVURL=$1
MIDINAME=$2
SECRET="${SESSSION_SECRET}"
SSHPROMPT="assword:"

#curl $WAVURL -o input.wav

REMOTECMD="cd ~/Documents/uh2020/uncommonhacks2020/io && ./convert-wav-local.sh input.wav $MIDINAME && curl -F 'file=@./$MIDINAME.mid' https://chords-bot.herokuapp.com/upload && echo UPLOADED OUTPUT"
echo "local says output uploaded"



$(dirname "$0")/scpsshautologin.exp "$SECRET" input.wav ~/Documents/uh2020/uncommonhacks2020/io namanh@linux.cs.uchicago.edu "$REMOTECMD" "$SSHPROMPT"