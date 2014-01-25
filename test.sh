#!/bin/bash

WC=$(which wc)

if [ "$WC" == "" ]
then
  echo "wc was not found on your system, da faq ?"
  exit 1
fi
