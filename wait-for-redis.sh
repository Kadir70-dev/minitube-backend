#!/bin/bash
until nc -z -v -w30 redis 6379; do
  echo "Waiting for Redis to be ready..."
  sleep 1
done
echo "Redis is up, starting the application..."

