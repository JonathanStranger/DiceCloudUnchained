#!/bin/bash

# Install Meteor
echo "Installing Meteor..."
curl https://install.meteor.com/ | sh

# Add Meteor to PATH
export PATH="$HOME/.meteor:$PATH"

# Verify Meteor installation
meteor --version

# Continue with your build process
cd app
meteor npm install
meteor build ../.meteor-build --directory