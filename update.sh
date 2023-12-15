#!/bin/bash

npm outdated
read -p "Do you want to update? (y/n) " ans

if [ "$ans" == "y" ]; then
  npx npm-check-updates -u
  npm install
else
  echo "Skipping updates."
fi
