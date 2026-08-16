#!/usr/bin/env bash

go fmt ./...
cd web || exit
npm run fmt
