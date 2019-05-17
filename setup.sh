#!/bin/bash

# Setup web app container
docker build -t tokens web/

docker-compose start
