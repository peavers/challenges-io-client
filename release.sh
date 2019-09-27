#!/usr/local/bin/bash

rm -rf ./node_modules/.cache/

ng build --prod && firebase deploy
