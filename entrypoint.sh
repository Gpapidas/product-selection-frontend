#!/bin/sh

echo "Injecting environment variables into frontend build..."

# Ensure variable is set (fallback to localhost)
VITE_API_BASE_URL="${VITE_API_BASE_URL:-http://localhost:8000}"

# Replace placeholder in built files
find /app/dist -type f \( -name '*.js' -o -name '*.html' \) -exec sed -i "s|VITE_API_BASE_URL_PLACEHOLDER|$VITE_API_BASE_URL|g" {} +

echo "Starting frontend..."
exec serve -s dist -l 80
