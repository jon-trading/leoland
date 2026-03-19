#!/usr/bin/env bash
set -euo pipefail

cd /srv/leoland/leoland-mvp
npm run mobile:build

docker compose -f docker-compose.web.yml up -d

docker ps --filter name=leoland-web --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'
