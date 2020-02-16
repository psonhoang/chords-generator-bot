# file: .profile.d/ssh-setup.sh

#!/bin/bash
echo $0: creating public and private key files

# Create the .ssh directory
mkdir -p ${HOME}/.ssh
chmod 700 ${HOME}/.ssh

# Create the public and private key files from the environment variables.
echo "$(cat ~/.ssh/id_rsa.pub)" > ${HOME}/.ssh/heroku_id_rsa.pub
chmod 644 ${HOME}/.ssh/heroku_id_rsa.pub

# Note use of double quotes, required to preserve newlines
echo "${cat ~/.ssh/heroku_rsa_id}" > ${HOME}/.ssh/heroku_id_rsa
chmod 600 ${HOME}/.ssh/heroku_id_rsa

# Preload the known_hosts file  (see "version 2" below)

echo '|1|Li3yjPNE10NJAAUuRfMKiQLAWmw=|Fr6vEgMFtixdKbFsavvDMUd8ZPE= ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBK7LVt7f/0xOBjtU3Z/vuuNAdPYFRJw1r4xWpnkgNu4VlYAyFg2WsBR3Ij/egdx38jRZnrZUFsJiUolTLIMtInM=' > ${HOME}/.ssh/known_hosts

# Start the SSH tunnel if not already running
SSH_CMD="ssh namanh@linux.cs.uchicago.edu echo testingtesting"

# PID=`pgrep -f "${SSH_CMD}"`
# if [ $PID ] ; then
#     echo $0: tunnel already running on ${PID}
# else
#     echo $0 launching tunnel
#     $SSH_CMD
# fi