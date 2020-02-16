#!/bin/bash

conda create -n datascience -y # now inside datascience env
conda activate datascience
conda install keras -y
pip install music21
conda deactivate # now leaving datascience env

conda create -n datascience27 python=2.7 -y
conda activate datascience27 # now inside python 2.7 env
conda install numpy -y
pip install -r ~/components/audio-to-midi/requirements.txt
conda deactivate
