#!/usr/bin/env bash

go vet ./...
cd web || exit
npm run check
