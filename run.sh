#!/usr/bin/env bash

cd web || exit
node build.js
mv index.html ../internal/web_view/index.html
cd ..
go run ./cmd/
