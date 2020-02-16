#!/bin/bash

conda create -n datascience # now inside datascience env
conda activate datascience
conda install keras
pip install music21
conda deactivate # now leaving datascience env

conda create -n audio-to-midi-py27 python=2.7
conda activate audio-to-midi-py27 # now inside python 2.7 env
conda install numpy
pip install -r ~/components/audio-to-midi/requirements.txt
conda deactivate
