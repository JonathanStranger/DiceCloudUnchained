#!/bin/bash

# Install Meteor without requiring superuser
echo "Installing Meteor..."
curl https://install.meteor.com/?release=2.13.3 -o install_meteor.sh
chmod +x install_meteor.sh
METEOR_ALLOW_SUPERUSER=1 sh install_meteor.sh

# Add Meteor to PATH
export PATH="$HOME/.meteor:$PATH"

# Verify Meteor installation
METEOR_ALLOW_SUPERUSER=1 meteor --version

# Continue with your build process
cd app
METEOR_ALLOW_SUPERUSER=1 meteor npm install
METEOR_ALLOW_SUPERUSER=1 meteor build ../.meteor-build --directory