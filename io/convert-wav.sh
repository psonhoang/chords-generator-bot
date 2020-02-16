#!/bin/sh

WAVURL=$1
#MIDINAME=$2

PARENTDIR="$(dirname "$(pwd)")"

curl $WAVURL -o input.wav

conda run -n datascience27 python $PARENTDIR/components/audio-to-midi/audio_to_midi_melodia.py input.wav temp.mid 120 --smooth 0.27 --minduration 0.12

conda run -n datascience python $PARENTDIR/components/chord-prog-predict/predictonmidi.py temp.mid test.mid -e True

curl -F 'file=@./test.mid' https://chords-bot.herokuapp.com/upload

echo -e "UPLOADED OUTPUT\n"

rm temp.mid
rm input.wav
