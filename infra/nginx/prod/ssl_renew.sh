#!/bin/bash

cd $HOME/stackmate.org/compose/prod

CONFIG="$HOME/stackmate.org/infra/nginx/main/nginx-conf"

cp $CONFIG/pre $CONFIG/default.conf && \
docker restart server

docker-compose up --no-deps certbot && \
cp $CONFIG/post $CONFIG/default.conf && \
docker restart server

