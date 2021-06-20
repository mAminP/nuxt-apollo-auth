#!/usr/bin/env bash

echo "Start Server ..."
npx pm2 start "node ./demo/api/accounts/index.js "
npx pm2 start "node ./demo/api/auth.js "

echo "Generate Types ..."
graphql-codegen --config demo/codegen.yml

echo "Kill Server ..."
npx pm2 kill
