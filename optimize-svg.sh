#!/bin/bash

find public -name '*.svg' -type f | while read file; do
  svgo "$file" --output "$file"
done
