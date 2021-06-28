#!/usr/bin/env bash

echo "Generating types with tsc..."
node_modules/typescript/bin/tsc --emitDeclarationOnly

#  echo "Generating API..."
#  node_modules/@microsoft/api-extractor/bin/api-extractor run --local --verbose

# echo "Generating Markdowns"
# node_modules/@microsoft/api-extractor/bin/api-documenter markdown --output-folder ./temp/markdown --input temp

echo "Generating index.d.ts"
rm 'index.d.ts' && cp 'index.d.ts.txt' 'index.d.ts'
