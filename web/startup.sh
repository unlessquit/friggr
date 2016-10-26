#!/bin/bash

set -e

export DATABASE_URL=`node -e "console.log(require('./src/config.js').DATABASE_URL)"`
pg-migrate up

exec nodemon index.js
