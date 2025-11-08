#!/bin/bash
if [ -n "$DATABASE_URL" ]; then
  echo "DATABASE_URL found, running prisma generate..."
  prisma generate
else
  echo "DATABASE_URL not found, skipping prisma generate"
fi
