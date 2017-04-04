#!/usr/bin/env bash

# Installs npm for virtualenv
#curl http://nodejs.org/dist/node-latest.tar.gz | tar xvz
#$ cd node-v*
#$ ./configure --prefix=$VIRTUAL_ENV
#$ make install

# Install and update protractor
npm install -g protractor
webdriver-manager update

# Pix Diff
npm install pix-diff
# YAML
npm install js-yaml

# Installs the hello command
pip install --editable .
