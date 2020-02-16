#!/bin/sh

WAVPATH=$1
MIDINAME=$2

CURRDIR=$(dirname "$0")
PARENTDIR="$(dirname "$(pwd)")"

conda run -n datascience27 python $PARENTDIR/components/audio-to-midi/audio_to_midi_melodia.py $WAVPATH temp.mid 120 --smooth 0.27 --minduration 0.12

conda run -n datascience python $PARENTDIR/components/chord-prog-predict/predictonmidi.py temp.mid $MIDINAME.mid -e True

rm temp.mid
