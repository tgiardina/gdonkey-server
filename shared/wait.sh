#!/bin/bash
RETRIES=20
until ./node_modules/knex/bin/cli.js migrate:currentVersion > /dev/null 2>&1 || [ $RETRIES -eq 0 ];
do
  echo "Waiting for mysql server, $((RETRIES--)) remaining attempts..."
  sleep 1
done
