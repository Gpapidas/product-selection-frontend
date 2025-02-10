#!/bin/sh

echo "Injecting environment variables into .env.production..."

# Ensure .env.production exists
touch /app/.env.production

# Replace or add the variable inside .env.production
echo "VITE_API_BASE_URL=${VITE_API_BASE_URL}" > /app/.env.production

echo "Updated .env.production:"
cat /app/.env.production

