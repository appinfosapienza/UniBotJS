#!/bin/bash
while :
do
    git fetch
    git pull origin main
    node deploy-commands.js
    echo "Press [Ctrl + C] to stop..."
    node index.js
    sleep 2
done
