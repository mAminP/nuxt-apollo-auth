#!/usr/bin/env bash

echo "Start Server ..."
npx pm2 start "node ./demo/api/auth.js "

echo "Generate Types ..."
npx graphql-codegen --config demo/codegen.yml

echo "Kill Server ..."
npx pm2 kill
